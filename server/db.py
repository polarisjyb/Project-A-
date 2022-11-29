import pymysql as maria
from flask import jsonify

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
    sql2 = 'SELECT * FROM ' + company["TABLE_NAME"] + ' ORDER BY DAY DESC'

    # 테이블에 등록된 날짜가 가장 최근 것부터 불러온다
    cur.execute(sql2)
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


def all_company_name():
    conn = dbconn()
    cur = conn.cursor()
    sql = 'SELECT * FROM `aitrading_db`.`companylist`'
    cur.execute(sql)
    results = cur.fetchall()

# def all_company_name(code):
#     conn = dbconn()
#     cur = conn.cursor()
#     if code == 'all':
#         sql = 'SELECT name, code FROM `aitrading_db`.`companyList`'
#         cur.execute(sql)
#         results = cur.fetchall()
#     elif code == 'random':
#         sql = 'SELECT name, code FROM `aitrading_db`.`companyList` WHERE market = "KOSPI" ORDER BY RAND()'
#         cur.execute(sql)
#         results = cur.fetchmany(100)
#     else:
#         sql = f'SELECT name, code FROM `aitrading_db`.`companyList` WHERE code LIKE "%{code}%"'
#         cur.execute(sql)
#         results = cur.fetchmay(100)

    conn.close()
    return results

# code 입력시 /code 페이지에 해당 코드의 주식데이터 출력


def stock_info(code):
    conn = dbconn()
    cur = conn.cursor()
    sql1 = f'SELECT companylist.code, name , market, open, high, low, close, volume, day  FROM aitrading_db.kospi_{code}_d AS api INNER JOIN aitrading_db.companylist ON companylist.code = api.code ORDER BY DAY DESC limit 2;'
    # companylist테이블의 코드와 aitrading_db 테이블의 데이터가 존재할때,
    # code, name, market, open, high, low, close, volume, day를 불러온다.
    # 조건은 최신순으로 두개만 불러온다.
    cur.execute(sql1)
    result = cur.fetchall()
    conn.close()
    return result


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
        name = key.get('name')
    # 가장 최신의 평균량(2월)은 사용하지 않아서 배열에서 제거
    del volume[0]
    average = volume[1] + volume[2] + volume[3] / 3
    if (average <= volume[0]):
        return [name, "매수"]
    else:
        return [name, "매도"]


def data_for_chart_w(chart):
    conn = dbconn()
    cur = conn.cursor()
    # sql = f'SELECT open,high,low,close,DATE_FORMAT(day, "%Y-%m-%d") as day FROM {code}'
    sql = f'SELECT TABLE_NAME FROM information_schema.tables WHERE TABLE_NAME LIKE "%{chart}_d"'
    cur.execute(sql)
    company = cur.fetchone()
    sql = f'SELECT no, open, high, low, close, volume, DATE_FORMAT(day, "%Y-%m-%d") as day FROM {company["TABLE_NAME"]} ORDER BY day DESC'
    cur.execute(sql)
    results = cur.fetchmany(42)
    conn.close()
    return results


def data_for_chart_m(chart):
    conn = dbconn()
    cur = conn.cursor()
    # sql = f'SELECT open,high,low,close,DATE_FORMAT(day, "%Y-%m-%d") as day FROM {code}'
    sql = f'SELECT TABLE_NAME FROM information_schema.tables WHERE TABLE_NAME LIKE "%{chart}_m"'
    cur.execute(sql)
    company = cur.fetchone()
    sql = f'SELECT no, open, high, low, close, volume, DATE_FORMAT(day, "%Y-%m-%d") as day FROM {company["TABLE_NAME"]} ORDER BY day DESC'
    cur.execute(sql)
    results = cur.fetchmany(7)
    conn.close()
    return results


def data_for_chart_q(chart):
    conn = dbconn()
    cur = conn.cursor()
    # sql = f'SELECT open,high,low,close,DATE_FORMAT(day, "%Y-%m-%d") as day FROM {code}'
    sql = f'SELECT TABLE_NAME FROM information_schema.tables WHERE TABLE_NAME LIKE "%{chart}_m"'
    cur.execute(sql)
    company = cur.fetchone()
    sql = f'SELECT no, open, high, low, close, volume, DATE_FORMAT(day, "%Y-%m-%d") as day FROM {company["TABLE_NAME"]} ORDER BY day DESC'
    cur.execute(sql)
    results = cur.fetchmany(21)
    conn.close()
    return results


def data_for_chart_y(chart):
    conn = dbconn()
    cur = conn.cursor()
    # sql = f'SELECT open,high,low,close,DATE_FORMAT(day, "%Y-%m-%d") as day FROM {code}'
    sql = f'SELECT TABLE_NAME FROM information_schema.tables WHERE TABLE_NAME LIKE "%{chart}_m"'
    cur.execute(sql)
    company = cur.fetchone()
    sql = f'SELECT no, open, high, low, close, volume, DATE_FORMAT(day, "%Y-%m-%d") as day FROM {company["TABLE_NAME"]} ORDER BY day DESC'
    cur.execute(sql)
    results = cur.fetchmany(72)
    conn.close()
    return results

    # 주식 종목 최신 일자 시가 고가 종가 저가 거래량 데이터 출력

    """ 
    1. 회사
    2. 금일 종목
    3. 전일 종목
    회사 = [{알파}, {브라보}]
    금일 = [{A}, {B}]
    전일 = [{1}, {2}]
    
    결과 = [{알파, A, 1}], [{브라보, B, 2}]
    """


def companylist_rank():
    conn = dbconn()
    cur = conn.cursor()
    sql = 'SELECT market, code, name FROM `aitrading_db`.`companylist`'
    cur.execute(sql)
    results = cur.fetchmany(50)
    # print(results)
    # 주가 종목의 최신 일자, 전일자 정보 ( 시가, 고가, 저가, 종가, day, code )
    rankArray = []

    # 빈 배열에 results 값을 넣어서 다시 for in 문으로 돌립니다.
    # 시가, 고가, 저가, 종가, 거래량을 최신 일자 기준으로 모든 종목의 market 과 code를 문자열로 지정하고
    # 어떤 종목이 오더라도 값이 출력되도록 했습니다.
    # append는 자바스크립트 배열 메서드 push 라고 생각하시면 됩니다.
    for i in range(len(results)):
        market = results[i]['market']
        code = results[i]['code']

        # 1번 이미 데이터에는 컬럼 추가가 끝난 상태이므로 실행 안해도 됩니다.
        # 각 d(day)로 끝나는 테이블에 CODE 라는 컬럼을 추가해서 그 안에 테이블 명 에 있는 code 값을 모든 행에 대입한다.
        # ex) kospi_000100_d 라는 테이블에 CODE 컬럼 추가 및 그 CODE 컬럼 안에 테이블 명 코드, 000100을 추가.
        # sqlNext = f' ALTER TABLE {market}_{code}_d ADD code VARCHAR(15) DEFAULT "{code}" '

        # 테이블에서 CODE 라는 컬럼 삭제
        # sqlNext = f' ALTER TABLE {market}_{code}_m DROP code '

        # 2번 최신 일자, 전일자( 2022-01-28 일과 2022-01-27일 ) 사이에 있는 day 값의 code가 companylist의 code와 일치하는 행을 합쳐서 그 행의 정보를 가져옵니다.
        sqlNext = f'SELECT companylist.code AS code, market, name, open, high, low, close, volume, day FROM {market}_{code}_d AS api INNER JOIN companylist ON companylist.code = api.code WHERE day BETWEEN date("2022-01-27") AND date("2022-01-28")+1 ORDER BY day DESC LIMIT 2'
        cur.execute(sqlNext)
        resultsTwo = cur.fetchall()
        # print(resultsTwo)
        if (resultsTwo):
            rankArray.append(resultsTwo)

    print("연결중")

    # conn.commit() 은 동적으로 실제 DB 테이블에 반영하는 메서드 입니다.
    # ALTER 문으로 새로운 컬럼을 생성해줬기 때문에, '이 메서드를 사용해서 내가 가지고 있는 DB 테이블에 적용한다' 라는 뜻이라고 보시면 됩니다.
    # 실제 SQL 파일 실행 소프트웨어(HeidiSQL, MYSQL 등)의 전체 테이블을 감싸는 DB를 클릭후 쿼리문에 COMMIT; 이라 작성후 F5를 눌러서 새로 고침 하거나 다시 실행하면 반영이 됩니다.
    conn.commit()
    conn.close()

    # 출력되는 값과 데이터 확인
    # print(rankArray[0])
    # print(rankArray[0][0])
    # print(type(rankArray))

    # print(type(rankArray[0][0]))
    # print(type(rankArray[0][0]['day']))
    # print(rankArray[0][0]['day'])

    #  json 형식으로 가져오기

    # return rankArray

    # str 형식으로 가져오기
    # return str(rankArray)
    test = jsonify(rankArray)
    # print(test)
    return test

    # str 형식으로 가져오기
    # return str(rankArray)

    """
        #  영빈 생각
        
        # 1번 {market}_{code}_d 모든 테이블에 RECENT 컬럼을 추가 한다.
        # sqlNext = f'ALTER TABLE {market}_{code}_d ADD COLUMN RECENT VARCHAR(1)'
        
        # 2번 {market}_{code}_d 모든 테이블의 컬럼에 있는 가장 큰 NO의 RECENT 컬럼에 1을 추가한다. ( 가장 최신 일자가 NO가 가장 큼 )
        # sqlNext = f'UPDATE {market}_{code}_d SET RECENT = "1" WHERE NO = (SELECT MAX(NO) FROM {market}_{code}_d)'
        
        # 3번 {market}_{code}_d 모든 테이블의 컬럼에 있는 NO가 가장 크지 않은 컬럼들의 RECENT 컬럼에 2을 추가한다. ( 가장 최신 일자 제외 모든 일자의 RECENT 값에 2가 들어감 )
        # 문제점: 중간 일자의 주가 정보( 시가, 고가, 저가, 종가, 거래량 등 )을 가져오기가 힘듦.
        # sqlNext = f'UPDATE {market}_{code}_d SET RECENT = "2" WHERE NO != (SELECT MAX(NO) FROM {market}_{code}_d)'
        
        # 4번 {market}_{code}_d 모든 테이블의 RECENT 컬럼 값이 1인 행 (가로) 을 가져온다. ( 최신 일자 )
        # sqlNext = f' SELECT day, open, high, low, close, volume, RECENT FROM {market}_{code}_d WHERE RECENT = "1" '
        
        # 3번 {market}_{code}_d 모든 테이블의 RECENT 컬럼 값이 2인 행 (가로) 을 가져오는데 내림차 순으로 1개의 행만 가져온다. ( 최신 전일자 )
        # sqlNext = f' SELECT day, open, high, low, close, volume, RECENT FROM {market}_{code}_d WHERE RECENT = "2" ORDER BY NO DESC LIMIT 1 '
    """

    # LIMIT 1 값으로 주었을 때는 정상(?) 조인이 됨.. LIMIT 2 값으로 주게 되면 엉망진창..
    # for i in range(len(results)):
    #     market = results[i]['market']
    #     code = results[i]['code']
    #     sqlNext = f'ALTER TABLE {market}_{code}_d ADD COLUMN new VARCHAR(1)'
    #     # sqlNext = f'SELECT * FROM {market}_{code}_d ORDER BY DAY DESC LIMIT 1'
    #     cur.execute(sqlNext)
    #     resultsTwo = cur.fetchall()
    #     if (resultsTwo):
    #         rankArray.extend(resultsTwo)
    #     #     for j in zip(results, rankArray):
    #     #         print(j)
    #     # stockArray.append(j)
    # print(rankArray)

    # conn.commit()
