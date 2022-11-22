import pymysql as maria

# MySQL Connection 연결


def dbconn():
    conn = maria.connect(
        host='localhost',
        user='root',
        password='pass',
        database='aitrading_db',
        port=3000,
        charset='utf8',
        cursorclass=maria.cursors.DictCursor,
    )
    return conn


def code_to_data(code):
    conn = dbconn()
    cur = conn.cursor()
    sql = 'SELECT TABLE_NAME FROM information_schema.tables WHERE TABLE_NAME LIKE "%'+code+'_d"'
    # 입력받은 코드와 일치하는 테이블명 조회
    cur.execute(sql)
    company = cur.fetchone()
    sql = 'SELECT * FROM ' + company["TABLE_NAME"] + ' ORDER BY day DESC'
    # 테이블에 등록된 날짜가 가장 최근 것부터 불러온다
    cur.execute(sql)
    results = cur.fetchmany(100)
    conn.close()
    return results


def code_to_name(code):
    conn = dbconn()
    cur = conn.cursor()
    sql = 'SELECT name FROM `companylist` WHERE code LIKE "'+code+'"'
    cur.execute(sql)
    results = cur.fetchall()
    conn.close()
    return results


def code_to_code(code):
    conn = dbconn()
    cur = conn.cursor()
    sql = 'SELECT code FROM `companylist` WHERE code LIKE "'+code+'"'
    cur.execute(sql)
    results = cur.fetchall()
    conn.close()
    return results


def all_company_name():
    conn = dbconn()
    cur = conn.cursor()
    sql = 'SELECT market, code, name FROM `aitrading_db`.`companylist`'
    cur.execute(sql)
    results = cur.fetchall()
    conn.close()

    company = []
    for i in range(len(results)):
        code = results[i]['code']
        market = results[i]['market']
        name = results[i]['name']

        sql2 = f'SELECT open, high, low, close, volume FROM {market}_{code}_d ORDER BY DAY DESC, `day` ASC LIMIT 1'

    return results

# 주식 종목 최신 일자 시가 고가 종가 저가 거래량 데이터 출력


def companylist_rank():
    conn = dbconn()
    cur = conn.cursor()
    sql = 'SELECT market, code, name FROM `aitrading_db`.`companylist`'
    cur.execute(sql)
    results = cur.fetchall()

    # 빈 배열에 results 값을 넣어서 다시 for in 문으로 돌립니다.
    # 시가, 고가, 저가, 종가, 거래량을 최신 일자 기준으로 모든 종목의 market 과 code를 문자열로 지정하고
    # 어떤 종목이 오더라도 값이 출력되도록 했습니다.
    # append는 자바스크립트 배열 메서드 push 라고 생각하시면 됩니다.
    rankArray = []
    for i in range(len(results)):
        market = results[i]['market']
        code = results[i]['code']

        sqlNext = f'SELECT open, high, low, close, volume FROM {market}_{code}_d ORDER BY DAY DESC, `day` ASC LIMIT 1'

        cur.execute(sqlNext)
        resultsTwo = cur.fetchall()
        if (resultsTwo):
            rankArray.append(resultsTwo)

    print(rankArray)

    conn.close()
    return rankArray


def markets():  # 함수이름
    conn = dbconn()
    cur = conn.cursor()  # Db Connector (객체화 하기위해 객체 메서드(DictCursor) 심어줌)
    sql_market = f"SELECT market,code,name FROM CompanyList "
    cur.execute(sql_market)  # Kospi Kosdak에 따른 테이블 리스트 불러오려함
    result = cur.fetchall()  # 리스트불러온걸 result에 담음
    data_stack = list()  # 빈배열선언
    for i in range(len(result)):  # for문 돌려서
        code = result[i]["code"]  # 종목 코드 변수에담음
        market = result[i]["market"]  # 종목 마켓(kospi kosdak)을 담아줌
        sql_join = f'SELECT companylist.code AS code,market,name,high,low,close,volume,day FROM {market}_{code}_d AS api INNER JOIN companylist ON companylist.code = api.code'
        cur.execute(sql_join)  # market과 code 매개변수를 뚫어줘서 변수에 담음값을 돌려서 for문을돌리고
        res2 = cur.fetchall()  # 리스트를 res2에담은후
        data_stack.append(res2)  # 빈배열에 담아줌
    return data_stack


# def get_api():  # 1. 함수이름

#     conn = dbconn()
#     # 프론트에서 이제 이름을 받아오는 걸 설정해주면 됨
#     # SQL문으로 Companylist DB 조회"
#     cur = conn.cursor()
#     sql = f'SELECT code,market,name FROM companylist'
#     cur.execute(sql)
#     result = cur.fetchall()  # 2. 조회한 데이터를 변수에 담아준다
#     # 조회한 DB에서 code, market, name을 변수로 지정

#     data = list()  # 3. 빈배열 선언
#     for i in range(len(result)):  # 3. for문을 돌림 len(조회한데이터를 담은 변수)
#         code = result[i]["code"]  # 필드명이 코드인 데이터를담음
#         market = result[i]["market"]  # 필드명이 마켓인 데이터를 담음
#         name = result[i]["name"]
#         print([code], [market], [name])
#         # 4. 일단 찍어본다(아마 쭈르르르륵 나올거당)
#         sql2 = f'ALTER TABLE {market}_{code}_ ADD code VARCHAR(15) DEFAULT "{code}"'
#         cur.execute(sql2)
#         conn.commit()
#         # 5. ALTER문으로 필드를 넣어준다 데이터가 들어가는 예시 ex) ALTER TABLE KOSPI_000020_m code VARCHAR(15) DEFAULT "000020"
#         # 7. DB에 들어가서 들어갔는지 확인해 준다.
#         # 8. 데이터가 들어가면 저 쿼리문을 바꿔서 넣어준다 m,d,r,f => 다넣어준후 저 쿼리문은 버린다 (데이터가 또들어가면 안되기 때문에.)

#     return result
