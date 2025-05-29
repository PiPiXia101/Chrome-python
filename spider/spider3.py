import datetime
import sys
import os

from lib.models.clean_data import html_parse
from lib.models.model_usage import use_model
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

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



server = redis.StrictRedis(host='redis.wx.crawler.sinayq.cn', password='rds6306_paswd', port=6306, db=1,
                           decode_responses=True)


web_url =  "http://www.shuicheng.gov.cn/"
task = {
    'web_url': web_url,
    'plate_url': web_url,
    'task_id':hashlib.md5(web_url.encode('utf-8')).hexdigest(),
    'num':0,
    'level':3
}
server.lpush('chrome:plate_task',json.dumps(task))
# 添加任务的时候应该在任务 监控队列 里面 添加 监控任务
task_monitor = f"chrome:monitor_task"
server.lpush(task_monitor,task['task_id'])

plate_rule = "//a[contains(@href, 'newsite') or contains(@href, 'zwdt')]"
task_plate_rule = f"chrome:{task['task_id']}:plate_rule"
server.set(task_plate_rule,plate_rule)


task_monitor_queue = f"chrome:{task['task_id']}:plate_url"

bp = BitPlaywright()
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
    if task['num'] != 0:
        # 进行大模型判断
        # 清洗数据
        html_str = html_parse(original_data)
        plate_result,model_result = use_model(task['plate_url'], html_str,cs_type=True)
        print(f'小模型判定结果--{task['plate_url']}--{plate_result}')
        # 记录分值
        logits = model_result['msg'][0]['logits']
        server.zadd(f"chrome:{task['task_id']}:logits:{plate_result}",{task['plate_url']:logits})
        if plate_result != 'L':
            # 提取出来的链接不是板块
            # 修改提取规则
            # 删除待处理的链接
            # 增加过滤链接格式

            continue
    html = Selector(text=original_data)
    seed_urls = list()
    # 是一个list数据结构
    seed = html.xpath(plate_rule)
    for item in seed:
        seed_url = urljoin(task['web_url'], item.xpath('./@href').get())
        if server.sadd(f'chrome:{Subdomains}:plate_url', seed_url):
            new_task = {
                'web_url':task['web_url'],
                'plate_url':seed_url,
                'task_id':task['task_id'],
                'num': task['num'] + 1,
                'level':3
            }
            if new_task['num'] > task['level']:
                break
            server.lpush('chrome:plate_task',json.dumps(new_task))
            task_check(server,task_monitor_queue,seed_url)





