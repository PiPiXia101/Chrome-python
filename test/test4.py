import math

def is_power_of_ten(n):
    if n <= 0:
        return False
    log_val = math.log10(n)
    return log_val == int(log_val)


print(is_power_of_ten(100))
print(is_power_of_ten(102))