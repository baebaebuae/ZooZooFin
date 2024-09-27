import requests
from pprint import pprint
import os
from dotenv import load_dotenv
import json
import pandas as pd
from datetime import datetime, timedelta

# 환경 변수 로드
load_dotenv()

API_KEY = os.getenv('KOREA_EXIM_API_KEY')

domain = "https://www.koreaexim.go.kr/site/program/financial/exchangeJSON"

# 데이터 저장 리스트
exchange_data = []

# 시작일과 종료일 설정
start_date = datetime(2022, 1, 3)
end_date = datetime(2023, 12, 31)

current_date = start_date

while current_date <= end_date:
    params = {
        "authkey": API_KEY,
        "searchdate": f"{current_date.strftime('%Y%m%d')}",
        "data": "AP01",
    }

    print(f"Requesting data for {current_date.strftime('%Y%m%d')} with searchdate {params['searchdate']}")
    
    response = requests.get(url=domain, params=params)
    print(f"Response Status Code: {response.status_code}")

    if response.status_code == 200:
        try:
            print(response)
            data = response.json()
            # pprint(data)  # 응답 데이터 출력

            # 미국 달러만 필터링
            usd_data = [item for item in data if item.get('cur_nm') == "미국 달러"]

            if usd_data:
                exchange_rate = usd_data[0]["kftc_bkpr"]  # 기준율

                exchange_data.append({
                    'date': current_date.strftime('%Y-%m-%d'),
                    'exchange_rate': exchange_rate
                })

                print(f"Fetched data for {current_date.strftime('%Y%m%d')}: {exchange_rate}")

            else:
                print(f"No data found for {current_date.strftime('%Y%m%d')}")

        except json.JSONDecodeError:
            print(f"Error decoding JSON response for {current_date.strftime('%Y%m%d')}")
    
    else:
        print(f"Error fetching data for {current_date.strftime('%Y%m%d')}: {response.content}")

    # 다음 주로 이동
    current_date += timedelta(weeks=1)

# 데이터프레임 생성
df = pd.DataFrame(exchange_data)

# CSV 파일로 저장
df.to_csv('weekly_exchange_rates.csv', index=False, encoding='utf-8-sig')
print("CSV 파일 저장 완료!")
