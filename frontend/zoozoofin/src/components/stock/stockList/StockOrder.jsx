import { ChannelMessage } from '@components/stock/common/container/ChannelContainer';
import { MessageIcon } from '@components/stock/common/icon/StockIcons';
import { OrderCard } from '@components/stock/common/card/OrderCard';
import { ActiveButton } from '@components/stock/common/button/Button';

export const StockOrder = () => {
    return (
        <>
            <ChannelMessage>
                <MessageIcon />몇 주 구매할거야 개굴?
            </ChannelMessage>
            <OrderCard />
            <ActiveButton size={'large'}>구매하기</ActiveButton>
        </>
    );
};
