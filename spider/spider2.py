import datetime
import re
import sys
import os
import uuid
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from lib.analysis_xhr.test import analysis_xhr
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
axhr = analysis_xhr()
# with sync_playwright() as playwright:
#     # 获取源码 
#     original_data,xhr_list = bp.run(playwright=playwright, browser_id_object=bp.browser_id_object_list[0], url='https://www.yjhlnews.cn/index')

def count_digits(s):
    return len(re.findall('\.\d{1,2}\.', s))

# 选中文章用来生成 json_path
analysis_content = {
        "title":'伊金霍洛旗融媒体中心外购节目询价函',
        "url":'https://www.yjhlnews.cn/posts/46139'
    }

# 推理json_path是否正确的数据
new_content = [
    {"title":"伊金霍洛旗融媒体中心外购节目询价函","url":"https://www.yjhlnews.cn/posts/46139"},
    {"title":"UPS铅酸电池询价函","url":"https://www.yjhlnews.cn/posts/46138"},
    {"title":"人民网评：禁止违规吃喝，不是吃喝都违规","url":"https://www.yjhlnews.cn/posts/46137"},
    {"title":"如何预防骑行伤害？来了解正确骑行姿势→","url":"https://www.yjhlnews.cn/posts/46136"},
    {"title":"天气晴好！2025年全国公路自行车锦标赛气象专报→","url":"https://www.yjhlnews.cn/posts/46135"},
]


with open('/Users/yan/Desktop/Chrome-python/spider/xhr_list.text','r',encoding='utf-8') as f:
    xhr_list = f.readlines()


title = analysis_content.get('title')
url = analysis_content.get('url')
for item in xhr_list:
    item = json.loads(item[:-1])
    code = "item.get('body')"
    json_path_list = axhr.recursive_traverse(item.get('body'),title)
    if json_path_list:
        sorted_strings = sorted(json_path_list, key=count_digits, reverse=True)
        while True:
            json_path = sorted_strings.pop(0)
            if bool(re.search('\.\d+\.', json_path)):
                break
            else:
                json_path = False
        if json_path:
            for index in range(len(re.findall('\.\d+\.',json_path))):
                # 0,1,2 对应 json路径里面那个数字进行遍历
                title_key_path = list()
                title_json_pah_list = json_path.split('.')
                num_index = 0
                for i,key in enumerate(title_json_pah_list):
                    if key.isdigit() and num_index == index:
                        title_key_path = title_json_pah_list[i+1:]
                        break
                    else:
                        code += f"['{key}']"
                score = 0
                for data_line in eval(code):
                    new_countent_title = eval('data_line'+''.join([f'.get("{key}")' for key in title_key_path]))
                    if new_countent_title in [content.get('title') for content in new_content]:
                        print(new_countent_title)
                        score += 1
                if score == len(new_content):
                    # print(item,code.replace("item.get('body')",""),title_key_path)
                    url_info = urlparse(url)
                    url_path = [item for item in  url_info.path.split('/') if item]
                    article_url = f"{url_info.scheme}://{url_info.netloc}"
                    for path in url_path:
                        # 'item.get("body")' + ''.join([f'[{jsonpath}]' if jsonpath.isdigit() else f'["{jsonpath}"]' for jsonpath in title_json_pah_list[:i+1]])
                        path_json = axhr.recursive_traverse(eval('item.get("body")' + ''.join([f'[{jsonpath}]' if jsonpath.isdigit() else f'["{jsonpath}"]' for jsonpath in title_json_pah_list[:i+1]])),int(path) if path.isdigit() else path)
                        if path_json:
                            path_json = sorted(path_json, key=len, reverse=False)
                            article_url += '/'+''.join(['{'+f'item[{jsonpath}]'+'}' if jsonpath.isdigit() else '{'+f'item["{jsonpath}"]'+'}' for jsonpath in path_json[0].split(".")])
                        else:
                            article_url += f"/{path}"
                    print(code.replace("item.get('body')",""),title_key_path,article_url)

                else:
                    num_index += 1





