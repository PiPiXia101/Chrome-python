# id("navMenu")/UL[1]/LI[6]/A[1]
from scrapy import Selector


html_obj= """<a href="/channel_122908" class="index_hoverli__QkvuD"><i>国际</i></a>"""


# 分析元素


def analysis_obj(html_obj,xpath_str):
    html_obj = Selector(text = html_obj)
    html_obj = html_obj.xpath('//body/*').get()
    print(html_obj)
    # 递归分析每层元素
if __name__ == '__main__':
    analysis_obj(html_obj,'')