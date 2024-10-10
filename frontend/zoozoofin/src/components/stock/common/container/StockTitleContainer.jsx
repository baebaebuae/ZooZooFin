import { Collapse } from '@mui/material';

import {
    BuyingContent,
    CompanyName,
    BuyingMoneyContent,
    RateState,
    StockPrice,
    ButtonContainer,
    TitleCoulumn,
    MyStockContent,
} from '@components/stock/common/container/StoreContainer';
import { CarrotIcon } from '@components/stock/common/icon/StockIcons';
import { ActiveButton, DetailButton } from '@components/stock/common/button/Button';
import { Divider } from '@components/stock/common/card/StoreCards';
import { useEffect, useState } from 'react';

import { getApiClient } from '../../../../stores/apiClient';
import useStockStore, { useUserStockStore } from '../store/StockStore';
import styled from 'styled-components';

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

const MyStockContaier = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-bottom: 20px;
    gap: 20px;
`;

const MyStockCollapse = styled(Collapse)`
    width: 100%;
`;

export const StockTitleContainer = ({
    stockName,
    stockId,
    stockRate,
    stockPrice,
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
    // const [stockPrice, setStockPrice] = useState(null); // stockPrice 상태 추가
    const [goToOrder, setGoToOrder] = useState(false);
    const [goToDetail, setGoToDetail] = useState(false);

    const {
        clickedStockId,
        setClickedStockId,
        clickedStockInfo,
        clickedStockDetail,
        fetchStockInfo,
        fetchStockDetail,
        setClickedNowPrice,
        setClickedStockRate,
    } = useStockStore();

    const { setClickedMyStock } = useUserStockStore();

    useEffect(() => {
        if (type === 'buy') {
            setValue('구매하기');
        } else {
            setValue('판매하기');
        }
    }, [type]);

    const handleClickStock = () => {
        if (type === 'buy') {
            setClickedStockId(stockId);
            setClickedNowPrice(stockPrice);
            setClickedStockRate(stockRate);
            fetchStockInfo(stockId);
            fetchStockDetail(channel, stockId);

            setGoToOrder(true);
        }
        if (type === 'sell') {
            setClickedStockId(stockId);

            const nowMyStock = {
                stockId: stockId ? stockId : 0,
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
        setClickedNowPrice(stockPrice);
        setClickedStockRate(stockRate);
        fetchStockInfo(stockId);
        fetchStockDetail(channel, stockId);
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
                    <StockPrice> {(stockTotal || stockPrice || 0).toLocaleString()} 🥕</StockPrice>
                </BuyingMoneyContent>
            </BuyingContent>
            <MyStockCollapse in={isOpen} timeout="auto" unmountOnExit>
                {stockIntro ? (
                    <p>{stockIntro}</p>
                ) : (
                    <MyStockContaier>
                        <MyStockContent>
                            <CompanyName>현재 주가</CompanyName>
                            <CompanyName>{stockPrice}🥕</CompanyName>
                        </MyStockContent>
                        <MyStockContent>
                            <CompanyName>보유 주식 수</CompanyName>
                            <CompanyName>{stockCount}주</CompanyName>
                        </MyStockContent>
                    </MyStockContaier>
                )}{' '}
            </MyStockCollapse>

            <Divider />
        </>
    );
};

export default StockTitleContainer;
