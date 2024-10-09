import React, { useEffect } from 'react';
import styled from 'styled-components';
import IconGold from '@assets/images/icons/icon_gold.png';
import { NormalIcon } from '@components/root/icon';
import useUserStore from '@/stores/useUserStore';
import { useLocation } from 'react-router-dom';

const PropInfoBox = styled.div``;

const PropValue = styled.div`
    font-family: 'OneMobilePop';
    font-size: 16px;
    text-align: right;
    font-weight: bold;
`;

const PropMoney = styled(PropValue)`
    background: linear-gradient(180deg, #d1d9d1, #08c600);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    -webkit-text-fill-color: transparent;
`;

const PropGold = styled(PropValue)`
    background: linear-gradient(270deg, #ffd84e, #ffefb8);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    -webkit-text-fill-color: transparent;
`;

const CarrotIcon = styled.span`
    display: inline-block;
    color: #ff9933; /* 당근 색상 */
    -webkit-text-fill-color: initial; /* 초기화 */
`;

export const PropInfo = () => {
    const { animalAssets, memberGoldBar, fetchUserProfile } = useUserStore();
    const location = useLocation(); // 페이지 변경 감지

    // 페이지가 변경될 때마다 서버에서 프로필 데이터를 가져옴
    useEffect(() => {
        fetchUserProfile(); // 페이지가 변경되면 프로필 데이터를 다시 가져옴
    }, [location.pathname]); // location.pathname이 변경될 때마다 실행됨

    return (
        <PropInfoBox>
            <PropMoney>
                {animalAssets.toLocaleString()}
                <CarrotIcon>🥕</CarrotIcon>
            </PropMoney>
            <PropGold>
                {memberGoldBar.toLocaleString()}
                <NormalIcon icon={IconGold} />
            </PropGold>
        </PropInfoBox>
    );
};


// CharIcon : Header에서 관리(Char 정보 받아오기)
