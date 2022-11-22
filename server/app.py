from flask import Flask
from db import code_to_data, code_to_name, all_company_name, companylist_rank, code_to_code, markets
from flask_cors import CORS
import certifi
ca = certifi.where()

app = Flask(__name__)
CORS(app)
app.config['JSON_AS_ASCII'] = False


@app.route('/')
def main():
    return 'Hello, World!'


@app.route('/<code>')
def get_data(code):
    name = code_to_name(code)
    name_code = code_to_code(code)
    data = code_to_data(code)
    return [name, name_code, data]


@app.route('/companylist')
def allCompanyList():
    data = all_company_name()
    return data


@app.route('/rank')
def companylistRank():
    data = companylist_rank()
    return data


@app.route('/market')
def market():
    data = markets()
    return data


if __name__ == '__main__':
    app.run(debug=True)
