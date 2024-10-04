import { useState } from 'react';

import StockField from '@components/stock/stockItem/StockField';
import StockProducts from '@components/stock/stockItem/StockProducts';
import { ChannelMessage } from '@components/stock/common/container/ChannelContainer';
import { MessageIcon } from '@components/stock/common/icon/StockIcons';
import { StockOrder } from '@components/stock/stockList/StockOrder';
import OwnedStockCrad from '@components/stock//common/card/OwnedStockCrad';

export const StockSell = ({ channel, onOrderCompletion }) => {
    // 테스트를 위한 isSelected => 목업 데이터 연결 후 삭제 예정
    const [isFieldSelected, SetisFieldSelected] = useState(false);
    const [field, Setfield] = useState(null);

    const [isStockSelected, SetisStockSelected] = useState(false);

    const handleFieldClick = (field) => {
        SetisFieldSelected(true);
        Setfield(field);
    };

    // 상품 구매하기 이동을 위한 상태 설정
    const [isProductChecked, SetisProductChecked] = useState(false);

    const handleStockClick = (isProductChecked) => {
        SetisStockSelected(true);
        SetisProductChecked(isProductChecked);
    };

    // 구매/판매 완료 후 상태 전달
    const handleOrderCompletion = (isDone) => {
        console.log('Order completed:', isDone);
        onOrderCompletion(isDone);
    };

    switch (channel) {
        case '국내 주식': {
            return (
                <>
                    <h1>주식 판매 테스트</h1>
                    {!isProductChecked ? (
                        <>
                            <ChannelMessage>
                                <MessageIcon />
                                보유한 주식을 확인해줘 개굴!
                            </ChannelMessage>
                            <OwnedStockCrad />
                            <ChannelMessage>
                                <MessageIcon />
                                주식 분야를 선택해줘 개굴!
                            </ChannelMessage>
                            <StockField type={'domestic'} onFieldSelect={handleFieldClick} />

                            {isFieldSelected && (
                                <>
                                    <ChannelMessage>
                                        <MessageIcon />
                                        주식 상품을 선택해줘 개굴!
                                    </ChannelMessage>
                                    <StockProducts
                                        field={field}
                                        onStockSelected={handleStockClick}
                                        type={'sell'}
                                    />
                                </>
                            )}
                        </>
                    ) : (
                        <>
                            <StockOrder type={'sell'} orderIsDone={handleOrderCompletion} />
                        </>
                    )}
                </>
            );
        }
        case '해외 주식': {
            return (
                <>
                    <ChannelMessage>
                        <MessageIcon />
                        주식 분야를 선택해줘 개굴!
                    </ChannelMessage>
                    <StockField type={'overseas'} onFieldSelect={handleFieldClick} />

                    {isFieldSelected && (
                        <>
                            <ChannelMessage>
                                <MessageIcon />
                                주식 상품을 선택해줘 개굴!
                            </ChannelMessage>
                            <StockProducts field={field} />
                        </>
                    )}
                </>
            );
        }
        case 'ETF': {
            return (
                <>
                    <ChannelMessage>
                        <MessageIcon />
                        주식 분야를 선택해줘 개굴!
                    </ChannelMessage>
                    <StockField type={'ETF'} onFieldSelect={handleFieldClick} />

                    {isFieldSelected && (
                        <>
                            <ChannelMessage>
                                <MessageIcon />
                                주식 상품을 선택해줘 개굴!
                            </ChannelMessage>
                            <StockProducts field={field} />
                        </>
                    )}
                </>
            );
        }
    }
};

export default StockSell;
