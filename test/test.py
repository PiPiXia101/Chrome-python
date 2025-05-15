import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from scrapy import Selector
from typing import List, Dict, Any
from lib.tree_diagram.tree_node import Node
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

def find_highest_weight_node(nodes: List[Node]) -> Node:
    """
    查找 path_weight 最大的节点（忽略 level=0 的根节点）。

    Args:
        nodes (List[Node]): Node 对象列表。

    Returns:
        Node: 找到的权重最高的节点，未找到则返回 None。
    """
    # 过滤掉 level=0 的根节点，并找出 path_weight 最大的节点
    valid_nodes = [node for node in nodes if node.level > 0]

    if not valid_nodes:
        return None

    # 使用 max 函数按 path_weight 排序取最大值
    highest_node = max(valid_nodes, key=lambda x: x.path_weight)
    return highest_node

def get_nodes_by_level(nodes: List[Node], target_level: int) -> List[Node]:
    """
    获取指定层级 (level) 的所有节点。

    Args:
        nodes (List[Node]): 节点列表。
        target_level (int): 目标层级。

    Returns:
        List[Node]: 所有层级等于 target_level 的节点列表。
    """
    return [node for node in nodes if node.level == target_level]

# 示例用法
test_node = '<li class="on"><span><a href="http://www.fogang.gov.cn/ywdt/fgyw/index.html" title="佛冈要闻" target="_blank">佛冈要闻</a></span></li>'
html = Selector(text=test_node)
root_nodes = html.xpath('//body')  # 获取根级节点

all_nodes = []
for idx, root in enumerate(root_nodes):
    all_nodes.extend(build_nodes(root, level=0, level_index=idx))

for node in all_nodes:
    indent = '  ' * (node.level - 1)  # 根据层级缩进
    print(f"{indent}└── [{node.level}] {node.table_name} path_weight: {node.path_weight} (ID: {node.id}, Level: {node.level}, LevelIndex: {node.level_index}) | Attrs: {node.attribute}")

# 查找符合条件的第一个节点
first_node = find_highest_weight_node(all_nodes)

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



with open('/Users/yan/Desktop/Chrome-python/html/test.html', 'r', encoding='utf-8') as f:
    html_str = f.read()
html_obj = Selector(text = html_str)
# node_list = html_obj.xpath(f'//{first_node.table_name}/parent::li[@class=""]')
node_list = html_obj.xpath(f'//{first_node.table_name}')


for item in node_list:
    # print(item.get())
    first_node_html = item
    first_node_level = first_node.level
    # print(item.xpath('./parent::*').xpath('local-name()').get())
    # while True:
    # 向上匹配
    while first_node_level>1:
        item = item.xpath('./parent::*')
        table_name = item.xpath('local-name()').get()
        attributes = dict(item.attrib)
        # print(table_name,attributes)
        first_node_level -= 1
        selected_nodes = get_nodes_by_level(all_nodes, first_node_level)
        finnly = False
        for node in selected_nodes:
            if table_name == node.table_name:
                print(first_node.level)
                print(f'选中唯一元素{first_node.level}',first_node_html.get())
                print(f'选中唯一元素{first_node_level}层元素',table_name,attributes)
                print(f"└── [{node.level}] {node.table_name} (ID: {node.id}, Level: {node.level}, LevelIndex: {node.level_index}) | Attrs: {node.attribute}")
                print('*'*50)
            else:
                finnly = True
                break
        if finnly:
            break
    if not finnly:
        print('='*50)