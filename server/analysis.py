from db import code_to_data, dbconn, algorithm_avg, algorithm_year;

# 화연 전략코드
# 최근 100일간의 시,고,저,종가의 평균값과 오늘의 시가를 비교
# 1% 이상 증가하면 매수, 아니면 매도를 추천
def calculate_avg(code):
    datas = code_to_data(code)
    temp = []
    # print(len(datas))
    for i in range(len(datas)):
        avg = (datas[i]['open'] + datas[i]['high'] +
        datas[i]['low'] + datas[i]['close']) / 4
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
        return ["증가", "매수"]
    else:
        return ["감소", "매도"]

# 연주 전략코드
def yj_strategy(code):
    conn = dbconn()
    cur = conn.cursor()
    sql1 = f'SELECT companylist.code, name, volume,day FROM aitrading_db.kospi_{code}_m AS api INNER JOIN aitrading_db.companylist ON companylist.code = api.code ORDER BY DAY DESC limit 5;'
    #  companylist테이블의 코드와 aitrading_db 테이블의 데이터가 존재할때,
    # code, name, volume, day를 불러온다.
    # 조건은 day기준으로 다섯개만 불러온다.
    cur.execute(sql1)
    result = cur.fetchall()
    conn.close()
    volume = []
    for key in result:
        print(key)
        volume.append(key.get('volume'))
    # 가장 최신의 평균량(2월)은 사용하지 않아서 배열에서 제거
    del volume[0]
    average = volume[1] + volume[2] + volume[3] / 3
    if (average <= volume[0]):
        return "매수"
    else:
        return "매도"

# 영빈 전략
# 최근 1주일 동안의 시, 고, 종, 저 가격의 평균 값이 분기 단위 (3개월) 시가, 고가, 종가, 저가의 평균 값과 같거나 0.01% 이상 높으면 매수, 낮으면 매도를 추천한다.


def yb_strategy(code):
    conn = dbconn()
    cur = conn.cursor()
    sql1 = f'SELECT companylist.code, name, open, high, low, close, day FROM aitrading_db.kospi_{code}_m AS api INNER JOIN aitrading_db.companylist ON companylist.code = api.code ORDER BY DAY DESC limit 4;'
    cur.execute(sql1)
    result = cur.fetchall()
    sql2 = f'SELECT companylist.code, name, open, high, low, close, day FROM aitrading_db.kospi_{code}_d AS api INNER JOIN aitrading_db.companylist ON companylist.code = api.code ORDER BY DAY DESC limit 7;'
    cur.execute(sql2)
    result2 = cur.fetchall()

    # 최근 1주일
    priceWeek = []
    for i in range(len(result2)):
        weekAverage = (result2[i]['open'] + result2[i]['high'] +
                       result2[i]['low'] + result2[i]['close']) / 4

    priceWeek.append(weekAverage)

    print(priceWeek[0])

    # 분기
    priceQuarter = []
    for i in range(len(result)):
        QuarteAaverage = (result[i]['open'] + result[i]
                          ['high'] + result[i]['low'] + result[i]['close']) / 4

    priceQuarter.append(QuarteAaverage)
    # print(round(priceQuarter))
    print(priceQuarter[0])

    conn.close()

    if (priceWeek[0] >= (priceQuarter[0] + priceQuarter[0] * 0.01)):
        return "매수"
    else:
        return "매도"

# 민호 전략
# 각 종목의 시,고,종,저 데이터를 전체기간 평균가를 최근 6년간 일일 데이터와 비교를 해서 상승률이 80퍼센트 이상인 데이터가 2개 이상일 매수 추천 아닐경우 매도추천
# 이유: 지난 6년간 평균가보다 높은 상승률이 지속이 된다면 그 회사는 꾸준히 성장을 하고있는 회사라 할 수 있다 그러므로 회사의 안정성이 보장됨을 의미한다.

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
        # print(index, value)

        if value["OPEN"] >= avg["avg_open"]:
            count_open += 1
        else: 
            count_open -= 1
        
        if value["CLOSE"] >= avg["avg_close"]:
            count_close += 1
        else: 
            count_close -= 1

        if value["HIGH"] >= avg["avg_high"]:
            count_high += 1
        else: 
            count_high -= 1
        
        if value["LOW"] >= avg["avg_low"]:
            count_low += 1
        else: 
            count_low -= 1
        
    percentOpen = count_open /len(allD) * 100
    percentClose = count_close/len(allD) * 100
    percentLow = count_high/len(allD) * 100
    percentHigh = count_high/len(allD) * 100

    count_sum = 0
    if percentOpen >= 80: 
        count_sum += 1    
    
    if percentClose >= 80: 
        count_sum += 1    
    
    if percentLow >= 80: 
        count_sum += 1    

    if percentHigh >= 80: 
        count_sum += 1    
    
    if count_sum >= 2:
        return ["매수"]
    else :
        return ["매도"]

# 전체 전략코드
def all_strategy(code):
    def strategy(deff):
        maesu = 0
        maedo = 0
        if (deff == "매수"):
            maesu = maesu + 1
        else:
            maedo = maesu + 1
        return [maesu, maedo]
    st1 = strategy(yj_strategy(code))
    st2 = strategy(proposal_result(code))
    st3 = strategy(yb_strategy(code))
    st4 = strategy(reco_trading(code))
    allSt = [st1[i] + st2[i] + st3[i] + st4[i] for i in range(len(st1))]
    return allSt

# print(all_strategy('000020'))
# print(proposal_result('003100')) 