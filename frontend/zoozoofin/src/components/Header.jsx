import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProfileIcon } from '@components/root/icon';
import CharRabbit from '@assets/images/characters/rabbitProfile.png';
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
import Wallet from './Wallet';

const HeaderContainer = styled.nav`
    /* position: fixed; */
    /* top: 20px; */
    /* left: 10px; // 절대적인 픽셀 값 */
    width: 340px;
    margin: 0 10px;
    z-index: 5000;
`;

const HeaderBlock = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

const HeaderButtonBlock = styled.div`
    display: flex;
`;

const HeaderUserBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;

const Header = () => {
    const [isCharOpen, setIsCharOpen] = useState(false);
    const [isWalletOpen, setIsWalletOpen] = useState(false);
    const { animalAssets, memberGoldBar, turn, fetchUserProfile } = useUserStore();

    useEffect(() => {
        fetchUserProfile();
    }, [fetchUserProfile]);

    const openCharInfo = () => {
        console.log('캐릭터 클릭됨');
        setIsCharOpen(!isCharOpen);
    };

    const openWalletModal = () => {
        setIsWalletOpen(true);
    };

    const closeWalletModal = () => {
        setIsWalletOpen(false);
    };

    const formatNumber = (num) => {
        return num ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : null;
    };

    return (
        <HeaderContainer>
            <HeaderBlock>
                <HeaderButtonBlock>
                    <HeaderHamburgerButton />
                    <Link to="/map">
                        <HeaderMapButton />
                    </Link>
                    <HeaderWalletButton onClick={openWalletModal} />
                    <HeaderTurnButton currentTurn={turn} />
                </HeaderButtonBlock>
                <HeaderUserBlock>
                    <ProfileIcon icon={CharRabbit} onClick={openCharInfo} />
                    <PropInfo
                        propMoney={formatNumber(animalAssets)}
                        propGold={formatNumber(memberGoldBar)}
                    />
                </HeaderUserBlock>
            </HeaderBlock>
            {isCharOpen && <CharacterInfo onClose={openCharInfo} />}
            {isWalletOpen && <Wallet onClose={closeWalletModal} />}
        </HeaderContainer>
    );
};

export default Header;
