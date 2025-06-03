"""
    http://www.shuicheng.gov.cn/newsite/zwdt/tzgg/202106/t20210623_68770241.html 错误 要修改原先的xpath
    http://www.shuicheng.gov.cn/newsite/gzcy/zxft/ 正确
    得出 202106/t20210623_68770241.html差异点
    倒序分析 为啥错误

    http://www.shuicheng.gov.cn/newsite/zwgk/zfxxgk_1/zfxxgkzn/ 疑似 实际是文章,不要影响原先的xpath
    http://www.shuicheng.gov.cn/newsite/zwgk/zfxxgk_1/fdzdgknr/zcwj_5827454/zfwj/index.html 疑似 实际是板块
    http://www.shuicheng.gov.cn/newsite/zwgk/zfxxgk_1/zfxxgknb/nb_2022n/ 疑似 实际是板块,但是模型判断错误了 怎么过滤这种连不进行修改提取规则


  
"""
# 列表相近两个元素如果一样就合并

# 板块path段 以\w+为主 假如是全数字\d+ 有几大概率是文章如果,但是有一个问题 只年有可能是板块 所以要判断\d+ 是怎么组成的 


import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from urllib.parse import urlparse

from lib.analysis_Xpath.plate_xpath import parse_url


def merge_adjacent_elements(lst):
    i = 0
    while i < len(lst) - 1:
        if lst[i] == lst[i + 1]:
            lst[i:i + 2] = [lst[i]]  # 合并相邻相同的元素
        else:
            i += 1
    return lst


def merge_consecutive_digits(differences):
    merged = []
    i = 0
    while i < len(differences):
        current_idx, current_val, _ = differences[i]

        # 检查下一个元素是否是当前索引 +1
        if i + 1 < len(differences) and differences[i + 1][0] == current_idx + 1:
            next_val = differences[i + 1][1]
            merged.append((current_idx, f"{current_val}/{next_val}"))  # 使用 '/' 拼接
            i += 2  # 跳过已合并的两个元素
        else:
            merged.append((current_idx, current_val))
            i += 1

    return merged
error_url = "http://www.shuicheng.gov.cn/newsite/zwdt/tzgg/202106/t20210623_68770241.html"
error_url = "http://www.shuicheng.gov.cn/newsite/zwgk/zfxxgk_1/zfxxgknb/nb_2022n/"
error_url_info = urlparse(error_url)

right_url = "http://www.shuicheng.gov.cn/newsite/gzcy/zxft/"
right_url_info = urlparse(right_url)

# print(parse_url(error_url))
error_path_rule = []
for item in parse_url(error_url)['url_path']:
    error_path_rule.append(item.get('path_template'))

right_ppath_rule = []
for item in parse_url(right_url)['url_path']:
    right_ppath_rule.append(item.get('path_template'))

print(merge_adjacent_elements(error_path_rule))
print(merge_adjacent_elements(right_ppath_rule))


def find_differences(list1, list2):
    # 确保两个列表长度一致
    min_len = min(len(list1), len(list2))
    differences = []

    for i in range(min_len):
        if list1[i] != list2[i]:
            differences.append((i, list1[i], list2[i]))  # 返回下标和不同的值

    # 如果其中一个列表更长，标记超出部分为差异
    for i in range(min_len, len(list1)):
        differences.append((i, list1[i], None))  # list1 更长的部分
    for i in range(min_len, len(list2)):
        differences.append((i, None, list2[i]))  # list2 更长的部分

    return differences


# 示例使用
list1 = merge_adjacent_elements(error_path_rule)
list2 = merge_adjacent_elements(right_ppath_rule)

differences = find_differences(list1, list2)

# print("不同点如下：",differences)
differences = [item for item in differences if item[1] != '\\w+']
# print("不同点如下：",differences)
if len(differences) < 2:
    print('不进行修改')
else:
    print('进行修改')
    print("不同点如下：",differences)
    # //element[matches(text(), '^[A-Z][a-z]+')]
    # 执行合并
    merged_result = merge_consecutive_digits(differences)

    print("合并后结果：", merged_result)

    # //a[contains(@href, 'newsite') or contains(@href, 'zwdt')][not(re:test(@href, '\\d+/\\w\\d+_\\d+\\.\\w+', 'g'))]
    # //a[re:test(@href, '\\d+/\\w\\d+_\\d+\\.\\w+', 'g')]

    # pattern_template = "[not(re:test(@href, '{}', 'g')) ornot(re:test(@href, '{}', 'g'))]"
    # [(4, '\\d+/\\w\\d+_\\d+.\\w+')]
    pattern_template = ' or '.join([f"not(re:test(@href, '{item[1]}', 'g'))" for item in merged_result])
    print(pattern_template)

