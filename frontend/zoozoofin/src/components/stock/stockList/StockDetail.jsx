import { useEffect, useState } from 'react';

import { ChannelMessage } from '@components/stock/common/container/ChannelContainer';
import { MessageIcon } from '@components/stock/common/icon/StockIcons';
import StockNews from '@components/stock/stockItem/StockNews';
import StockGraph from '@components/stock/stockItem/StockGraph';
import StockOverview from '@components/stock/stockItem/StockOverview';
import StockHint from '@components/stock/stockItem/StockHint';

export const StockDetail = () => {
    const [goToOverview, setGoToOverview] = useState(false);
    const [isHintOpen, setIsHintOpen] = useState(false);
    // 임시 주식 아이디 > 바꿔야함
    const stockId = "1";
    const onClickDetail = () => {
        setGoToOverview(true);
        console.log('go To Overview Page!');
    };

    const onClickHint = () => {
        setIsHintOpen(true);
        console.log('Opening Hint Modal!');
    };

    const closeHint = () => {
        setIsHintOpen(false);
        console.log('Closing Hint Modal!');
    };

    if (goToOverview) {
        return <StockOverview />;
    } else {
        return (
            <>
                <ChannelMessage>
                    <MessageIcon />
                    주식 상세 정보를 알아보자!
                </ChannelMessage>
                <StockGraph onClickDetail={onClickDetail} onClickHint={onClickHint} />
                <StockNews />
                <StockHint isOpen={isHintOpen} onClose={closeHint} stockId={stockId} />
            </>
        );
    }
};

export default StockDetail;