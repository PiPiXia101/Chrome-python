# 提取板块代码
import re
from urllib.parse import urljoin, urlparse
from scrapy import Selector


class plate_extraction_rules:
    url_words = ['Detail', 'detail', 'Info', 'Article', 'article', 'Content', 'content', 'lender', 'Leader']
    text_words = ["联系方式", "隐私声明", "简体", "繁体", "English", "详情", "RSS订阅", "详细", "繁體", "关于我们",
                           "本站声明", "登录", "联系我们", "EN", "写信", "登陆", "注册", "下载", "繁", "简", "搜索", "english",
                           "《", "》", "手机", "问卷调查", '下一页', '下页', '上一页', '上页', '尾页', "投诉建议", "许可证",
                           "友情链接", "×", "ENGLISH", "访客", "无障碍阅读", "设为首页", "返回首页", "网上申请"]

    filter_path = ['.css','.js','.png','.jpg','.jpeg','.gif','.ico','.pdf','.doc','.docx','.xls','.xlsx','.ppt','.pptx','.txt','.rar','.zip','.7z','.tar','.gz','.bz2','.exe','.mp3','.mp4','.avi','.wmv','.flv']

    #初步过滤
    def prefilter(self,url,url_list:list):
        """
            初步过滤
            |-----过滤非板块页面
            |-----区分同域名和非同域名
        """
        # 疑似板块链接
        web_url_info = urlparse(url)
        result = list()
        # 开始过滤
        for item in url_list:
            seed_url = urljoin(url, item.xpath('./@href').get())
            # 过滤css和附件链接
            if sum([path in seed_url for path in self.filter_path]):
                continue
            # 过滤站外链接
            if web_url_info.netloc not in seed_url:
                continue
            # 处理拼接问题
            if '/./' in seed_url:
                seed_url = seed_url.replace('/./', '/')
            text = (item.xpath('./text()').get() or '').replace('\n', '').replace('\r', '').replace('\t', '').replace(' ', '').strip()
            # 如果链接与text都为None,判定为不是板块
            if (seed_url and text) == None:
                print(f'filter article: {seed_url} - text:{text} 链接与text都为none | prefilter')
                continue
            # 如果链接包含JavaScript，判定为不是板块
            if 'javascript' in seed_url or ('#' or '') == seed_url:
                print(f'filter article: {seed_url} - text:{text} url包含javascript:或为# | prefilter')
                continue
            # 链接字数过滤 >13个字的不要
            # if len(text) > 13:
            #     print(f'filter article: {seed_url} - text:{text} > 13 | prefilter')
                continue
            # 根据指定链接字段过滤文章
            if sum([item == url_item and 'list' not in url_item for url_item in seed_url.split('/') for item in self.url_words]):
                print(f'filter article: {seed_url} - url:{seed_url} in {self.url_words} | prefilter')
                continue
            # 关键词过滤
            if sum([item in text for item in self.text_words]):
                print(f'filter article: {seed_url} - text:{text} in text_words | prefilter')
                continue
            # 过滤页码
            if text.isdigit():
                if not re.findall('20\d{2}',text):
                    print(f'filter article: {seed_url} - text:{text} 是数字且不是年份 | prefilter')
                    continue
            result.append({"url":seed_url,"text":text})
        return result

    # 提取所有A标签
    def get_all_a(self,html_str):
        html = Selector(text=html_str)
        try:
            url_list = html.xpath('//a')
            return url_list
        except Exception as e:
            print(f'get_all_a error: {e}')
            return []