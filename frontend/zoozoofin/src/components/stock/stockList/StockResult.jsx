import { TotalCard } from '@components/stock/common/card/TotalCard';
import { ChannelMessage } from '@components/stock/common/container/ChannelContainer';
import { MessageIcon } from '@components/stock/common/icon/StockIcons';
import { ActiveButton } from '@components/stock/common/button/Button';
import { useState, useEffect } from 'react';
import useStockStore from '@components/stock/common/store/StockStore';
import { getApiClient } from '@stores/apiClient';

// 구매, 판매 post axios 연결 예정

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
    const [value, setValue] = useState(null);
    const { totalStock, clickedStockId } = useStockStore();

    useEffect(
        (type) => {
            if (type === 'buy') {
                setValue('구매');
            } else if (type === 'sell') {
                setValue('판매');
            }
        },
        [type]
    );

    const handleOnClick = () => {
        if (clickedStockId && totalStock) {
            postStock(type, clickedStockId, totalStock, onComplete);
        }
    };

    return (
        <>
            <ChannelMessage>
                <MessageIcon />
                {value} 완료했어 개굴!
            </ChannelMessage>
            <TotalCard type={type} />
            <ActiveButton size={'large'} onClick={handleOnClick}>
                완료!
            </ActiveButton>
        </>
    );
};

export default StockResult;
