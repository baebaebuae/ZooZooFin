import pandas as pd
import json

# CSV 파일 읽기
df = pd.read_csv('weekly_exchange_rates_v2.csv')

# DataFrame을 JSON으로 변환
json_data = df.to_dict(orient='records')

# JSON 파일로 저장
with open('weekly_exchange_rates.json', 'w', encoding='utf-8') as json_file:
    json.dump(json_data, json_file, ensure_ascii=False, indent=4)

print("JSON 파일 저장 완료!")
