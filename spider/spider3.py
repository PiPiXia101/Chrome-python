import datetime
import re
import sys
import os


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

def delete_task(server,redis_key,pattern_template,task):
    patterns = re.findall("re:test\(@href, '(.*?)', 'g'\)",pattern_template)
    length= server.llen(redis_key)
    for i in range(length)[::-1]:
        task = server.lindex(redis_key, i)
        if not task:
            continue
        task = json.loads(bytes.decode(task) if isinstance(task, bytes) else task)
        for pattern in patterns:
            try:
                if re.findall(pattern, task['plate_url']):
                    server.lrem(redis_key, 0, json.dumps(task))
                    print(f"已删除下标为 {i} 的元素{task['plate_url']}")
                    server.lpush(f'chrome:{task["task_id"]}:delete_url', task['plate_url'])
                    break
            except:
                pass




server = redis.StrictRedis(host='redis.wx.crawler.sinayq.cn', password='rds6306_paswd', port=6306, db=1,
                           decode_responses=True)


# 例子1
# web_url =  "http://www.shuicheng.gov.cn/"
# task = {
#     'web_url': web_url,
#     'plate_url': web_url,
#     'task_id':web_url.replace('https://','').replace('http://',''),
#     'selected_link':'http://www.shuicheng.gov.cn/newsite/gzcy/zxft/',
#     'parent_url':web_url,
#     'num':0,
#     'level':3
# }
# plate_rule = "//a[contains(@href, 'newsite')]"

# 例子2
# web_url =  "https://syuzsjy.syu.edu.cn/"
# task = {
#     'web_url': web_url,
#     'plate_url': web_url,
#     'task_id':web_url.replace('https://','').replace('http://',''),
#     'selected_link':'https://syuzsjy.syu.edu.cn/zsxxw.htm',
#     'parent_url':web_url,
#     'num':0,
#     'level':3
# }
# plate_rule = "//*[re:test(@href, '[a-zA-Z]+.htm', 'g')]"

# 例子3
web_url =  "http://www.yulin.gov.cn/"
task = {
    'web_url': web_url,
    'plate_url': web_url,
    'task_id':web_url.replace('https://','').replace('http://',''),
    'selected_link':'http://www.yulin.gov.cn/zjyl/',
    'parent_url':web_url,
    'num':0,
    'level':3
}
plate_rule = "//*[re:test(@href, '[a-zA-Z]+', 'g')]"

server.lpush('chrome:plate_task',json.dumps(task))
# 添加任务的时候应该在任务 监控队列 里面 添加 监控任务
task_monitor = f"chrome:monitor_task"
server.lpush(task_monitor,task['task_id'])
task_plate_rule = f"chrome:{task['task_id']}:plate_rule"
server.set(task_plate_rule,plate_rule)


task_monitor_queue = f"chrome:{task['task_id']}:monitor_url"

bp = BitPlaywright()
per = plate_extraction_rules()
right_rule = list()
while True:
    task = server.lpop('chrome:plate_task')
    if not task:
        time.sleep(5)
        continue
    task = json.loads(bytes.decode(task) if isinstance(task, bytes) else task)
    plate_rule = server.get(task_plate_rule)
    plate_rule = bytes.decode(plate_rule) if isinstance(plate_rule, bytes) else plate_rule
    Subdomains = task['web_url'].replace('https://','').replace('http://','')
    with sync_playwright() as playwright:
        # 获取源码 
        original_data = bp.run(playwright=playwright, browser_id_object=bp.browser_id_object_list[0], url=task['plate_url'])
    if not original_data:
        time.sleep(5)
        continue
    if task['num'] != 0:
        try:
            # 进行小模型判断
            # 清洗数据
            html_str = html_parse(original_data)
            plate_result,model_result = use_model(task['plate_url'], html_str,cs_type=True)
            
            logits = model_result['msg'][0]['logits']
            print(f"小模型判定结果--{task['plate_url']}--{plate_result}--{logits}")
            # 进行大模型判断
            if plate_result != 'L' and 0.5 < float(logits) < 1.1:
                plate_result,logits = use_bigModel(html_str)
                print(f"大模型判定结果--{task['plate_url']}--{plate_result}--{logits}")
            # 记录分值
            server.zadd(f"chrome:{task['task_id']}:logits:{plate_result}",{task['plate_url']:logits})
            if plate_result != 'L':
                # 提取出来的链接不是板块
                # 修改提取规则
                if task['num'] != 1:
                    rule_result = generate_xpath_exclusion_pattern(task['parent_url'],task['plate_url'])
                else:
                    rule_result = generate_xpath_exclusion_pattern(task['selected_link'],task['plate_url'])
                # [not(re:test(@href, '\\d\+/\\w\\d\+_\\d\+\.\\w\+', 'g'))]
                if rule_result and 'None' not in rule_result:
                    with open('update_plate_rule.txt','a+') as f:
                        f.write(f"要修改提取规则{task['parent_url']}--{task['plate_url']}--{rule_result}\n")
                    print(f"要修改提取规则{task['parent_url']}--{task['plate_url']}--{rule_result}")
                    plate_rule += rule_result
                    server.set(task_plate_rule,plate_rule)
                    # 删除待处理的链接
                    delete_task(server,'chrome:plate_task',rule_result,task)
                    # 增加过滤链接格式
                # continue
            else:
                # 提取出来的是板块,但是需要完善提取板块规则
                # 第一步分析差异点 
                rule_result = generate_xpath_exclusion_pattern(task['selected_link'],task['plate_url'])
                if rule_result:
                    with open('差异点rule.txt','a+') as f:
                        f.write(f'差异点{rule_result} |{task["parent_url"]}| |{task["plate_url"]}|\n')
                # [not(re:test(@href, '\w+_\d', 'g')) or not(re:test(@href, '\w+_\d+\w', 'g'))]
        except:
            server.sadd(f'chrome:{Subdomains}:error_url', task['plate_url'])
    html = Selector(text=original_data)
    seed_urls = list()
    # 是一个list数据结构
    seed = html.xpath(plate_rule)

    seed = per.prefilter(task["parent_url"],seed)
    for item in seed:
        # seed_url = urljoin(task['plate_url'], item.xpath('./@href').get())
        seed_url = item.get('url')
        if server.sadd(f'chrome:{Subdomains}:plate_url', seed_url):
            new_task = {
                'web_url':task['web_url'],
                'plate_url':seed_url,
                'parent_url':task['plate_url'],
                'task_id':task['task_id'],
                'selected_link':task['selected_link'],
                'num': task['num'] + 1,
                'level':3
            }
            print( f"添加任务--{seed_url}")
            if new_task['num'] > task['level']:
                break
            server.lpush('chrome:plate_task',json.dumps(new_task))
            task_check(server,task_monitor_queue,seed_url)





