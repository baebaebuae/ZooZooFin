insert into member(member_id, member_gold_bar, member_is_solve_quiz, member_bank_count, created_date, modified_date) values ('913418af-6b2e-11ef-929f-28c5d21eabf3', 0, false, 0, now(), now());
insert into animal_type(animal_type_name, animal_ability, animal_img_url) values ('토끼', 1, 'https://ssafy.com');
insert into animal(animal_name, animal_turn, animal_assets, animal_credit, animal_hierarchy, animal_is_work, animal_is_end, animal_quest_cleared, created_date, modified_date, member_id, animal_type_id) values ('베베붸', 1, 1000000000, 5, 10, false, false, false, now(), now(), '913418af-6b2e-11ef-929f-28c5d21eabf3', 1);
insert into deposit_type(deposit_period, deposit_rate, deposit_name, deposit_img_url) values
(5, 3, '주주예금', 'https://ssafy.com'),
(10, 10, '꼬꼬예금', 'https://ssafy.com'),
(25, 40, '고양예금', 'https://ssafy.com');
insert into savings_type(savings_period, savings_rate, savings_name, savings_img_url) values
(5, 4, '주주적금', 'https://ssafy.com'),
(10, 12, '너굴적금', 'https://ssafy.com'),
(25, 50, '곰곰적금', 'https://ssafy.com');
insert into quiz (QUIZ_ID, QUIZ_DATE, QUIZ_QUESTION, QUIZ_ANSWER, CREATED_DATE, MODIFIED_DATE) VALUES
    (1, '2024-09-19', 'Question 1', 'Answer 1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2 ,'2024-09-19', 'Question 2', 'Answer 2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, '2024-09-19', 'Question 3', 'Answer 3', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (4, '2024-09-19', 'Question 4', 'Answer 4', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (5, '2024-09-19', 'Question 5', 'Answer 5', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

insert into quiz (QUIZ_ID, QUIZ_DATE, QUIZ_QUESTION, QUIZ_ANSWER, CREATED_DATE, MODIFIED_DATE) VALUES
    (6, '2024-09-20', 'Question 6', 'Answer 6', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (7, '2024-09-20', 'Question 7', 'Answer 7', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (8, '2024-09-20', 'Question 8', 'Answer 8', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (9, '2024-09-20', 'Question 9', 'Answer 9', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (10, '2024-09-20', 'Question 10', 'Answer 10', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

insert into quiz_result (ANIMAL_ID, QUIZ_ID, IS_CORRECT, ANIMAL_ANSWER, CREATED_DATE, MODIFIED_DATE) VALUES
    (1, 6, false, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (1, 7, false, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (1, 8, false, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (1, 9, false, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (1, 10, false, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);