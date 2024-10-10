import styled from 'styled-components';

export const BuyingContent = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    padding: 0px;
    gap: 5px;
    width: 100%;
`;
export const MyStockContent = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
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
    margin: 0;
    font-size: ${({ type }) => {
        if (type === 'title') {
            return '12px';
        } else {
            return '16px';
        }
    }};
    color: ${({ type }) => {
        if (type === 'title') {
            return '#6C7377';
        } else {
            return 'black';
        }
    }};
`;

export const TitleCoulumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 10px;
`;

export const StockPrice = styled.p`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: flex-end;
    gap: 5px;
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
    width: 60px;
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
export const RateState = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 60px;
    padding: 1px 0px;
    border-radius: 30px;
    background-color: ${({ rate, theme }) => {
        if (rate > 0) {
            return '#FBEBEE';
        } else if (rate < 0) {
            return '#E8F3FF';
        } else {
            return theme.colors.primary;
        }
    }};
    font-size: 12px;
    color: ${({ rate, theme }) => {
        if (rate > 0) {
            return '#FF3E3E';
        } else {
            return theme.colors.primaryDeep;
        }
    }};
`;

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
`;
