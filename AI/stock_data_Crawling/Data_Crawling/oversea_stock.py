import yfinance as yf
import pandas as pd
import json
import os
from stock import oversea_stock

# 데이터 저장 폴더 설정
save_folder = 'S11P21A705/AI/daily_stock_data_10/oversea/'
if not os.path.exists(save_folder):
    os.makedirs(save_folder)

# 데이터 수집 기간 설정
start_date = '2013-01-01'
end_date = '2023-12-31'

# 해외 주식 데이터 수집 리스트
oversea_stock_data = []

# 해외 주식 데이터 수집
for sector in oversea_stock:
    field = sector['field']
    for code_info in sector['codes']:
        name = code_info['name']
        code = code_info['code']
        print(name, code)

        try:
            # 주식 데이터 다운로드 (일별 데이터)
            df = yf.download(code, start=start_date, end=end_date, interval='1d')
        except Exception as e:
            print(f"{name}({code})의 데이터 다운로드에 실패했습니다: {e}")
            continue

        # 데이터가 비어있는지 확인
        if df.empty:
            print(f"{name}({code})의 데이터가 없습니다.")
            continue

        # 인덱스를 날짜로 설정
        df.index = pd.to_datetime(df.index)

        # 일별 데이터에 필요한 정보만 선택
        df_daily = df[['Open', 'High', 'Low', 'Close','Volume']].dropna()

        # 숫자 타입을 int로 변환 (필요 시)
        df_daily = df_daily.astype(int)

        # 데이터 딕셔너리로 변환
        data = {}
        for date, row in df_daily.iterrows():
            data[str(date.date())] = {
                'open': int(row['Open']),
                'high': int(row['High']),
                'low': int(row['Low']),
                'close': int(row['Close']),
                'Volume': int(row['Volume'])
                
            }

        # oversea_stock_data 리스트에 데이터 추가
        oversea_stock_data.append({
            'name': name,
            'code': code,
            'field': field,
            'data': data
        })

        # CSV 파일로 저장
        csv_filename = f'{save_folder}daily_stock_data_{code}.csv'
        df_daily.to_csv(csv_filename, encoding='utf-8-sig')
        print(f"{code} 종목의 CSV 파일 저장 완료!")

# JSON 파일로 저장
# with open("oversea_stock_data.json", "w", encoding="utf-8") as f:
#     json.dump(oversea_stock_data, f, ensure_ascii=False, indent=4)

# print("JSON 파일 저장 완료!")
