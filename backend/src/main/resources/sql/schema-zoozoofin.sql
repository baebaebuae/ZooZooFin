CREATE TABLE member (
    member_id VARCHAR(36) NOT NULL,
    member_gold_bar BIGINT NOT NULL,
    member_bank_count BIGINT NOT NULL,
    created_date DATETIME NOT NULL,
    modified_date DATETIME NOT NULL,
    CONSTRAINT member_PK PRIMARY KEY(member_id)
);

create table animal_type (
	animal_type_id BIGINT NOT NULL AUTO_INCREMENT,
    animal_type_name VARCHAR(10) NOT NULL,
    animal_ability BIGINT NOT NULL,
    animal_img VARCHAR(300) NOT NULL,
    CONSTRAINT animal_type_PK PRIMARY KEY(animal_type_id)
);

CREATE TABLE animal (
    animal_id BIGINT NOT NULL AUTO_INCREMENT,
    animal_name VARCHAR(10) NOT NULL,
    animal_turn BIGINT NOT NULL,
    animal_assets BIGINT NOT NULL,
    animal_credit BIGINT NOT NULL,
    animal_hierarchy BIGINT NOT NULL,
    animal_is_end BOOLEAN NOT NULL,
    animal_quest_cleared BOOLEAN NOT NULL,
    created_date DATETIME NOT NULL,
    modified_date DATETIME NOT NULL,
    CONSTRAINT animal_PK PRIMARY KEY(animal_id),
    -- 외래 키
    member_id VARCHAR(36) NOT NULL, -- user 테이블의 외래 키
    CONSTRAINT animal_member_id_FK FOREIGN KEY (member_id) REFERENCES member(member_id) ON DELETE CASCADE,
    animal_type_id BIGINT NOT NULL, -- animal_type 테이블의 외래 키
    CONSTRAINT animal_animal_type_id_FK FOREIGN KEY (animal_type_id) REFERENCES animal_type(animal_type_id) ON DELETE CASCADE
);

CREATE TABLE deposit_type (
	deposit_type_id BIGINT NOT NULL AUTO_INCREMENT,
    deposit_period BIGINT NOT NULL,
    deposit_rate BIGINT NOT NULL,
    deposit_name VARCHAR(20) NOT NULL,
    deposit_img_url VARCHAR(300) NOT NULL,
    CONSTRAINT deposit_type_PK PRIMARY KEY(deposit_type_id)
);

CREATE TABLE savings_type (
	savings_type_id BIGINT NOT NULL AUTO_INCREMENT,
    savings_period BIGINT NOT NULL,
    savings_rate BIGINT NOT NULL,
    savings_name VARCHAR(20) NOT NULL,
    savings_img_url VARCHAR(300) NOT NULL,
    CONSTRAINT savings_type_PK PRIMARY KEY(savings_type_id)
);

CREATE TABLE turn_record (
	turn_record_id BIGINT NOT NULL AUTO_INCREMENT,
    daily_animal_turn BIGINT NOT NULL,
    daily_quiz BIGINT NOT NULL,
    daily_charge BIGINT NOT NULL,
    created_date DATETIME NOT NULL,
    modified_date DATETIME NOT NULL,
    CONSTRAINT turn_record_PK PRIMARY KEY(turn_record_id),
    -- 외래 키
    animal_id BIGINT NOT NULL, -- animal 테이블의 외래 키
    CONSTRAINT turn_record_animal_id_FK FOREIGN KEY (animal_id) REFERENCES `animal`(animal_id) ON DELETE CASCADE
);

CREATE TABLE deposit(
	deposit_id BIGINT NOT NULL AUTO_INCREMENT,
    deposit_amount BIGINT NOT NULL,
    deposit_start_turn BIGINT NOT NULL,
    deposit_end_turn BIGINT NOT NULL,
    deposit_is_end BOOLEAN NOT NULL,
    created_date DATETIME NOT NULL,
    modified_date DATETIME NOT NULL,
    CONSTRAINT deposit_PK PRIMARY KEY(deposit_id),
	-- 외래 키
    animal_id BIGINT NOT NULL, -- animal 테이블의 외래 키
    CONSTRAINT deposit_animal_id_FK FOREIGN KEY (animal_id) REFERENCES `animal`(animal_id) ON DELETE CASCADE,
    deposit_type_id BIGINT NOT NULL, -- deposit_type 테이블의 외래 키
    CONSTRAINT deposit_deposit_type_id_FK FOREIGN KEY (deposit_type_id) REFERENCES deposit_type(deposit_type_id) ON DELETE CASCADE
);

CREATE TABLE savings(
	savings_id BIGINT NOT NULL AUTO_INCREMENT,
    savings_payment BIGINT NOT NULL,
    savings_amount BIGINT NOT NULL,
    savings_start_turn BIGINT NOT NULL,
    savings_end_turn BIGINT NOT NULL,
    savings_warning BOOLEAN NOT NULL,
    savings_is_end BOOLEAN NOT NULL,
    created_date DATETIME NOT NULL,
    modified_date DATETIME NOT NULL,
    CONSTRAINT savings_PK PRIMARY KEY(savings_id),
	-- 외래 키
    animal_id BIGINT NOT NULL, -- animal 테이블의 외래 키
    CONSTRAINT savings_animal_id_FK FOREIGN KEY (animal_id) REFERENCES `animal`(animal_id) ON DELETE CASCADE,
    savings_type_id BIGINT NOT NULL, -- savings_type 테이블의 외래 키
    CONSTRAINT savings_savings_type_id_FK FOREIGN KEY (savings_type_id) REFERENCES savings_type(savings_type_id) ON DELETE CASCADE
);

CREATE TABLE loan(
	loan_id BIGINT NOT NULL AUTO_INCREMENT,
    loan_type BIGINT NOT NULL,
    loan_rate BIGINT NOT NULL,
    loan_amount BIGINT NOT NULL,
    loan_remain BIGINT NOT NULL,
    loan_start_turn BIGINT NOT NULL,
    loan_period BIGINT NOT NULL,
    loan_to_end BIGINT NOT NULL,
    loan_warning BOOLEAN NOT NULL,
    loan_is_end BOOLEAN NOT NULL,
    created_date DATETIME NOT NULL,
    modified_date DATETIME NOT NULL,
    CONSTRAINT loan_PK PRIMARY KEY(loan_id),
	-- 외래 키
    animal_id BIGINT NOT NULL, -- animal 테이블의 외래 키
    CONSTRAINT loan_animal_id_FK FOREIGN KEY (animal_id) REFERENCES `animal`(animal_id) ON DELETE CASCADE
);

CREATE TABLE capital(
	capital_id BIGINT NOT NULL AUTO_INCREMENT,
    capital_amount BIGINT NOT NULL,
    capital_remain BIGINT NOT NULL,
    capital_start_turn BIGINT NOT NULL,
    capital_end_turn BIGINT NOT NULL,
    capital_is_end BOOLEAN NOT NULL,
    created_date DATETIME NOT NULL,
    modified_date DATETIME NOT NULL,
    CONSTRAINT capital_PK PRIMARY KEY(capital_id),
	-- 외래 키
    animal_id BIGINT NOT NULL, -- animal 테이블의 외래 키
    CONSTRAINT capital_animal_id_FK FOREIGN KEY (animal_id) REFERENCES `animal`(animal_id) ON DELETE CASCADE
);

CREATE TABLE portfolio(
	portfolio_id BIGINT NOT NULL AUTO_INCREMENT,
    portfolio_ending VARCHAR(30) NOT NULL,
    portfolio_deposit_percent BIGINT NOT NULL,
    portfolio_savings_percent BIGINT NOT NULL,
    portfolio_stock_percent BIGINT NOT NULL,
    portfolio_invest_style VARCHAR(30) NOT NULL,
    portfolio_score BIGINT NOT NULL,
    created_date DATETIME NOT NULL,
    modified_date DATETIME NOT NULL,
    CONSTRAINT portfolio_PK PRIMARY KEY(portfolio_id),
    -- 외래 키
	animal_id BIGINT NOT NULL, -- animal 테이블의 외래 키
    CONSTRAINT portfolio_animal_id_FK FOREIGN KEY (animal_id) REFERENCES `animal`(animal_id) ON DELETE CASCADE
);

CREATE TABLE non_payment(
	non_payment_id BIGINT NOT NULL AUTO_INCREMENT,
    warning_savings BOOLEAN NOT NULL,
    warning_loan BOOLEAN NOT NULL,
    deposit_total BIGINT NOT NULL,
    deposit_repay BIGINT NOT NULL,
    savings_total BIGINT NOT NULL,
    savings_repay BIGINT NOT NULL,
    stock_total BIGINT NOT NULL,
    stock_repay BIGINT NOT NULL,
    CONSTRAINT non_payment_PK PRIMARY KEY(non_payment_id),
    -- 외래 키
	animal_id BIGINT NOT NULL, -- animal 테이블의 외래 키
    CONSTRAINT non_payment_animal_id_FK FOREIGN KEY (animal_id) REFERENCES `animal`(animal_id) ON DELETE CASCADE
);

CREATE TABLE quest(
	quest_id BIGINT NOT NULL AUTO_INCREMENT,
    quest_content VARCHAR(200) NOT NULL,
    quset_award BIGINT NOT NULL,
    CONSTRAINT quest_PK PRIMARY KEY(quest_id)
);

CREATE TABLE animal_quest(
	animal_quest_id BIGINT NOT NULL AUTO_INCREMENT,
    is_cleared BOOLEAN NOT NULL,
    CONSTRAINT animal_quest_PK PRIMARY KEY(animal_quest_id),
	-- 외래 키
	animal_id BIGINT NOT NULL, -- animal 테이블의 외래 키
    CONSTRAINT animal_quest_animal_id_FK FOREIGN KEY (animal_id) REFERENCES `animal`(animal_id) ON DELETE CASCADE,
	quest_id BIGINT NOT NULL, -- quest 테이블의 외래 키
    CONSTRAINT animal_quest_quest_id_FK FOREIGN KEY (quest_id) REFERENCES quest(quest_id) ON DELETE CASCADE
);

CREATE TABLE stock(
	stock_id BIGINT NOT NULL AUTO_INCREMENT,
    stock_type VARCHAR(10) NOT NULL,
    stock_name VARCHAR(20) NOT NULL,
    stock_code VARCHAR(6) NOT NULL,
    stock_intro VARCHAR(100) NOT NULL,
    stock_description VARCHAR(1000) NOT NULL,
    stock_img VARCHAR(300) NOT NULL,
    stock_dividends BOOLEAN NOT NULL,
    CONSTRAINT stock_PK PRIMARY KEY(stock_id)
);

CREATE TABLE chart(
	chart_id BIGINT NOT NULL AUTO_INCREMENT,
    chart_turn BIGINT NOT NULL,
    chart_rate BIGINT NOT NULL,
    chart_buy BIGINT NOT NULL,
    chart_sell BIGINT NOT NULL,
    chart_high BIGINT NOT NULL,
    chart_low BIGINT NOT NULL,
    chart_start BIGINT NOT NULL,
    chart_end BIGINT NOT NULL,
    CONSTRAINT chart_PK PRIMARY KEY(chart_id),
    -- 외래 키
    stock_id BIGINT NOT NULL, -- stock 테이블의 외래 키
    CONSTRAINT chart_stock_id_FK FOREIGN KEY (stock_id) REFERENCES stock(stock_id) ON DELETE CASCADE
);

CREATE TABLE stock_holdings(
	stock_holdings_id BIGINT NOT NULL AUTO_INCREMENT,
    stock_count BIGINT NOT NULL,
    stock_average_price BIGINT NOT NULL,
    field1 BIGINT NOT NULL,
    field2 BIGINT NOT NULL,
    CONSTRAINT stock_holdings_PK PRIMARY KEY(stock_holdings_id),
	-- 외래 키
	animal_id BIGINT NOT NULL, -- animal 테이블의 외래 키
    CONSTRAINT stock_holdings_animal_id_FK FOREIGN KEY (animal_id) REFERENCES `animal`(animal_id) ON DELETE CASCADE,
    stock_id BIGINT NOT NULL, -- stock 테이블의 외래 키
    CONSTRAINT stock_holdings_stock_id_FK FOREIGN KEY (stock_id) REFERENCES stock(stock_id) ON DELETE CASCADE
);

CREATE TABLE stock_history(
	stock_history_id BIGINT NOT NULL AUTO_INCREMENT,
    trade_count BIGINT NOT NULL,
    is_buy BOOLEAN NOT NULL,
    turn BIGINT NOT NULL,
    CONSTRAINT stock_history_PK PRIMARY KEY(stock_history_id),
	-- 외래 키
	animal_id BIGINT NOT NULL, -- animal 테이블의 외래 키
    CONSTRAINT stock_history_animal_id_FK FOREIGN KEY (animal_id) REFERENCES `animal`(animal_id) ON DELETE CASCADE,
    stock_id BIGINT NOT NULL, -- stock 테이블의 외래 키
    CONSTRAINT stock_history_stock_id_FK FOREIGN KEY (stock_id) REFERENCES stock(stock_id) ON DELETE CASCADE
);

CREATE TABLE financial_statements(
	fs_id BIGINT NOT NULL AUTO_INCREMENT,
    fs_period BIGINT NOT NULL,
	field1 BIGINT NOT NULL,
    field2 BIGINT NOT NULL,
    CONSTRAINT financial_statements_PK PRIMARY KEY(fs_id),
    -- 외래 키
	stock_id BIGINT NOT NULL, -- stock 테이블의 외래 키
    CONSTRAINT financial_statements_stock_id_FK FOREIGN KEY (stock_id) REFERENCES stock(stock_id) ON DELETE CASCADE
);

CREATE TABLE news(
	news_id BIGINT NOT NULL AUTO_INCREMENT,
    turn BIGINT NOT NULL,
    content VARCHAR(1000) NOT NULL,
    field1 BIGINT NOT NULL,
    field2 BIGINT NOT NULL,
    CONSTRAINT news_PK PRIMARY KEY(news_id),
    -- 외래 키
	stock_id BIGINT NOT NULL, -- stock 테이블의 외래 키
    CONSTRAINT news_stock_id_FK FOREIGN KEY (stock_id) REFERENCES stock(stock_id) ON DELETE CASCADE
);

CREATE TABLE quiz(
	quiz_id BIGINT NOT NULL AUTO_INCREMENT,
    quiz_date DATETIME NOT NULL,
    quiz_level BIGINT NOT NULL,
    quiz_question VARCHAR(200) NOT NULL,
    quiz_answer VARCHAR(200) NOT NULL,
    CONSTRAINT quiz_PK PRIMARY KEY(quiz_id)
);

CREATE TABLE choice(
	choice_id BIGINT NOT NULL AUTO_INCREMENT,
    choice_number BIGINT NOT NULL,
    choice_content VARCHAR(200) NOT NULL,
    CONSTRAINT choice_PK PRIMARY KEY(choice_id),
    -- 외래 키
    quiz_id BIGINT NOT NULL, -- quiz 테이블의 외래 키check
    CONSTRAINT choice_quiz_id_FK FOREIGN KEY (quiz_id) REFERENCES quiz(quiz_id) ON DELETE CASCADE
);