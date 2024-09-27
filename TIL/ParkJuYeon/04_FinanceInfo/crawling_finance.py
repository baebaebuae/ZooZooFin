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

# 크롤링 결과 저장
data = []

def extract_data(tag, key, data, index):
    if tag.find('th', string=key):
        revenue_data = tag.find('th', string=key).parent
        cnt = 0
        for td in revenue_data.find_all('td'):
            if cnt < 2:
                data[cnt][index] = td.get_text()
            cnt += 1

def finance_crawler(stock_type, stock_code):
    global data
    # 초기화
    data = [
        {
            "stock_type": stock_type, 
            "stock_code": stock_code, 
            "period": year, 
            "revenue": 0, 
            "dividend_yield": 0, 
            "PBR": 0, 
            "PER": 0, 
            "ROE": 0, 
            "PSR": 0
        }
        for year in [2021, 2022]
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
                 


def main():
    stock_type="domestic"
    stock_code="000660"
    finance_crawler(stock_type, stock_code)

main()
pprint(data)