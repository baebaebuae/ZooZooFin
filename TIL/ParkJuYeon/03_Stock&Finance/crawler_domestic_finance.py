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
from domestic_stock_description import data as stock_description
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
    data = [
        {
            "fd_id": (stock_id - 1)*2 + period,
            "stock_id": stock_id,
            "period": period, 
            "revenue": 0,
            "market_cap": 0, 
            "dividend_yield": 0, 
            "PBR": 0, 
            "PER": 0, 
            "ROE": 0, 
            "PSR": 0
        }
        for period in [1, 2]
    ]

    # 크롤링 url
    # url = (
    #     f"https://finance.naver.com/item/coinfo.naver?code={stock_code}&target=finsum_more"
    # )
    # response = requests.get(url)
    # html = response.text

    # soup = BeautifulSoup(html, 'html.parser')
    # finance_lists = soup.select(".new_totalinfo > .content_wrap > #content > .section > iframe")
    # iframe_url = finance_lists[0]["src"]
    company_url = f'https://navercomp.wisereport.co.kr/v2/company/c1010001.aspx?cmp_cd={stock_code}&cn='
    print(company_url)
    driver = webdriver.Chrome()
    driver.get(company_url)

    time.sleep(3)

    # 페이지 소스 가져오기
    iframe_soup = BeautifulSoup(driver.page_source, 'html.parser')
    finance_data = iframe_soup.select("#contentWrap > #pArea > .PageContainer > .PageContentContainer > #wrapper > div:nth-of-type(14)")

    if finance_data:
        for tag in finance_data:
            # type 확인
            if isinstance(tag, element.Tag):
                extract_data(tag, "매출액", data, "revenue")
                extract_data(tag, "현금배당수익률", data, "dividend_yield")
                extract_data(tag, "PBR(배)", data, "PBR")
                extract_data(tag, "PER(배)", data, "PER")
                extract_data(tag, "ROE(%)", data, "ROE")

                
    investment_url = f'https://navercomp.wisereport.co.kr/v2/company/c1040001.aspx?cmp_cd={stock_code}&cn='
    print(investment_url)
    driver = webdriver.Chrome()
    driver.get(investment_url)

    time.sleep(3)

    # 페이지 소스 가져오기
    iframe_soup = BeautifulSoup(driver.page_source, 'html.parser')
    investment_data = iframe_soup.select("#contentWrap > #pArea > .PageContainer > .PageContentContainer > #wrapper > div:nth-of-type(9) > table > tbody")
    
    if investment_data:
        for tag in investment_data:
            print('---------------------')
            print(type(tag))
            if tag.find('td', title="PSR"):
                psr_data = tag.find('td', title="PSR").parent
                print('true')
                cnt = 0
                for td in psr_data.find_all('td'):
                    if 2 < cnt < 5:
                        data[cnt-3]["PSR"] = td.get_text()
                    cnt += 1

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

    for period_financial in data:
        period_financial['PBR'] = convert_to_float(period_financial['PBR'])
        period_financial['PER'] = convert_to_float(period_financial['PER'])
        period_financial['ROE'] = convert_to_float(period_financial['ROE'])
        period_financial['PSR'] = convert_to_float(period_financial['PSR'])
        period_financial['dividend_yield'] = convert_to_float(period_financial['dividend_yield'])
        period_financial['revenue'] = convert_to_int(period_financial['revenue'])
        
        period_financial['market_cap'] = period_financial['revenue'] * period_financial['PER']

    # 변환된 데이터 추가
    finance.extend(data)

def main():
    stock_type="국내"
    for stock_info in stock_description:
        stock_name = stock_info['stock_original_name']
        stock_code = stock_info['stock_code']
        stock_id = stock_ids.domestic[stock_name]
        finance_crawler(stock_id, stock_code)

main()
pprint(finance)

name = 'domestic_financial_statements'

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