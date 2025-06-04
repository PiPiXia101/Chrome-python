import requests
import logging
import json
import os
mx_url = 'http://intra-yqt-cls-website-category-www.midu.cc/text_classifier'

headers = {'Content-Type': 'application/json',
           'podNameSpace': 'www-sjcj1',
           'podName': 'sjcj1-sjcj-crawlerslave-umeirecall-0',
           'Authorization': 'sk-R2KB12OHQe6tuYJC9e8cC44e88C14188953c8a8d1347681b'}

def use_model(url,content,cs_type=False):
    """
    POD_NAMESPACE=www-sjzjc
    POD_NAME=sjzjc-sync-api-kafka-new-5f59947d49-hvfcv
    """
    logging.info(f'{url}-=请求headers=-{headers}')
    mx_params = {
        "id": "161e007e-40de-11eb-a5a8-0a80ff2603de",
        "client": "web_section-long",
        "data": [{
            'url': url,
            'content': content
        }]
    }
    res = requests.post(url=mx_url, headers=headers,
                        data=json.dumps(mx_params))
    if res.status_code == 200:
        plate_result = json.loads(res.text)['msg'][0]['label']
    else:
        plate_result = 'None'
        logging.info(f'模型请求失败{res}')
    if cs_type:
        return plate_result,json.loads(res.text)
    else:
        return plate_result
    

def use_bigModel(content,spider=None):
    POD_NAMESPACE = os.environ.get("ACTIVE_ENV")
    POD_NAME = os.environ.get("POD_NAME")
    try:
        nameSpace = POD_NAME.split('-')[0]
    except:
        nameSpace = 'sjcj1'
    headers = {
        'Content-Type': 'application/json',
        # 'podNameSpace': f"{POD_NAMESPACE}-{nameSpace}",
        # 'podName': POD_NAME,
        'podNameSpace': 'beta-sjcj4',
        'podName': 'sjcj4-fzdwz-proc-crawlerslave-umeirecall',
        # 'Authorization':'sk-R2KB12OHQe6tuYJC9e8cC44e88C14188953c8a8d1347681b'

    }


    if not spider:
        url = "http://algorithm-beta.dc.51wyq.cn/api/v1/large/model/read"
        token = "41d046d8b79ba6658654225ac175de68_0001"
    else:
        url= spider.apollo_conf.get('apoloo_conf_private',{}).get('bigModel_url',"http://algorithm-beta.dc.51wyq.cn/api/v1/large/model/read")
        token = spider.apollo_conf.get('apoloo_conf_private',{}).get('bigModel_token',"")
    if not token:
        return 'None',1

    headers['token'] = token
    payload = json.dumps({
        "apiCode": "model_qw_chat",
        "isData": False,
        "isCache": True,
        "userTag": "boss-1024",
        "model": "web_section",
        "messages": [
            {
                "role": "user",
                # "content": content
                "content": f"你是一个网页分类专家，请对下面的网页源代码数据进行分类，有D,DD,DL,L四大类，现在请对:  {content}进行分类"
            }
        ],
        "temperature": 0,
        "top_p": 1,
        "frequency_penalty": 0,
        "presence_penalty": 0,
        "stream": False
        })
    
    response = requests.request("POST", url, headers=headers, data=payload)
    if response.status_code == 200:
        plate_result = json.loads(response.text)["content"]
    else:
        plate_result = 'None'
        logging.info(f'模型请求失败{response}')
    return plate_result,1


# if __name__ == '__main__':
#     import sys
#     import os
#     sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
#     from rander_Bt.rander import BitPlaywright
#     from playwright.sync_api import sync_playwright
#     from models.clean_data import html_parse
#     bp = BitPlaywright()
#     with sync_playwright() as playwright:
#         # 获取源码 
#         original_data = bp.run(playwright=playwright, browser_id_object=bp.browser_id_object_list[0], url="http://www.shuicheng.gov.cn/newsite/zwgk/zfxxgk_1/zfxxgknb/nb_2022n/")
#         html_str = html_parse(original_data)
#         result = use_bigModel(html_str)
#         print(result)