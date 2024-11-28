import { ChannelMessage } from '@components/stock/common/container/ChannelContainer';
import { MessageIcon } from '@components/stock/common/icon/StockIcons';
import { OrderCard } from '@components/stock/common/card/OrderCard';
import { ActiveButton } from '@components/stock/common/button/Button';
import { useState, useEffect } from 'react';
import useStockStore from '../common/store/StockStore';
import styled from 'styled-components';

export const StockOrder = ({ channel, type, orderIsDone }) => {
    const [value, setValue] = useState(null);
    const [button, setButton] = useState(null);

    const [isDone, setIsDone] = useState(false);
    const { totalStock } = useStockStore();

    const handleOnClick = () => {
        setIsDone(true);
        orderIsDone(true);
    };

    useEffect(() => {
        if (type === 'buy') {
            setValue('구매');
            setButton('구매하기');
        } else {
            setValue('판매');
            setButton('판매하기');
        }
    }, [type]);

    return (
        <>
            <ChannelMessage>
                <MessageIcon />몇 주 {value}할거야 개굴?
            </ChannelMessage>
            <OrderCard channel={channel} type={type} />
            {totalStock > 0 && (
                <ActiveButton size={'large'} onClick={handleOnClick}>
                    {button}
                </ActiveButton>
            )}
        </>
    );
};
