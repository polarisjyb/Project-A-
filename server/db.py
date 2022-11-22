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
        cursorclass = maria.cursors.DictCursor,
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

def all_company_name():
    conn = dbconn()
    cur = conn.cursor()
    sql = 'SELECT * FROM `aitrading_db`.`companylist`'
    cur.execute(sql)
    results = cur.fetchall()
    conn.close()
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
        if(resultsTwo):
            rankArray.append(resultsTwo)
            
    print(rankArray)

    conn.close()
    return rankArray

