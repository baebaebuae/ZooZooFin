import { ChannelMessage } from '@components/stock/common/container/ChannelContainer';
import { MessageIcon } from '@components/stock/common/icon/StockIcons';
import { OrderCard } from '@components/stock/common/card/OrderCard';
import { ActiveButton } from '@components/stock/common/button/Button';
import { useState, useEffect } from 'react';

export const StockOrder = ({ type, orderIsDone }) => {
    const [value, SetValue] = useState(null);
    const [button, SetButton] = useState(null);

    const [isDone, SetIsDone] = useState(false);

    const handleOnClick = () => {
        SetIsDone(true);
        orderIsDone(true);
    };

    useEffect(() => {
        if (type === 'buy') {
            SetValue('구매');
            SetButton('구매하기');
        } else {
            SetValue('판매');
            SetButton('판매하기');
        }
    }, [type]);

    return (
        <>
            <ChannelMessage>
                <MessageIcon />몇 주 {value}할거야 개굴?
            </ChannelMessage>
            <OrderCard type={type} />
            <ActiveButton size={'large'} onClick={handleOnClick}>
                {button}
            </ActiveButton>
        </>
    );
};
