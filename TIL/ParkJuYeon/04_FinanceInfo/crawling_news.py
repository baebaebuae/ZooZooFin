from bs4 import BeautifulSoup
from datetime import date, timedelta
import requests
import re
from pprint import pprint
import json
import csv

# 크롤링 결과 저장
result = []

def crawler(turn, query, sort, s_date, e_date):
    number_of_news = 3
    s_from = s_date.replace(".","")
    e_to = e_date.replace(".","")
    page = 1  
    url = (
        f"https://search.naver.com/search.naver?where=news&query={query}&sort={sort}&ds={s_date}&de={e_date}&nso=so%3Ar%2Cp%3Afrom{s_from}to{e_to}%2Ca%3A&start={page}&mynews=1&office_type=2&office_section_code=14&news_office_checked=1015"
    )

    response = requests.get(url)
    html = response.text

    soup = BeautifulSoup(html, 'html.parser')
    news_lists = soup.select('.news_area')

    for news in news_lists[:number_of_news]:
        try:
            print('------------')
            # news_date
            news_date = news.select('.info_group > span.info')
            if news_date[0].text.find("면") != -1:
                news_date = news_date[1].text
            else:
                news_date = news_date[0].text
            # print('news_date: ', news_date)

            # news_title
            news_title = news.select(".news_tit")[0].text
            print('news_title: ', news_title)

            # news_url
            news_url = news.select(".news_tit")[0]['href']
            # print('news_url: ', news_url)

            # news_content
            res = requests.get(news_url)
            news_html = res.text
            news_soup = BeautifulSoup(news_html, 'html.parser')

            news_content = news_soup.select('.article-body')[0].text.replace('\n', ' ').strip()
            result.append({
                "turn": turn,
                "title": news_title,
                "url": news_url,
                "content": news_content,
                "date": news_date,
            })
        except:
            pass
    

def main():

    # 검색어
    query = "애플"
    sort = 0
    
    # 일주일 단위로, 뉴스를 3개씩 뽑아서 저장하는 알고리즘
    start_date = date(2022, 1, 2)
    end_date = date(2023, 6, 10)
    turn = -25
    period = timedelta(days=6)
    delta = timedelta(days=1)

    # 주간 뉴스 크롤링
    while start_date <= end_date: 
        print('##################################################################')   
        print(f'{turn}턴 뉴스 크롤링 시작) {start_date} ~ {start_date+period}')
        
        start_date_str = start_date.strftime("%Y.%m.%d")
        end_date_str = (start_date + period).strftime("%Y.%m.%d")
        crawler(turn, query, sort, start_date_str, end_date_str)
        start_date += (period + delta)
        if turn == -1:
            turn += 2
        else:
            turn += 1
    
    # json 저장
    with open(f'./{query}_news.json', "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=4)
        print("json 저장 완료")



    # json to csv
    json_file_path = f'./{query}_news.json'  
    csv_file_path = f'./{query}_news.csv' 

    with open(json_file_path, mode='r', encoding='utf-8') as json_file:
        data = json.load(json_file)  

    with open(csv_file_path, mode='w', encoding='utf-8-sig', newline='') as csv_file:
        if data:
            fieldnames = data[0].keys() 
            writer = csv.DictWriter(csv_file, fieldnames=fieldnames)
            writer.writeheader() 
            writer.writerows(data)

    print("csv 변환 완료")
    
main()