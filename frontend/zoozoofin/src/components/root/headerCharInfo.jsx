import styled from 'styled-components';
import IconGold from '@assets/images/icons/icon_gold.svg?react';
import IconMoney from '@assets/images/icons/icon_money.svg?react';

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
    /* -webkit-text-stroke: 1px brown; */
`;

const PropGold = styled(PropValue)`
    background: linear-gradient(270deg, #ffd84e, #ffefb8);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    -webkit-text-fill-color: transparent;
    /* -webkit-text-stroke: 1px brown; */
`;
export const PropInfo = ({ propMoney, propGold }) => {
    return (
        <>
            <PropInfoBox>
                <PropMoney>
                    {propMoney}
                    {/* 형식 문제로(10,000,000) 문자열 처리되어있음 */}
                    <IconMoney width={30} height={20} />
                </PropMoney>
                <PropGold>
                    {propGold}
                    <IconGold width={30} height={20} />
                </PropGold>
            </PropInfoBox>
        </>
    );
};

// CharIcon : Header에서 관리(Char 정보 받아오기)
