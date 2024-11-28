import FinanceDataReader as fdr
import pandas as pd
from stock import etf
from pprint import pprint
import json

etf_data = []

for sector in etf:
    field = sector['field']
    for code_info in sector['codes']:
        name = code_info['name']
        code = code_info['code']
        print(name, code)
        
        # 일별 데이터 다운로드
        df = fdr.DataReader(code, '2013-01-01', '2023-12-31')

        # 데이터가 비어있는지 확인
        if df.empty:
            print(f"{name}({code})의 데이터가 없습니다.")
            continue

        # 인덱스를 날짜로 설정
        df.index = pd.to_datetime(df.index)

        # 'Change' 컬럼이 있다면 제거
        if 'Change' in df.columns:
            df = df.drop(columns=['Change'])

        # 일별 데이터에 필요한 정보만 선택
        df_daily = df[['Open', 'High', 'Low', 'Close', 'Volume']].dropna()

        # 숫자 타입을 int로 변환 (필요 시)
        df_daily = df_daily.astype(int)

        # 데이터 딕셔너리로 변환 (하루 단위로 변환, Volume 포함)
        data = {}
        for date, row in df_daily.iterrows():
            data[str(date.date())] = {
                'open': int(row['Open']),
                'high': int(row['High']),
                'low': int(row['Low']),
                'close': int(row['Close']),
                'volume': int(row['Volume'])  # 거래량 추가
            }

        # etf_data 리스트에 데이터 추가
        etf_data.append({
            'name': name,
            'code': code,
            'field': field,
            'data': data
        })

        # CSV 파일로 저장 (하루 단위 데이터)
        csv_filename = f'S11P21A705/AI/daily_stock_data_10/etf/daily_stock_data_{code}.csv'
        df_daily.to_csv(csv_filename, encoding='utf-8-sig')  # df_daily 사용하여 'Change' 없이 저장
        print(f"{code} 종목의 일별 CSV 파일 저장 완료!")

# # stock_data 출력 (원할 경우 주석 해제)
# for data in etf_data:
#     pprint(data)

# JSON 파일로 저장 (원할 경우 주석 해제)
# with open("etf_data.json", "w", encoding="utf-8") as f:
#     json.dump(etf_data, f, ensure_ascii=False, indent=4)

# print("JSON 파일 저장 완료!")
