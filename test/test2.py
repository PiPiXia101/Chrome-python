import re

a = ['\w','\w','\d','\d','\w','\w','-','\d','\d']

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

result = merge_elements(a)
print(result)