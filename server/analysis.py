from db import code_to_data, code_to_name;

# print(type(code_to_data('000250')))
# print(code_to_name('000250'))

def calculate_avg(code):
    datas = code_to_data(code)
    temp = [];
    for i in range (len(datas)):
        avg = (datas[i]['open'] + datas[i]['high'] + datas[i]['low'] + datas[i]['close']) / 4 
        temp.append(avg)
    print(sum(temp)/100)
        
# calculate_avg('000250')

averge_value = calculate_avg('000250')

def proposal_result(today):
    high = averge_value + (averge_value * 0.03)
    low = averge_value - (averge_value * 0.03)
    if today >= high:
        print("매수")
    if today <= low:
        print("매도")
    else :
        print("판정이 어렵습니다.")
        
proposal_result(45800)