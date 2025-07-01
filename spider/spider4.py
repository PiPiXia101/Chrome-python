import datetime
import re
import sys
import os
import uuid


sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
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

# 任务监控
def task_check(server,redis_key,url):
    timestamp = datetime.datetime.now().timestamp()
    # 记录每次请求的url的时间
    server.zadd(redis_key, {url: timestamp})

# 链接类
class Link:
    # 用于每次渲染请求
    def __init__(self,link_obj):
        self.web_url = link_obj.get('web_url')
        self.plate_url = link_obj.get('plate_url')
        self.task_id = link_obj.get('task_id')
        self.Subdomains = link_obj.get('Subdomains')
        self.selected_link = link_obj.get('selected_link')
        self.parent_url = link_obj.get('parent_url')
        self.num = link_obj.get('num')
        self.level = link_obj.get('level')
    def task(self):
        task = {
            'web_url':self.web_url ,
            'plate_url':self.plate_url,
            'parent_url':self.parent_url,
            'task_id':self.task_id,
            'selected_link':self.selected_link ,
            'Subdomains':self.Subdomains,
            'num': self.num,
            'level':self.level
        }
        return task



# 链接类别
class LinkType:

    def __init__(self,link_type,link_re):
        self.link_type = link_type
        # 链接列表
        self.link_list = list()
        # 链接得分
        self.link_score = 0 # L -1 D +1
        # 链接下标位置
        self.link_index = 0
        # 链接正则表达式
        self.link_re = link_re
        # 具体链接值
        # {"link":link, "value":D/L}
        self.link_value_list = list()

    def get_info(self):
        info = {
            'link_type': self.link_type,
            'link_list': [item.plate_url for item in self.link_list],
            'link_score': self.link_score,
            'link_index': self.link_index,
            'link_re': self.link_re,
            'link_value_list': self.link_value_list
        }
        return info



# 链接类别集合
class LinkTypeSet:
    def __init__(self):
        self.link_type_set = dict()

    def add_link(self,link_type,LinkObj,link_re):
        if link_type not in self.link_type_set:
            link = LinkType(link_type,link_re)
            link.link_list.append(LinkObj)
            self.link_type_set[link_type] = link
            
        else:
            link = self.link_type_set[link_type]
            link.link_list.append(LinkObj)

    # 加分减分
    def add_score(self,link_type,plate_result,url):
        link = self.link_type_set[link_type]
        link.link_value_list.append({"url":url, "plate_result":plate_result})
        if plate_result == "L":
            link.link_score -= 1
        else:
            link.link_score += 1

    # 需要请求的链接
    def need_request_link(self):
        request_link = []
        rule_list = []
        for link_type in self.link_type_set.keys():
            link = self.link_type_set[link_type]
            # 如果该类别的链接存在两条及以上的文章 则跳过
            if link.link_score > len(link.link_list) * 0.1:
                # 当出现错误链接时 需要更正 提取规则
                rule_list.append(link.link_re)
                continue
            try:
                if link.link_index >= len(link.link_list):
                    continue
                LinkObj = link.link_list[link.link_index]
                link.link_index += 1
                request_link.append(LinkObj)
            except:
                continue
            
            
        return request_link,rule_list
    
    # 更新提取规则
    def update_rule(self,server,rule_list,task):
        plate_rule = server.get(f"chrome:{task['Subdomains']}:default_rule")
        for rule in rule_list:
            if rule:
                plate_rule += rule
        server.set(f"chrome:{task['Subdomains']}:plate_rule",plate_rule)
        pass

    def statistics(self):
        
        info = dict()
        for key in self.link_type_set.keys():
            info[key] = self.link_type_set[key].get_info()
        return info

server = redis.StrictRedis(host='redis.wx.crawler.sinayq.cn', password='rds6306_paswd', port=6306, db=1,
                           decode_responses=True)
bp = BitPlaywright()
per = plate_extraction_rules()
right_rule = list()
link_type_set = LinkTypeSet()

# 例子1
web_url =  "http://www.shuicheng.gov.cn/"
task = {
    'web_url': web_url,
    'plate_url': web_url,
    'task_id':'',
    'selected_link':'http://www.shuicheng.gov.cn/newsite/gzcy/zxft/',
    'Subdomains':web_url.replace('https://','').replace('http://',''),
    'parent_url':web_url,
    'num':0,
    'level':3
}
plate_rule = "//a[contains(@href, 'newsite')]"

# 例子2
web_url =  "http://www.yulin.gov.cn/"
task = {
    'web_url': web_url,
    'plate_url': web_url,
    'task_id':web_url.replace('https://','').replace('http://',''),
    'selected_link':'http://www.yulin.gov.cn/zjyl/',
    'Subdomains':web_url.replace('https://','').replace('http://',''),
    'parent_url':web_url,
    'num':0,
    'level':2
}
plate_rule = "//*[re:test(@href, '[a-zA-Z]+', 'g')]"


server.lpush('chrome:plate_task',json.dumps(task))
task_plate_rule = f"chrome:{task['task_id']}:plate_rule"
server.set(f"chrome:{task['Subdomains']}:plate_rule",plate_rule)
server.set(f"chrome:{task['Subdomains']}:default_rule",plate_rule)


default_task = task
i = 0
while True:
    task = server.lpop('chrome:plate_task')
    
    if not task:
        print(f'第{i}轮抓取完成')
        request_link,rule_list = link_type_set.need_request_link()
        if not request_link:
            with open('link_type_set.json','w') as f:
                json.dump(link_type_set.statistics(),f)
            break
        if i == 5:
            with open('link_type_set_5.json','w') as f:
                json.dump(link_type_set.statistics(),f)
        if rule_list:
            print(rule_list)
            link_type_set.update_rule(server,rule_list,default_task)
        for task in request_link:
            print(f"已添加任务: {task.task().get('plate_url')}")
            server.lpush('chrome:plate_task',json.dumps(task.task()))
        i+=1
        continue
    task = json.loads(bytes.decode(task) if isinstance(task, bytes) else task)
    plate_rule = server.get(f"chrome:{task['Subdomains']}:plate_rule")
    plate_rule = bytes.decode(plate_rule) if isinstance(plate_rule, bytes) else plate_rule
    with sync_playwright() as playwright:
        # 获取源码 
        original_data,xhr_list,html_info = bp.run(playwright=playwright, browser_id_object=bp.browser_id_object_list[0], url=task['plate_url'])
    if not original_data:
        time.sleep(5)
        continue
    if task['num'] != 0:
        html_str = html_parse(original_data)
        plate_result,model_result = use_model(task['plate_url'], html_str,cs_type=True)
        logits = model_result['msg'][0]['logits']
        print(f"小模型判定结果--{task['plate_url']}--{plate_result}--{logits}")
        # 进行大模型判断
        if plate_result != 'L' and 0.5 < float(logits) < 0.8:
            try:
                plate_result,logits = use_bigModel(html_str)
                print(f"大模型判定结果--{task['plate_url']}--{plate_result}--{logits}")
            except Exception as e:
                print('大模型使用失败',e)
                pass
        # 记录分值
        server.zadd(f"chrome:{task['Subdomains']}:logits:{plate_result}",{task['plate_url']:logits})
        link_type_set.add_score(task['task_id'],plate_result,task['plate_url'])
        if plate_result != 'L':
            continue

    else:
        default_task = task
    if task['num'] > task['level']:
        continue
    html = Selector(text=original_data)
    # 是一个list数据结构
    seed = html.xpath(plate_rule)
    seed = per.prefilter(task["plate_url"],seed)
    for item in seed:
        seed_url = item.get('url')
        # 去重
        if server.sadd(f"chrome:{task['Subdomains']}:plate_url", seed_url):
            # 回去差异点
            # 修改提取规则
            # if task['num'] != 1:
            #     # 如果不是第一层板块 要用父链接做对比差异
            #     rule_result = generate_xpath_exclusion_pattern(task['parent_url'],seed_url)
            # else:
            #     # 如果是第一层板块 要用选中链接做对比差异
            rule_result = generate_xpath_exclusion_pattern(task['selected_link'],seed_url)
            if rule_result  and 'None' not in rule_result:
                task_id = hashlib.md5(rule_result.encode(encoding='UTF-8')).hexdigest()
            else:
                task_id = 'default'
            
            new_task = {
                'web_url':task['web_url'],
                'plate_url':seed_url,
                'parent_url':task['plate_url'],
                'Subdomains':task['Subdomains'],
                'task_id':task_id,
                'selected_link':task['selected_link'],
                'num': task['num'] + 1,
                'level':3
            }
            
            link_type_set.add_link(task_id,Link(new_task),rule_result)




