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