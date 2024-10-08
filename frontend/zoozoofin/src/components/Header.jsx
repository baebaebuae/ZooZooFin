import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LargeIcon } from '@components/root/icon';
import CharRabbit from '@assets/images/characters/rabbit.png';
import useUserStore from '../stores/useUserStore';
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
    width: 94%;
    position: fixed;
    display: flex;
    justify-content: space-between;
    padding: 0 3%;
    margin: 20px 0;
    z-index: 10;
`;

const HeaderButtonBlock = styled.div`
    display: flex;
`;

const HeaderUserBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: end;
`;

const Header = () => {
    const [isCharOpen, setIsCharOpen] = useState(false);
    const { animalAssets, memberGoldBar, turn, fetchUserProfile } = useUserStore();

    useEffect(() => {
        fetchUserProfile();
    }, [fetchUserProfile]);

    const openCharInfo = () => {
        console.log('캐릭터 클릭됨');
        setIsCharOpen(!isCharOpen);
    };

    // 1,000 형식으로
    const formatNumber = (num) => {
        return num ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : null;
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
                    <HeaderTurnButton currentTurn={turn} />
                </HeaderButtonBlock>
                <HeaderUserBlock>
                    <LargeIcon icon={CharRabbit} onClick={openCharInfo} />
                    {isCharOpen && <CharacterInfo onClose={openCharInfo} />}
                    <PropInfo
                        propMoney={formatNumber(animalAssets)}
                        propGold={formatNumber(memberGoldBar)}
                    />
                </HeaderUserBlock>
            </HeaderBlock>
        </nav>
    );
};

export default Header;
