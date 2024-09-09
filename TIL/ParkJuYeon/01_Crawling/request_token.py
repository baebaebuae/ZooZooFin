import requests
from pprint import pprint
import os
from dotenv import load_dotenv
import json

load_dotenv()

API_KEY = os.getenv('API_KEY')
API_SECRET = os.getenv('API_SECRET')

# print(API_KEY, API_SECRET)

domain = "https://openapi.koreainvestment.com:9443"
url = "/oauth2/tokenP"

headers = {
    "content-type": "application/json"
}

body = {
    "grant_type": "client_credentials",
    "appkey": API_KEY,
    "appsecret": API_SECRET
}

print(domain+url)
response = requests.post(url=domain+url, headers=headers, data=json.dumps(body))
# print(domain+url)
# print("Request Headers:", headers)
# print("Request Params:", params)
print("Response Status Code:", response.status_code)
print("Response Text:", response.text) 

if response.status_code == 200:
    data = response.json()  # JSON 응답을 파싱
    pprint(data)
    pprint(data.access_token)
else:
    print(f"Error: {response}")