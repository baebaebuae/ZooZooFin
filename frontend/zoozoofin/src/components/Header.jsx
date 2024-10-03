import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LargeIcon } from '@components/root/icon';
import CharRabbit from '@assets/images/characters/rabbit.png';

import styled from 'styled-components';
import {
    HeaderHamburgerButton,
    HeaderMapButton,
    HeaderWalletButton,
    HeaderTurnButton,
} from './root/headerButton';
import { PropInfo } from './root/headerCharInfo';

import CharacterInfo from './character/CharacterInfo';

const HeaderBlock = styled.div`
    position: fixed;
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
        </nav>
    );
};

export default Header;
