import React, { useEffect } from 'react';
import styled from 'styled-components';
import IconGold from '@assets/images/icons/icon_gold.png';
import { NormalIcon } from '@components/root/icon';
import useUserStore from '@/stores/useUserStore';
import { useLocation } from 'react-router-dom';

const PropInfoBox = styled.div`
    display: flex;
    flex-direction: column; 
    align-items: flex-end; 
    width:100%;
`;

const PropValue = styled.div`
    font-family: 'OneMobilePop';
    font-size: 16px;
    text-align: right;
    font-weight: bold;
    width: 100%;
`;

const PropMoney = styled(PropValue)`
    color: #08c600; 
    position: relative;
    display: inline-block;
    text-shadow: 1px 1px 0 white, 
                 -1px 1px 0 white,
                 1px -1px 0 white,
                 -1px -1px 0 white;
    width: 100%; 
    white-space: nowrap; /* 텍스트 줄바꿈 방지 */
`;


const PropGold = styled(PropValue)`
    color: #ffd84e;
    position: relative;
    display: inline-block;
    text-shadow: 1px 1px 0 #ffffff, 
                 -1px 1px 0 #ffffff,
                 1px -1px 0 #ffffff,
                 -1px -1px 0 #ffffff;
`;

const CarrotIcon = styled.span`
    display: inline-block;
    color: #ff9933; /* 당근 색상 *
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
