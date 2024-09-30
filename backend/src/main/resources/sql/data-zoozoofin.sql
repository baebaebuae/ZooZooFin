insert into member(member_id, kakao_member_id, member_gold_bar, member_is_solve_quiz, created_date, modified_date) values ('913418af-6b2e-11ef-929f-28c5d21eabf3', 'asdfasdfasdf', 0, false, now(), now());
insert into animal_type(animal_type_name, animal_ability, animal_img_url) values ('토끼', 1, 'https://ssafy.com');
insert into animal(animal_name, animal_turn, animal_assets, animal_credit, animal_hierarchy, animal_is_work, animal_is_end, animal_quest_cleared, created_date, modified_date, member_id, animal_type_id) values ('베베붸', 1, 1000000000, 5, 10, false, false, false, now(), now(), '913418af-6b2e-11ef-929f-28c5d21eabf3', 1);
insert into turn_record(turn_record_turn, daily_charge, loan_make, loan_repay, stock_buy, stock_sell, deposit_make, deposit_finish, savings_make, savings_pay, savings_finish, capital_make, capital_repay, animal_id, created_date, modified_date) values (1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, now(), now());
insert into warning_record(warning_record_turn, warning_savings_count, warning_loan_count, deposit_total, deposit_repay, savings_total, savings_repay, stock_total, stock_repay, animal_id, created_date, modified_date) values (1, 0, 0, 0, 0, 0, 0, 0, 0, 1, now(), now());
insert into next_turn_record(next_turn_record_turn, next_savings_payment, next_loan_repayment, next_capital_repayment, animal_id, created_date, modified_date) values (1, 0, 0, 0, 1, now(), now());
insert into deposit_type(deposit_period, deposit_rate, deposit_name, deposit_img_url) values
                                                                                          (5, 3, '주주예금', 'https://ssafy.com'),
                                                                                          (10, 10, '꼬꼬예금', 'https://ssafy.com'),
                                                                                          (25, 40, '고양예금', 'https://ssafy.com');
insert into savings_type(savings_period, savings_rate, savings_name, savings_img_url) values
                                                                                          (5, 4, '주주적금', 'https://ssafy.com'),
                                                                                          (10, 12, '너굴적금', 'https://ssafy.com'),
                                                                                          (25, 50, '곰곰적금', 'https://ssafy.com');

insert into quiz (QUIZ_ID, QUIZ_DATE, QUIZ_QUESTION, QUIZ_ANSWER, QUIZ_TYPE, CREATED_DATE, MODIFIED_DATE) VALUES
   (1, '2024-09-26', 'IPO(기업공개)란 개인이나 소수 주주로 구성되어 폐쇄성을 띠고 있는 기업이 그 주식을 법정절차와 방법에 따라 일반 대중에게 분산, 소유토록 하고 재무 내용을 공시하는 것이다.', 'X', 'ox',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
   (2 ,'2024-09-26', '상장이란 증권을 발행한 회사의 신청에 의하여 당해 주식을 거래소 시장에서 거래될 수 있도록 자격을 부여하는 행위 또는 그 절차를 말한다.', 'O', 'ox',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
   (3, '2024-09-26', 'KOSPI 200과 같이 특정 지수나 특정 자산의 가격 움직임과 수익률이 연동하도록 설계된 펀드는 무엇일까?', 'ETF', 'short',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
   (4, '2024-09-26', 'KOSPI 200과 같이 특정 지수나 특정 자산의 가격 움직임과 수익률이 연동하도록 설계된 펀드는 무엇일까?', 'ETF', 'short',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
   (5, '2024-09-26', 'KOSPI 200과 같이 특정 지수나 특정 자산의 가격 움직임과 수익률이 연동하도록 설계된 펀드는 무엇일까?', 'ETF', 'short',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);