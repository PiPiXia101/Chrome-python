from collections import defaultdict
import re

def segment_paths(paths):
    """将路径按 '/' 分割成多个段"""
    segments_list = [path.strip('/').split('/') for path in paths]
    return segments_list

def analyze_segments_with_fixed_parts(segments_list):
    """分析每层segment，找出固定值或构建正则模式"""
    max_depth = max(len(segs) for segs in segments_list)
    common_patterns = []

    for i in range(max_depth):
        current_layer = [segs[i] for segs in segments_list if len(segs) > i]

        # 如果该层级所有值都相同，则作为固定字段保留
        if len(set(current_layer)) == 1:
            common_patterns.append(re.escape(current_layer[0]))  # 转义特殊字符
        else:
            # 否则分析该层共同模式
            if all(s.isdigit() for s in current_layer):
                pattern = r'\d+'
            elif all(s.isalpha() for s in current_layer):
                pattern = r'[a-zA-Z]+'
            elif all(s.isalnum() for s in current_layer):
                pattern = r'[a-zA-Z0-9]+'
            else:
                pattern = r'[^/]+'

            common_patterns.append(f'({pattern})')

    return common_patterns

def build_regex_with_fixed_parts(common_patterns):
    """拼接为完整正则表达式"""
    regex_str = '^/'
    regex_str += '/'.join(common_patterns)
    regex_str += '/?$'  # 可选结尾斜杠
    return regex_str

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

# 步骤1: 分割路径
segments_list = segment_paths(paths)

# 步骤2: 分析并识别固定字段与动态字段
common_patterns = analyze_segments_with_fixed_parts(segments_list)

# 步骤3: 构建正则表达式
regex_pattern = build_regex_with_fixed_parts(common_patterns)

print("最终生成的正则表达式：")
print(regex_pattern)