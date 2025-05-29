
# 数据清洗
import re
from lxml import etree
import lxml.html
USELESS_TAG = ['style', 'script', 'link', 'iframe', 'blockquote']
def remove_annotation(html):
    html = re.sub('<[表情]br.*?>', '', html, flags = re.S)
    html = re.sub('<!--.*?-->', '', html, flags = re.S)
    html = re.sub(r'/\*.*?\*/', '', html, flags = re.S)
    html = re.sub(r'\n', '', html, flags = re.S)
    html = re.sub(r'\t', '', html, flags = re.S)
    html = re.sub(' (\w+)="(.*?)"', '', html)
    html = html.replace(' ', '')
    html = html.replace('&#13;', '')
    return html

def build_html_element(html):
    # element = fromstring(html)
    utf8_parser = lxml.html.HTMLParser(encoding = 'utf-8')
    element = lxml.html.document_fromstring(html.encode('utf-8', 'replace'), parser = utf8_parser)
    return element

def remove_useless_tag(element):
    etree.strip_elements(element, *USELESS_TAG, with_tail = False)
    return element

def html_parse(html_str):
    html_str = remove_annotation(html_str)
    html = build_html_element(html_str)
    html = remove_useless_tag(html)
    body = html.xpath('//body')[0]

    html_str = etree.tostring(body, encoding = 'utf-8').decode()
    html_str = html_str.replace('&#13;', '')
    html_str = re.sub(' (\w+)="(.*?)"', '', html_str)

    html_str = re.sub('&lt;', '<', html_str)
    html_str = re.sub('&gt;', '<', html_str)

    html_list = [f'<{item}>' for item in ('>' + html_str + '<').split('><') if item]
    html_result = list()
    current_tag = html_list[0]
    for tag_item in html_list[1:] + ['end']:
        if current_tag == tag_item:
            continue
        else:
            html_result.append(current_tag)
            current_tag = tag_item
    html_str = ''.join(html_result)

    while True:
        element = build_html_element(html_str)
        body = element.xpath('//body')[0]
        html_str = etree.tostring(body, encoding = 'utf-8').decode()
        if not re.findall('<\w+/>', html_str): break
        html_str = re.sub('<\w+/>', '', html_str)
        html_str = re.sub('&lt;', '<', html_str)
        html_str = re.sub('&gt;', '<', html_str)

    html_str = html_str.replace('<div/>', '')
    html_str = html_str.replace('<input/>', '')
    html_str = html_str.replace('<img/>', '')
    html_str = html_str.replace('\n', '')
    html_str = html_str.replace('\t', '')
    html_str = re.sub('&lt;', '<', html_str)
    html_str = re.sub('&gt;', '<', html_str)

    html_str = re.sub('&(.*?);', '', html_str)
    html_str = re.sub(' ', '', html_str)
    html_str = re.sub('　', '', html_str)
    return html_str
