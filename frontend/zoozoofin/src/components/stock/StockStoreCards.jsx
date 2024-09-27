import styled from 'styled-components';

import { Card } from '../root/card';

// 주식 구매 카드
export const StockBuyingCard = styled(Card)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px 30px;
    gap: 12px;
`;

export const BuyingContent = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    padding: 0px;
    gap: 5px;
    width: 100%;
`;

export const BuyingMoneyContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    padding: 0px;
    gap: 5px;
`;

export const CompanyName = styled.p`
    font-size: 16px;
    margin: 0px;
`;

export const StockPrice = styled.p`
    font-size: 18px;
    font-weight: bold;
    padding: 0px;
    margin: 0px;
`;

// api 토대로 색상 변경 변수 설정 예정
export const CurrentStockState = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 60%;
    padding: 1px 0px;
    border-radius: 30px;
    background-color: ${({ current, theme }) => {
        if (current === 'up') {
            return '#FBEBEE';
        } else if (current === 'down') {
            return '#E8F3FF';
        } else {
            return theme.colors.primary;
        }
    }};
    font-size: 12px;
    color: ${({ current, theme }) => {
        if (current === 'up') {
            return '#FF3E3E';
        } else if (current === 'down') {
            return theme.colors.primaryDeep;
        } else {
            return theme.colors.primaryDeep;
        }
    }};
`;

export const Divider = styled.div`
    width: 100%;
    height: 1px;
    margin: ${({ isLine }) => (isLine ? '4px' : '0px')};
    background-color: ${({ theme }) => theme.colors.primary};
`;
