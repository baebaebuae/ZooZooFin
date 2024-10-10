import { Collapse } from '@mui/material';

import {
    BuyingContent,
    CompanyName,
    BuyingMoneyContent,
    RateState,
    StockPrice,
    ButtonContainer,
    TitleCoulumn,
} from '@components/stock/common/container/StoreContainer';
import { CarrotIcon } from '@components/stock/common/icon/StockIcons';
import { ActiveButton, DetailButton } from '@components/stock/common/button/Button';
import { Divider } from '@components/stock/common/card/StoreCards';
import { useEffect, useState } from 'react';

import { getApiClient } from '../../../../stores/apiClient';
import useStockStore, { useUserStockStore } from '../store/StockStore';

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

export const StockTitle = ({ stockName, stockPrice, stockRate, onToggle, stockTotal }) => {
    return (
        <BuyingContent onClick={onToggle} style={{ cursor: 'pointer' }}>
            <CompanyName>{stockName}</CompanyName>
            <BuyingMoneyContent>
                <RateState rate={stockRate}>{formatStockRate(stockRate)}</RateState>
                <StockPrice>{(stockPrice || stockTotal || 0).toLocaleString()} 🥕</StockPrice>
            </BuyingMoneyContent>
        </BuyingContent>
    );
};

export const StockTitleContainer = ({
    stockName,
    stockId,
    stockRate,
    stockIntro,
    isOpen,
    onToggle,
    // 구매 화면 이동 테스트를 위해 추가 => 데이터 연결 후 삭제 예정
    isStockSelected,
    type,
    channel,
    onDetailClick,
    stockTotal,
    stockCount,
}) => {
    const [value, setValue] = useState(null);
    const [stockPrice, setStockPrice] = useState(null); // stockPrice 상태 추가
    const [goToOrder, setGoToOrder] = useState(false);
    const [goToDetail, setGoToDetail] = useState(false);

    const {
        clickedStockId,
        setClickedStockId,
        clickedStockInfo,
        clickedStockDetail,
        fetchStockInfo,
        fetchStockDetail,
    } = useStockStore();

    const { setClickedMyStock } = useUserStockStore();

    useEffect(() => {
        if (type === 'buy') {
            setValue('구매하기');
        } else {
            setValue('판매하기');
        }
    }, [type]);

    // 해외 환율 반영 예정
    const ExchangeRate = 1350;

    // stockId를 통해 stockPrice를 조회하는 함수
    const fetchStockPrice = async (stockId) => {
        try {
            const apiClient = getApiClient();
            const response = await apiClient.get(`/stock/info/${stockId}`);
            // console.log(response.data.body);
            // 현재 턴을 기준으로 가져올 예정
            const pricecharts = response.data.body.chart;
            // console.log(pricecharts);
            // console.log(response.data.body.chart[pricecharts.length - 1]['endPrice']);
            if (channel === '해외 주식') {
                const nowPrice = response.data.body.chart[pricecharts.length - 1]['price'];
                setStockPrice(nowPrice * ExchangeRate); // stockPrice 상태 업데이트
            } else {
                const nowPrice = response.data.body.chart[pricecharts.length - 1]['price'];
                setStockPrice(nowPrice); // stockPrice 상태 업데이트
            }

            // const fetchedPrice = response.data.charts.slice(-1)[0].endPrice;
        } catch (error) {
            console.error(`Failed to fetch stock price for stockId: ${stockId}`, error);
        }
    };

    // 컴포넌트가 마운트되거나 stockId가 변경될 때마다 stockPrice를 조회
    useEffect(() => {
        if (stockId) {
            // console.log('now', stockId);
            fetchStockPrice(stockId);
        }
    }, [stockId]);

    useEffect(() => {
        if (stockId) {
            console.log(`Fetching details for stockId: ${stockId}`);
            fetchStockInfo(stockId);
            // console.log(clickedStockInfo);
            fetchStockDetail(stockId);
        }
    }, [stockId]); // clickedStockId가 업데이트되면 fetch 실행

    const handleClickStock = () => {
        // isStockSelected(true);
        // 클릭 시 clickedStockId 업데이트

        setClickedStockId(stockId);
        if (type === 'buy') {
            setGoToOrder(true);
        }
        if (type === 'sell') {
            const nowMyStock = {
                stockId: clickedStockId ? clickedStockId : 0,
                stockName: stockName,
                stockPrice: stockPrice,
                stockTotal: stockTotal,
                stockRate: stockRate,
                stockCount: stockCount,
            };
            setClickedMyStock(nowMyStock);
            setGoToOrder(true);
        }
    };

    useEffect(() => {
        if (type === 'buy') {
            // 주문하기 이동
            if (goToOrder && clickedStockId && clickedStockInfo && clickedStockDetail) {
                isStockSelected(true);
            }

            // 상세 화면 이동
            if (goToDetail && clickedStockId && clickedStockInfo && clickedStockDetail) {
                onDetailClick();
            }
        } else if (type === 'sell') {
            // 주문하기 이동
            if (goToOrder) {
                isStockSelected(true);
            }

            // 상세 화면 이동
            if (goToDetail) {
                onDetailClick();
            }
        }
    }, [goToOrder, goToDetail, clickedStockId, fetchStockInfo]); // 의존성 배열에 clickedStockId 추가

    const handleDetailClick = () => {
        setClickedStockId(stockId);
        setGoToDetail(true);
    };

    return (
        <>
            <BuyingContent onClick={onToggle}>
                <TitleCoulumn>
                    {channel === 'ETF' && (
                        <CompanyName type="title">{stockName.slice(0, 2)} 증권</CompanyName>
                    )}
                    <CompanyName> {channel === 'ETF' ? stockName.slice(2) : stockName}</CompanyName>
                </TitleCoulumn>
                <BuyingMoneyContent>
                    <RateState rate={stockRate}>{formatStockRate(stockRate)}</RateState>
                    <StockPrice> {(stockPrice || stockTotal || 0).toLocaleString()} 🥕</StockPrice>
                </BuyingMoneyContent>
            </BuyingContent>
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <p>{stockIntro ? stockIntro : clickedStockInfo.stockIntro}</p>
                <ButtonContainer>
                    <ActiveButton onClick={handleClickStock}>{value}</ActiveButton>
                    <DetailButton onClick={handleDetailClick}>상세 정보</DetailButton>
                </ButtonContainer>
            </Collapse>
            <Divider />
        </>
    );
};

export default StockTitleContainer;
