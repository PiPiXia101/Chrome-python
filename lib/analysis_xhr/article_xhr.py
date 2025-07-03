'''
 title、content、published、url、author、source
'''

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
    

    def find_matching_title_json_path(self,xhr_list,analysis_content,new_content):
        pass
