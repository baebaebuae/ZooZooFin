import requests
from pprint import pprint
import os
from dotenv import load_dotenv
import json

load_dotenv()

API_KEY = os.getenv("API_KEY")
API_SECRET = os.getenv("API_SECRET")
TOKEN = os.getenv("TOKEN")

domain = "https://openapi.koreainvestment.com:9443"
url = "/uapi/domestic-stock/v1/quotations/inquire-daily-itemchartprice"

headers = {
    "content-type": "application/json; charset=utf-8",
    "authorization": f"Bearer {TOKEN}",
    "appkey": API_KEY,
    "appsecret": API_SECRET,
    "tr_id": "FHKST03010100",
}

params = {
    "FID_COND_MRKT_DIV_CODE": "J",
    "FID_INPUT_ISCD": "069500",
    "FID_INPUT_DATE_1": "20220101", # 시작일
    "FID_INPUT_DATE_2": "20221230", # 종료일
    "FID_PERIOD_DIV_CODE": "W",
    "FID_ORG_ADJ_PRC": "1"
}

response = requests.get(url=domain+url, headers=headers, params=params)

print("Response Status Code:", response.status_code)
# print("Response Text:", response.text)

if response.status_code == 200:
    data = response.json()  # JSON 응답을 파싱
    pprint(data)
    result = data["output2"]
    # pprint(result)
else:
    print(f"Error: {response}")