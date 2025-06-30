
# 分析接口代码
import json
import re
from urllib.parse import urlparse

def count_digits(s):
    return len(re.findall('\.\d{1,2}\.', s))

class analysis_xhr:

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


    def find_matching_json_path(self,xhr_list,analysis_content,new_content):
        title = analysis_content.get('title')
        url = analysis_content.get('url')
        for item in xhr_list:
            item = json.loads(item[:-1])
            code = "item.get('body')"
            json_path_list = self.recursive_traverse(item.get('body'),title)
            if json_path_list:
                sorted_strings = sorted(json_path_list, key=count_digits, reverse=True)
                while True:
                    json_path = sorted_strings.pop(0)
                    if bool(re.search('\.\d+\.', json_path)):
                        break
                    else:
                        json_path = False
                if json_path:
                    for index in range(len(re.findall('\.\d+\.',json_path))):
                        # 0,1,2 对应 json路径里面那个数字进行遍历
                        title_key_path = list()
                        title_json_pah_list = json_path.split('.')
                        num_index = 0
                        for i,key in enumerate(title_json_pah_list):
                            if key.isdigit() and num_index == index:
                                title_key_path = title_json_pah_list[i+1:]
                                break
                            else:
                                code += f"['{key}']"
                        score = 0
                        for data_line in eval(code):
                            new_countent_title = eval('data_line'+''.join([f'.get("{key}")' for key in title_key_path]))
                            if new_countent_title in [content.get('title') for content in new_content]:
                                score += 1
                        if score == len(new_content):
                            # print(code,title_key_path)

                            url_info = urlparse(url)
                            url_path = [item for item in  url_info.path.split('/') if item]
                            article_url = f"{url_info.scheme}://{url_info.netloc}"
                            for path in url_path:
                                # 'item.get("body")' + ''.join([f'[{jsonpath}]' if jsonpath.isdigit() else f'["{jsonpath}"]' for jsonpath in title_json_pah_list[:i+1]])
                                path_json = self.recursive_traverse(eval('item.get("body")' + ''.join([f'[{jsonpath}]' if jsonpath.isdigit() else f'["{jsonpath}"]' for jsonpath in title_json_pah_list[:i+1]])),int(path) if path.isdigit() else path)
                                if path_json:
                                    path_json = sorted(path_json, key=len, reverse=False)[0]
                                    article_url += ''.join(['{'+f'[{jsonpath}]'+'}' if jsonpath.isdigit() else '{'+f'["{jsonpath}"]'+'}' for jsonpath in path_json[0].split(".")])
                                else:
                                    article_url += f"/{path}"


                            return item,code.replace("item.get('body')",""),title_key_path,article_url

                        else:
                            num_index += 1
     

    