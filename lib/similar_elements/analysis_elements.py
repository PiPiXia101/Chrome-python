from scrapy import Selector
from collections import deque
import os


def extract_elements(elements):
    """
    递归提取 HTML 元素信息，并返回结构化数据列表
    """
    element_list = []

    for elem in elements:
        tag = elem.xpath('local-name()').get()
        attributes = dict(elem.attrib)
        text_content = elem.xpath('.//text()').getall()
        text_content = [t.strip() for t in text_content if t.strip()]

        node_info = {
            'tag': tag,
            'attributes': attributes,
            'text_content': text_content
        }

        element_list.append(node_info)

        children = elem.xpath('./*')
        if children:
            child_nodes = extract_elements(children)
            node_info['children'] = child_nodes

    return element_list


def build_similarity_xpath(reference_node, ignore_attrs=None):
    """
    根据参考节点生成用于匹配相似元素的通用 XPath
    忽略 id 等唯一性属性
    """
    if ignore_attrs is None:
        ignore_attrs = ['id','href']

    tag = reference_node['tag']
    attrs = []

    for attr_name, attr_value in reference_node['attributes'].items():
        if attr_name not in ignore_attrs and attr_value:
            attrs.append(f'contains(@{attr_name}, "{attr_value}")')

    if not attrs:
        return f"//{tag}"

    xpath_expr = f"//{tag}[" + " and ".join(attrs) + "]"
    return xpath_expr


def find_similar_elements(html_text, reference_xpath=None):
    selector = Selector(text=html_text)

    if reference_xpath:
        # 使用传入的 XPath 定位参考元素
        reference_elem = selector.xpath(reference_xpath).get()
        if not reference_elem:
            raise ValueError(f"No element found at provided reference_xpath: {reference_xpath}")

        # 提取该元素的结构信息用于构建相似性规则
        reference_node = extract_elements(selector.xpath(reference_xpath))
        if not reference_node:
            raise ValueError("Failed to extract reference node from given XPath.")
        reference_node = reference_node[0]  # extract_elements 返回列表
    else:
        # 默认选择第一个 <a> 标签作为参考元素
        root_elements = selector.xpath('//body/*')
        all_elements = extract_elements(root_elements)
        reference_node = next((el for el in all_elements if el['tag'] == 'a'), None)
        if not reference_node:
            raise ValueError("No <a> tag found as reference element.")

    similarity_xpath = build_similarity_xpath(reference_node)
    print(f"Generated Similarity XPath: {similarity_xpath}")

    similar_elements = selector.xpath(similarity_xpath).getall()
    return similar_elements


if __name__ == '__main__':
    # 读取 HTML 文件
    html_file_path = '/Users/yan/Desktop/Chrome-python/html/test.html'
    if not os.path.exists(html_file_path):
        raise FileNotFoundError(f"HTML file not found at path: {html_file_path}")

    with open(html_file_path, 'r', encoding='utf-8') as f:
        html_content = f.read()

    try:
        matched_elements = find_similar_elements(html_content,'/html/body/div/main/div[1]/div/div/div/div/div[2]/ul/li[1]/a')
        print("\nMatched Similar Elements:")
        for el in matched_elements:
            print(el)
    except Exception as e:
        print(f"[Error] {e}")