import hashlib
import json
import re

from lxml import etree


class TreeNode:

    def __init__(self, info: dict):
        self.tag_name = info['tag_name']
        self.attribute = info['attribute']
        self.index = info['index']
        self.father_tag_name = info['father_tag_name']
        self.tag_id = info['tag_id']
        self.child_tag = list()
        info['child_tag'] = self.child_tag
        self.__doc__ = str(info)


class HtmlTree:

    def __init__(self, node_list, max_depth):
        self.node_list = node_list
        self.max_depth = max_depth
        self.tree_matrix = list()
        self.xp = '/'
        self.xp_set = set()

    def bulid(self):
        # 构建节点矩阵
        for index in range(self.max_depth + 1):
            tree_list = [node for node in self.node_list if node.index == index]
            self.tree_matrix.append(tree_list)
        # 倒序遍历矩阵合成
        self.matrix_recombination(self.tree_matrix)
        # 矩阵正序遍历获取列表xpath
        for node in self.tree_matrix[0]:
            self.get_list_xp(node, self.xp_set, self.xp)

    def matrix_recombination(self, tree_matrix: list):
        if len(tree_matrix) == 1:
            return tree_matrix
        tree_list = tree_matrix.pop(-1)
        for item in tree_matrix[-1]:
            for jtem in tree_list:
                if jtem.father_tag_name == item.tag_id:
                    item.child_tag.append(jtem)
        self.matrix_recombination(tree_matrix)

    def get_list_xp(self, node: TreeNode, xpath_set: set, xp: str):
        xp += f'/{node.tag_name}'
        attribute = node.attribute
        if node.tag_name != 'a' and attribute:
            if node.tag_name in ['li', 'tr', 'td']:
                # xp += f'[{attribute[0]}]'
                pass
            else:
                for attr in attribute:
                    xp += f'[{attr}]'
        if node.tag_name == 'a':
            attr_str = ''.join(attribute)
            href_value_list = re.findall('href=[\'\"](.*?)[\'\"]', attr_str)
            if href_value_list:
                href_value = href_value_list[0]
                if href_value:
                    xpath_set.add(xp)
        for item in node.child_tag:
            self.get_list_xp(item, xpath_set, xp)


class AutoXPath:

    def get_tag(self, tag_obj_list: list, html_tree: set, num: int, father_tag_name: str, end_tag_name='a'):
        num += 1
        if tag_obj_list:
            for tag_index in range(len(tag_obj_list)):
                item = tag_obj_list[tag_index]
                # 获取节点属性
                attribute_name_list = ['class', 'id', 'href']
                attribute_list = list()
                for attr_name in attribute_name_list:
                    attr_value = item.get(attr_name)
                    if attr_value:
                        attribute_list.append(f'@{attr_name}="{attr_value}"')
                if item.xpath('local-name(.)') in ['li', 'ul', 'tr', 'td']:
                    tag_str = f'{num}-{1}-{item.xpath("local-name(.)")}-{father_tag_name}'
                else:
                    tag_str = f'{num}-{tag_index}-{item.xpath("local-name(.)")}-{attribute_list}-{father_tag_name}'
                tag_id = hashlib.md5(tag_str.encode()).hexdigest()
                # 组装节点对象
                info = {
                    'tag_name': item.xpath('local-name(.)'),
                    'attribute': attribute_list,
                    'index': num - 1,
                    'father_tag_name': father_tag_name,
                    'tag_id': tag_id
                }
                # 去重
                html_tree.add(json.dumps(info))
                # 递归获取
                if info['tag_name'] == end_tag_name and item == tag_obj_list[-1]:
                    return html_tree
                else:
                    self.get_tag(item.xpath('./*'), html_tree, num, father_tag_name=tag_id)


        else:
            return html_tree

    def clean_html_str(self, html_str):
        # 清洗数据
        html_str = html_str.strip("'\"")
        # 去除多余字符
        html_str = html_str.replace('\\"', '"').replace('\\n', '').replace('\\t', '').replace('&nbsp;', ' ')
        return html_str

    def run(self, html_str, htm_xpath):
        result = list()
        html_str = self.clean_html_str(html_str)

        # HTML文档对象
        html_obj = etree.HTML(html_str)
        # 节点深度
        num = 0
        # 节点集合
        html_tree = set()
        tag_obj_list = html_obj.xpath('.')
        self.get_tag(tag_obj_list, html_tree, num, father_tag_name='')
        # 排序
        sorted_elements = sorted([json.loads(item) for item in list(html_tree)], key=lambda x: x['index'])
        # print('*'*50)
        # for item in sorted_elements:
        #     print(item)
        #     print('*' * 50)
        # 节点最大深度
        max_depth = max([item['index'] for item in sorted_elements])
        # 构建树节点对象
        node_list = [TreeNode(item) for item in sorted_elements]
        # 构建树形结构
        tree = HtmlTree(node_list, max_depth)
        tree.bulid()
        xpath_help_list = htm_xpath.split('/')
        xpath_help_list = [item for item in xpath_help_list if item]
        for xp in list(tree.xp_set):
            a_xp_list = xp.replace('/html/body', '').split('/')
            a_xp_list = [item for item in a_xp_list if item]

            tag_name, attr_name, attr_value = '', '', ''
            for item in a_xp_list:
                if '[@' in item:
                    xp_re_feature = re.findall('(.*?)\[@(.*?)=[\'\"](.*?)[\'\"]\]', item)
                    if xp_re_feature:
                        xp_re_feature = xp_re_feature.pop()
                        tag_name = xp_re_feature[0]
                        attr_name = xp_re_feature[1]
                        attr_value = xp_re_feature[-1]
                    break

            same_element_index = -1
            for index in range(len(xpath_help_list)):
                if tag_name in xpath_help_list[index]:
                    if attr_name in xpath_help_list[index] and attr_value in xpath_help_list[index]:
                        same_element_index = index
            montage_index = -1
            xpath_help_prefix_list = xpath_help_list[:same_element_index][::-1]
            for index in range(len(xpath_help_prefix_list)):
                if '[@' in xpath_help_prefix_list[index]:
                    montage_index = len(xpath_help_prefix_list) - index - 1
                    break
            montage_str = '/'.join(xpath_help_list[montage_index:same_element_index])
            new_xp = xp.replace('html/body', montage_str).replace('///', '//')
            # new_xp = re.sub('\[\d+\]','',new_xp)
            result.append(new_xp.replace('"',"'"))

        return result


if __name__ == '__main__':
    # with open('test.html', 'r', encoding='utf-8') as f:
    #     html_str = f.read()
    html_str = "<ul class=\"\">\n\n\n\n<li id=\"line_u10_0\"><a href=\"info/1144/1184.htm\"><span>2019-10-10</span><em>机构设置</em></a></li>\n                    \n              </ul>"
    xpath_help = "/html/body/div[@class='mainWrap clearfix']/div[@class='main_con']/div[@class='main_conR main_conRa']/div[@class='main_conRCb']/ul"

    auto_xpath = AutoXPath()
    result = auto_xpath.run(html_str, xpath_help)

    print('=' * 50)

    for item in result:
        print(item)
        print('=' * 50)
