import styled from 'styled-components';
import { useState, useEffect } from 'react';

import { Card } from '@components/root/card';
import { StockTitle } from '@components/stock/common/container/StockTitleContainer';
import { CarrotIcon } from '@components/stock/common/icon/StockIcons';
import useStockStore from '@components/stock/common/store/StockStore';

const TotalCardBox = styled(Card)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px 30px;
    width: 75%;
    gap: 20px;
`;

const RowContainerBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0px;
    gap: 20px;
    width: 100%;
    height: 25px;
`;

const TextStyle = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    gap: 3px;
    padding: 2px 0px;
    height: 25px;
    color: ${({ type, theme }) => (type === 'content' ? theme.colors.primaryDeep : 'black')};
    font-size: ${({ size }) => (size === 'large' ? '18px' : '15px')};
    font-weight: ${({ type }) => (type === 'content' ? 'bold' : 'normal')};
`;

export const TotalCard = ({ type }) => {
    const { totalStock, totalPrice } = useStockStore();
    const [value, setValue] = useState(null);

    useEffect(() => {
        if (type === 'buy') {
            setValue('구매');
        } else if (type === 'sell') {
            setValue('판매');
        }
    }, [type]);
    return (
        <TotalCardBox>
            <StockTitle companyName={'개굴전자'} stockPrice={'89,000'} currentState={'up'} />
            <RowContainerBox>
                <TextStyle>{value}할 주</TextStyle>
                <TextStyle type="content" size="large">
                    {totalStock} 주
                </TextStyle>
            </RowContainerBox>
            <RowContainerBox>
                <TextStyle>총 {value} 금액</TextStyle>
                <TextStyle type="content" size="large">
                    {totalPrice !== 0 ? totalPrice.toLocaleString() : 0}
                    🥕
                </TextStyle>
            </RowContainerBox>
        </TotalCardBox>
    );
};

export default TotalCard;
