from flask import Flask
from db import code_to_data, code_to_name, all_company_name, companylist_rank
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['JSON_AS_ASCII'] = False


@app.route('/')
def main():
    return 'Hello, World!'


@app.route('/<code>')
def get_data(code):
    name = code_to_name(code)
    data = code_to_data(code)
    return [name, data]


@app.route('/companylist')
def allCompanyList():
    data = all_company_name()
    return data


@app.route('/rank')
def companylistRank():
    data = companylist_rank()
    return data


if __name__ == '__main__':
    app.run(debug=True)
