import styled from 'styled-components';
import { Card } from '@components/root/card';

// 주식 뉴스 카드
export const StockDetailCard = styled(Card)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 15px 30px;
    width: 75%;
    gap: 12px;
`;
