from db import dbconn

# 코드에 따른 종목 이름과 종목 코드


def code_data(code):
    conn = dbconn()
    cur = conn.cursor()
    # 입력받은 코드와 일일치하는 테이블명 조회
    sql = 'SELECT TABLE_NAME FROM information_schema.tables WHERE TABLE_NAME LIKE "%'+code+'_d"'
    cur.execute(sql)
    # 테이블에 등록된 날짜가 가장 최근 것 부터 불러온다.
    company = cur.fetchone()
    sql = 'SELECT * FROM ' + company["TABLE_NAME"] + ' ORDER BY day DESC'
    cur.execute(sql)
    results = cur.fetchmany(100)
    conn.close()
    return results


def code_name(code):
    conn = dbconn()
    cur = conn.cursor()
    sql = "SELECT name FROM `companylist` WHERE code LIKE "+code+""
    cur.execute(sql)
    results = cur.fetchall()
    conn.close()
    return results

# 코드에 따른 데이터 불러오기
