from db import code_to_data;

# print(type(code_to_data('000250')))
# print(code_to_name('000250'))

def calculate_avg(code):
    datas = code_to_data(code)
    temp = [];
    for i in range (len(datas)):
        avg = (datas[i]['open'] + datas[i]['high'] + datas[i]['low'] + datas[i]['close']) / 4 
        temp.append(avg)
    return (sum(temp)/100)
  
  
def today_price(code):
    datas = code_to_data(code)
    return datas[0]['open']    


def proposal_result(code):
    averge_value = calculate_avg(code)
    today = today_price(code)
    print(averge_value)
    print(today)
    high = averge_value + (averge_value * 0.01)
    low = averge_value - (averge_value * 0.05)
    if today >= high:
        print("매수") 
    if today <= low:
        print("매도")
    else:
        print("판단이 어렵습니다.")
  
proposal_result('003300')