import { ChannelMessage } from '@components/stock/common/container/ChannelContainer';
import { MessageIcon } from '@components/stock/common/icon/StockIcons';
import StockNews from '@components/stock/stockItem/StockNews';
import StockGraph from '@components/stock/stockItem/StockGraph';
import StockOverview from '@components/stock/stockItem/StockOverview';

// 이동 구현 예정 - 24.09.29
// (1) StockGraph + Stock News
// (2) StockOverview
export const StockDetail = () => {
    return (
        <>
            <ChannelMessage>
                <MessageIcon />
                주식 상세 정보를 알아보자!
            </ChannelMessage>
            {/* <StockGraph /> */}
            {/* <StockNews /> */}
            <StockOverview />
        </>
    );
};

export default StockDetail;
