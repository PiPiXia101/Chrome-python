import sys
import os
from typing import List, Dict, Any
from urllib.parse import urljoin, urlparse, parse_qsl

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
    - 数字 -> \d
    - 非 html 文件名中的字母 -> \w
    - html 文件名中的字母和后缀 -> 保留原样
    - 其他字符保留原字符。
    """
    # 判断是否是 .html 结尾的文件
    is_html_file = path.endswith('.html') or path.endswith('.htm') or path.endswith('.shtml')
    template = []
    i = 0
    while i < len(path):
        # 检查当前位置是否处于 ".html" 或 ".htm" 中
        if is_html_file and i >= len(path) - (5 if path.endswith('.html') else 4):
            # 如果是 ".html" 或 ".htm" 后缀，保留原始字符
            template.append(path[i])
            i += 1
        else:
            char = path[i]
            if char.isdigit():
                template.append("\\d")
            elif char.isalpha():
                template.append("[a-zA-Z]")
            else:
                template.append(char)
            i += 1

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
        result["query"] = dict(parse_qsl(parts[1],True))
        
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
        if not item:
            continue
        if web_url == item:
            continue
        if item.startswith('.'):
            url = urljoin(web_url, item)
        elif item.startswith('http'):
            url = item
        else:
            url = urljoin(web_url, item)
        if web_url_info.netloc not in url:
            continue 
        
        new_test_paths.append(url)
    test_paths = new_test_paths
    # 构建相似元素链接的正则表达式
    url_result_list = [parse_url(path) for path in test_paths]

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
    # 构建选择元素里面A标签链接的正则表达式
    a_nodes = [node for node in all_nodes if node.table_name == 'a'] or [node for node in all_nodes if 'href' in node.attribute]
    select_element_list = []
    for node in a_nodes:
        href = node.attribute.get('href', '')
        href = urljoin(web_url, href)
        parsed = parse_url(href)
        parsed['success'] = 0
        select_element_list.append(parsed)
    result["select_elements"] = select_element_list
    # 分析相同、差异点
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
    # 根据相同点构造 XPath 表达式
    xpath_result = set()
    for example in select_element_list:
        path_list = [path.get("path") for path in example["url_path"] if not path.get("diversity")]
        if not path_list:
            continue     
        parameter_list = [item for item in path_list if (item) and (not item.startswith('http')) and (not web_url_info.netloc == item) and (item != path_list[-1])]
        if parameter_list:
            parameter = " or ".join([f"contains(@href, '{item}')" for item in parameter_list])
            xpath_str = f"//a[{parameter}]"
            xpath_result.add(xpath_str)
        else:
            # [not(re:test(@href, '\w+_\d', 'g')) or not(re:test(@href, '\w+_\d+\w', 'g'))]
            parameter_list = [path.get('path_template') for path in example["url_path"] if not path.get("diversity") and path.get('path') and (not path.get('path').startswith('http')) and (not web_url_info.netloc == path.get('path'))]
            # "//a[re:test(@href, '{path}', 'g') or ]"
            parameter = " or ".join([f"re:test(@href, '{path}', 'g')" for path in parameter_list])
            xpath_str = f"//*[{parameter}]"
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
        url_info = parse_url(url)
        # 解析URL并提取路径模板，返回路径模板列表。
        return [item.get('path_template', '') for item in url_info.get('url_path', [])], url_info.get('query')

    try:
        # 提取错误URL和正确URL的路径模板。
        error_path_parts,error_query = extract_path_templates(error_url)
        right_path_parts,right_query = extract_path_templates(right_url)

        # 合并相邻的路径部分。
        error_list = merge_adjacent_elements(error_path_parts)
        right_list = merge_adjacent_elements(right_path_parts)
        # 找出错误路径和正确路径的差异。
        differences = find_differences(error_list, right_list)

        # 过滤掉差异中的正则表达式部分。
        differences = [item for item in differences if item[1] != r'[a-zA-Z]+']

        # 合并连续的数字差异，并对差异项进行转义处理。
        merged_result = merge_consecutive_digits(differences)
        escaped_items = [(idx, val) for idx, val in merged_result]

        if error_query:
            for key in error_query.keys():
                if key not in right_query and len(key) > 1:
                    escaped_items.append((0,key))

        # 生成XPath的排除模式字符串。
        pattern_template = ' and '.join([f"not(re:test(@href, '{val}', 'g'))" for _, val in escaped_items])
        # 打印生成的模式模板。
        # print(pattern_template)
        # 返回最终的XPath排除模式。
        return f"[{pattern_template}]" if pattern_template else False

    except Exception as e:
        # 可根据实际需求细化异常类型
        print(f"发生异常: {e}")
        # 如果发生异常，则返回False。
        return False


# if __name__ == "__main__":
#     web_url = "https://syuzsjy.syu.edu.cn/"
#     web_url_info = urlparse(web_url)
#     # 选中的元素
#     # 示例用法
#     test_node = """<li class="navItem"><a href="channel.html?recid=4">政经</a></li>"""
#     # 相似元素的a标签的href
#     test_paths = [
#         "index.html?recid=1",
#         "channel.html?recid=4",
#         "channel.html?recid=2",
#         "channel.html?recid=5",
#         "channel.html?recid=40",
#         "channel.html?recid=50",
#         "channel.html?recid=19",
#         "channel.html?recid=34",
#         "channel.html?recid=49",
#         "channel.html?recid=44",
#         "channel.html?recid=43",
#         "channel.html?recid=42",
#         "channel.html?recid=47",
#         "currentNews.html?recid=7",
#         "channel.html?recid=38",
#         "channel.html?recid=29",
#         "channel.html?recid=33",
#         "channel.html?recid=37",
#         "channel.html?recid=36",
#         "channel.html?recid=18",
#         "channel.html?recid=6",
#         "channel.html?recid=20",
#         "channel.html?recid=32",
#         "channel.html?recid=35",
#         "channel.html?recid=30",
#         "subject.html?recid=25",
#         "channel.html?recid=39",
#         "channel.html?recid=22",
#         "channel.html?recid=46",
#         "about.html",
#     ]
#     # 测试数据
#     with open('/Users/yan/Desktop/Chrome-python/html/test.html', 'r', encoding='utf-8') as f:
#         html_str = f.read()
#     html = Selector(text=html_str)

#     result = analyze_html_and_generate_xpaths(test_node, test_paths,web_url)

#     print("XPath Expressions:")
#     for xpath in result["xpaths"]:
#         print(xpath)

# error_url= 'http://www.yulin.gov.cn/jryl/zwxx/t21170393.shtml'
# right_url = 'http://www.yulin.gov.cn/zjyl/'
# print(generate_xpath_exclusion_pattern(right_url,error_url))


# error_url= 'http://www.yulin.gov.cn/gkzl/xxgknb/2008zfxxgkgzndbg/'
# right_url = 'http://www.yulin.gov.cn/zcwj/difangxingfagui/'
# print(generate_xpath_exclusion_pattern(right_url,error_url))


error_url = 'https://www.dahecube.com/article.html?artid=239991?recid=1'
right_url= 'https://www.dahecube.com/index.html'
print(generate_xpath_exclusion_pattern(right_url,error_url))