import { useState } from 'react';

import StockField from '@components/stock/stockItem/StockField';
import StockProducts from '@components/stock/stockItem/StockProducts';
import { ChannelMessage } from '@components/stock/common/container/ChannelContainer';
import { MessageIcon } from '@components/stock/common/icon/StockIcons';
import { StockOrder } from '@components/stock/stockList/StockOrder';
import OwnedStockCrad from '@components/stock/common/card/OwnedStockCrad';
import StockDetail from '@components/stock/stockList/StockDetail';

export const StockSell = ({ channel, onOrderCompletion }) => {
    // 테스트를 위한 isSelected => 목업 데이터 연결 후 삭제 예정
    const [isFieldSelected, setIsFieldSelected] = useState(false);
    const [field, setField] = useState(null);

    const [isStockSelected, setIsStockSelected] = useState(false);

    const handleFieldClick = (field) => {
        setIsFieldSelected(true);
        setField(field);
    };

    // 상품 판매하기 이동을 위한 상태 설정
    const [isProductChecked, setIsProductChecked] = useState(false);

    const handleStockClick = (isProductChecked) => {
        setIsStockSelected(true);
        setIsProductChecked(isProductChecked);
    };

    // 구매/판매 완료 후 상태 전달
    const handleOrderCompletion = (isDone) => {
        console.log('Order completed:', isDone);
        onOrderCompletion(isDone);
    };

    const [isDetailClicked, setIsDetailClicked] = useState(false);
    const goToDetailComponent = (companyName) => {
        console.log(companyName);
        setIsDetailClicked(true);
        console.log(isDetailClicked);
    };

    let type = '';

    if (channel === '국내 주식') {
        type = 'domestic';
    } else if (channel === '해외 주식') {
        type = 'overseas';
    } else if (channel === 'ETF') {
        type = 'ETF';
    }

    if (isProductChecked) {
        return (
            <>
                {/* StockOrder 컴포넌트 */}
                <StockOrder type={'sell'} orderIsDone={handleOrderCompletion} />
            </>
        );
    } else if (isDetailClicked) {
        return (
            <>
                {/* StockDetail 컴포넌트 */}
                <StockDetail />
            </>
        );
    } else {
        return (
            <>
                {/* 주식 분야 선택 */}
                <ChannelMessage>
                    <MessageIcon />
                    보유한 주식을 확인해줘 개굴!
                </ChannelMessage>
                <OwnedStockCrad channel={channel} />
                <ChannelMessage>
                    <MessageIcon />
                    주식 분야를 선택해줘 개굴!
                </ChannelMessage>
                <StockField type={type} onFieldSelect={handleFieldClick} />

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
                            channel={channel}
                            handleDetailClick={goToDetailComponent}
                        />
                    </>
                )}
            </>
        );
    }
};

export default StockSell;
