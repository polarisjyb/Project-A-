from db import code_to_data;

def calculate_avg(code):
    datas = code_to_data(code)
    temp = []
    # print(len(datas))
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
    # print(averge_value)
    # print(today)
    high = averge_value + (averge_value * 0.01)
    # low = averge_value - (averge_value * 0.01)
    if today >= high:
        return("매수") 
    else:
        return("매도")

print(proposal_result('003100')) 