import re
from urllib.parse import urljoin, urlparse
from scrapy import Selector


import math

def is_power_of_ten(n):
    if n <= 0:
        return False
    log_val = math.log10(n)
    return log_val == int(log_val)

def merge_consecutive_indices(data):
    if not data:
        return []

    # 按照 index 排序
    sorted_data = sorted(data, key=lambda x: x['index'])
    merged_groups = []
    current_group = [sorted_data[0]]

    for i in range(1, len(sorted_data)):
        prev_index = current_group[-1]['index']
        curr_index = sorted_data[i]['index']

        if curr_index == prev_index + 1:
            # 连续索引，加入当前组
            current_group.append(sorted_data[i])
        else:
            # 不连续，开始新组
            merged_groups.append(current_group)
            current_group = [sorted_data[i]]

    # 添加最后一组
    merged_groups.append(current_group)

    # 构建结果，提取每个组的 next_url_path
    result = [
        {'indices': [item['index'] for item in group], 
         'next_url_paths': [item['next_url_path'] for item in group]}
        for group in merged_groups
    ]

    return result



class NextLink:

    def for_to_html(self, next_pahr_html, url):
        """
        根据当前页面和URL生成下一页的URL。
        
        参数:
        - next_pahr_html: 下一页的HTML内容。
        - url: 当前页面的URL。
        
        返回:
        - 下一页的完整URL。
        """
    
        # 解析HTML内容
        html = Selector(text=next_pahr_html)
        # 获取下一页的URL
        next_url = html.xpath("//a/@href").get()
        # 获取下一页URL的数字部分并去除空格
        next_url_num = html.xpath("//a/text()").get().strip()
        # 将相对URL转换为绝对URL
        next_url = urljoin(url, next_url)
    
        # 当前板块链接  url
        # 下一页板块链接 next_link
        # 解析当前URL和下一页URL
        url_info = urlparse(url)
        next_url_info = urlparse(next_url)
        # 提取URL路径并去除空元素
        url_info_path = [item for item in url_info.path.split('/') if item]
        next_url_info_path = [item for item in next_url_info.path.split('/') if item]
        # 初始化列表以存储路径不同点和额外路径
        difference_path = list()  # 下标一样,但是值不一样
        extra_path_list = list()  # 多出来的部分
        # 确保本次选择的页面是几位数字
        if is_power_of_ten(int(next_url_num)):
            num_length = [str(len(next_url_num) - 1), str(len(next_url_num))]
        else:
            num_length = [str(len(next_url_num)), ]
        next_page_num_re = f"{','.join(num_length)}"
        next_page_num_re = "\d{" + next_page_num_re + "}"
    
        # 比较当前URL和下一页URL的路径
        for i in range(len(next_url_info_path)):
            try:
                if next_url_info_path[i] == url_info_path[i]:
                    continue
                else:
                    difference_path.append({
                        'index': i,
                        'url_path': url_info_path[i],
                        'next_url_path': next_url_info_path[i]
                    })
            except:
                extra_path_list.append({
                    'index': i,
                    'url_path': '',
                    'next_url_path': next_url_info_path[i]
                })
        print(extra_path_list)
        # 处理额外路径
        # [{'index': 4, 'url_path': '', 'next_url_path': 'test'},{'index': 5, 'url_path': '', 'next_url_path': 'index_2.shtml'}]
        extra_path_list = merge_consecutive_indices(extra_path_list)
        nextPage_rule_re = list()
        for extra_path in extra_path_list:
            
            step_target= '$'
            step_replace = '/'.join(extra_path['next_url_paths'])
            re_path = re.sub(next_page_num_re, "{}", step_replace)
            nextPage_rule_re.append(
                [step_target,re_path]
            )
        for difference in difference_path:
            if difference == difference_path[-1]:
                difference['next_url_path'] = re.sub(next_page_num_re, "{}", difference['next_url_path'])
            nextPage_rule_re.append(difference)
    
        # 返回下一页的完整URL
        return nextPage_rule_re

            

            



            
                
         
if __name__ == '__main__':
    nextLink = NextLink()
    next_page_url = "http://www.yulin.gov.cn/gkzl/fadingzhudonggongkaineirong/ylsbjyjsgkpt_30014/bmjs/2023n_30042/index_1.shtml"
    next_pahr_html = f"""<a href="{next_page_url}">2</a>"""
    url = 'http://www.yulin.gov.cn/gkzl/fadingzhudonggongkaineirong/ylsbjyjsgkpt_30014/bmjs/2023n_30042/'
    # url = 'http://www.yulin.gov.cn/gkzl/fadingzhudonggongkaineirong/ylsbjyjsgkpt_30014/bmjs/2023n_30042/index_{}.shtml'


    result= nextLink.for_to_html(next_pahr_html,url)
    print(url)
    print(result)