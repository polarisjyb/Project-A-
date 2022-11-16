# Flask 모듈 가져오기
from flask import Flask

app = Flask(__name__)

@app.route('/')
@app.route('/home')
def home():
    return 'Hello, World!'

@app.route('/user')
def user():
    return 'Hello, 부엉!'

  # 현재 작성된 파이썬 파일이 메인으로 실행되는 파일이면 app.run을 수행하라는 구문 입니다.
  # 해당 코드 밑에 함수 호출 코드를 작성해서 함수의 기능을 수행합니다.
if __name__ == '__main__':
    app.run(debug=True)
    # app.run() 괄호 안에 debug=True 라고 명시하면 해당 파일의 코드를 수정할 때마다 Flask가
    # 변경된 것을 인식하고 다시 시작한다.
    
"""
  파이썬 def 함수 문법입니다.
  그냥 def 쓰고 작명하고 () : 붙이고 indent(실행문 들여쓰기) 넣으면 함수를 하나 만들 수 있습니다.
  하지만 이런거 배웠다고 실제 코딩할 때 def 라는 문법을 쓸 수는 없습니다.
  영어단어 몇 개 배웠다고 바로 회화할 수 있는거 아니니까요.
  이것을 언제 써야할지 인지해야 비로소 활용이 가능합니다.
  
  함수는 꼭 써야하는 문법은 아니지만 긴 코드를 짧게 축약할 때 유용합니다.
  덧붙이자면 파이썬 함수는 고등학교 때 배우는 함수와 똑같습니다.
  ex) f(x) = 2 + x      f(2) = 4
"""