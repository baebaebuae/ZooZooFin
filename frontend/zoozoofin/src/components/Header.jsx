// import React from "react";
import { Link } from 'react-router-dom';
import { WorkingAreas } from '@styles/components/common/Header';

const Header = () => {
    return (
        <nav>
            <WorkingAreas>
                <Link to="/juju">주연 작업실</Link>
                <Link to="/sinijini">희진 작업실</Link>
                <Link to="/jignonne">진영 작업실</Link>
                <Link to="/jjhoney">지현 작업실</Link>
            </WorkingAreas>
            <div>
                <Link to="/wallet">지갑</Link>
                <Link to="/map">지도</Link>
                <>현재 턴</>
            </div>
            <WorkingAreas>
                각 화면 임시 링크
                <Link to="/start">시작화면</Link>
                <Link to="/tutorial">튜토리얼</Link>
                <Link to="/myroom">내 방</Link>
                <Link to="/laptop">노트북</Link>
                <Link to="/bank">은행</Link>
                <Link to="/stock">주식</Link>
                <Link to="/lender">콩팥캐피탈</Link>
                <Link to="/school">학교</Link>
                <Link to="/work">당근게임</Link>
                <Link to="/ending">엔딩</Link>
            </WorkingAreas>
        </nav>
    );
};

export default Header;
