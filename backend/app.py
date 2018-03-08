from flask import Flask, request
from flask_restful import Api
from flask_cors import CORS, cross_origin
import json
import requests

app = Flask(__name__)
api = Api(app)
CORS(app)

@app.route('/ping')
def ping():
    return json.dumps({"status":True})

@app.route('/station')
def station():
    arg_source = request.args.get('source')
    if arg_source is None:
        return json.dumps({"status": False})
    else:
        url="http://api.bart.gov/api/stn.aspx?cmd=stninfo&orig="+arg_source+"&key=MW9S-E7SL-26DU-VV8V&json=y"
        response = requests.get(url)
        return json.dumps({"data": response.json()["root"]["stations"]["station"]})

@app.route('/stations')
def stations():
    url="http://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V&json=y"
    response = requests.get(url)
    return json.dumps({"data":response.json()["root"]["stations"]["station"]})

@app.route('/trips')
def trips():
    arg_source = request.args.get('source')
    arg_dest = request.args.get('dest')
    if arg_source is None or arg_source is None:
        return json.dumps({"status": False})
    else:
        #url_fare="http://api.bart.gov/api/sched.aspx?cmd=fare&orig=12th&dest=embr&date=today&key=MW9S-E7SL-26DU-VV8V&json=y"
        #url_etd = "http://api.bart.gov/api/etd.aspx?cmd=etd&orig=" + arg_source + "&key=MW9S-E7SL-26DU-VV8V&json=y"
        url_eta = "http://api.bart.gov/api/sched.aspx?cmd=depart&orig=" + arg_source + "&dest=" + arg_dest + "&key=MW9S-E7SL-26DU-VV8V&a=4&b=0&json=y"
        response = requests.get(url_eta)
        return json.dumps({"data":response.json()["root"]["schedule"]["request"]["trip"]})

@app.route('/etd') #not used in code yet
def etd():
    arg_source = request.args.get('source')
    if arg_source is None:
        return json.dumps({"status": False})
    else:
        url_etd = "http://api.bart.gov/api/etd.aspx?cmd=etd&orig="+arg_source+"&key=MW9S-E7SL-26DU-VV8V&json=y"
        response = requests.get(url_etd)
        return json.dumps({"data":response.json()["root"]["station"]})

@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', 'http://suryarajasekaran:8882')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  response.headers.add('Access-Control-Allow-Credentials', 'true')
  return response

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8881, debug=True)
