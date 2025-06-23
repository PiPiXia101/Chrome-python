import re
from urllib.parse import urljoin, urlparse
from scrapy import Selector


import math

def is_power_of_ten(n):
    if n <= 0:
        return False
    log_val = math.log10(n)
    return log_val == int(log_val)

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
        add_path = list()  # 多出来的部分
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
                add_path.append({
                    'index': i,
                    'url_path': '',
                    'next_url_path': next_url_info_path[i]
                })
        # 处理额外路径
        for item in add_path:
            if re.findall(next_page_num_re, item.get('next_url_path')):
                re_path = re.sub(next_page_num_re, "{}", item.get('next_url_path'))
                url_info_path.append(re_path)
            else:
                url_info_path.append(item.get('next_url_path'))
    
        # 更新路径中的不同点
        for item in difference_path:
            if re.findall(next_page_num_re, item.get('next_url_path')):
                re_path = re.sub(next_page_num_re, "{}", item.get('next_url_path'))
                url_info_path[item.get('index')] = re_path
            else:
                url_info_path[item.get('index')] = item.get('next_url_path')
    
        # 返回下一页的完整URL
        return f'{url_info.scheme}://{url_info.netloc}/{"/".join(url_info_path)}'

            

            



            
                
         
if __name__ == '__main__':
    nextLink = NextLink()

    next_pahr_html = """<a href="index_2.shtml">3</a>"""
    url = 'http://www.yulin.gov.cn/gkzl/fadingzhudonggongkaineirong/ylsbjyjsgkpt_30014/bmjs/2023n_30042/'
    # url = 'http://www.yulin.gov.cn/gkzl/fadingzhudonggongkaineirong/ylsbjyjsgkpt_30014/bmjs/2023n_30042/index_{}.shtml'


    result= nextLink.for_to_html(next_pahr_html,url)
    print(result)