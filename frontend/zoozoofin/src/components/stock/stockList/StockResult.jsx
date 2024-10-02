import { TotalCard } from '@components/stock/common/card/TotalCard';
import { ChannelMessage } from '@components/stock/common/container/ChannelContainer';
import { MessageIcon } from '@components/stock/common/icon/StockIcons';
import { ActiveButton } from '@components/stock/common/button/Button';

export const StockResult = ({ onComplete }) => {
    const handleOnClick = () => {
        onComplete();
    };

    return (
        <>
            <ChannelMessage>
                <MessageIcon />
                구매 완료했어 개굴!
            </ChannelMessage>
            <TotalCard />
            <ActiveButton size={'large'} onClick={handleOnClick}>
                완료!
            </ActiveButton>
        </>
    );
};

export default StockResult;
