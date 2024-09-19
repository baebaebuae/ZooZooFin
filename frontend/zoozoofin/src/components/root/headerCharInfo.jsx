import styled from 'styled-components';
import IconGold from '@assets/images/icons/icon_gold.svg?react';
import IconMoney from '@assets/images/icons/icon_money.svg?react';
import { LargeIcon } from '@components/root/icon';
import CharRabbit from '@assets/images/characters/rabbit.svg?react';

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
export const PropInfo = () => {
    return (
        <>
            <PropInfoBox>
                <PropMoney>
                    10,000,000
                    <IconMoney width={30} height={20} />
                </PropMoney>
                <PropGold>
                    4,230
                    <IconGold width={30} height={20} />
                </PropGold>
            </PropInfoBox>
        </>
    );
};

export const CharInfo = () => {
    return (
        <>
            <LargeIcon icon={CharRabbit} />
        </>
    );
};
