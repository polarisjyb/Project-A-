from flask import Flask
from flask_cors import CORS
from db import code_to_data, code_to_name, all_company_name, companylist_rank, stock_info, yj_strategy, data_for_chart_w, data_for_chart_m, data_for_chart_q, data_for_chart_y

app = Flask(__name__)
CORS(app)
app.config['JSON_AS_ASCII'] = False


@app.route('/')
def main():
    return 'Hello, World!'

# @app.route('/<code>')
# def get_data(code):
#     name = code_to_name(code)
#     data = code_to_data(code)
#     return [name, data]

@app.route('/companylist')
def allCompanyList():
    data = all_company_name()
    return data

@app.route('/rank')
def companylistRank():
    data = companylist_rank()
    
    return data

# 모든 회사 정보와 랜덤 회사 정보 가져오는 라우트
# @app.route('/companylist')
# def allCompanyList():
#     data = all_company_name('all')
#     return data

# @app.route('/companylist/random')
# def randomCompanyList():
#     data = all_company_name('random')
#     return data


# code에 따른 주식 정보를 불러온다.

@app.route('/<code>')
def info(code):
    data = stock_info(code)
    return data

# code에 따른 주식 정보를 불러온다.
# momth별 데이터 5개를 불러오도록 하였다.


@app.route('/yj/<code>')
def yj(code):
    data = yj_strategy(code)
    return data

@app.route('/chart_w/<chart>')
def code_w(chart):
    data = data_for_chart_w(chart)
    return data

@app.route('/chart_m/<chart>')
def code_m(chart):
    data = data_for_chart_m(chart)
    return data

@app.route('/chart_q/<chart>')
def code_q(chart):
    data = data_for_chart_q(chart)
    return data

@app.route('/chart_y/<chart>')
def code_y(chart):
    data = data_for_chart_y(chart)
    return data

if __name__ == '__main__':
    app.run(debug=True)
