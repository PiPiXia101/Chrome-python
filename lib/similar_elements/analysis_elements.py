import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from scrapy import Selector
from typing import List, Dict, Any
from tree_diagram.tree_node import Node
import hashlib
TAG_WEIGHTS = {
    'img': 10,
    'a': 10,
    'p': 5,
    'div': 4,
    'ul': 4,
    'li': 2,
    'tr': 4,
    'td': 2,
    'br': 0,
    'i':-1,
    '*': 1  # 默认权重
    
}

def generate_node_id(table_name: str, level: int, level_index: int) -> str:
    """
    使用 table_name、level 和 level_index 生成唯一节点 ID。

    Args:
        table_name (str): 节点标签名。
        level (int): 当前节点层级。
        level_index (int): 当前节点在同级中的索引。

    Returns:
        str: 哈希后的唯一节点 ID。
    """
    unique_str = f"{table_name}:{level}:{level_index}"
    return hashlib.md5(unique_str.encode()).hexdigest()

def build_nodes(node_obj, parent_id: str = None, level: int = 0, level_index: int = 0, path_weight: int = 0) -> List[Node]:
    """
    递归构建 HTML 节点树并生成 Node 对象列表。
    
    Args:
        node_obj (Selector): Scrapy 的 Selector 节点对象。
        parent_id (str): 当前节点的父节点 ID（由上一层递归传入）。
        level (int): 当前节点的层级，默认从 0 开始。
        level_index (int): 当前节点在其父级节点下的索引位置。
        path_weight (int): 从根节点到当前节点路径上的权重总和。

    Returns:
        List[Node]: 包含当前节点及其所有子节点的 Node 对象列表。
    """
    nodes = []

    for index, child in enumerate(node_obj.xpath('*')):
        table_name = child.xpath('local-name()').get()
        attributes = dict(child.attrib)

        # 获取当前节点自身的权重
        self_weight = TAG_WEIGHTS.get(table_name, TAG_WEIGHTS['*'])

        # 计算新的路径权重（父路径 + 自身权重）
        new_path_weight = path_weight + self_weight

        # 使用 table_name、level、index 生成唯一 id
        node_id = generate_node_id(table_name, level + 1, index)

        # 创建当前节点
        node = Node(
            parent_id=parent_id,
            id=node_id,
            table_name=table_name,
            attribute=attributes,
            level=level + 1,
            level_index=index,
            path_weight=new_path_weight  # 新增字段
        )
        nodes.append(node)

        # 递归构建子节点，将当前 node.id 作为 parent_id 传入
        child_nodes = build_nodes(
            child,
            parent_id=node_id,
            level=level + 1,
            level_index=index,
            path_weight=new_path_weight  # 向下传递路径权重
        )
        nodes.extend(child_nodes)

    return nodes

def find_scored_highest_weight_node(nodes: List[Node]) -> Node:
    """
    寻找具有最高加权得分的节点。
    
    此函数通过计算每个节点的得分来确定哪个节点的“重要性”最高。得分是基于节点的路径权重和其级别与最大级别之间的差值计算得出的。
    
    参数:
    nodes (List[Node]): 一个Node对象列表，代表待评估的节点集合。
    
    返回:
    Node: 得分最高的节点。如果没有提供节点或没有有效节点，则返回None。
    """
    nodes = [node for node in nodes if node.level > 1]
    # 检查节点列表是否为空
    if not nodes:
        return None

    # 计算所有节点中的最大级别
    max_level = max(node.level for node in nodes)

    # 定义一个用于计算节点得分的内部函数
    def score(node):
        """
        计算节点的得分。
        
        得分是根据节点的路径权重和它与最大级别的差距来计算的。这个函数帮助确定节点的相对重要性。
        
        参数:
        node (Node): 要计算得分的节点。
        
        返回:
        float: 节点的得分。
        """
        return node.path_weight * 0.2 + (max_level - node.level) * 0.8

    # 过滤出所有级别大于0的有效节点
    valid_nodes = [node for node in nodes if node.level > 0]

    # 返回得分最高的有效节点
    return max(valid_nodes, key=score)

def get_parent_and_siblings(node: Node, all_nodes: List[Node]) -> Dict[str, Any]:
    """
    获取指定节点的父节点和同级节点。

    参数:
        node (Node): 当前节点。
        all_nodes (List[Node]): 所有节点的列表。

    返回:
        Dict[str, Any]: 包含父节点和同级节点的字典。
    """
    # 查找父节点
    parent = next(
        (n for n in all_nodes if n.id == node.parent_id and n.level == node.level - 1),
        None
    )

    # 查找同级节点（相同 parent_id 且相同 level，排除自己）
    siblings = [
        n for n in all_nodes
        if n.parent_id == node.parent_id and n.level == node.level and n.id != node.id
    ]

    return {
        "parent": parent,
        "siblings": siblings
    }


def run_example(test_node, html_str):
    """
    运行示例函数，用于解析HTML并查找特定节点。
    
    参数:
    test_node (str): 用于测试的HTML节点字符串。
    html_str (str): 完整的HTML字符串。
    
    返回:
    tuple: 包含以下元素的元组：
        - finnly_result: 最终匹配结果列表。
        - all_nodes: 所有构建的节点列表。
        - first_node: 权重最高的节点。
    """
    # 初始化最终结果列表
    finnly_result = list()
    
    # 使用Scrapy的Selector初始化HTML选择器
    html = Selector(text=test_node)
    
    # 获取根级节点
    root_nodes = html.xpath('//body')
    
    # 初始化所有节点列表
    all_nodes = []
    
    # 遍历根节点，构建所有节点
    for idx, root in enumerate(root_nodes):
        all_nodes.extend(build_nodes(root, level=0, level_index=idx))
    
    # 打印所有节点的详细信息
    for node in all_nodes:
        indent = '  ' * (node.level - 1)  # 根据层级缩进
        print(f"{indent}└── [{node.level}] {node.table_name} path_weight: {node.path_weight} (ID: {node.id}, Level: {node.level}, LevelIndex: {node.level_index}) | Attrs: {node.attribute}")
    
    # 查找权重值最大的节点
    first_node_max = find_scored_highest_weight_node(all_nodes)
    
    # 打印权重最大节点的信息
    if first_node_max:
        print("找到的节点信息：")
        print(f"└── [{first_node_max.level}] {first_node_max.table_name} (ID: {first_node_max.id}, Level: {first_node_max.level}, LevelIndex: {first_node_max.level_index}) | Attrs: {first_node_max.attribute}")
    else:
        print("未找到符合条件的节点。")
    
    # 打印所有节点中的最大层级
    if all_nodes:
        max_level = max(node.level for node in all_nodes)
        print(f"所有节点中最大的层级 (level) 是: {max_level}")
    else:
        print("节点列表为空，无法获取最大层级。")
    
    # 使用Scrapy的Selector初始化完整HTML字符串的选择器
    html_obj = Selector(text=html_str)
    
    # 查找匹配元素的节点
    match_list = html_obj.xpath(f'//{first_node_max.table_name}')
    
    # 遍历匹配节点，寻找相似元素
    for match_node in match_list:
        similar_elements = list()
        
        # 初始化权重最大节点和层级
        first_node = find_scored_highest_weight_node(all_nodes)
        first_node_level = first_node.level
        
        # 递归寻找父节点和兄弟节点，直到权重最大节点的层级为1
        while first_node.level > 1:
            parent_type = False
            sibling_type = False
            
            # 获取当前匹配节点的父节点
            html_parent_node = match_node.xpath('./parent::*')
            html_parent_name = html_parent_node.xpath('local-name()').get()
            
            # 获取权重最大节点的父节点和兄弟节点
            result = get_parent_and_siblings(first_node, all_nodes)
            parent_node = result["parent"]
            sibling_nodes = result["siblings"]
            
            # 检查父节点名称是否匹配
            if html_parent_name == parent_node.table_name:
                parent_type = True
                
                # 获取父节点的所有子节点
                html_sibling_nodes = html_parent_node.xpath('./child::*')
                
                # 检查兄弟节点是否匹配
                if sibling_nodes and html_sibling_nodes and len(sibling_nodes) + 1 == len(html_sibling_nodes):
                    for sibling_node in sibling_nodes:
                        if sibling_node.table_name == html_sibling_nodes[sibling_node.level_index].xpath('local-name()').get():
                            sibling_type += 1
                    if sibling_type == len(sibling_nodes):
                        sibling_type = True
                    else:
                        sibling_type = False
                else:
                    if not sibling_nodes and (not len(html_sibling_nodes) - 1):
                        sibling_type = True
                    else:
                        sibling_type = False
            
            # 如果父节点和兄弟节点都匹配成功，则添加到相似元素列表中
            if parent_type and sibling_type:
                # print(f"└── 寻找到上级元素 {html_parent_name} 第{parent_node.level}层 第{parent_node.level_index}个节点,并且子元素全部匹配成功{','.join([item.table_name for item in sibling_nodes])},进行下一次递归")
                similar_elements.append(
                    {
                        'origin_node': first_node,
                        'seek_oneself': match_node,
                        'seek_parent': html_parent_node
                    }
                )
                match_node = html_parent_node
                first_node = parent_node
            else:
                break
        
        # 如果相似元素的数量与最大节点层级匹配，则添加到最终结果列表中
        if len(similar_elements) == first_node_level - 1:
            finnly_result.append(similar_elements)
    
    # 返回最终结果
    return finnly_result, all_nodes, first_node_max


# 子节点匹配
def children_match(result,all_nodes,first_node):
    finally_result = list()
    print(f"选中[{first_node.level}] {first_node.table_name} (ID: {first_node.id}, Level: {first_node.level}, LevelIndex: {first_node.level_index}) | Attrs: {first_node.attribute}")
    children_of_first_node = [node for node in all_nodes if node.parent_id == first_node.id]
    for item in result:
        similar_nodes = []
        for idx, root in enumerate([item[0]['seek_oneself']]):
            similar_nodes.extend(build_nodes(root, level=0, level_index=idx))
        if children_of_first_node:
            if similar_nodes and len(similar_nodes) == len(children_of_first_node):
                for node in children_of_first_node:
                    if similar_nodes[node.level_index].table_name == node.table_name:
                        finally_result.append(item)
                        # print(f"相似元素：\n{item[-1]['seek_parent'].get()}\n\n{item[0]['seek_oneself'].get()}\n")
                        # print('='*50)
        else:
            if not similar_nodes:
                finally_result.append(item)
            # print(f"相同节点：{item[0]['seek_oneself'].get()}")
            # print('='*50)
    return finally_result


# 示例用法
# test_node = """<li class="navItem"><a href="channel.html?recid=4">政经</a></li>"""

# with open('/Users/yan/Desktop/Chrome-python/html/test.html', 'r', encoding='utf-8') as f:
#     html_str = f.read()

# result,all_nodes,first_node = run_example(test_node,html_str)
# result = children_match(result,all_nodes,first_node)
# for item in result:
#     print(item[0]['seek_parent'].xpath('./a/@href').get())
    # print('='*50)

