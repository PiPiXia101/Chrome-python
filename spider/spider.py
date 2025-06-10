import sys
import os



sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from lib.rander_playwight import rander
from lib.plate_extract.palte import analysis_plate
from lib.analysis_Xpath.plate_xpath import *
from lib.similar_elements.analysis_elements import *

class Spider:

    def  __init__(self):
        self.analysisPlate = analysis_plate()
        pass


    # 现有的提取板块流程测试
    def run(self,url):
        original_data,xhr_list,html_info,web_js_file_path = rander.get_html(url)
        # print(original_data)
        with open('/Users/yan/Desktop/Chrome-python/html/test copy.html','w',encoding='utf-8') as f:
            f.write(original_data)
        # 板块提取流程
        # a_list= self.analysisPlate.get_all_a(original_data)
        # plate_result = self.analysisPlate.prefilter(url,a_list)
        # for i in plate_result:
        #     print(i)

    # 寻找相似元素
    def run_similar(self,url,html_obj):
        original_data,xhr_list,html_info,web_js_file_path = rander.get_html(url)
        # plate_result=func(original_data,html_obj)


    def run(self,url,test_node):
        # 模拟浏览器打开链接
        original_data,xhr_list,html_info,web_js_file_path = rander.get_html(url)
        html = Selector(text=original_data)
        with open('/Users/yan/Desktop/Chrome-python/html/test.html','w',encoding='utf-8') as f:
            f.write(original_data)
        # 确定选中的元素 
        # 示例用法
        test_paths = list()
        # 寻找相似元素
        result,all_nodes,first_node = run_example(test_node,original_data)
        # 单层子节点匹配
        result = children_match(result,all_nodes,first_node)
        # 获取相似元素里面的A属性href
        for item in result:
            # print(item[0]['seek_oneself'].xpath('@href').get())
            test_paths.append(item[0]['seek_oneself'].xpath('@href').get())
        # 选中节点、相似元素分析A属性href得到Xpath
        result = analyze_html_and_generate_xpaths(test_node, test_paths,url)
        for Xpath_str in result["xpaths"]:
            print(Xpath_str)




if __name__ == '__main__':
    # 例子1
    # spider = Spider()
    # test_node = """
    #     <li class="active"><a target="_blank" href="./newsite/zwdt/zwyw/">水城要闻</a>
    #                                 </li>"""
    # spider.run('http://www.shuicheng.gov.cn/',test_node)

    # 例子2
    # spider = Spider()
    # test_node = """
    #     <map name="AutoMap1" border="0"><area href="zsxxw.htm" shape="rect" target="" coords="5,5,271,175" border="0"></map>"""
    # spider.run('https://syuzsjy.syu.edu.cn/',test_node)


    # 例子3
    spider = Spider()
    test_node = """<li class="">
                <div class="menu-box">
                    <a class="i-page2" href="http://www.yulin.gov.cn/zjyl/" target="_blank"> 走进玉林</a>
                    <div class="child-ul-menu" style="display: none;">
                        <!-- 最多放4个 -->
                        <div class="child-box" startpos="0" num="4">
                        	
                        		<a class="child-li-menu" target="_blank" href="http://www.yulin.gov.cn/zjyl/ylls/" title="玉林历史"> 玉林历史</a>
							   
							
                        		<a class="child-li-menu" target="_blank" href="http://www.yulin.gov.cn/zjyl/ylgk/" title="玉林概况"> 玉林概况</a>
							   
							
                        		<a class="child-li-menu" target="_blank" href="http://www.yulin.gov.cn/zjyl/ylyx/" title="玉林映像"> 玉林映像</a>
							   
							
                        		<a class="child-li-menu" target="_blank" href="http://www.yulin.gov.cn/zjyl/ylwh/" title="玉林文化"> 玉林文化</a>
							   
							
                        		<a class="child-li-menu" target="_blank" href="http://www.yulin.gov.cn/zjyl/yltz/" title="玉林图展"> 玉林图展</a>
							   
							
                        		<a class="child-li-menu" target="_blank" href="http://www.yulin.gov.cn/zjyl/ylly/" title="玉林旅游"> 玉林旅游</a>
							   
							
                        		<a class="child-li-menu" target="_blank" href="http://www.yulin.gov.cn/zjyl/ylms/" title="玉林美食"> 玉林美食</a>
							   
							
                            <!--<a class="child-li-menu" target="_blank" href="#" title="玉林概括">玉林概括</a>
                            <a class="child-li-menu" target="_blank" href="#" title="玉林文化">玉林文化</a>
                            <a class="child-li-menu" target="_blank" href="#" title="玉林文化">玉林文化</a>-->
                        </div>
                    </div>
                </div>
            </li>"""
    spider.run('http://www.yulin.gov.cn/',test_node)
    
