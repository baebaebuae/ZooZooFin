import { useState } from 'react';
import styled from 'styled-components';

import { InfoBox } from '@components/root/infoBox';
import IconFrog from '@assets/images/icons/icon_frog.png';

import { StockTitle } from '@components/stock/common/container/StockTitleContainer';

import { BankSavingsDetail } from './BankSavingsDetail';

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const AppContent = styled.div`
    width: 100%;
    font-weight: bold;
    font-size: 20px;
    text-align: left;
    margin: 20px 0;
`;

const AppContentH2 = styled.div`
    width: 100%;
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 20px;
`;

const BlankBlock = styled.div`
    color: gray;
    /* height: 100%; */
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ProductBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    /* background-color: pink; */
`;

const ProductTitleBox = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
`;

const ProductName = styled.div`
    font-size: 14px;
    color: gray;
`;

const ProductTurn = styled.div`
    font-size: 10px;
    color: ${({ theme }) => theme.colors.primaryShadow};
`;

const ProductAmount = styled.div`
    font-size: 16px;
    font-weight: bold;
`;

export const Stock = () => {
    const [isSelected, setIsSelected] = useState(false);
    const [selectedData, setSelectedData] = useState(null);

    const handleSelect = (data) => {
        setIsSelected(true);
        setSelectedData(data);
    };

    const data = {
        totalAmount: 123456789000,
        domestic: [
            {
                stockId: 1,
                stockName: '개굴전자',
                stockTotal: 30000000,
                stockRate: 3,
            },
            {
                stockId: 2,
                stockName: '개굴식품',
                stockTotal: 50000000,
                stockRate: 10,
            },
        ],
        oversea: [
            // {
            //     stockId: 1,
            //     stockName: '멍멍자동차',
            //     stockTotal: 50000000,
            //     stockRate: 10,
            // },
        ],

        etf: [
            {
                stockId: 1,
                stockCompany: '호랑증권',
                stockName: '신재생에너지액티브',
                stockTotal: 50000000,
                stockRate: 10,
            },
        ],
    };

    const item = data.domestic[0];

    return (
        <Container>
            {isSelected ? (
                <BankSavingsDetail
                    name={selectedData.name}
                    warning={selectedData.warning}
                    rate={selectedData.rate}
                    amount={selectedData.amount}
                    endTurn={selectedData.endTurn}
                    finalReturn={selectedData.finalReturn}
                    period={selectedData.period}
                    restTurn={selectedData.restTurn}
                    handleSelected={() => setIsSelected(false)}
                />
            ) : (
                <>
                    <InfoBox
                        color={'primaryDeep'}
                        infoTitle={'님의 주식 총 자산'}
                        infoContent={`${data.totalAmount.toLocaleString()}원`}
                    ></InfoBox>
                    <AppContent>보유 주식</AppContent>
                    <AppContentH2>국내</AppContentH2>
                    {data.domestic.length > 0 && (
                        <></>
                        // <StockTitle
                        //     // key={index}
                        //     companyName={item.stockName}
                        //     stockPrice={item.stockTotal}
                        //     currentState={item.rate > 0 ? 'up' : 'down'}
                        //     onToggle={() => {}}
                        // />
                        // 주식 파트와 병합 후 진행
                    )}

                    <AppContentH2>해외</AppContentH2>
                    {data.oversea.length > 0 && <div>해외주식있을때</div>}

                    <AppContentH2>ETF</AppContentH2>
                    {data.etf.length > 0 && <div>etf 있을때</div>}

                    {data.domestic.length === 0 &&
                        data.oversea.length === 0 &&
                        data.etf.length === 0 && (
                            <BlankBlock>아직 구입한 주식이 없어요.</BlankBlock>
                        )}
                </>
            )}
        </Container>
    );
};
