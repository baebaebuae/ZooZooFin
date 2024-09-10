import requests
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

def get_exchange_rate(date):
    params = {
        "authkey": API_KEY,
        "searchdate": date.strftime('%Y%m%d'),
        "data": "AP01",
    }
    response = requests.get(url=domain, params=params)
    if response.status_code == 200:
        try:
            data = response.json()
            usd_data = [item for item in data if item.get('cur_nm') == "미국 달러"]
            if usd_data:
                return usd_data[0]["kftc_bkpr"]
        except json.JSONDecodeError:
            print(f"Error decoding JSON response for {date.strftime('%Y-%m-%d')}")
    return None

current_date = start_date

while current_date <= end_date:
    rate = get_exchange_rate(current_date)
    
    # 데이터가 없거나 공휴일인 경우 하루 후의 값을 사용
    if rate is None:
        next_day = current_date + timedelta(days=1)
        rate = get_exchange_rate(next_day)
    
    if rate is not None:
        exchange_data.append({
            'date': current_date.strftime('%Y-%m-%d'),
            'exchange_rate': rate
        })
        print(f"Fetched data for {current_date.strftime('%Y-%m-%d')}: {rate}")
    else:
        print(f"No data found for {current_date.strftime('%Y-%m-%d')} or its following day.")

    # 다음 주의 첫 날로 이동
    current_date += timedelta(weeks=1)

# 데이터프레임 생성
df = pd.DataFrame(exchange_data)

# CSV 파일로 저장
df.to_csv('weekly_exchange_rates.csv', index=False, encoding='utf-8-sig')
print("CSV 파일 저장 완료!")
