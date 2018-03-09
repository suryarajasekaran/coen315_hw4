from flask import Flask, render_template
from flask_restful import Api
import json

app = Flask(__name__)
api = Api(app)

@app.route('/ping')
def ping():
    return json.dumps({"status":True})

@app.route('/')
@app.route('/home')
def home():
    return render_template("home.html")

@app.route('/widget')
def widget():
    return render_template("widget.html")

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8882, debug=True)
