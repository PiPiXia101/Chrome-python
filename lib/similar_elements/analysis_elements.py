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
    '*': 0  # 默认权重
    
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


def find_similar_ancestor_structure(start_node, weightMax_node, all_nodes, similar_elements):
    """
    根据节点结构寻找相似的祖先节点。

    参数:
    - start_node: 开始节点，用于从该节点开始寻找相似祖先结构。
    - weightMax_node: 权重最大节点，用于获取父节点和兄弟节点信息。
    - all_nodes: 所有节点列表，包含所有待检查的节点。
    - similar_elements: 相似元素列表，用于存储找到的相似元素。

    返回:
    - 相似元素列表，包含所有找到的相似元素。
    """
    # 获取权重最大节点的父节点和兄弟节点
    result = get_parent_and_siblings(weightMax_node, all_nodes)
    parent_node = result["parent"]
    sibling_nodes = result["siblings"]

    # 如果没有父节点，则直接返回相似元素列表
    if not parent_node:
        return similar_elements

    # 获取父节点的HTML节点
    html_parent_node = start_node.xpath('./parent::*')
    if not html_parent_node:
        return similar_elements

    # 检查父节点的名称是否匹配
    html_parent_name = html_parent_node.xpath('local-name()').get(default='')
    if html_parent_name != parent_node.table_name:
        return similar_elements

    # 获取父节点的所有子节点
    html_sibling_nodes = html_parent_node.xpath('./child::*')
    html_siblings_count = len(html_sibling_nodes)

    # 检查兄弟节点数量是否匹配
    if sibling_nodes:
        if len(sibling_nodes) + 1 != html_siblings_count:
            return similar_elements

        match_count = 0
        for sibling_node in sibling_nodes:
            index = sibling_node.level_index
            if index < html_siblings_count and \
               sibling_node.table_name == html_sibling_nodes[index].xpath('local-name()').get(default=''):
                match_count += 1

        sibling_type = match_count == len(sibling_nodes)
    else:
        sibling_type = True

    # 如果兄弟节点匹配成功，则添加到相似元素列表中并进行下一次递归
    if sibling_type:
        similar_elements.append({
            'origin_node': start_node,
            'seek_oneself': start_node,
            'seek_parent': html_parent_node
        })
        find_similar_ancestor_structure(html_parent_node, parent_node, all_nodes, similar_elements)
    else:
        return similar_elements

def run_example(test_node,html_str):
    result = list()
    html = Selector(text=test_node)
    root_nodes = html.xpath('//body')  # 获取根级节点
    all_nodes = []
    for idx, root in enumerate(root_nodes):
        all_nodes.extend(build_nodes(root, level=0, level_index=idx))
    for node in all_nodes:
        indent = '  ' * (node.level - 1)  # 根据层级缩进
        print(f"{indent}└── [{node.level}] {node.table_name} path_weight: {node.path_weight} (ID: {node.id}, Level: {node.level}, LevelIndex: {node.level_index}) | Attrs: {node.attribute}")
    # 权重值最大的节点
    first_node = find_scored_highest_weight_node(all_nodes)
    if first_node:
        print("找到的节点信息：")
        print(f"└── [{first_node.level}] {first_node.table_name} (ID: {first_node.id}, Level: {first_node.level}, LevelIndex: {first_node.level_index}) | Attrs: {first_node.attribute}")
    else:
        print("未找到符合条件的节点。")
    if all_nodes:
        max_level = max(node.level for node in all_nodes)
        print(f"所有节点中最大的层级 (level) 是: {max_level}")
    else:
        print("节点列表为空，无法获取最大层级。")
    html_obj = Selector(text = html_str)
    # 选中元素的代表节点在页面中,已经全部找到了
    match_list = html_obj.xpath(f'//{first_node.table_name}')

    for match_node in match_list:
        similar_elements = list()
        find_similar_ancestor_structure(match_node,first_node,all_nodes,similar_elements)  
        if len(similar_elements) == first_node.level-1:
            result.append(similar_elements)
    return result,all_nodes,first_node

# 示例用法
test_node = """<div class="more_btn" frag="按钮" type="更多" style=""> <a href="/186/list.htm" class="w9_more" target="_blank"><span class="more_text" frag="按钮内容" style="outline: red solid 2px;">More++</span></a> </div>"""

with open('/Users/yan/Desktop/Chrome-python/html/test.html', 'r', encoding='utf-8') as f:
    html_str = f.read()

result,all_nodes,first_node = run_example(test_node,html_str)
print(f"选中[{first_node.level}] {first_node.table_name} (ID: {first_node.id}, Level: {first_node.level}, LevelIndex: {first_node.level_index}) | Attrs: {first_node.attribute}")
children_of_first_node = [node for node in all_nodes if node.parent_id == first_node.id]
for item in result:
    if children_of_first_node:
        similar_nodes = []
        for idx, root in enumerate([item[0]['seek_oneself']]):
            similar_nodes.extend(build_nodes(root, level=0, level_index=idx))
        if similar_nodes and len(similar_nodes) == len(children_of_first_node):
            # print(item[0]['seek_oneself'].get())
            for node in children_of_first_node:
                # print(f"└── [{node.level}] {node.table_name} path_weight: {node.path_weight} (ID: {node.id}, Level: {node.level}, LevelIndex: {node.level_index}) | Attrs: {node.attribute}")
                # print(f"└── [{similar_nodes[node.level_index].level}] {similar_nodes[node.level_index].table_name} path_weight: {similar_nodes[node.level_index].path_weight} (ID: {similar_nodes[node.level_index].id}, Level: {node.level}, LevelIndex: {similar_nodes[node.level_index].level_index}) | Attrs: {similar_nodes[node.level_index].attribute}")
                if similar_nodes[node.level_index].table_name == node.table_name:
                    print(f"相似元素：\n{item[-1]['seek_parent'].get()}\n\n{item[0]['seek_oneself'].get()}\n")
                    print('='*50)
    else:
        print(f"相同节点：{item[0]['seek_oneself'].get()}")
        print('='*50)