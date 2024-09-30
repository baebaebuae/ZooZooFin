import styled from 'styled-components';

import StockChannel from '@components/stock/stockList/StockChannel';
import StockBuy from '@components/stock/stockList/StockBuy';
import { StockOrder } from '@components/stock/stockList/StockOrder';
import StockResult from '@components/stock/stockList/StockResult';
import StockDetail from '@components/stock/stockList/StockDetail';

// 첫 진입시 환영 컴포넌트

// 턴별 화면 전환 예정 - 240926

const SampleBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 0px;
    gap: 21px;
    margin: 0px auto;
    width: 95%;
`;

const Stock = () => {
    return (
        <>
            <SampleBlock>
                {/* <StockChannel /> */}
                {/* <StockBuy /> */}
                {/* <StockOrder /> */}
                {/* <StockResult /> */}
                <StockDetail />
            </SampleBlock>
        </>
    );
};

export default Stock;
