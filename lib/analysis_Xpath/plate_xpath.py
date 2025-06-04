import sys
import os
from typing import List, Dict, Any
from urllib.parse import urljoin, urlparse

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from scrapy import Selector
from tree_diagram.tree_node import Node
from similar_elements.analysis_elements import build_nodes


def merge_elements(lst: List[str]) -> str:
    """
    将连续相同的字符合并为 "char+" 的形式表示一个或多个。
    """
    result = []
    i = 0
    while i < len(lst):
        j = i + 1
        while j < len(lst) and lst[j] == lst[i]:
            j += 1
        if j - i > 1:
            result.append(f"{lst[i]}+")
        else:
            result.append(lst[i])
        i = j
    return ''.join(result)


def generate_path_template(path: str) -> str:
    """
    将路径中的字符转换为通用模板表示。
    数字 -> \d, 字母 -> \w, 其他保留原字符。
    """
    template = []
    for char in path:
        if char.isdigit():
            template.append("\\d")
        elif char.isalpha():
            template.append("\\w")
        else:
            template.append(char)
    return merge_elements(template)


def parse_url(url: str) -> Dict[str, Any]:
    """
    解析 URL，返回结构化信息，包括路径模板、查询参数等。
    """
    result = {
        "url": url,
        "query_type": False,
        "query": "",
        "url_path": []
    }

    if '?' in url:
        parts = url.split('?', 1)
        result["url"] = parts[0]
        result["query_type"] = True
        result["query"] = parts[1]

    path_parts = result["url"].strip('/').split('/')
    for idx, part in enumerate(path_parts):
        result["url_path"].append({
            "path": part,
            "path_index": idx + 1,
            "path_template": generate_path_template(part),
            "diversity": [],
            "diversity_path": []
        })

    return result


def load_html_file(file_path: str) -> Selector:
    """
    加载 HTML 文件并返回 Selector 对象。
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            html_str = f.read()
        return Selector(text=html_str)
    except Exception as e:
        print(f"Error loading HTML file: {e}")
        return Selector(text="")

def analyze_html_and_generate_xpaths(html_content: str, test_paths: List[str],web_url: str) -> Dict[str, Any]:
    """
    分析给定的 HTML 内容，提取链接路径并生成对应的 XPath 表达式。
    
    Args:
        html_content (str): 要分析的 HTML 字符串内容。
        test_paths (List[str]): 测试用的 URL 路径列表，用于比较差异。
        
    Returns:
        Dict[str, Any]: 包含以下字段：
            - xpaths: 生成的 XPath 表达式列表
            - matches: 每个表达式在 HTML 中匹配的内容
            - select_elements: 解析出的锚点元素信息
    """
    web_url_info = urlparse(web_url)
    test_paths = list(set(test_paths))
    new_test_paths = list()
    for item in test_paths: 
        if web_url == item:
            continue
        if item.startswith('.'):
            url = urljoin(web_url, item)
        else:
            url = item
        if web_url_info.netloc not in url:
            continue 
        
        new_test_paths.append(url)
    test_paths = new_test_paths
    result = {
        "xpaths": [],
        "matches": {},
        "select_elements": []
    }

    html = Selector(text=html_content)
    root_nodes = html.xpath('//body')
    all_nodes = []
    for idx, root in enumerate(root_nodes):
        all_nodes.extend(build_nodes(root, level=0, level_index=idx))

    # 构建 select_element_list
    a_nodes = [node for node in all_nodes if node.table_name == 'a']
    select_element_list = []
    for node in a_nodes:
        href = node.attribute.get('href', '')
        href = urljoin(web_url, href)
        parsed = parse_url(href)
        parsed['success'] = 0
        select_element_list.append(parsed)

    result["select_elements"] = select_element_list

    # 构建 url_result_list
    url_result_list = [parse_url(path) for path in test_paths]

    # 分析差异点
    for item in select_element_list:
        select_url_path = item.get("url_path", [])
        for jtem in url_result_list:
            similar_url_path = jtem.get("url_path", [])
            min_len = min(len(select_url_path), len(similar_url_path))
            for i in range(min_len):
                select_path = select_url_path[i]
                similar_path = similar_url_path[i]
                if select_path["path_template"] != similar_path["path_template"]:
                    select_path["diversity"].append(similar_path["path_template"])
                    select_path["diversity_path"].append(similar_path["path"])
    with open("./test.json", 'w', encoding='utf-8') as f:
        f.write(str(select_element_list).replace("'", '"'))
    # 构造 XPath 表达式
    xpath_result = set()
    for example in select_element_list:
        path_list = [path.get("path") for path in example["url_path"] if not path.get("diversity")]
        if not path_list:
            continue         
        parameter = " or ".join([f"contains(@href, '{item}')" for item in path_list if (item) and (not item.startswith('http')) and (not web_url_info.netloc == item)])
        xpath_str = f"//a[{parameter}]"
        xpath_result.add(xpath_str)

    result["xpaths"] = list(xpath_result)


    return result

# 分析差异点

def merge_adjacent_elements(lst):
    """
    合并列表中相邻的相同元素。
    
    遍历列表，当发现相邻元素相同时，将它们合并为一个元素。
    这个过程会修改原始列表并返回合并后的列表。
    
    参数:
    lst: 要处理的列表，包含可能被合并的元素。
    
    返回:
    返回合并相邻元素后的列表。
    """
    # 初始化索引i，用于遍历列表
    i = 0
    # 当索引i小于列表长度减1时，执行循环
    while i < len(lst) - 1:
        # 如果当前元素与下一个元素相同
        if lst[i] == lst[i + 1]:
            # 合并相邻相同的元素
            lst[i:i + 2] = [lst[i]]
        else:
            # 如果当前元素与下一个元素不同，移动到下一个元素
            i += 1
    # 返回合并后的列表
    return lst

def merge_consecutive_digits(differences):
    """
    合并连续的数字对。

    遍历给定的数字对列表，如果发现连续的数字对，将它们合并成一个数字对，
    其中第二个元素用 '/' 符号连接。

    参数:
    differences -- 一个包含数字对的列表，每个元素是一个形如 (索引, 值, 其他信息) 的元组。

    返回:
    一个合并了连续数字对的新列表。
    """
    merged = []  # 初始化合并后的数字对列表
    i = 0  # 初始化索引变量
    # 遍历输入的数字对列表
    while i < len(differences):
        current_idx, current_val, _ = differences[i]  # 解构当前数字对

        # 检查下一个元素是否是当前索引 +1
        if i + 1 < len(differences) and differences[i + 1][0] == current_idx + 1:
            next_val = differences[i + 1][1]  # 获取下一个数字对的值
            # 合并当前和下一个数字对，并使用 '/' 拼接它们的值
            merged.append((current_idx, f"{current_val}/{next_val}"))
            i += 2  # 跳过已合并的两个元素
        else:
            # 如果下一个元素不是连续的，直接添加当前数字对到合并列表
            merged.append((current_idx, current_val))
            i += 1  # 移动到下一个元素

    return merged  # 返回合并后的数字对列表

def find_differences(list1, list2):
    """
    发现并返回两个列表在相同位置上的差异。
    
    参数:
    list1: 第一个列表，可以包含任意类型的元素。
    list2: 第二个列表，可以包含任意类型的元素。
    
    返回:
    一个包含差异的列表，每个差异由一个元组表示，元组中包含差异的位置和对应的值。
    如果两个列表的长度不一致，超出部分将被视为差异。
    """
    # 确保两个列表长度一致
    min_len = min(len(list1), len(list2))
    differences = []

    # 遍历两个列表的元素，找出不同之处
    for i in range(min_len):
        # 如果在相同位置上的元素不同，则记录下位置和元素值
        if list1[i] != list2[i]:
            differences.append((i, list1[i], list2[i]))  # 返回下标和不同的值

    # 如果其中一个列表更长，标记超出部分为差异
    for i in range(min_len, len(list1)):
        differences.append((i, list1[i], None))  # list1 更长的部分
    for i in range(min_len, len(list2)):
        differences.append((i, None, list2[i]))  # list2 更长的部分

    return differences

def generate_xpath_exclusion_pattern(right_url, error_url):
    """
    生成XPath排除模式。该函数通过比较正确URL和错误URL的路径模板，找出它们的差异，并基于这些差异生成一个XPath表达式，
    用于过滤掉错误的URL路径。

    参数:
    right_url (str): 正确的URL路径。
    error_url (str): 错误的URL路径。

    返回:
    str: 生成的XPath排除模式字符串，如果生成失败则返回False。
    """

    # 定义一个内部函数，用于提取URL中的路径模板。
    def extract_path_templates(url):
        # 解析URL并提取路径模板，返回路径模板列表。
        return [item.get('path_template', '') for item in parse_url(url).get('url_path', [])]

    try:
        # 提取错误URL和正确URL的路径模板。
        error_path_parts = extract_path_templates(error_url)
        right_path_parts = extract_path_templates(right_url)

        # 合并相邻的路径部分。
        error_list = merge_adjacent_elements(error_path_parts)
        right_list = merge_adjacent_elements(right_path_parts)

        # 找出错误路径和正确路径的差异。
        differences = find_differences(error_list, right_list)
        # 过滤掉差异中的正则表达式部分。
        differences = [item for item in differences if item[1] != r'\w+']

        # 如果差异不足以生成有效的过滤模式，则返回False。
        if len(differences) < 2:
            return False

        # 合并连续的数字差异，并对差异项进行转义处理。
        merged_result = merge_consecutive_digits(differences)
        escaped_items = [(idx, val) for idx, val in merged_result]

        # 生成XPath的排除模式字符串。
        pattern_template = ' or '.join([f"not(re:test(@href, '{val}', 'g'))" for _, val in escaped_items])
        # 打印生成的模式模板。
        print(pattern_template)
        # 返回最终的XPath排除模式。
        return f"[{pattern_template}]"

    except Exception as e:
        # 可根据实际需求细化异常类型
        print(f"发生异常: {e}")
        # 如果发生异常，则返回False。
        return False


# if __name__ == "__main__":
#     web_url = "http://www.shuicheng.gov.cn/"
#     web_url_info = urlparse(web_url)
#     # 选中的元素
#     # 示例用法
#     test_node = """<li class="active"><a target="_blank" href="./newsite/zwdt/szyw/">时政要闻</a></li>"""
#     # 相似元素的a标签的href
#     test_paths = [
#         "http://www.shuicheng.gov.cn/",
#     "http://www.shuicheng.gov.cn/newsite/zwdt/szyw/",
#     "http://www.shuicheng.gov.cn/newsite/zwdt/zwyw/",
#     "http://www.shuicheng.gov.cn/newsite/zwdt/xzdt/",
#     "http://www.shuicheng.gov.cn/newsite/zwdt/bmdt/",
#     "http://www.shuicheng.gov.cn/newsite/zwdt/tzgg/",
#     "http://www.gov.cn/pushinfo/v150203/",
#     "http://www.guizhou.gov.cn/zwgk/zcfg/szfwj/szfl/",
#     "http://www.gzlps.gov.cn/ywdt/jrld/",
#     "http://www.shuicheng.gov.cn/newsite/zwgk/zfxxgk_1/",
#     "http://www.shuicheng.gov.cn/newsite/zwgk/ldzc/",
#     "http://www.shuicheng.gov.cn/newsite/zwgk/zcbm/",
#     "http://61.243.10.146:9090/",
#     "http://www.shuicheng.gov.cn/newsite/zwgk/jyta/",
#     "http://www.shuicheng.gov.cn/newsite/zwgk/scxhmzcmbk/",
#     "http://www.shuicheng.gov.cn/newsite/zwgk/cwhy/",
#     "http://www.shuicheng.gov.cn/newsite/zwgk/zdly/",
#     "http://www.shuicheng.gov.cn/newsite/zwgk/zdjc/",
#     "http://www.shuicheng.gov.cn/newsite/zwgk/ggqsy/",
#     "http://www.shuicheng.gov.cn/newsite/zwgk/yshj/",
#     "http://www.shuicheng.gov.cn/newsite/zwgk/ysqgk/",
#     "http://www.shuicheng.gov.cn/newsite/zwgk/gzhgfxwjsjk/",
#     "http://www.shuicheng.gov.cn/newsite/zwgk/zfgzbg/",
#     "http://www.shuicheng.gov.cn/newsite/zwgk/zwgkpt/",
#     "http://www.shuicheng.gov.cn/newsite/jdhy/zcjd/",
#     "http://www.shuicheng.gov.cn/newsite/jdhy/hygq/",
#     "http://www.shuicheng.gov.cn/newsite/jdhy/xwfbh/",
#     "http://www.shuicheng.gov.cn/newsite/bsfw/",
#     "http://www.shuicheng.gov.cn/newsite/gzcy/qzxx/",
#     "http://www.shuicheng.gov.cn/newsite/gzcy/myzj/",
#     "http://www.shuicheng.gov.cn/newsite/gzcy/zxft/",
#     "http://www.shuicheng.gov.cn/newsite/gzcy/zmhdzsk/",
#     "http://www.shuicheng.gov.cn/newsite/gzcy/xmtjz/",
#     "http://www.shuicheng.gov.cn/newsite/zfsj/",
#     "http://www.shuicheng.gov.cn/newsite/zwgk/yshj/",
#     "http://www.shuicheng.gov.cn/newsite/stsc/",
#     "http://www.shuicheng.gov.cn/newsite/zwdt/tzgg/202106/t20210623_68770241.html",
#     "https://www.gzscjjkfq.cn/index.php?c=category&id=12",
#     "http://www.shuicheng.gov.cn/newsite/zwdt/tzgg/202505/t20250527_87929820.html",
#     "./newsite/zwdt/szyw/",
#     "./newsite/zwdt/zwyw/",
#     "./newsite/zwdt/bmdt/",
#     "./newsite/zwdt/xzdt/",
#     "./newsite/zwgk/zfxxgk_1/zfxxgkzn/",
#     "./newsite/zwgk/zfxxgk_1/zfxxgkzd/",
#     "./newsite/zwgk/zfxxgk_1/fdzdgknr/",
#     "./newsite/zwgk/zfxxgk_1/zfxxgknb/",
#     "./newsite/zwgk/ysqgk/",
#     "./newsite/zwgk/gzhgfxwjsjk/",
#     "./newsite/zwgk/zfxxgk_1/fdzdgknr/zcwj_5827454/zfwj/",
#     "./newsite/zwgk/cwhy/",
#     "./newsite/zwgk/zdly/jycy/zpxx/",
#     "./newsite/gzcy/qzxx/",
#     "./newsite/gzcy/zxft/",
#     "./newsite/gzcy/myzj/",
#     ]
#     # 测试数据
#     with open('/Users/yan/Desktop/Chrome-python/html/test copy.html', 'r', encoding='utf-8') as f:
#         html_str = f.read()
#     html = Selector(text=html_str)

#     result = analyze_html_and_generate_xpaths(test_node, test_paths,web_url)

#     print("XPath Expressions:")
#     for xpath in result["xpaths"]:
#         print(xpath)

error_url= 'http://www.shuicheng.gov.cn/newsite/zwgk/zfxxgk_1/fdzdgknr/qtfdxx/'
right_url = 'http://www.shuicheng.gov.cn/newsite/gzcy/zxft/'
print(generate_xpath_exclusion_pattern(right_url,error_url))