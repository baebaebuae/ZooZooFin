insert into member(member_id, member_gold_bar, member_bank_count, created_date, modified_date) values ('913418af-6b2e-11ef-929f-28c5d21eabf3', 0, 0, now(), now());
insert into animal_type(animal_type_name, animal_ability, animal_img_url) values ('토끼', 1, 'https://ssafy.com');
insert into animal(animal_name, animal_turn, animal_assets, animal_credit, animal_hierarchy, animal_is_end, animal_quest_cleared, created_date, modified_date, member_id, animal_type_id) values ('베베붸', 1, 1000000000, 5, 10, false, false, now(), now(), '913418af-6b2e-11ef-929f-28c5d21eabf3', 1);
insert into deposit_type(deposit_period, deposit_rate, deposit_name, deposit_img_url) values
(5, 3, '주주예금', 'https://ssafy.com'),
(10, 10, '꼬꼬예금', 'https://ssafy.com'),
(25, 40, '고양예금', 'https://ssafy.com');
insert into savings_type(savings_period, savings_rate, savings_name, savings_img_url) values
(5, 4, '주주적금', 'https://ssafy.com'),
(10, 12, '너굴적금', 'https://ssafy.com'),
(25, 50, '곰곰적금', 'https://ssafy.com');