import React from 'react';
import { Link } from 'react-router-dom';
import {
    BankAppIcon,
    StockAppIcon,
    LenderAppIcon,
    LeaderBoardAppIcon,
} from '../styles/components/laptop/AppIcons';

const Laptop = () => {
    return (
        <>
            <h1>Laptop</h1>
            <div>
                앱 목록 Block / 임시로 설정해둔 경로. 각 노트북 화면 컴포넌트로 전환되어야함
                <Link to="/bank">
                    <BankAppIcon>은행</BankAppIcon>
                </Link>
                <Link to="/stock">
                    <StockAppIcon>주식거래소</StockAppIcon>
                </Link>
                <Link to="/lender">
                    <LenderAppIcon>콩팥캐피탈</LenderAppIcon>
                </Link>
                <Link to="/jjhoney">
                    <LeaderBoardAppIcon>리더보드</LeaderBoardAppIcon>
                </Link>
            </div>
            <div>각 앱 Box</div>
        </>
    );
};

export default Laptop;
