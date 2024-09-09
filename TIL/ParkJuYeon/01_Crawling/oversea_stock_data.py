import yfinance as yf
import pandas as pd
import json
from stock import oversea_stock

oversea_stock_data = []

for sector in oversea_stock:
    field = sector['field']
    for code_info in sector['codes']:
        name = code_info['name']
        code = code_info['code']
        print(name, code)
        df = yf.download(code, start='2022-01-01', end='2023-12-31')
        
        # 데이터가 비어있는지 확인
        if df.empty:
            print(f"{name}({code})의 데이터가 없습니다.")
            continue

        # 인덱스를 날짜로 설정
        df.index = pd.to_datetime(df.index)

        # 주별 데이터로 리샘플링
        df_weekly = df.resample('W').agg({
            'Open': 'first',  # 시가
            'High': 'max',    # 고가
            'Low': 'min',     # 저가
            'Close': 'last'   # 종가
        }).dropna()

        # 숫자 타입을 int로 변환 (int32를 일반 int로 변환)
        df_weekly = df_weekly.astype(int)

        # 데이터 딕셔너리로 변환
        data = {}
        for date, row in df_weekly.iterrows():
            data[str(date.date())] = {
                'open': int(row['Open']),
                'high': int(row['High']),
                'low': int(row['Low']),
                'close': int(row['Close']),
            }

        # oversea_stock_data 리스트에 데이터 추가
        oversea_stock_data.append({
            'name': name,
            'code': code,
            'field': field,
            'data': data
        })
        
        # CSV 파일로 저장
        csv_filename = f'weekly_stock_data_{code}.csv'
        df_weekly.to_csv(csv_filename, encoding='utf-8-sig')
        print(f"{code} 종목의 CSV 파일 저장 완료!")

# JSON 파일로 저장
with open("oversea_stock_data.json", "w", encoding="utf-8") as f:
    json.dump(oversea_stock_data, f, ensure_ascii=False, indent=4)

print("JSON 파일 저장 완료!")
