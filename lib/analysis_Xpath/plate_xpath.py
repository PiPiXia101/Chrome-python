# 提取选中元素里面的A
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


# 示例用法
test_node = """<div class="more_btn" frag="按钮" type="更多" style=""> <a href="/186/list.htm" class="w9_more" target="_blank"><span class="more_text" frag="按钮内容" style="outline: red solid 2px;">More++</span></a> </div>"""

result = list()
html = Selector(text=test_node)
root_nodes = html.xpath('//body')  # 获取根级节点
all_nodes = []
for idx, root in enumerate(root_nodes):
    all_nodes.extend(build_nodes(root, level=0, level_index=idx))
for node in all_nodes:
    indent = '  ' * (node.level - 1)  # 根据层级缩进
    # print(f"{indent}└── [{node.level}] {node.table_name} path_weight: {node.path_weight} (ID: {node.id}, Level: {node.level}, LevelIndex: {node.level_index}) | Attrs: {node.attribute}")
a_nodes = [node for node in all_nodes if node.table_name == 'a']
for node in a_nodes:
    print(f"Node ID: {node.id}, Attributes: {node.attribute}, Path Weight: {node.path_weight}")