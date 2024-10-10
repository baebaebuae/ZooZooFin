import { TotalCard } from '@components/stock/common/card/TotalCard';
import { ChannelMessage } from '@components/stock/common/container/ChannelContainer';
import { MessageIcon } from '@components/stock/common/icon/StockIcons';
import { ActiveButton } from '@components/stock/common/button/Button';
import { useState, useEffect } from 'react';
import useStockStore from '@components/stock/common/store/StockStore';
import { getApiClient } from '@stores/apiClient';
import styled from 'styled-components';

const StoreWrapper = styled.div`
    width: 95%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 21px;
    margin: 0px auto;
`;

const postStock = async (type, stockId, stockCount, onComplete) => {
    const apiClient = getApiClient();
    const stockData = {
        stockId: stockId,
        count: stockCount,
    };

    try {
        const res = await apiClient.post(`/stock/${type}`, stockData);
        if (res.status === 200) {
            onComplete();
        } else {
            console.error('Unexpected status code:', res.status);
        }
    } catch (error) {
        console.error('Stock Post Error: ', error);
        return error;
    }
};

export const StockResult = ({ onComplete, type }) => {
    const [value, setValue] = useState('');
    const { totalStock, clickedStockId } = useStockStore();

    useEffect(() => {
        if (type === 'buy') {
            setValue('구매');
        } else if (type === 'sell') {
            setValue('판매');
        }
    }, [type]);

    const handleOnClick = () => {
        if (clickedStockId && totalStock) {
            postStock(type, clickedStockId, totalStock, onComplete);
        }
    };
    console.log(value);

    return (
        <StoreWrapper>
            <ChannelMessage>
                <MessageIcon />
                {value ? value : ''} 완료했어 개굴!
            </ChannelMessage>
            <TotalCard type={type} />
            <ActiveButton size={'large'} onClick={handleOnClick}>
                완료!
            </ActiveButton>
        </StoreWrapper>
    );
};

export default StockResult;
