
import datetime
import re
import sys
import os
import uuid
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from lib.analysis_xhr.plate_xhr import analysis_xhr
from lib.analysis_Xpath.plate_xpath import *
from lib.models.clean_data import html_parse
from lib.models.model_usage import *
from lib.plate_extract.palte import plate_extraction_rules
import hashlib
import json
import time
from urllib.parse import urljoin
import redis
from playwright.async_api import async_playwright, Playwright
from playwright.sync_api import sync_playwright
from scrapy import Selector

from lib.rander_Bt.rander import BitPlaywright

axhr = analysis_xhr()


test_dict = {
    'data':[
        {
            'title':'a',
            'title_list':[
                {'title_a':'a'},
                {'title_b':'b'}
            ]
        }
    ]
}


json_path = axhr.recursive_traverse(test_dict,'a')
print(json_path)


