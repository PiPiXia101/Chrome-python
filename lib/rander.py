import os
import time
from urllib.parse import urlparse
from playwright.sync_api import sync_playwright
import time  


js_file_path = '/Users/yan/Desktop/Chrome-python/JS_file/'
# 渲染获取源码、所有请求信息
def get_html(url):
    url_info = urlparse(url)
    web_js_file_path = js_file_path+ url_info.netloc
    # 创建文件夹
    try:
        if not os.path.exists(web_js_file_path):
            os.makedirs(web_js_file_path)
    except Exception as e:
        print(f'创建文件夹失败: {e}')
    # 源码变量
    request_html= ''

    with sync_playwright() as p:
        start_time = time.time()
        browser = p.firefox.launch(headless=True)
        context = browser.new_context()

        context.set_extra_http_headers({
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36"})

        # 设置全局40秒超时
        context.set_default_navigation_timeout(20000)

        page = context.new_page()
        js_path = '/Users/yan/Desktop/Chrome-python/lib/stealth.min.js'
        try:
            with open(js_path, 'r', encoding='utf-8') as f:
                js = f.read()
        except:
            print('js文件加载失败')
        else:
            page.add_init_script(js)  # 执行规避webdriver检测

        print(f'当前url: {url} 创建webdriver花费{time.time() - start_time}')


        # 监控所有网络响应
        xhr_list = []
        html_info = {}
        def handle_response(response):
            if response.request.resource_type == 'document':
                html_info['url'] = response.url
                html_info['status'] =response.status
                html_info['headers'] = response.headers
                html_info['body'] = response.text()
                html_info['method'] = response.request.method
                html_info['params'] = response.request.post_data
            # 获取图片和css
            if response.request.resource_type in ['stylesheet', 'image']:
                pass
            else:

                if '.js' not in response.request.url:
                    try:
                        
                        xhr_list.append({
                            'url': response.url,
                            'status': response.status,
                            'headers': response.headers,
                            'body': response.text(),
                            'method': response.request.method,  # 记录请求方式
                            'params': response.request.post_data  # 记录请求参数
                        })
                    except Exception as e:
                        pass
                else:
                    # 写入js文件
                    js_url_info = urlparse(response.request.url)
                    js_file_name = js_url_info.path.split('/')[-1]
                    try:
                        with open(f"{web_js_file_path}/{js_file_name}", 'w', encoding='utf-8') as f:
                            f.write(response.text())
                    except Exception as e:
                        print(f'写入js文件失败: {e}')
                    
        page.on('response', handle_response)
        try:
            page.goto(url, wait_until='load')
            s_time = 10000
            page.wait_for_timeout(s_time)
            original_data = page.content()  # 源码
            context.close()
            browser.close()
            print(f'整体花费{time.time() - start_time}')

            return original_data,xhr_list,html_info,web_js_file_path
        except Exception as e:
            print(f'当前失败的url: {url}, \n失败原因: {e} 整体花费{time.time() - start_time}')
            context.close()
            browser.close()
            return None,None,None,None
        

if __name__ == '__main__':
    url = 'https://www.thepaper.cn/'
    result = get_html(url)
    # print(result)