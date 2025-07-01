import time
from urllib.parse import urljoin

import logging
import traceback


import time


from rander_Bt.bit_api import *



class BitBrowser:

    def __init__(self, browser_id, max_times=10000, max_alive_time=60 * 60 * 23):
        self.browser_id = browser_id
        self.times = 0  # 使用次数
        self.create_time = int(time.time())  # 创建时间
        self.close_time = 0  # 关闭时间
        self.max_times = max_times  # 最大使用次数
        self.max_alive_time = max_alive_time  # 最大存活时间
        self.url_list = []  # 浏览器访问链接记录 {'times':1,'url':'https://www.baidu.com'}....
        self.close_reason = ""  # 关闭原因
        self.browser_info = self.__create_browser__(self.browser_id)

    # 检测类是否要关闭
    def __check_close__(self):
        if self.times >= self.max_times:
            self.__close_browser__(self.browser_id)
            # 记录关闭原因
            self.close_reason = f"使用次数达到上限{self.max_times}次"
            self.close_time = int(time.time())
            return True
        elif int(time.time()) - self.create_time > self.max_alive_time:
            self.__close_browser__(self.browser_id)
            # 记录关闭原因
            self.close_reason = "存活时间达到上限24小时"
            self.close_time = int(time.time())
            return True
        return False

    # 创建浏览器
    def __create_browser__(self, browser_id):
        stat_time = int(time.time())
        print(f"{browser_id}正在启动中")
        res = openBrowser(browser_id)
        print(f"{browser_id}启动完毕,耗时{int(time.time() - stat_time)}")
        return res

    # 关闭浏览器
    def __close_browser__(self, browser_id):
        self.close_time = int(time.time())
        closeBrowser(self.browser_id)

    # 信息记录返回
    def __str__(self) -> str:
        info = f"浏览器窗口id:{self.browser_id} 使用次数:{self.times} 创建时间:{self.create_time} 关闭时间:{self.close_time} 访问记录:{self.url_list} 关闭原因:{self.close_reason}"
        return info
class BitPlaywright:
    def __init__(self):
        self.browser_id_list = [
            "9ca7aae028fc43e39559875470c8e23d",
        ]
        # 创建浏览器对象
        self.browser_id_object_list = [BitBrowser(browser_id) for browser_id in self.browser_id_list]

    def run(self, playwright, browser_id_object, url):
        print('正则打开的是',url)
        start_time= time.time()
        # browser_id_object = random.choice(self.browser_id_object_list)
        browser_info = browser_id_object.browser_info
        ws = browser_info['data']['ws']
        # 使用次数+1 记录链接访问记录
        browser_id_object.times += 1
        # 链接浏览器
        chromium = playwright.chromium
        browser = chromium.connect_over_cdp(ws)
        default_context = browser.contexts[0]
        # 打开链接
        page = default_context.new_page()
        response_status = None

    

        # 监控所有网络响应
        xhr_list = []
        html_info = {}
        # 监听 response 事件以获取响应状态码
        def handle_response(response):
            nonlocal response_status
            if response.url == url:  # 只关注目标 URL 的响应
                response_status = response.status
            if response.request.resource_type == 'document':
                html_info['url'] = response.url
                html_info['status'] =response.status
                html_info['headers'] = response.headers
                html_info['body'] = response.text()
                html_info['method'] = response.request.method
                html_info['params'] = response.request.post_data
            # 获取图片和css
            elif response.request.resource_type in ['stylesheet', 'image']:
                pass
            else:
                if '.js' not in response.request.url:
                    try:
                        xhr_info = {
                            'url': response.url,
                            'status': response.status,
                            'headers': response.headers,
                            'body': json.loads(response.text()),
                            'method': response.request.method,  # 记录请求方式
                            'params': response.request.post_data  # 记录请求参数
                        }
                        xhr_list.append(xhr_info)
                    except Exception as e:
                        pass
                else:
                    pass
        
        page.on("response", handle_response)

        try:
            page.goto(url)
        except:
            logging.info(f'{url}打开网页长时间不响应{traceback.format_exc()}')
            return ''
        
        page.wait_for_timeout(2000)
        
        print(f'耗时{time.time() - start_time}')

        if response_status in [404,403]:
            page.close()
            return ''

        try:
            original_data = page.content()  # 源码
            # 关闭页面
            page.close()
            return original_data,xhr_list,html_info
        except:
            page.close()
            return ''