import styled from 'styled-components';
import { Card } from '@components/root/card';
import { CarrotIcon } from '@components/stock/common/icon/StockIcons';
import {
    BuyingMoneyContent,
    CurrentStockState,
    RateState,
    StockPrice,
} from '@components/stock/common/container/StoreContainer';
import { Divider } from '@components/stock/common/card/StoreCards';

import { Collapse } from '@mui/material';
import { useEffect, useState } from 'react';
import { useUserStockStore } from '@components/stock/common/store/StockStore';

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

const formatStockRate = (stockRate) => {
    const rate = Math.abs(stockRate);
    if (stockRate < 0) {
        return `▼ ${parseFloat(rate).toFixed(1)} %`; // 음수일 경우 부호를 빼고 ▼를 붙임
    } else if (stockRate > 0) {
        return `▲ ${parseFloat(rate).toFixed(1)} %`; // 양수일 경우 + 부호를 붙이고 ▲를 붙임
    } else {
        return 'new'; // 0일 경우 그대로 출력
    }
};

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
                    <TextStyle>{totalPrice ? totalPrice.toLocaleString() : 0} 🥕</TextStyle>
                </StockPrice>
            </ListContainer>
            <ListContainer>
                <TextStyle type="list">총 손익</TextStyle>
                <BuyingMoneyContent>
                    <RateState rate={gainLoss}>{formatStockRate(gainLoss)}</RateState>
                    <StockPrice>
                        <TextStyle type={currentState}>
                            {myStock ? myStock.toLocaleString() : 0} 🥕
                        </TextStyle>
                    </StockPrice>
                </BuyingMoneyContent>
            </ListContainer>
        </DetailContainer>
    );
};

export const OwnedStockCrad = ({ channel }) => {
    const [totalAmount, setTotalAmount] = useState(null);
    const [totalInvestment, setTotalInvestment] = useState(null);
    const [gainLoss, setGainLoss] = useState(null);

    const [stockData, setStockData] = useState(null);
    const { myDomesticStocks, myOverseasStocks, myETFStocks } = useUserStockStore();

    useEffect(() => {
        let type = '';

        if (channel === '국내 주식') {
            type = 'domestic';
            setStockData(myDomesticStocks);
        } else if (channel === '해외 주식') {
            type = 'overseas';
            setStockData(myOverseasStocks);
        } else if (channel === 'ETF') {
            type = 'ETF';
            setStockData(myETFStocks);
        }
    }, [channel, myDomesticStocks, myOverseasStocks, myETFStocks]);

    useEffect(() => {
        // 보유 주식 확인 후 출력
        if (stockData) {
            const myTotalAmount = stockData.totalAmount;
            const myTotalInvestment = stockData.totalInvestment;
            const myTotalProfit = stockData.totalProfit;

            setTotalAmount(myTotalAmount);
            setTotalInvestment(myTotalInvestment);

            // 손익률 계산 (손익률 = (이익 / 투자금) * 100)
            const mygainLoss =
                myTotalInvestment !== 0
                    ? parseFloat(((myTotalProfit / myTotalInvestment) * 100).toFixed(2))
                    : 0;
            setGainLoss(mygainLoss);
        }
    }, [stockData]);

    // api 연결 예정

    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <StockCard onClick={handleToggle}>
            <ListContainer>
                <TextStyle type="list">보유 주식</TextStyle>
                <StockPrice>
                    <TextStyle type="total">
                        {totalAmount ? `${totalAmount.toLocaleString()} 🥕` : '로딩중..'}
                    </TextStyle>
                </StockPrice>
            </ListContainer>
            <DropdownButton onClick={handleToggle}>{!isOpen ? '▼' : '▲'}</DropdownButton>
            <StyledCollapse in={isOpen}>
                <DetailContent
                    totalPrice={totalInvestment ? totalInvestment : 0}
                    gainLoss={gainLoss ? gainLoss : 0}
                    myStock={totalAmount ? totalAmount : 0}
                />
            </StyledCollapse>
        </StockCard>
    );
};

export default OwnedStockCrad;
