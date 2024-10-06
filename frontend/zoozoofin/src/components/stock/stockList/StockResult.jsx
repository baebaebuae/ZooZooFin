import { TotalCard } from '@components/stock/common/card/TotalCard';
import { ChannelMessage } from '@components/stock/common/container/ChannelContainer';
import { MessageIcon } from '@components/stock/common/icon/StockIcons';
import { ActiveButton } from '@components/stock/common/button/Button';
import { useState, useEffect } from 'react';
import useStockStore from '@components/stock/common/store/StockStore';

// 구매, 판매 post axios 연결 예정

export const StockResult = ({ onComplete, type }) => {
    const [value, setValue] = useState(null);

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
        onComplete();
    };

    return (
        <>
            <ChannelMessage>
                <MessageIcon />
                {value} 완료했어 개굴!
            </ChannelMessage>
            <TotalCard />
            <ActiveButton size={'large'} onClick={handleOnClick}>
                완료!
            </ActiveButton>
        </>
    );
};

export default StockResult;
