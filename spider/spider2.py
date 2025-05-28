import sys
import os
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

server = redis.StrictRedis(host='redis.wx.crawler.sinayq.cn', password='rds6306_paswd', port=6306, db=1,
                           decode_responses=True)
task = {
    'web_url':'https://www.szcu.edu.cn/',
    'plate_url':'https://www.szcu.edu.cn/',
    'plate_Xpath':[
        "//a[contains(@href, 'list.htm')]"
    ],
    'task_id':hashlib.md5('https://www.szcu.edu.cn/'.encode('utf-8')).hexdigest(),
    'num':0,
    'level':3
}

print(task)
bp = BitPlaywright()
server.lpush('chrome:plate_task',json.dumps(task))
while True:
    task = server.lpop('chrome:plate_task')
    if not task:
        time.sleep(5)
        continue
    task = json.loads(bytes.decode(task) if isinstance(task, bytes) else task)
    Subdomains = task['web_url'].replace('https://','').replace('http://','')
    with sync_playwright() as playwright:
        # 获取源码 
        original_data = bp.run(playwright=playwright, browser_id_object=bp.browser_id_object_list[0], url=task['plate_url'])
        # 构建html对象
    if task['num'] != 0:
        # 进行大模型判断
        pass
    html = Selector(text=original_data)
    seed_urls = list()
    for a_xpath in task['plate_Xpath']:
        seed = html.xpath(a_xpath)
        for item in seed:
            seed_url = urljoin(task['web_url'], item.xpath('./@href').get())
            # print(seed_url)
            if server.sadd(f'chrome:{Subdomains}:plate_url', seed_url):
                new_task = {
                    'web_url':task['web_url'],
                    'plate_url':seed_url,
                    'plate_Xpath':task['plate_Xpath'],
                    'task_id':task['task_id'],
                    'num': task['num'] + 1,
                    'level':3
                }
                # print(new_task)
                if new_task['num'] > task['level']:
                    break
                server.lpush('chrome:plate_task',json.dumps(new_task))
                # 插入板块表
    
    
    

