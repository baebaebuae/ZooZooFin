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
    const { clickedStockId, clickedStockInfo, clickedNowPrice, clickedStockRate } = useStockStore();
    const [maxStock, setMaxStock] = useState(0);
    const [maxMoney, setMaxMoney] = useState(0);

    // 해외 환율 반영 예정

    useEffect(() => {
        if (type === 'buy') {
            if (clickedNowPrice && animalAssets) {
                const calculatedMaxStock = Math.floor(animalAssets / clickedNowPrice); // 주식 수 계산
                setMaxStock(calculatedMaxStock); // maxStock 값 업데이트
                setMaxMoney(calculatedMaxStock * clickedNowPrice);
            }
        } else if (type === 'sell') {
            if (animalAssets) {
                setMaxStock(clickedMyStock.stockCount);
                setMaxMoney(clickedMyStock.stockTotal);
            }
            // console.log(clickedMyStock);
        }
    }, [clickedNowPrice, animalAssets]);

    if (type === 'buy') {
        return (
            <OrderCardBox>
                <StockTitle
                    stockName={clickedStockInfo ? clickedStockInfo.stockName : 'stockName'}
                    stockPrice={clickedNowPrice ? clickedNowPrice : 0}
                    stockRate={clickedStockRate ? clickedStockRate : 0}
                    type={type}
                />
                <OrderSubtitle
                    type={type}
                    maxStock={maxStock ? maxStock.toLocaleString() : 0}
                    maxMoney={maxMoney ? maxMoney.toLocaleString() : 0}
                />
                <InputOrder
                    type={type}
                    stockPrice={clickedNowPrice ? clickedNowPrice : 0}
                    max={maxStock}
                />
            </OrderCardBox>
        );
    }
    if (type === 'sell') {
        return (
            <OrderCardBox>
                <StockTitle
                    stockName={clickedMyStock ? clickedMyStock.stockName : 'stockName'}
                    stockPrice={clickedMyStock ? clickedMyStock.stockPrice : 0}
                    stockRate={clickedStockRate ? clickedStockRate : 0}
                    type={type}
                />
                <OrderSubtitle
                    type={type}
                    maxStock={maxStock ? maxStock.toLocaleString() : 0}
                    maxMoney={maxMoney ? maxMoney.toLocaleString() : 0}
                />
                <InputOrder
                    type={type}
                    stockPrice={clickedMyStock ? clickedMyStock.stockPrice : 0}
                    max={maxStock}
                />
            </OrderCardBox>
        );
    }
};
