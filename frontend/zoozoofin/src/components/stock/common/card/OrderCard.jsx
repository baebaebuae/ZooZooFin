import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Card } from '@components/root/card';
import { OrderSubtitle, InputOrder } from '@components/stock/common/container/OrderDetailContainer';
import { StockTitle } from '@components/stock/common/container/StockTitleContainer';

import useStockStore, { useUserStockStore } from '../store/StockStore';
import { getApiClient } from '../../../../stores/apiClient';
import useUserStore from '../../../../stores/useUserStore';

export const OrderCardBox = styled(Card)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 15px 30px;
    width: 75%;
    gap: 20px;
`;

export const OrderCard = ({ channel, type }) => {
    // 해당 주식 상세 정보 각각 인자로 작성될 예정
    const { animalAssets } = useUserStore();
    const { clickedMyStock } = useUserStockStore();
    const { clickedStockId, clickedStockInfo } = useStockStore();
    const [nowStock, setNowStock] = useState(null);
    const [nowPrice, setNowPrice] = useState(null);
    const [nowRate, setNowRate] = useState(null);
    const [maxStock, setMaxStock] = useState(0);
    const [maxMoney, setMaxMoney] = useState(0);

    // 해외 환율 반영 예정

    useEffect(() => {
        const ExchangeRate = 1350;
        if (clickedStockId > 0) {
            // 현재 턴을 기준으로 가져올 예정
            const pricecharts = clickedStockInfo.chart;
            console.log(channel);
            if (channel === '해외 주식') {
                const stockPrice = pricecharts ? pricecharts[pricecharts.length - 1]['price'] : 0;
                setNowPrice(stockPrice * ExchangeRate);
            } else {
                const stockPrice = pricecharts ? pricecharts[pricecharts.length - 1]['price'] : 0;
                setNowPrice(stockPrice);
            }
            const stockRate = pricecharts ? pricecharts[pricecharts.length - 1]['rate'] : 0;
            setNowRate(stockRate);
        }
    }, [clickedStockId, clickedStockInfo]);

    useEffect(() => {
        if (type === 'buy') {
            if (nowPrice && animalAssets) {
                const calculatedMaxStock = Math.floor(animalAssets / nowPrice); // 주식 수 계산
                setMaxStock(calculatedMaxStock); // maxStock 값 업데이트
                setMaxMoney(calculatedMaxStock * nowPrice);
            }
        } else if (type === 'sell') {
            if (animalAssets) {
                setMaxStock(clickedMyStock.stockCount);
                setMaxMoney(clickedMyStock.stockTotal);
            }
            // console.log(clickedMyStock);
        }
    }, [nowPrice, animalAssets]);

    if (type === 'buy') {
        return (
            <OrderCardBox>
                <StockTitle
                    stockName={clickedStockInfo ? clickedStockInfo.stockName : 'stockName'}
                    stockPrice={nowPrice ? nowPrice : 0}
                    stockRate={nowRate ? nowRate : 0}
                    type={type}
                />
                <OrderSubtitle
                    type={type}
                    maxStock={maxStock ? maxStock.toLocaleString() : 0}
                    maxMoney={maxMoney ? maxMoney.toLocaleString() : 0}
                />
                <InputOrder type={type} stockPrice={nowPrice} max={maxStock} />
            </OrderCardBox>
        );
    }
    if (type === 'sell') {
        return (
            <OrderCardBox>
                <StockTitle
                    stockName={clickedMyStock ? clickedMyStock.stockName : 'stockName'}
                    stockPrice={clickedMyStock ? clickedMyStock.stockPrice : 0}
                    stockRate={nowRate ? nowRate : 0}
                    type={type}
                />
                <OrderSubtitle
                    type={type}
                    maxStock={maxStock ? maxStock.toLocaleString() : 0}
                    maxMoney={maxMoney ? maxMoney.toLocaleString() : 0}
                />
                <InputOrder type={type} stockPrice={nowPrice} max={maxStock} />
            </OrderCardBox>
        );
    }
};
