import styled from 'styled-components';
import { Card } from '@components/root/card';

// 주식 구매 카드
export const StockBuyingCard = styled(Card)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 15px 30px;
    width: 75%;
    gap: 12px;
`;

// 리스트 구분선
export const Divider = styled.div`
    width: 100%;
    height: 1px;
    margin: 4px;
    background-color: ${({ theme }) => theme.colors.primary};
`;
