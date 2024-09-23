// import React from "react";
import { Link } from 'react-router-dom';
import { WorkingAreas } from '@styles/components/common/Header';

import styled from 'styled-components';
import {
    HeaderHamburgerButton,
    HeaderMapButton,
    HeaderWalletButton,
    HeaderTurnButton,
} from './root/headerButton';
import { PropInfo, CharInfo } from './root/headerCharInfo';

const HeaderBlock = styled.div`
    width: 340px;
    display: flex;
    justify-content: space-between;
`;

const HeaderButtonBlock = styled.div`
    display: flex;
`;

const HeaderUserBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: end;
`;

const TempWidthLine = styled.div`
    width: 360px;
    height: 10px;
    background-color: black;
`;

const Header = () => {
    return (
        <nav>
            <WorkingAreas>
                <Link to="/juju">주연 작업실</Link>
                <Link to="/sinijini">희진 작업실</Link>
                <Link to="/jignonne">진영 작업실</Link>
                <Link to="/jjhoney">지현 작업실</Link>
            </WorkingAreas>
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
            <div>360px</div>
            <TempWidthLine />
            {/*  */}
            {/* 진짜 헤더 */}
            {/*  */}
            <HeaderBlock>
                <HeaderButtonBlock>
                    <HeaderHamburgerButton />
                    <Link to="/map">
                        <HeaderMapButton />
                    </Link>
                    <Link to="/wallet">
                        <HeaderWalletButton />
                    </Link>
                    <HeaderTurnButton currentTurn={30} />
                </HeaderButtonBlock>
                <HeaderUserBlock>
                    <CharInfo />
                    <PropInfo />
                </HeaderUserBlock>
            </HeaderBlock>
        </nav>
    );
};

export default Header;
