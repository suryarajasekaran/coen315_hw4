from flask import Flask, request
from flask_restful import Api
from flask_cors import CORS, cross_origin
import json
import requests

origin_str = "*" # 'http://suryarajasekaran.com:8882'
app = Flask(__name__)
api = Api(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config["CORS_SUPPORTS_CREDENTIALS"]=True
app.config["CORS_ALLOW_HEADERS"] = True
app.config["CORS_EXPOSE_HEADERS"] = True
CORS(app, resources={r"/*": {"origins": origin_str}})

@app.route('/ping')
@cross_origin(origin=origin_str)
def ping():
    return json.dumps({"status":True})

@app.route('/station')
@cross_origin(origin=origin_str)
def station():
    arg_source = request.args.get('source')
    if arg_source is None:
        return json.dumps({"status": False})
    else:
        url="http://api.bart.gov/api/stn.aspx?cmd=stninfo&orig="+arg_source+"&key=MW9S-E7SL-26DU-VV8V&json=y"
        response = requests.get(url)
        return json.dumps({"data": response.json()["root"]["stations"]["station"]})

@app.route('/stations')
@cross_origin(origin=origin_str)
def stations():
    url="http://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V&json=y"
    response = requests.get(url)
    return json.dumps({"data":response.json()["root"]["stations"]["station"]})

@app.route('/trips')
@cross_origin(origin=origin_str)
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
@cross_origin(origin=origin_str)
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
  #response.headers.add('Access-Control-Allow-Origin', request.headers.get('Origin', origin_str))
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  #response.headers.add('Access-Control-Allow-Credentials', 'true')
  return response

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8881, debug=True)
