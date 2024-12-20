import { useState } from 'react';
import styled from 'styled-components';

import StockField from '@components/stock/stockItem/StockField';
import StockProducts from '@components/stock/stockItem/StockProducts';
import { ChannelMessage } from '@components/stock/common/container/ChannelContainer';
import { MessageIcon } from '@components/stock/common/icon/StockIcons';
import { StockOrder } from '@components/stock/stockList/StockOrder';
import StockDetail from '@components/stock/stockList/StockDetail';

const StoreWrapper = styled.div`
    width: 100%;
    max-width: 1200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 21px;
    margin: 0px auto;
    padding-top: 120px;
    position: relative;
    overflow-x: hidden;
    min-height: calc(100vh - 120px); 
`;

export const StockBuy = ({ channel, onOrderCompletion }) => {
    // 테스트를 위한 isSelected => 목업 데이터 연결 후 삭제 예정
    const [isFieldSelected, setIsFieldSelected] = useState(false);
    const [field, setField] = useState(null);

    const [isStockSelected, setIsStockSelected] = useState(false);

    const handleFieldClick = (nowField) => {
        setIsFieldSelected(true);
        setField(nowField);
        console.log(field);
    };

    // 상품 구매하기 이동을 위한 상태 설정
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
    const goToDetailComponent = () => {
        setIsDetailClicked(true);
    };

    let nowField = '';

    if (channel === '국내 주식') {
        nowField = 'domestic';
    } else if (channel === '해외 주식') {
        nowField = 'overseas';
    } else if (channel === 'ETF') {
        nowField = 'ETF';
    }

    if (isProductChecked) {
        return (
            <StoreWrapper>
                {/* StockOrder 컴포넌트 */}
                <StockOrder channel={channel} type={'buy'} orderIsDone={handleOrderCompletion} />
            </StoreWrapper>
        );
    } else if (isDetailClicked) {
        return (
            <StoreWrapper>
                {/* StockDetail 컴포넌트 */}
                <StockDetail channel={channel} />
            </StoreWrapper>
        );
    } else {
        return (
            <StoreWrapper>
                {/* 주식 분야 선택 */}
                <ChannelMessage>
                    <MessageIcon />
                    주식 분야를 선택해줘 개굴!
                </ChannelMessage>
                <StockField field={nowField} type={'buy'} onFieldSelect={handleFieldClick} />

                {isFieldSelected && (
                    <>
                        <ChannelMessage>
                            <MessageIcon />
                            주식 상품을 선택해줘 개굴!
                        </ChannelMessage>
                        <StockProducts
                            field={field}
                            onStockSelected={handleStockClick}
                            type={'buy'}
                            channel={channel}
                            handleDetailClick={goToDetailComponent}
                        />
                    </>
                )}
            </StoreWrapper>
        );
    }
};

export default StockBuy;
