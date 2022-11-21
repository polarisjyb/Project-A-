import pymysql as maria

# MySQL Connection 연결
def dbconn():
    conn = maria.connect(
      host='localhost',
      user='root',
      password='root',
      database='aitrading_db',
      port = 3307,
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
    sql = 'SELECT * FROM '+ company["TABLE_NAME"] +' ORDER BY day DESC' 
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

def companylist_rank():
    conn = dbconn()
    cur = conn.cursor()
    sql = 'SELECT market, code, name FROM `aitrading_db`.`companylist`'
    cur.execute(sql)
    results = cur.fetchall()
    
    voidArray = []
    for i in range(len(results)):
        market = results[i]['market']
        code = results[i]['code']
        sqlNext = f'SELECT open, high, low, close, volume FROM {market}_{code}_d ORDER BY DAY DESC, `day` ASC LIMIT 1'
        cur.execute(sqlNext)
        resultsTwo = cur.fetchall()
        if(resultsTwo):
            voidArray.append(resultsTwo)
            
    print(voidArray)

    conn.close()
    return voidArray

