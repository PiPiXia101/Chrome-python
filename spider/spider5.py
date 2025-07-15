import datetime
import re
import sys
import os
import uuid
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from lib.analysis_xhr.article_xhr import analysis_xhr
from lib.analysis_Xpath.plate_xpath import *
from lib.models.clean_data import html_parse
from lib.models.model_usage import *
from lib.plate_extract.palte import plate_extraction_rules
import hashlib
import json
import time
from urllib.parse import urljoin
import redis
from playwright.async_api import async_playwright, Playwright
from playwright.sync_api import sync_playwright
from scrapy import Selector

from lib.rander_Bt.rander import BitPlaywright


# bp = BitPlaywright()
# axhr = analysis_xhr()
# with sync_playwright() as playwright:
#     # 获取源码 
#     result = bp.run(playwright=playwright, browser_id_object=bp.browser_id_object_list[0], url='https://www.yjhlnews.cn/posts/46406')
#     if result:
#         original_data,xhr_list,html_info = result
#         with open('/Users/yan/Desktop/Chrome-python/spider/article_xhr_list.text','a',encoding='utf-8') as f:
#             for i in xhr_list:
#                 f.write(json.dumps(i)+'\n')

#     else:
#         # 处理返回为空的情况
#         original_data, xhr_list = '', []

# def count_digits(s):
#     return len(re.findall('\.\d{1,2}\.', s))


title = '伊金霍洛旗融媒体中心询价函'
published = '伊金霍洛新闻网 2025-07-07 08:45:00'
content = """根据伊金霍洛旗融媒体中心内控制度的相关规定，现将采购伊金霍洛旗广播电视发射台停车场护坡及围墙建设项目，对3家公司进行询价采购。请符合经营范围的公司在伊金霍洛新闻网看到此询价函后，下载此函电子版于2025年7月13日17:30前将盖章签字后的询价函和附件以PDF格式的电子版传到指定邮箱yqrmtzxztb@sina.com，公司名称请自行填写完整。此报价为最终报价，报价最低者为首选合作方,该询价采购须有3家及以上公司在规定时间内完整准确报回指定邮箱方可有效。该项目预算资金40000元整。

 

附件：询价采购项目报价表

 

 

伊金霍洛旗融媒体中心

2025年7月7日

 

附件：伊金霍洛旗广播电视发射台停车场护坡及围墙建设项目报价表"""
with open('/Users/yan/Desktop/Chrome-python/spider/article_xhr_list.text','r',encoding='utf-8') as f:
    xhr_list = f.readlines()

test = analysis_xhr()
result = test.find_matching_json_path(xhr_list, title, published, content)

print(result)
