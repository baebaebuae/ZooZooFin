from domestic_stock_data import data as domestic
from stock_id import domestic as id
import pickle

result = []
for stock in domestic:
    data = {"stock_id": 0, 
            "turn": 0, 
            "rate": 0, 
            "price": 0, 
            "high_price": 0, 
            "low_price": 0, 
            "start_price": 0,
            "end_price": 0,
            "created_date": 'now()', 
            "modified_date": 'now()'}
    stock_name = stock['name']
    # stock_id 입력
    turn = -25
    prev_price = 0
    chart_data = stock['data']

    for date, price_data in chart_data.items():
        if turn > 50:
            break
        data = {
            "stock_id": id[stock_name],
            "turn": turn,
            "rate": 0,
            "price": (price_data['high'] + price_data['low']) / 2,
            "high_price": price_data['high'],
            "low_price": price_data['low'],
            "start_price": price_data['open'],
            "end_price": price_data['close'],
            "created_date": 'now()',
            "modified_date": 'now()'
        }
        
        if turn == -1:
            turn += 2
        else:
            turn += 1

        if prev_price:  
            data['rate'] = round((data['price'] - prev_price) / prev_price * 100, 2)

        prev_price = data['price']
        result.append(data)

with open('domestic_chart.pkl', 'wb') as f:
    pickle.dump(result, f)

# pkl 파일을 읽어 Python 코드로 저장
with open('domestic_chart.pkl', 'rb') as f:
    loaded_data = pickle.load(f)

# UTF-8 인코딩으로 .py 파일로 저장
with open('domestic_chart.py', 'w', encoding='utf-8') as f:
    f.write("# -*- coding: utf-8 -*-\n")  # UTF-8 선언
    f.write(f"data = {repr(loaded_data)}\n")  # 데이터 저장

print("저장 완")
    