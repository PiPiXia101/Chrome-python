from scrapy import Selector
from collections import deque

# 初始化一个全局队列
element_queue = deque()

def recursive_analysis(elements):
    for idx, elem in enumerate(elements):
        # 获取当前节点的标签名、属性和文本内容
        tag = elem.xpath('local-name()').get()
        attributes = dict(elem.attrib)
        text_content = elem.xpath('.//text()').getall()
        text_content = [t.strip() for t in text_content if t.strip()]

        # 构建节点信息字典
        node_info = {
            'tag': tag,
            'attributes': attributes,
            'text_content': text_content
        }

        # 将节点入队
        element_queue.append(node_info)

        # 递归处理子元素
        children = elem.xpath('./*')
        if children:
            recursive_analysis(children)


if __name__ == '__main__':
    html_obj = """<a href="/channel_122908" class="index_hoverli__QkvuD"><i>国际</i></a>"""
    selector = Selector(text=html_obj)
    root_elements = selector.xpath('//body/*')

    print(f"Root elements: {root_elements}")
    recursive_analysis(root_elements)

    # 打印队列中的所有节点信息
    print("\nElement Queue:")
    while element_queue:
        item = element_queue.popleft()
        print(item)