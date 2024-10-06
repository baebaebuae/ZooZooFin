-- Member
insert into member(id, provider_name, provider_id, username, gold_bar, is_solved_quiz, bank_count,
                   loan_count, stock_count,
                   created_date, modified_date)
values (10000, 'google', '110717068153166490640', 'b60e8cbc-9c20-4f53-bf68-cfeaf285d3d5', 0, false, 0, 0, 0, now(), now()),
       (10001, 'naver', 'asdfasdfsadsafdasfd', '913418af-6b2e-11ef-929f-28c5d21eabf4', 0, false, 0, 0, 0, now(), now())
;

-- Animal Type
insert into animal_type(animal_type_name, animal_ability, animal_img_url)
values ('토끼', 1, 'https://ssafy.com')
;

-- Animal
insert into animal(animal_id, name, turn, assets, credit, hierarchy, is_worked,
                   is_end, quest_cleared, created_date, modified_date, member_id, animal_type_id)
values (10000, '끝난 동물', 50, 12345678, 2, 10, false, true, false, now(), now(), 10000, 1),
       (10001, '지금 하고 있는 동물', 10, 1000000000, 5, 10, false, false, false, now(), now(), 10000, 1)
;

-- Portfolio
insert into portfolio(portfolio_id, animal_id, portfolio_ending, portfolio_deposit_percent, portfolio_savings_percent,
                      portfolio_stock_percent, portfolio_invest_style, portfolio_score,
                      created_date, modified_date)
values (10000, 10000, 'A001', 12.5, 12.5, 75.0, '주식쟁이', 10101010101010, now(), now())
;

-- Turn Record
insert into turn_record(turn_record_id, turn_record_turn, daily_charge, loan_make, loan_repay, stock_buy, stock_sell,
                        deposit_make, deposit_finish, savings_make, savings_pay, savings_finish,
                        capital_make, capital_repay, animal_id,
                        created_date, modified_date)
values (10000, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10001, now(), now()),
       (10001, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10001, now(), now()),
       (10002, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10001, now(), now()),
       (10003, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10001, now(), now()),
       (10004, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10001, now(), now()),
       (10005, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10001, now(), now()),
       (10006, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10001, now(), now()),
       (10007, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10001, now(), now()),
       (10008, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10001, now(), now()),
       (10009, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10001, now(), now())
;

-- Warning Record
insert into warning_record(warning_record_id, warning_record_turn, warning_savings_count, warning_loan_count,
                           deposit_total, deposit_repay, savings_total, savings_repay, stock_total, stock_repay,
                           animal_id,
                           created_date, modified_date)
values (10000, 1, 0, 0, 0, 0, 0, 0, 0, 0, 10001, now(), now()),
       (10001, 2, 0, 0, 0, 0, 0, 0, 0, 0, 10001, now(), now()),
       (10002, 3, 0, 0, 0, 0, 0, 0, 0, 0, 10001, now(), now()),
       (10003, 4, 0, 0, 0, 0, 0, 0, 0, 0, 10001, now(), now()),
       (10004, 5, 0, 0, 0, 0, 0, 0, 0, 0, 10001, now(), now()),
       (10005, 6, 0, 0, 0, 0, 0, 0, 0, 0, 10001, now(), now()),
       (10006, 7, 0, 0, 0, 0, 0, 0, 0, 0, 10001, now(), now()),
       (10007, 8, 0, 0, 0, 0, 0, 0, 0, 0, 10001, now(), now()),
       (10008, 9, 0, 0, 0, 0, 0, 0, 0, 0, 10001, now(), now()),
       (10009, 10, 0, 0, 0, 0, 0, 0, 0, 0, 10001, now(), now())
;

-- Next Turn Record
insert into next_turn_record(next_turn_record_id, next_turn_record_turn, next_savings_payment, next_loan_repayment,
                             next_capital_repayment, animal_id,
                             created_date, modified_date)
values (10000, 2, 0, 0, 0, 10001, now(), now()),
       (10001, 3, 0, 0, 0, 10001, now(), now()),
       (10002, 4, 0, 0, 0, 10001, now(), now()),
       (10003, 5, 0, 0, 0, 10001, now(), now()),
       (10004, 6, 0, 0, 0, 10001, now(), now()),
       (10005, 7, 0, 0, 0, 10001, now(), now()),
       (10006, 8, 0, 0, 0, 10001, now(), now()),
       (10007, 9, 0, 0, 0, 10001, now(), now()),
       (10008, 10, 0, 0, 0, 10001, now(), now()),
       (10009, 11, 0, 0, 0, 10001, now(), now())
;

-- Deposit Type
insert into deposit_type(deposit_type_id, deposit_period, deposit_rate, deposit_name, deposit_img_url)
values (10000, 5, 3, '주주예금', 'https://ssafy.com'),
       (10001, 10, 10, '꼬꼬예금', 'https://ssafy.com'),
       (10002, 25, 40, '야옹예금', 'https://ssafy.com')
;

-- Deposit
insert into deposit(deposit_id, character_id, deposit_type_id, deposit_amount, deposit_start_turn, deposit_end_turn,
                    deposit_is_end,
                    created_date, modified_date)
values (10000, 10001, 10000, 1000000, 1, 50, false, now(), now())
;

-- Savings Type
insert into savings_type(savings_type_id, savings_period, savings_rate, savings_name, savings_img_url)
values (10000, 5, 4, '주주적금', 'https://ssafy.com'),
       (10001, 10, 12, '너굴적금', 'https://ssafy.com'),
       (10002, 25, 50, '곰곰적금', 'https://ssafy.com')
;

-- Savings
insert into savings(savings_id, character_id, savings_type_id, savings_payment, savings_amount, savings_interest,
                    savings_start_turn, savings_end_turn, savings_warning, savings_is_end,
                    created_date, modified_date)
values (10000, 10001, 10000, 100000, 1000000, 0, 1, 50, false, false, now(), now())
;

-- Loan
insert into loan(loan_id, loan_type, loan_rate, loan_amount, loan_remain, loan_start_turn, loan_period, loan_to_end,
                 loan_warning, loan_is_end, character_id,
                 created_date, modified_date)
values (10000, 1, 1, 1000000, 1000000, 1, 50, 49, false, false, 10001, now(), now())
;

-- Stock
insert into stock(stock_id, stock_type, stock_name, stock_code, stock_info, stock_description, stock_img, stock_field,
                  created_date, modified_date)
values (10000, '국내', '개굴전자', '005930', '개굴전자는 개굴 반도체 개굴', '개굴전자 설명이다 개굴 개굴개굴 반도체 너무 조타 개굴', 'img.url', '제조',
        now(), now()),
       (10001, '해외', '해외 테스트', '005931', '해외도 테스트는 해야지', '대체 이 부분을 뭐라고 채워야 잘 채웠다고 소문이 날까?', 'img.url', '제조',
        now(), now()),
       (10002, 'ETF', 'ETF 테스트', '005932', 'ETF도 테스트는 해야지', '난 아직도 뭐라고 적어야 할 지 모르겠다.', 'img.url', '제조',
        now(), now())
;

insert into stock_holdings(stock_holdings_id, stock_id, animal_id, stock_count, stock_average_price, stock_is_sold,
                           created_date, modified_date)
values (10000, 10000, 10001, 100, 75000, false, now(), now()),
       (10001, 10001, 10001, 100, 75000, false, now(), now()),
       (10002, 10002, 10001, 100, 75000, false, now(), now())
;

-- Financial Statements
insert into financial_statements(stock_id, period, revenue, market_cap, divided_yield, pbr, per, roe, psr,
                                 created_date, modified_date)
values (10000, 1, 429978, 954551, 1.18, 1.45, 9.93, 16.84, 2.22, now(), now()),
       (10000, 2, 446216, 544383, 1.60, 0.82, 24.49, 3.55, 1.22, now(), now())
;

-- Quiz
insert into quiz (QUIZ_ID, QUIZ_DATE, QUIZ_QUESTION, QUIZ_ANSWER, QUIZ_TYPE,
                  CREATED_DATE, MODIFIED_DATE)
VALUES (1, '2024-09-26',
        'IPO(기업공개)란 개인이나 소수 주주로 구성되어 폐쇄성을 띠고 있는 기업이 그 주식을 법정절차와 방법에 따라 일반 대중에게 분산, 소유토록 하고 재무 내용을 공시하는 것이다.', 'X', 'ox',
        now(), now()),
       (2, '2024-09-26', '상장이란 증권을 발행한 회사의 신청에 의하여 당해 주식을 거래소 시장에서 거래될 수 있도록 자격을 부여하는 행위 또는 그 절차를 말한다.', 'O', 'ox',
        now(), now()),
       (3, '2024-09-26', 'KOSPI 200과 같이 특정 지수나 특정 자산의 가격 움직임과 수익률이 연동하도록 설계된 펀드는 무엇일까?', 'ETF', 'short',
        now(), now()),
       (4, '2024-09-26', 'KOSPI 200과 같이 특정 지수나 특정 자산의 가격 움직임과 수익률이 연동하도록 설계된 펀드는 무엇일까?', 'ETF', 'short',
        now(), now()),
       (5, '2024-09-26', 'KOSPI 200과 같이 특정 지수나 특정 자산의 가격 움직임과 수익률이 연동하도록 설계된 펀드는 무엇일까?', 'ETF', 'short',
        now(), now())
;

-- Chart
insert into chart (stock_id, turn, rate, price, high_price, low_price, start_price, end_price,
                   created_date, modified_date)
values (10000, -25, 0, 78100, 79800, 76400, 79400, 78300, now(), now()),
       (10000, -24, 0.32, 78350, 79600, 77100, 78100, 77300, now(), now()),
       (10000, -23, -2.75, 76250, 77800, 74700, 77600, 75600, now(), now()),
       (10000, -22, -3.74, 73500, 75800, 71200, 75400, 73300, now(), now()),
       (10000, 10, -0.81, 74100, 74900, 73300, 74900, 74000, now(), now()),
       (10001, -25, 0, 78100, 79800, 76400, 79400, 78300, now(), now()),
       (10001, -24, 0.32, 78350, 79600, 77100, 78100, 77300, now(), now()),
       (10001, -23, -2.75, 76250, 77800, 74700, 77600, 75600, now(), now()),
       (10001, -22, -3.74, 73500, 75800, 71200, 75400, 73300, now(), now()),
       (10001, 10, -0.81, 74100, 74900, 73300, 74900, 74000, now(), now()),
       (10002, -25, 0, 78100, 79800, 76400, 79400, 78300, now(), now()),
       (10002, -24, 0.32, 78350, 79600, 77100, 78100, 77300, now(), now()),
       (10002, -23, -2.75, 76250, 77800, 74700, 77600, 75600, now(), now()),
       (10002, -22, -3.74, 73500, 75800, 71200, 75400, 73300, now(), now()),
       (10002, 10, -0.81, 74100, 74900, 73300, 74900, 74000, now(), now())
;

-- News
insert into news(news_id, stock_id, turn, title, provider, content, date,
                 created_date, modified_date)
values (10000, 10000, 10, '대박 진짜 꼭 읽어야하는 뉴스', '개굴일보', '낚시 성공', '2024-10-03', now(), now()),
       (10001, 10001, 10, '대박 진짜 꼭 읽어야하는 뉴스', '개굴일보', '낚시 성공', '2024-10-03', now(), now()),
       (10002, 10002, 10, '대박 진짜 꼭 읽어야하는 뉴스', '개굴일보', '낚시 성공', '2024-10-03', now(), now())
;