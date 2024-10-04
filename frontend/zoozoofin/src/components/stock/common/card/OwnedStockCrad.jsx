import styled from 'styled-components';
import { Card } from '@components/root/card';
import { CarrotIcon } from '@components/stock/common/icon/StockIcons';
import {
    BuyingMoneyContent,
    CurrentStockState,
    StockPrice,
} from '@components/stock/common/container/StoreContainer';
import { Divider } from '@components/stock/common/card/StoreCards';

import { Collapse } from '@mui/material';
import { useState } from 'react';

const StockCard = styled(Card)`
    padding: 25px 30px;
    position: relative;
    width: 75%;
    gap: 5px;
`;

const ListContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    padding: 0px;
    gap: 20px;
    width: 100%;
`;

const TextStyle = styled.span`
    margin: 0;
    color: ${({ type, theme }) =>
        type === 'total'
            ? theme.colors.primaryShadow
            : type === 'up'
              ? theme.colors.warn
              : type === 'down'
                ? theme.colors.primaryDeep
                : theme.colors.gray};
    font-size: ${({ type }) => (type === 'total' ? '20px' : '16px')};
    font-weight: ${({ type }) => (type !== 'list' && type !== 'total' ? 'bold' : 'normal')};
`;

const DropdownButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 15px;
    height: 15px;
    padding: 1px 2px;
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 3px;
    color: white;
    font-size: 10px;
    position: absolute;
    bottom: -5px;
    right: 20px;
`;

const StyledCollapse = styled(Collapse)`
    width: 100%;
    display: block;
`;

const DetailContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 0px;
    gap: 20px;
`;
const StyledDivier = styled(Divider)`
    margin: 15px 0px 0px 0px;
`;

const DetailContent = ({ totalPrice, gainLoss, myStock }) => {
    let currentState = '';

    if (gainLoss > 0) {
        currentState = 'up';
    } else if (gainLoss < 0) {
        currentState = 'down';
    } else {
        currentState = 'new';
    }
    return (
        <DetailContainer>
            <StyledDivier />
            <ListContainer>
                <TextStyle type="list">총 투자금</TextStyle>
                <StockPrice>
                    <TextStyle>{totalPrice.toLocaleString()}</TextStyle> <CarrotIcon />
                </StockPrice>
            </ListContainer>
            <ListContainer>
                <TextStyle type="list">총 손익</TextStyle>
                <BuyingMoneyContent>
                    <CurrentStockState current={currentState}>{currentState}</CurrentStockState>
                    <StockPrice>
                        <TextStyle type={currentState}>{myStock.toLocaleString()}</TextStyle>{' '}
                        <CarrotIcon />
                    </StockPrice>
                </BuyingMoneyContent>
            </ListContainer>
        </DetailContainer>
    );
};

export const OwnedStockCrad = () => {
    // api 연결 예정
    const myStock = 873000;
    const totalPrice = 100000000;
    const gainLoss = -127000;

    const [isOpen, SetIsOpen] = useState(false);

    const handleToggle = () => {
        SetIsOpen(!isOpen);
    };

    return (
        <StockCard onClick={handleToggle}>
            <ListContainer>
                <TextStyle type="list">보유 주식</TextStyle>
                <StockPrice>
                    <TextStyle type="total">{myStock.toLocaleString()}</TextStyle> <CarrotIcon />
                </StockPrice>
            </ListContainer>
            <DropdownButton onClick={handleToggle}>{!isOpen ? '▼' : '▲'}</DropdownButton>
            <StyledCollapse in={isOpen}>
                <DetailContent totalPrice={totalPrice} gainLoss={gainLoss} myStock={myStock} />
            </StyledCollapse>
        </StockCard>
    );
};

export default OwnedStockCrad;
