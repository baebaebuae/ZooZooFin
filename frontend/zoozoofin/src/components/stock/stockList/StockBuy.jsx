import StockField from '@components/stock/stockItem/StockField';
import StockProducts from '@components/stock/stockItem/StockProducts';
import { ChannelMessage } from '@components/stock/common/container/ChannelContainer';
import { MessageIcon } from '@components/stock/common/icon/StockIcons';

// 공통 부분 작성중

export const StockBuy = () => {
    return (
        <>
            <h1>DomesticCards</h1>
            <h3> 국내 주식 구매 컴포넌트</h3>
            <ChannelMessage>
                <MessageIcon />
                주식 분야를 선택해줘 개굴!
            </ChannelMessage>
            <StockField />

            {/* 주식 상품 */}
            <ChannelMessage>
                <MessageIcon />
                주식 상품을 선택해줘 개굴!
            </ChannelMessage>
            <StockProducts />
        </>
    );
};

export default StockBuy;
