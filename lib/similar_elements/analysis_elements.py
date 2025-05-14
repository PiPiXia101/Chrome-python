from scrapy import Selector
from collections import deque
from typing import List, Dict, Optional, Any
import os


def extract_elements(elements: List[Selector]) -> List[Dict[str, Any]]:
    """
    递归提取 HTML 元素信息，并返回结构化数据列表。
    
    Args:
        elements (List[Selector]): Scrapy 的 Selector 对象列表，表示一组 HTML 元素。

    Returns:
        List[Dict]: 包含每个节点信息的字典列表，包含：
            - tag: 标签名（如 div、a 等）
            - attributes: 属性字典
            - text_content: 文本内容列表（去除空格）
            - children: 子节点列表（递归调用自身）
    """
    element_list = []

    for elem in elements:
        # 获取标签名
        tag = elem.xpath('local-name()').get()

        # 获取属性字典
        attributes = dict(elem.attrib)

        # 获取所有文本内容并清洗
        raw_texts = elem.xpath('.//text()').getall()
        text_content = [t.strip() for t in raw_texts if t.strip()]

        node_info = {
            'tag': tag,
            'attributes': attributes,
            'text_content': text_content
        }

        element_list.append(node_info)

        # 递归处理子元素
        children = elem.xpath('./*')
        if children:
            child_nodes = extract_elements(children)
            node_info['children'] = child_nodes

    return element_list


def build_similarity_xpath(reference_node: Dict[str, Any], ignore_attrs: Optional[List[str]] = None) -> str:
    """
    根据参考节点生成用于匹配相似元素的通用 XPath。
    忽略 id 和 href 等唯一性或变化频繁的属性。
    对 class 属性做特殊处理，支持多值精确匹配。
    """
    if ignore_attrs is None:
        ignore_attrs = ['id', 'href']

    tag = reference_node['tag']
    attrs = []

    for attr_name, attr_value in reference_node['attributes'].items():
        if not attr_value:
            continue
        if attr_name in ignore_attrs:
            continue

        if attr_name == 'class':
            # 特殊处理 class 属性，逐个单词匹配
            classes = attr_value.split()
            for cls in classes:
                attrs.append(f'contains(concat(" ", normalize-space(@class), " "), " {cls} ")')
        else:
            # 普通属性使用 contains 匹配
            attrs.append(f'contains(@{attr_name}, "{attr_value}")')

    if not attrs:
        return f"//{tag}"

    xpath_expr = f"//{tag}[" + " or ".join(attrs) + "]"
    return xpath_expr


def find_similar_elements(html_text: str, reference_xpath: Optional[str] = None) -> List[str]:
    """
    主流程函数：解析 HTML 并查找与参考元素相似的元素。

    Args:
        html_text (str): 页面源码字符串
        reference_xpath (Optional[str]): 指定参考元素的 XPath 路径，若不传则使用第一个 <a> 标签

    Returns:
        List[str]: 匹配到的相似元素的原始 HTML 片段列表
    """
    selector = Selector(text=html_text)

    if reference_xpath:
        # 使用传入的 XPath 定位参考元素
        reference_elem = selector.xpath(reference_xpath).get()
        if not reference_elem:
            raise ValueError(f"No element found at provided reference_xpath: {reference_xpath}")

        # 提取该元素的结构信息用于构建相似性规则
        reference_node_list = extract_elements(selector.xpath(reference_xpath))
        if not reference_node_list:
            raise ValueError("Failed to extract reference node from given XPath.")
        reference_node = reference_node_list[0]  # extract_elements 返回列表
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
        matched_elements = find_similar_elements(
            html_content,
            '/html/body/div[5]/div[1]/div/div[1]/div[1]'
        )
        print("\nMatched Similar Elements:")
        for el in matched_elements:
            print(el)
    except Exception as e:
        print(f"[Error] {e}")