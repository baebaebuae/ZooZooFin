import styled from 'styled-components';
import StockChannel from '../components/stock/StockChannel';
import StockBuy from '../components/stock/StockBuy';
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
                <StockChannel />
                <StockBuy />
            </SampleBlock>
        </>
    );
};

export default Stock;
