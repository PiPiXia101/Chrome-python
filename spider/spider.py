import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from lib import rander
from lib.plate_extract.palte import analysis_plate

class Spider:

    def  __init__(self):
        self.analysisPlate = analysis_plate()
        pass


    # 现有的提取板块流程测试
    def run(self,url):
        original_data,xhr_list,html_info,web_js_file_path = rander.get_html(url)
        # 板块提取流程
        a_list= self.analysisPlate.get_all_a(original_data)
        plate_result = self.analysisPlate.prefilter(url,a_list)
        for i in plate_result:
            print(i)

    # 寻找相似元素
    def run_similar(self,url,html_obj):
        original_data,xhr_list,html_info,web_js_file_path = rander.get_html(url)
        plate_result=func(original_data,html_obj)



if __name__ == '__main__':
    spider = Spider()
    # spider.run('https://www.thepaper.cn/')
    # id("navMenu")/UL[1]/LI[6]/A[1]
    html_obj= """<a href="/channel_122908" class="index_hoverli__QkvuD"><i>国际</i></a>"""
