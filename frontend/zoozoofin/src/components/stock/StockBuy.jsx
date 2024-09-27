import styled from 'styled-components';
import StockField from './StockField';

import { ChannelMessage } from './StockComponent';
import { MessageIcon } from './StockIcons';
import {
    StockBuyingCard,
    BuyingContent,
    BuyingMoneyContent,
    CompanyName,
    StockPrice,
    CurrentStockState,
    Divider,
} from './StockStoreCards';

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
            <ChannelMessage>
                <MessageIcon />
                주식 상품을 선택해줘 개굴!
            </ChannelMessage>
            {/* 주식 상품 리스트 */}
            <StockBuyingCard>
                <BuyingContent>
                    <CompanyName>companyname</CompanyName>
                    <BuyingMoneyContent>
                        <CurrentStockState>test</CurrentStockState>
                        <StockPrice>000,000 🥕</StockPrice>
                    </BuyingMoneyContent>
                </BuyingContent>
                <Divider />
                <BuyingContent>
                    <CompanyName>companyname</CompanyName>
                    <BuyingMoneyContent>
                        <CurrentStockState current={'down'}>test</CurrentStockState>
                        <StockPrice>000,000 🥕</StockPrice>
                    </BuyingMoneyContent>
                </BuyingContent>
                <Divider />
                <BuyingContent>
                    <CompanyName>companyname</CompanyName>
                    <BuyingMoneyContent>
                        <CurrentStockState current={'up'}>test</CurrentStockState>
                        <StockPrice>000,000 🥕</StockPrice>
                    </BuyingMoneyContent>
                </BuyingContent>
                <Divider />
            </StockBuyingCard>
        </>
    );
};

export default StockBuy;
