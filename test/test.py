import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from scrapy import Selector
from typing import List, Dict, Any
from lib.tree_diagram.tree_node import Node
from lib.similar_elements.analysis_elements import build_nodes

# 将连续相同元素合并，并添加 "+" 表示一个或多个
def merge_elements(lst):
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
def analyze_path(path):
    """
        数字:1,2,3,4,5,6,7,8,9
        字母:a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z (是否考虑大小写)
        特殊字符:_,-,+,*,#,$,%,&,@,!,?,(,),[,],{,},',",;,:,<,>,.(要考虑常见元素)
    """
    path_list = list()
    for char in path:
        if char.isdigit():
            path_list.append("\d")
        elif char.isalpha():
            path_list.append("\w")
        else:
            path_list.append(char)

    return path_list


    pass



# 测试数据
paths = [
    "/186/list.htm",
    "/208/list.htm",
    "/187/list.htm",
    "/jxky/list.htm",
    "/188/list.htm",
    "/187/list.htm",
    "/xmt/list.htm",
    "/188/list.htm",
    "/wzjt/list.htm",
    "/210/list.htm",
    "/wzsj/list.htm"
]
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
    print(f"{indent}└── [{node.level}] {node.table_name} path_weight: {node.path_weight} (ID: {node.id}, Level: {node.level}, LevelIndex: {node.level_index}) | Attrs: {node.attribute}")
print("="*50)

select_element_list= list()
a_nodes = [node for node in all_nodes if node.table_name == 'a']
for node in a_nodes:
    print(f"Node ID: {node.id}, Attributes: {node.attribute}, Path Weight: {node.path_weight}")
    # print(node.attribute.get('href'))
    a_href = node.attribute.get('href')
    url_result_dict = dict()
    if '?' in a_href:
        url_info = a_href.split('?')
    else:
        url_info = [a_href]

    url_path_list = url_info[0].split('/')
    url_result_dict['success'] = 0
    url_result_dict['url'] = a_href
    if len(url_info) > 1:
        url_result_dict['query_type'] = True
        url_result_dict['query'] = url_info[-1]
    else:
        url_result_dict['query_type'] = False
        url_result_dict['query'] = ''
    url_result_dict['url_path'] = list()
    for index in range(len(url_path_list[1:])):
        url_result_dict['url_path'].append(
            {
                'path': url_path_list[index+1],
                'path_index': index+1,
                'path_template':merge_elements(analyze_path(url_path_list[index+1])),
                'diversity':[],
                'diversity_path': []

            }
        )
    select_element_list.append(url_result_dict)
        


url_result_list = list()
for item in paths:
    url_result_dict = dict()
    if '?' in item:
        url_info = item.split('?')
    else:
        url_info = [item]

    url_path_list = url_info[0].split('/')
    
    url_result_dict['url'] = item
    if len(url_info) > 1:
        url_result_dict['query_type'] = True
        url_result_dict['query'] = url_info[-1]
    else:
        url_result_dict['query_type'] = False
        url_result_dict['query'] = ''
    url_result_dict['url_path'] = list()
    for index in range(len(url_path_list[1:])):
        url_result_dict['url_path'].append(
            {
                'path': url_path_list[index+1],
                'path_index': index+1,
                'path_template':merge_elements(analyze_path(url_path_list[index+1])),

            }
        )
    url_result_list.append(url_result_dict)
result = list()
for item in select_element_list:
    select_element_url_path = item.get('url_path')
    for jtem in url_result_list:
        similar_elements_url_path = jtem.get('url_path')
        for select_element_path in select_element_url_path:
            if select_element_path.get('path_template') == similar_elements_url_path[select_element_path.get('path_index')-1].get('path_template'):
                
                pass
            else:
                # 记录差异点
                select_element_path['diversity'].append(similar_elements_url_path[select_element_path.get('path_index')-1].get('path_template'))
                select_element_path['diversity_path'].append(similar_elements_url_path[select_element_path.get('path_index')-1].get('path'))
                pass

"""
{
    'url': '/186/list.htm', 
    'query_type': False, 
    'query': '', 
    'url_path': 
        [
            {'path': '186', 'path_index': 1, 'path_template': ['num', 'num', 'num']},
            {'path': 'list.htm', 'path_index': 2, 'path_template': ['char', 'char', 'char', 'char', 'special_char', 'char', 'char', 'char']}
        ]
}
"""
"""
//a[contains(@href, '{}')]
"""
print(select_element_list)
xpath_result = list()
for example in select_element_list:
    # //a[contains(@href, '{}')]
    template_str = "//a[{}]"
    path_list = list()
    for path in example['url_path']:
        if path.get('diversity',[]) and path.get('diversity_path',[]):
            # path_list.append('diversity')
            continue
        else:
            path_list.append(path.get('path'))

    parameter = 'or'.join([f"contains(@href, '{item}')" for item in path_list])
    xpath_str = template_str.format(parameter)
    xpath_result.append(xpath_str)
# 验证程序 
with open('/Users/yan/Desktop/Chrome-python/html/test.html', 'r', encoding='utf-8') as f:
    html_str = f.read()

html = Selector(text = html_str)

for xpath_str in xpath_result:
    print(xpath_str)
    result = html.xpath(xpath_str).extract()
    for item in result:
        print(item)