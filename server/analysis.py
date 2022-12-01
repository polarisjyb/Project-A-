from db import code_to_data, algorithm_avg, algorithm_year;

def calculate_avg(code):
    datas = code_to_data(code)
    temp = [];
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

def reco_trading(code):
    avg = algorithm_avg(code)
    allD = algorithm_year(code)
    count_open = 0
    count_close = 0
    count_high = 0
    count_low = 0

    for index, value in enumerate(allD):
        # print(index)
        # print(allD[index])
        print(index, value)

        if value["OPEN"] >= avg[0]["avg_open"]:
            count_open += 1
        else: 
            count_open -= 1
        
        if value["CLOSE"] >= avg[0]["avg_close"]:
            count_close += 1
        else: 
            count_close -= 1

        if value["HIGH"] >= avg[0]["avg_high"]:
            count_high += 1
        else: 
            count_high -= 1
        
        if value["LOW"] >= avg[0]["avg_low"]:
            count_low += 1
        else: 
            count_low -= 1
        
    percentOpen = count_open /len(allD) * 100
    percentClose = count_close/len(allD) * 100
    percentLow = count_high/len(allD) * 100
    percentHigh = count_high/len(allD) * 100

    count_sum = 2
    if percentOpen >= 80: 
        count_sum += 1
    else:
        count_sum -= 1
    
    if percentClose >= 80: 
        count_sum += 1
    else:
        count_sum -= 1
    
    if percentLow >= 80: 
        count_sum += 1
    else:
        count_sum -= 1

    if percentHigh >= 80: 
        count_sum += 1
    else:
        count_sum -= 1

    results = "존버! 존버는 승리한다!"
    
    if count_sum >= 2:
        results = "매수추천"
    else :
        results = "매도추천"

    

    return results