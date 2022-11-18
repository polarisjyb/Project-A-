from flask import Flask
from db import code_to_data, code_to_name

app = Flask(__name__)

@app.route('/')
def main():
    return 'Hello, World!'
  
@app.route('/<code>')
def get_data(code):
    name = code_to_name(code)
    data = code_to_data(code)
    return [name, data]
  
if __name__ == '__main__':
    app.run(debug=True)