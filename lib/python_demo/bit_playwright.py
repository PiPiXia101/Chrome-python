from urllib.parse import urlparse
from bit_api import *
import time
import asyncio
from playwright.async_api import async_playwright, Playwright

js_file_path = '/Users/yan/Desktop/Chrome-python/JS_file/'

async def run(playwright: Playwright):

  # /browser/open 接口会返回 selenium使用的http地址，以及webdriver的path，直接使用即可
  browser_id = "9ca7aae028fc43e39559875470c8e23d" # 窗口ID从窗口配置界面中复制，或者api创建后返回
  res = openBrowser(browser_id)
  ws = res['data']['ws']
  print("ws address ==>>> ", ws)

  chromium = playwright.chromium
  browser = await chromium.connect_over_cdp(ws)
  default_context = browser.contexts[0]

  print('new page and goto baidu')

  page = await default_context.new_page()

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
                with open(f"{js_file_path}/{js_file_name}", 'w', encoding='utf-8') as f:
                    f.write(response.text())
            except Exception as e:
                print(f'写入js文件失败: {e}')
                    
  page.on('response', handle_response)

  await page.goto('https://www.thepaper.cn/')

  time.sleep(2)

  print('clsoe page and browser')
  await page.close()

  time.sleep(2)
  # closeBrowser(browser_id)

async def main():
    async with async_playwright() as playwright:
      await run(playwright)

asyncio.run(main())