class Node:
    """
    表示树结构中的一个节点。

    Attributes:
        parent_id (str): 父节点的唯一标识符。
        id (str): 当前节点的唯一标识符。
        table_name (str): 芶点对应的表名称。
        attribute (dict): 存储节点附加属性的字典。
        level (int): 节点在树中的层级（例如根节点为0）。
        level_index (int): 同一层级中该节点的索引位置。
    """

    def __init__(self, parent_id: str, id: str, table_name: str, attribute: dict, level: int, level_index: int, path_weight=0):
        """
        初始化一个新的节点实例。

        Args:
            parent_id (str): 父节点的唯一标识符。
            id (str): 当前节点的唯一标识符。
            table_name (str): 节点对应的表名称。
            attribute (dict): 存储节点附加属性的字典。
            level (int): 节点在树中的层级（例如根节点为0）。
            level_index (int): 同一层级中该节点的索引位置。
        """
        self.parent_id = parent_id
        self.id = id
        self.table_name = table_name
        self.attribute = attribute
        self.level = level  # 节点的层级
        self.level_index = level_index  # 节点的层级索引
        self.path_weight = path_weight