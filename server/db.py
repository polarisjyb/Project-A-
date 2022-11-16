import pymysql as maria

# MySQL Connection 연결
conn = maria.connect(
  host='localhost',
  user='root',
  password='root',
  database='aitrading_db',
  port = 3307,
  charset='utf8',
  cursorclass = maria.cursors.DictCursor,
)

# Connection 객체로부터 Cursor 호출
# 실질적으로 데이터베이스에 SQL 문장을 수행하고, 조회된 결과를 가지고 오는 역할을 한다.
cursor = conn.cursor()

# Cursor 객체의 메서드를 사용하여 SQL을 DB서버에 전송
sql = "SELECT open, high, low, close, volume FROM kosdak_000250_m LIMIT 1"
cursor.execute(sql)

# 데이터 Fetch
# 조회된 결과 모두를 리스트 형태로 반환한다.
# 데이터가 없는 경우, 빈 리스트를 반환한다.
rows = cursor.fetchall()
print(rows)

# DB 연결 종료
conn.close()