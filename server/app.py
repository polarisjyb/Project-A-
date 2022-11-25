from flask import Flask
from flask_cors import CORS
from db import code_to_data, code_to_name, all_company_name, companylist_rank, stock_info, yj_strategy

app = Flask(__name__)
CORS(app)
app.config['JSON_AS_ASCII'] = False


@app.route('/')
def main():
    return 'Hello, World!'

<<<<<<< HEAD

=======
>>>>>>> ff94eb711472a0932be18e2aff6037ee39e2d315
# @app.route('/<code>')
# def get_data(code):
#     name = code_to_name(code)
#     data = code_to_data(code)
#     return [name, data]
<<<<<<< HEAD

=======
  
>>>>>>> ff94eb711472a0932be18e2aff6037ee39e2d315

@app.route('/companylist')
def allCompanyList():
    data = all_company_name()
    return data

<<<<<<< HEAD

@app.route('/rank')
def companylistRank():
    data = companylist_rank()

=======
# @app.route('/companylist')
# def allCompanyList():
#     data = all_company_name('all')
#     return data

# @app.route('/companylist/random')
# def randomCompanyList():
#     data = all_company_name('random')
#     return data
  
  
  
@app.route('/rank')
def companylistRank():
    data = companylist_rank()
>>>>>>> ff94eb711472a0932be18e2aff6037ee39e2d315
    return data


@app.route('/<code>')
def info(code):
    data = stock_info(code)
    return data


@app.route('/yj/<code>')
def yj(code):
    data = yj_strategy(code)
    return data


if __name__ == '__main__':
    app.run(debug=True)
