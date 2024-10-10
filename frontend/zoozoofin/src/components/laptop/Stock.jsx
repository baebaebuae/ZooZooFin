import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { LaptopInfoBox } from '@components/root/infoBox';
import IconFrog from '@assets/images/icons/icon_frog.png';

import { StockTitle } from '@components/stock/common/container/StockTitleContainer';

import { StockDetail } from './StockDetail';
import { getApiClient } from '@stores/apiClient';
import { useAnimalStore } from '../../store';

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    height: 400px;
    overflow-y: auto;
    padding: 20px 0;
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
`;

const ProductBlock = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin: 20px 0;
`;

const BlankBlock = styled.div`
    color: gray;
    /* height: 100%; */
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Stock = () => {
    const [isSelected, setIsSelected] = useState(false);
    const [data, setData] = useState(null);
    const [selectedData, setSelectedData] = useState(null);

    const { getAnimalData } = useAnimalStore();

    const handleSelect = (stockId) => {
        getStockDetail(stockId);
        setIsSelected(true);
    };

    const fetchStockData = async () => {
        try {
            const apiClient = getApiClient();
            const res = await apiClient.get('/stock/notebook');
            // console.log(res);
            setData(res.data.body);
        } catch (error) {
            console.error('Failed to fetch user notebook Stock:', error);
        }
    };

    const getStockDetail = async (stockId) => {
        try {
            const apiClient = getApiClient();
            const res = await apiClient.get(`/stock/notebook/${stockId}`);
            // console.log(res);
            setSelectedData(res.data.body);
        } catch (error) {
            console.error('Failed to fetch user notebook Stock:', error);
        }
    };

    useEffect(() => {
        getAnimalData();
        fetchStockData();
    }, []);

    useEffect;

    if (data) {
        return (
            <Container>
                {isSelected && selectedData ? (
                    <StockDetail
                        name={selectedData.stockName}
                        stockRate={selectedData.stockRate} // 손익률
                        stockPrice={selectedData.stockPrice}
                        stockCount={selectedData.stockCount} // 보유 주식 수
                        purchaseDate={selectedData.buyTurn} // 매수일자
                        evaluationProfitLoss={selectedData.profit} // 평가손익
                        tradeHistory={selectedData.stockHistory} // 매매 내역
                        handleSelected={() => setIsSelected(false)}
                        stockCharts={selectedData.chart}
                    />
                ) : (
                    <>
                        <LaptopInfoBox
                            color={'primaryDeep'}
                            infoTitle={'님의 주식 총 자산'}
                            infoContent={data ? `${data.totalAmount.toLocaleString()}🥕` : 0}
                        ></LaptopInfoBox>
                        <AppContent>보유 주식</AppContent>
                        {data && data.domesticList.length > 0 && (
                            <>
                                <AppContentH2>국내</AppContentH2>
                                <ProductBlock>
                                    {data.domesticList.map((stock, index) => {
                                        return (
                                            <StockTitle
                                                key={index}
                                                stockName={stock.stockName}
                                                stockPrice={stock.stockTotal}
                                                stockRate={stock.stockRate}
                                                onToggle={() => handleSelect(stock.stockId)}
                                            />
                                        );
                                    })}
                                </ProductBlock>
                            </>
                        )}

                        {data && data.overseaList.length > 0 && (
                            <>
                                <AppContentH2>해외</AppContentH2>
                                <ProductBlock>
                                    {data.overseaList.map((stock, index) => {
                                        return (
                                            <StockTitle
                                                key={index}
                                                companyName={stock.stockName}
                                                stockPrice={stock.stockTotal}
                                                currentState={stock.stockRate > 0 ? 'up' : 'down'}
                                                onToggle={() => handleSelect(stock)}
                                            />
                                        );
                                    })}
                                </ProductBlock>
                            </>
                        )}

                        {data && data.etfList.length > 0 && (
                            <>
                                <AppContentH2>ETF</AppContentH2>
                                <ProductBlock>
                                    {data.etfList.map((stock, index) => {
                                        return (
                                            <StockTitle
                                                key={index}
                                                companyName={stock.stockName}
                                                stockPrice={stock.stockTotal}
                                                currentState={stock.stockRate > 0 ? 'up' : 'down'}
                                                onToggle={() => handleSelect(stock)}
                                            />
                                        );
                                    })}
                                </ProductBlock>
                            </>
                        )}

                        {data.domesticList.length === 0 &&
                            data.overseaList.length === 0 &&
                            data.etfList.length === 0 && (
                                <BlankBlock>아직 구입한 주식이 없어요.</BlankBlock>
                            )}
                    </>
                )}
            </Container>
        );
    }
};

// const data = {
//     totalAmount: 123456789000,
//     domestic: [
//         {
//             stockId: 1,
//             stockName: '개굴전자',
//             stockTotal: 30316000,
//             stockRate: -5,
//             stockCount: 10, // 보유 주식 수
//             purchaseDate: 15, // 매수일자(턴)
//             evaluationProfitLoss: 1234000, // 평가손익
//             tradeHistory: [
//                 {
//                     turnNumber: 1,
//                     tradeType: '매수',
//                     tradeQuantity: 5,
//                     tradePrice: 1000000,
//                 },
//                 {
//                     turnNumber: 6,
//                     tradeType: '매도',
//                     tradeQuantity: 7,
//                     tradePrice: 1400000,
//                 },
//             ], // 매매 내역
//         },
//         {
//             stockId: 2,
//             stockName: '개굴식품',
//             stockTotal: 5416000,
//             stockRate: 3,
//         },
//     ],
//     oversea: [
//         {
//             stockId: 1,
//             stockName: '멍멍자동차',
//             stockTotal: 123456700,
//             stockRate: 10,
//         },
//     ],

//     etf: [
//         {
//             stockId: 1,
//             stockCompany: '호랑증권',
//             stockName: '신재생에너지액티브',
//             stockTotal: 50000000,
//             stockRate: 10,
//         },
//     ],
// };

// const item = data.domestic[0];
