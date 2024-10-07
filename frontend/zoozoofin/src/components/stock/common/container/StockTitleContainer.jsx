import { Collapse } from '@mui/material';

import {
    BuyingContent,
    CompanyName,
    BuyingMoneyContent,
    CurrentStockState,
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

export const StockTitle = ({ stockName, stockPrice, stockRate, onToggle }) => {
    return (
        <BuyingContent onClick={onToggle} style={{ cursor: 'pointer' }}>
            <CompanyName>{stockName}</CompanyName>
            <BuyingMoneyContent>
                <RateState rate={stockRate}>{stockRate}</RateState>
                <StockPrice>{stockPrice ? stockPrice.toLocaleString() : 0} 🥕</StockPrice>
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
}) => {
    const [value, setValue] = useState(null);
    const [stockPrice, setStockPrice] = useState(null); // stockPrice 상태 추가

    useEffect(() => {
        if (type === 'buy') {
            setValue('구매하기');
        } else {
            setValue('판매하기');
        }
    }, [type]);

    const handleClickStock = () => {
        isStockSelected(true);
    };
    const handleDetailClick = () => {
        if (onDetailClick) {
            onDetailClick(stockName);
        }
    };

    console.log(stockName);

    // stockId를 통해 stockPrice를 조회하는 함수
    const fetchStockPrice = async (stockId) => {
        try {
            const apiClient = getApiClient();
            const response = await apiClient.get(`/stock/info/${stockId}`);
            // 현재 턴을 기준으로 가져올 예정
            const pricecharts = response.data.body.chart;
            console.log(response.data.body.chart[pricecharts.length - 1]['endPrice']);
            const nowPrice = response.data.body.chart[pricecharts.length - 1]['endPrice'];
            // const fetchedPrice = response.data.charts.slice(-1)[0].endPrice;
            setStockPrice(nowPrice); // stockPrice 상태 업데이트
        } catch (error) {
            console.error(`Failed to fetch stock price for stockId: ${stockId}`, error);
        }
    };

    // 컴포넌트가 마운트되거나 stockId가 변경될 때마다 stockPrice를 조회
    useEffect(() => {
        if (stockId) {
            console.log('now', stockId);
            fetchStockPrice(stockId);
        }
    }, [stockId]);

    return (
        <>
            <BuyingContent onClick={onToggle}>
                <TitleCoulumn>
                    {channel === 'ETF' && <CompanyName type="title">증권사 이름</CompanyName>}
                    <CompanyName>{stockName}</CompanyName>
                </TitleCoulumn>
                <BuyingMoneyContent>
                    <RateState rate={stockRate}>{stockRate}</RateState>
                    <StockPrice>{stockPrice ? stockPrice.toLocaleString() : 0} 🥕</StockPrice>
                </BuyingMoneyContent>
            </BuyingContent>
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <p>{stockIntro}</p>
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
