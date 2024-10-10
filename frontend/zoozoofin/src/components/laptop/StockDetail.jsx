import styled from 'styled-components';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import LineGraph from './stock/LineGraph';

const DetailContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const DetailTitleBlock = styled.div`
    width: 100%;
    display: flex;
    justify-content: start;
    gap: 6px;
    margin: 10px 0;
`;

const DetailTitle = styled.div`
    font-weight: bold;
    font-size: 18px;
`;

const DetailContentBlock = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    gap: 4px;
`;

const DividerLarge = styled.div`
    height: 30px;
`;

const AppContentH2 = styled.div`
    width: 100%;
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 20px;
`;

const StockTotal = styled.div`
    width: 100%;
    font-size: 20px;
    text-align: center;
`;

const StockRate = styled.div`
    width: 100%;
    text-align: center;
    color: ${({ theme, $stockRate }) =>
        $stockRate > 0 ? theme.colors.warn : theme.colors.primaryDeep};
    font-size: 14px;
`;

const TableRow = styled.div`
    width: 100%;
    display: flex;
    margin: 2px 0;
`;
const TableBox = styled.div`
    padding: 8px 4px;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const TableTitle = styled(TableBox)`
    width: 70px;
    font-weight: bold;
    background-color: ${({ theme }) => theme.colors.background};
`;

const TableValue = styled(TableBox)`
    width: 40px;
    padding: 0 10px;
    display: flex;
    justify-content: start;
`;

const LoanListBox = styled.div`
    width: 100%;
    font-size: 12px;
    text-align: center;
    padding: 14px 0;
    display: grid;
    grid-template-columns: 1.5fr 2fr 2fr 4fr;
`;

const LoanListTitleBox = styled(LoanListBox)`
    background-color: ${({ theme }) => theme.colors.background};
`;

const LoanListTitle = styled.div`
    font-weight: bold;
`;

const LoanListContent = styled.div`
    color: ${({ theme, $tradeType }) =>
        $tradeType === '매도'
            ? theme.colors.primaryDeep
            : $tradeType === '매수'
              ? theme.colors.warn
              : theme.colors.gray};
    font-size: 12px;
`;

export const StockDetail = ({
    name,
    stockRate,
    stockPrice,
    handleSelected,
    stockCount,
    purchaseDate,
    evaluationProfitLoss,
    tradeHistory,
    stockCharts,
}) => {
    return (
        <DetailContainer>
            <DetailTitleBlock>
                <ArrowBackIosNewIcon onClick={handleSelected} />
                <DetailTitle>{name}</DetailTitle>
            </DetailTitleBlock>
            <DetailContentBlock>
                <LineGraph stockData={stockCharts} />
                <StockTotal>{stockPrice ? stockPrice.toLocaleString() : 0}🥕</StockTotal>
                <StockRate $stockRate={stockRate}>{stockRate}%</StockRate>
            </DetailContentBlock>
            <DividerLarge />

            <TableRow>
                <TableTitle>보유 주식 수</TableTitle>
                <TableValue>{stockCount}주</TableValue>
                <TableTitle>매수 일자</TableTitle>
                <TableValue>{purchaseDate}턴</TableValue>
            </TableRow>
            <TableRow>
                <TableTitle>손익률</TableTitle>
                <TableValue>{stockRate}%</TableValue>
                <TableTitle>평가손익</TableTitle>
                <TableValue>
                    {evaluationProfitLoss ? evaluationProfitLoss.toLocaleString() : 0}
                </TableValue>
            </TableRow>
            <DividerLarge />

            <AppContentH2>매매 내역</AppContentH2>

            <LoanListTitleBox>
                <LoanListTitle>회차</LoanListTitle>
                <LoanListTitle>거래 유형</LoanListTitle>
                <LoanListTitle>거래 수량</LoanListTitle>
                <LoanListTitle>거래가</LoanListTitle>
            </LoanListTitleBox>
            {tradeHistory &&
                tradeHistory.map((trade, index) => {
                    return (
                        <LoanListBox key={index}>
                            <LoanListContent>{trade.turn}</LoanListContent>
                            <LoanListContent $tradeType={trade.type}>{trade.type}</LoanListContent>
                            <LoanListContent>{trade.count}</LoanListContent>
                            <LoanListContent>{trade.price}</LoanListContent>
                        </LoanListBox>
                    );
                })}
        </DetailContainer>
    );
};
