import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Card } from '@components/root/card';
import {
    OrderSubtitle,
    InputOrder,
    TotalPrice,
} from '@components/stock/common/container/OrderDetailContainer';
import { StockTitle } from '@components/stock/common/container/StockTitleContainer';

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
    const nowPrice = 89000;
    const maxStock = 12;
    const maxMoney = 984000;
    return (
        <OrderCardBox>
            <StockTitle
                companyName={'개굴전자'}
                stockPrice={nowPrice}
                currentState={'up'}
                type={type}
            />
            <OrderSubtitle type={type} maxStock={maxStock} maxMoney={maxMoney.toLocaleString()} />
            <InputOrder type={type} stockPrice={nowPrice} />
        </OrderCardBox>
    );
};
