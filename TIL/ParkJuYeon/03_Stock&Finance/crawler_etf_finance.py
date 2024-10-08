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
import pickle
from etf_stock_description import data as stock_description
import stock_ids

# 크롤링 결과 저장
finance = []

def extract_data(tag, key, data, index):
    if tag.find('th', string=key):
        revenue_data = tag.find('th', string=key).parent
        cnt = 0
        for td in revenue_data.find_all('td'):
            if cnt < 2:
                data[cnt][index] = td.get_text()
            cnt += 1

def finance_crawler(stock_id, stock_code):
    # 초기화
    data = []
    

    company_url = f'https://navercomp.wisereport.co.kr/v2/ETF/Index.aspx?cn=&cmp_cd={stock_code}&menuType=block'
    driver = webdriver.Chrome()
    driver.get(company_url)

    time.sleep(3)

    # 페이지 소스 가져오기
    iframe_soup = BeautifulSoup(driver.page_source, 'html.parser')
    finance_data = iframe_soup.select("#CU_grid_body")
    element_list = list(finance_data[0].find_all('tr'))
    if element_list:
        for element in element_list:
            
            title_element = element.select_one(".txt").text
            elem_name = title_element.strip()
            nums = element.select(".num")
            elem_percentage = 0
            if nums[1].text != '-':
                elem_percentage = float(nums[1].text)
            elem = {
            "stock_id": stock_id,
            "elem_name": elem_name, 
            "elem_percentage": elem_percentage
            }
            finance.append(elem)

    

    def convert_to_float(value):
        try:
            return float(value)
        except ValueError:
            return 0.0

    def convert_to_int(value):
        try:
            return int(value.replace(',', ''))
        except ValueError:
            return 0

    # for period_financial in data:
    #     period_financial['PBR'] = convert_to_float(period_financial['PBR'])
    #     period_financial['PER'] = convert_to_float(period_financial['PER'])
    #     period_financial['ROE'] = convert_to_float(period_financial['ROE'])
    #     period_financial['PSR'] = convert_to_float(period_financial['PSR'])
    #     period_financial['dividend_yield'] = convert_to_float(period_financial['dividend_yield'])
    #     period_financial['revenue'] = convert_to_int(period_financial['revenue'])
        
    #     period_financial['market_cap'] = period_financial['revenue'] * period_financial['PER']

    # # 변환된 데이터 추가
    # finance.extend(data)

def main():
    stock_type="etf"
    for stock_info in stock_description:
        stock_name = stock_info['stock_original_name']
        stock_code = stock_info['stock_code']
        stock_id = stock_ids.etf[stock_name]
        finance_crawler(stock_id, stock_code)

main()
pprint(finance)

name = 'etf_financial_statements'

with open(f'{name}.pkl', 'wb') as f:
    pickle.dump(finance, f)

# pkl 파일을 읽어 Python 코드로 저장
with open(f'{name}.pkl', 'rb') as f:
    loaded_data = pickle.load(f)

# UTF-8 인코딩으로 .py 파일로 저장
with open(f'{name}.py', 'w', encoding='utf-8') as f:
    f.write("# -*- coding: utf-8 -*-\n")  # UTF-8 선언
    f.write(f"data = {repr(loaded_data)}\n")  # 데이터 저장

print(f"Data has been saved to {name}.py")