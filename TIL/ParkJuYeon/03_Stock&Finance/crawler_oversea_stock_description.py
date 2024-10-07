from bs4 import BeautifulSoup, element
from datetime import date, timedelta
import requests
import re
from pprint import pprint
import json
import csv
from selenium import webdriver
from selenium.webdriver.common import by
import time
import sys
import os
import pickle

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../01_Chart")))

import stock

# 크롤링 결과 저장
result = []

def finance_crawler(stock_data, stock_code):
   
    if stock_code in ['AMAT', 'NVDA', 'INTC', 'MSFT', 'AAPL', 'META', 'NFLX', 'MAR', 'AZN', 'SNY', 'KHC']:
        # stock_Code 수정
        stock_code += '.O'
    if stock_code in ['RACE']:
        stock_code += '.K'
    # 크롤링 url
    url = f'https://m.stock.naver.com/worldstock/stock/{stock_code}/total'
    driver = webdriver.Chrome()
    driver.get(url)

    time.sleep(3)

    # 페이지 소스 가져오기
    stock_soup = BeautifulSoup(driver.page_source, 'html.parser')
    # finance_data = stock_soup.select("#contentWrap > #pArea > .PageContainer > .PageContentContainer > #wrapper > div:nth-of-type(5) > .cmp_comment")
    finance_data = stock_soup.select('#content > div:nth-of-type(7) > div > div > div')

    if finance_data:
        stock_description = ""
        for tag in finance_data:
            stock_description += tag.text.replace('\n', ' ')
        stock_data['stock_description'] = stock_description
    result.append(stock_data)
    print(f'{stock_data["stock_original_name"]} 완료')


def main():
    # stock에서 domestic_stock, oversea_stock, etf 
    for sector in stock.oversea_stock:
        stock_type = "oversea"
        stock_field = sector['field']
        
        for stk in sector['codes']:
            stock_original_name = stk["name"]
            stock_code = stk["code"]
            
            # 데이터 초기화
            data = {
                        "stock_type": stock_type, 
                        "stock_original_name": stock_original_name, 
                        "stock_name": "",
                        "stock_code": stock_code, 
                        "stock_info": "",
                        "stock_description": "",
                        "stock_img": "imgUrl",
                        "stock_field": stock_field
                    }
            finance_crawler(data, stock_code)

main()

with open('oversea_stock_description.pkl', 'wb') as f:
    pickle.dump(result, f)

# pkl 파일을 읽어 Python 코드로 저장
with open('oversea_stock_description.pkl', 'rb') as f:
    loaded_data = pickle.load(f)

# UTF-8 인코딩으로 .py 파일로 저장
with open('oversea_stock_description.py', 'w', encoding='utf-8') as f:
    f.write("# -*- coding: utf-8 -*-\n")  # UTF-8 선언
    f.write(f"data = {repr(loaded_data)}\n")  # 데이터 저장

print("Data has been saved to oversea_stock_description.py")