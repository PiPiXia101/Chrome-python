from playwright.sync_api import sync_playwright
import json
from urllib.parse import urljoin

def extract_articles():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        
        # 导航到目标页面
        page.goto('https://www.shuicheng.gov.cn/newsite/zwgk/zdly/nync/xczx/index_20.html')
        
        # 定位文章列表区域
        articles_container = page.locator('xpath=//div[contains(., "乡村振兴")]/following-sibling::ul[1]')
        
        articles = []
        # 提取每个文章项
        for item in articles_container.locator('li').all():
            link = item.locator('a').first
            title = link.locator('xpath=./*[1]').text_content().strip()
            date = link.locator('xpath=./*[2]').text_content().strip()
            relative_url = link.get_attribute('href')
            absolute_url = urljoin(page.url, relative_url)
            
            articles.append({
                'title': title,
                'date': date,
                'url': absolute_url
            })
        
        browser.close()
        return articles

if __name__ == "__main__":
    results = extract_articles()
    print(json.dumps(results, indent=2, ensure_ascii=False))
