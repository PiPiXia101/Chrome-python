'''
 title、content、published、url、author、source
'''

import datetime
import json
import re
import time

DATETIME_PATTERN = [
    "([1-2]\d{3}[-|/|.]\d{1,2}[-|/|.]\d{1,2}/?\s*?[0-2]?[0-9]:[0-5]?[0-9]:[0-5]?[0-9])",  # 2020-04-05 12:23:23
    "([1-2]\d{3}[-|/|.]\d{1,2}[-|/|.]\d{1,2}/?\s*?[0-2]?[0-9]:[0-5]?[0-9])",  # 2020-04-05 12:23
    "([1-2]\d{3}[-|/|.]\d{1,2}[-|/|.]\d{1,2}/?\s*?[0-2]?[0-9][时|点][0-5]?[0-9]分[0-5]?[0-9]秒)",  # 2020-04-05 12时23分05秒
    "([1-2]\d{3}[-|/|.]\d{1,2}[-|/|.]\d{1,2}/?\s*?[0-2]?[0-9][时|点][0-5]?[0-9]分)",  # 2020-04-05 12时23分
    "([1-2]\d{1}[-|/|.]\d{1,2}[-|/|.]\d{1,2}/?\s*?[0-2]?[0-9]:[0-5]?[0-9]:[0-5]?[0-9])",  # 20-04-05 12:23:23
    "([1-2]\d{1}[-|/|.]\d{1,2}[-|/|.]\d{1,2}/?\s*?[0-2]?[0-9]:[0-5]?[0-9])",  # 20-04-05 12:23
    "([1-2]\d{3}年\s*\d{1,2}月\s*\d{1,2}日?\s*?[0-2]?[0-9]:[0-5]?[0-9]:[0-5]?[0-9])",  # 2020年3月12日  12:23:23
    "([1-2]\d{3}年\s*\d{1,2}月\s*\d{1,2}日?\s*?[0-2]?[0-9]:[0-5]?[0-9])",  # 2020年3月12日  12:23
    "([1-2]\d{3}年\d{1,2}月\d{1,2}日?\s*?[0-2]?[0-9][时|点][0-5]?[0-9]分[0-5]?[0-9]秒)",  # 2020年3月12日  12时23分45秒
    "([1-2]\d{3}年\d{1,2}月\d{1,2}日?\s*?[0-2]?[0-9][时|点][0-5]?[0-9]分)",  # 2020年3月12日  12时23分
    "([1-2]\d{1}年\d{1,2}月\d{1,2}日?\s*?[0-2]?[0-9]:[0-5]?[0-9]:[0-5]?[0-9])",  # 20年3月12日  12:23:23
    "([1-2]\d{1}年\d{1,2}月\d{1,2}日?\s*?[0-2]?[0-9]:[0-5]?[0-9])",  # 20年3月12日 星期三 12:23
    "([1-2]\d{1}年\d{1,2}月\d{1,2}日?\s*?[0-2]?[0-9][时|点][0-5]?[0-9]分[0-5]?[0-9]秒)",  # 20年3月12日  12时23分45秒
    "([1-2]\d{1}年\d{1,2}月\d{1,2}日?\s*?[[0-2]?[0-9][时|点][0-5]?[0-9]分)",  # 20年3月12日  12时23分
    "(\d{1,2}月\d{1,2}日?\s*?[0-2]?[0-9]:[0-5]?[0-9]:[0-5]?[0-9])",  # 3月12日  12:23:23
    "(\d{1,2}月\d{1,2}日?\s*?[0-2]?[0-9]:[0-5]?[0-9])",  # 3月12日  12:23
    "(\d{1,2}[-|/|.]\d{1,2}\s*?[0-2]?[0-9]:[0-5]?[0-9]:[0-5]?[0-9])",  # 04-05 12:23:23
    "(\d{1,2}[-|/|.]\d{1,2}\s+[0-2]?[0-9]:[0-5]?[0-9])",  # 04-05 12:23
    "([1-2]\d{3}[-|/|.]\d{1,2}[-|/|.]\d{1,2})",  # 2020-3-12
    "([1-2]\d{1}[-|/|.]\d{1,2}[-|/|.]\d{1,2})",  # 20-3-12
    "([1-2]\d{3}年\d{1,2}月\d{1,2}日?)",  # 2020年3月12日
    "([0-2]\d{1}年\d{1,2}月\d{1,2}日?)",  # 20年3月12日
    "(1[0-2][-|/|.]0[1-9])\s",  # 3-12
    "(1[0-2][-|/|.]1[0-9])\s",  # 3-12
    "(1[0-2][-|/|.]2[0-9])\s",  # 3-12
    "(1[0-2][-|/|.]3[0-1])\s",  # 3-12
    "(0[1-9][-|/|.]0[1-9])\s",  # 3-12
    "(0[1-9][-|/|.]1[0-9])\s",  # 3-12
    "(0[1-9][-|/|.]2[0-9])\s",  # 3-12
    "(0[1-9][-|/|.]3[0-1])\s",  # 3-12
    "([1-9][-|/|.]0[1-9])\s",  # 3-12
    "([1-9][-|/|.]1[0-9])\s",  # 3-12
    "([1-9][-|/|.]2[0-9])\s",  # 3-12
    "([1-9][-|/|.]3[0-1])\s",  # 3-12
    "(\d{1,2}月\d{1,2}日?)",  # 3月12日
    "([上|下]午\s*?[0-2]?[0-9][:|时][0-5]?[0-9][:|分][0-5]?[0-9]秒?)",
    "([前昨今][天日]\s*?[0-2]?[0-9][:|时|点][0-5]?[0-9][:|分][0-5]?[0-9]秒?)",
    "([前昨今][天日]\s*?[0-2]?[0-9][:|时|点][0-5]?[0-9]分?)",
    "([前昨今][天日]\s*?[0-2]?[0-9][:|时][0-5]?[0-9]分?)",
    "([0-2]?[0-9][:|时|点][0-5]?[0-9][:|分][0-5]?[0-9]秒?)",
    "([0-2]?[0-9][:|时|点][0-5]?[0-9]分?)",
    "([0-2]?[0-9]:[0-5]?[0-9]:[0-5]?[0-9])\s",  # 12:23:23
    "([0-2]?[0-9]:[0-5]?[0-9])\s",  # 12:23
    "(\d{1,2}\s*小时\d{1,2}\s*分钟前)",
    "(\d{1,2}\s*个?小时之?前)",
    "(\d{1,2}\s*个?[天|周|月|秒|分|时]之?前)",
    "(\d{1,2}\s*年之前)",
    "(\d{1,2}\s*年前)",
    "(\d{1,2}\s*小时之前)",
    "(\d{1,2}\s*小时前)",
    "(\d{1,2}\s*分钟之前)",
    "(\d{1,2}\s*分钟前)",
    "(刚刚)",
    "([前昨今][天日])",
    "(前天)",
    "(\d{1,2}\s*星期前)"
]


class analysis_xhr:
    
    def getDateTime(self,date_time):
        if isinstance(date_time, str):
            date_time = date_time.strip()
            if '半小时' in date_time:
                date_time = '30分钟前'
            if '前' in date_time or '月' in date_time:
                date_time = re.sub('\s+', '', date_time)
        else:
            date_time = str(date_time)
        try:
            ret = self.getDateTime_1(date_time)
        except Exception as e:
            ret = ''
            # logging.info(f'时间转换错误----{date_time}--{e}')
        return ret
    
    def getDateTime_1(date_time):
        '''
        :param date_time: 传入的时间参数，必须是字符串
        :return: 字典 {'timestamp': int类型时间戳, 'datetime': str类型的最终的时间格式（%Y-%m-%d %H:%M:%S）}
        '''
        if not isinstance(date_time, str):
            date_time = str(date_time)

        # try:
        if date_time.isdigit() and len(date_time) >= 10:
            if len(date_time) == 10:
                return time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(int(date_time)))
            elif len(date_time) == 13:
                return time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(int(date_time) / 1000))
            else:
                return ''

        if date_time == '':
            return ''
    

    def date_to_timestamp(self,date_str, date_format="%Y-%m-%d %H:%M:%S"):
        """
        将日期格式字符串转换为时间戳。

        :param date_str: 日期格式的字符串
        :param date_format: 输入日期的格式，默认是 "%Y-%m-%d %H:%M:%S"
        :return: 时间戳（秒级）
        """
        try:
            # 将字符串解析为 datetime 对象
            dt = datetime.strptime(date_str, date_format)
            # 将 datetime 对象转换为时间戳
            timestamp = int(dt.timestamp())
            return timestamp
        except ValueError as e:
            print(f"日期转换错误: {e}")
            return None
    

    # 递归遍历JSON数据的函数
    def recursive_traverse(self,json_data, target_value, current_path=""):
        """
        递归遍历JSON数据，根据值是否与指定值相等返回对应的JSON路径。
        
        :param json_data: JSON数据
        :param target_value: 目标值
        :param current_path: 当前路径（递归过程中使用）
        :return: 匹配目标值的JSON路径列表
        """
        result_paths = []
        if isinstance(json_data, dict):
            for key, value in json_data.items():
                new_path = f"{current_path}.{key}" if current_path else key
                if value == target_value:
                    result_paths.append(new_path)
                result_paths.extend(self.recursive_traverse(value, target_value, new_path))
        elif isinstance(json_data, list):
            for index, item in enumerate(json_data):
                new_path = f"{current_path}.{index}"
                if item == target_value:
                    result_paths.append(new_path)
                result_paths.extend(self.recursive_traverse(item, target_value, new_path))
        return result_paths

    def find_chinese_range_in_json(self,json_data, content_range, current_path=""):
        """
        递归遍历JSON数据，查找值中包含的汉字数量在指定范围内的项，并返回它们的JSON路径。

        :param json_data: JSON数据
        :param content_range: 汉字数量范围，例如 (min_count, max_count)
        :param current_path: 当前路径（递归过程中使用）
        :return: 匹配的JSON路径列表
        """
        result_paths = []
        if isinstance(json_data, dict):
            for key, value in json_data.items():
                new_path = f"{current_path}.{key}" if current_path else key
                # 检查当前值是否包含汉字
                chinese_chars = re.findall(r'[\u4e00-\u9fa5]', str(value))
                if chinese_chars:
                    char_count = len(chinese_chars)
                    if content_range[0] <= char_count <= content_range[1]:
                        result_paths.append(new_path)
                # 递归检查子项
                result_paths.extend(self.find_chinese_range_in_json(value, content_range, new_path))
        elif isinstance(json_data, list):
            for index, item in enumerate(json_data):
                new_path = f"{current_path}.{index}"
                # 检查当前项是否包含汉字
                chinese_chars = re.findall(r'[\u4e00-\u9fa5]', str(item))
                if chinese_chars:
                    char_count = len(chinese_chars)
                    if content_range[0] <= char_count <= content_range[1]:
                        result_paths.append(new_path)
                # 递归检查子项
                result_paths.extend(self.find_chinese_range_in_json(item, content_range, new_path))
        return result_paths

    def find_matching_json_path(self,xhr_list,title,published,content,other):
        for item in xhr_list:
            item = json.loads(item[:-1])
            # 确定了数据在哪个请求
            if title in str(item):
                title_json_path = self.recursive_traverse(item.get('body'),title)
                #  发布时间有可能是时间戳、格式可能不统一 
                #   |—— 可以根据常见的时间正则表达式提取,并转换成统一个格式的时间字符串 转成时间戳   
                # 分析的不对  给出的数据 是年月日这这种格式的 那么 对应的数据 要么是格式相同的 要么就是时间戳页面转换的

                # 处理传入的发布时间
                for published_re_rule in DATETIME_PATTERN:
                    enclosure_publish = re.findall(published_re_rule, published)
                    if enclosure_publish:
                        published = enclosure_publish[0]
                        break
                # 请求一 页面展示的数据与源数据格式相同
                published_json_path = self.recursive_traverse(item.get('body'),published)
                # 情况二 格式不同 95%的概率源数据是时间戳
                if not published_json_path:
                    published_timestamp = self.getDateTime(published)
                    published_timestamp = self.date_to_timestamp(published_timestamp)
                    published_json_path = self.recursive_traverse(item.get('body'),published_timestamp)
                #  文章分词 根据什么来分割 第一个换行符? 第一个标点符号? 还是根据字数前20%?
                #  这还只是开头 要不要增加结尾匹配逻辑?  
                #  为什么要增加结尾匹配规则,开头匹配不就可以了? 
                #  如果说数据体重存在desc简介是不是就有问题了? 拿这样的话 换行符匹配或者字数匹配是优于符号匹配的,
                #   
                # 
                # 思路错了  我应该是去找文字多的地方  然后拿着疑似结果去和选中的做匹配
                #   
                # 
                # 匹配content包含的汉字有多少 
                HZchar_count = len(re.findall(r'[\u4e00-\u9fa5]', content))
                content_range = (int(HZchar_count*0.9),int(HZchar_count/0.9))
                content_json_path = self.find_chinese_range_in_json(item.get('body'),content_range)
                # 验证逻辑

                return title_json_path,published_json_path,content_json_path,item



                

        pass
