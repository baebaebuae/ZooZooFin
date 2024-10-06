import { useEffect, useState } from 'react';

import { ChannelMessage } from '@components/stock/common/container/ChannelContainer';
import { MessageIcon } from '@components/stock/common/icon/StockIcons';
import StockNews from '@components/stock/stockItem/StockNews';
import StockGraph from '@components/stock/stockItem/StockGraph';
import StockOverview from '@components/stock/stockItem/StockOverview';
import StockHint from '@components/stock/stockItem/StockHint';

export const StockDetail = () => {
    const [goToOverview, setGoToOverview] = useState(false);
    const [goToHint, setGoToHint] = useState(false);

    const onClickDetail = () => {
        setGoToOverview(true);
        console.log('go To Overview Page!');
    };

    const onClickHint = () => {
        setGoToHint(true);
        console.log('go To Hint Page!');
    };

    if (goToOverview) {
        return <StockOverview />;
    } else if (goToHint) {
        return <StockHint />;
    } else {
        return (
            <>
                <ChannelMessage>
                    <MessageIcon />
                    주식 상세 정보를 알아보자!
                </ChannelMessage>
                <StockGraph onClickDetail={onClickDetail} onClickHint={onClickHint} />
                <StockNews />
            </>
        );
    }
};

export default StockDetail;
