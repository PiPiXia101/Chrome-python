import re


finally_result = dict()

with open('/Users/yan/Desktop/Chrome-python/spider/差异点rule.txt','r',encoding='utf-8') as f:
    result = f.readlines()





for item in result:
    item = item.strip()
    if item:
        url_list = re.findall('\|(.*?)\|',item)
        # 差异点[not(re:test(@href, '\w+_\d', 'g')) or not(re:test(@href, '\w+_\d+', 'g'))] 
        rule = re.findall('差异点\[(.*?)\] ',item)[0]


        print('差异的链接',url_list[-1])
        print('来源链接',url_list[0])
        print('差异规则',rule)

        if rule in finally_result:
            finally_result[rule].append(url_list[-1])
        else:
            finally_result[rule] = [url_list[-1]]
        
print(finally_result)