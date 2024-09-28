import styled from 'styled-components';
import { Card } from '@components/root/card';
import {
    BuyingOrder,
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

export const OrderCard = () => {
    return (
        <OrderCardBox>
            <StockTitle companyName={'개굴전자'} stockPrice={'89,000'} currentState={'up'} />
            <BuyingOrder maxStock={12} maxMoney={'984,000'} />
            <InputOrder />
            <TotalPrice total={'984,000'} />
        </OrderCardBox>
    );
};
