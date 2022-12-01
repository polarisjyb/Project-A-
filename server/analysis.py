from db import code_to_data, dbconn

# 화연님 전략코드


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
        return ("매수")
    else:
        return ("매도")


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
    allSt = [st1[i] + st2[i] + st3[i] for i in range(len(st1))]
    return allSt


# print(all_strategy('000020'))
