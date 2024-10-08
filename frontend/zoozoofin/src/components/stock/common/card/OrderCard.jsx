import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Card } from '@components/root/card';
import { OrderSubtitle, InputOrder } from '@components/stock/common/container/OrderDetailContainer';
import { StockTitle } from '@components/stock/common/container/StockTitleContainer';

import useStockStore from '../store/StockStore';
import { getApiClient } from '../../../../stores/apiClient';

export const OrderCardBox = styled(Card)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 15px 30px;
    width: 75%;
    gap: 20px;
`;

export const OrderCard = ({ type }) => {
    // 해당 주식 상세 정보 각각 인자로 작성될 예정
    const maxStock = 12;
    const maxMoney = 984000;

    const { clickedStockId, clickedStockInfo } = useStockStore();
    const [nowStock, setNowStock] = useState(null);
    const [nowPrice, setNowPrice] = useState(null);
    const [nowRate, setNowRate] = useState(null);

    useEffect(() => {
        if (clickedStockId > 0) {
            // 현재 턴을 기준으로 가져올 예정
            const pricecharts = clickedStockInfo.chart;
            const stockPrice = pricecharts ? pricecharts[pricecharts.length - 1]['endPrice'] : 0;
            setNowPrice(stockPrice);
            const stockRate = pricecharts ? pricecharts[pricecharts.length - 1]['rate'] : 0;
            setNowRate(stockRate);
        }
    }, [clickedStockId, clickedStockInfo]);

    return (
        <OrderCardBox>
            <StockTitle
                stockName={clickedStockInfo ? clickedStockInfo.stockName : 'stockName'}
                stockPrice={nowPrice}
                stockRate={nowRate}
                type={type}
            />
            <OrderSubtitle type={type} maxStock={maxStock} maxMoney={maxMoney.toLocaleString()} />
            <InputOrder type={type} stockPrice={nowPrice} />
        </OrderCardBox>
    );
};
