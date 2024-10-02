import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LargeIcon } from '@components/root/icon';
import CharRabbit from '@assets/images/characters/rabbit.svg?react';

import styled from 'styled-components';
import {
    HeaderHamburgerButton,
    HeaderMapButton,
    HeaderWalletButton,
    HeaderTurnButton,
} from './root/headerButton';
import { PropInfo } from './root/headerCharInfo';

import CharacterInfo from './character/CharacterInfo';

export const WorkingAreas = styled.div`
    height: 50px;
    width: full;
    display: flex;
    justify-content: space-between;
`;

const HeaderBlock = styled.div`
    position: fixed;
    top: 20;
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
    const [isCharOpen, setIsCharOpen] = useState(false);

    const openCharInfo = () => {
        console.log('캐릭터 클릭됨');
        setIsCharOpen(!isCharOpen);
    };

    return (
        <nav>
            <WorkingAreas>
                <Link to="/juju">주연 작업실</Link>
                <Link to="/sinijini">희진 작업실</Link>
                <Link to="/jignonne">진영 작업실</Link>
                <Link to="/jjhoney">지현 작업실</Link>
            </WorkingAreas>
            <WorkingAreas>
                <Link to="/start">시작화면</Link>
                <Link to="/tutorial">튜토리얼</Link>
                <Link to="/createanimal">캐릭터생성</Link>
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
                    <LargeIcon icon={CharRabbit} onClick={openCharInfo} />
                    {isCharOpen && <CharacterInfo onClose={openCharInfo} />}
                    <PropInfo propMoney={'10,000,000'} propGold={'4,230'} />
                </HeaderUserBlock>
            </HeaderBlock>

            {/*  */}
            {/* 진짜 헤더 */}
            {/*  */}
        </nav>
    );
};

export default Header;
