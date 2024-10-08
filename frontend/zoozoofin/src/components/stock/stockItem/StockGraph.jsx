import { useState } from 'react';
import { StockDetailCard } from '@components/stock/common/card/DetailCard';
import {
    StockDetailRow,
    StockInfoColumn,
    StockInfoText,
    StockPriceRow,
    DetailButtonContainer,
} from '@components/stock/common/container/StockDetailContainer';
import {
    CurrentStockState,
    StockPrice,
    ButtonContainer,
} from '@components/stock/common/container/StoreContainer';
import { CarrotIcon } from '@components/stock/common/icon/StockIcons';
import { PlusButton, ActiveButton, DetailButton } from '@components/stock/common/button/Button';

import { Collapse } from '@mui/material';
import LineGraph from '../common/graph/LineGraph';

import useUserStore from '../../../stores/useUserStore';

const InfoColumn = ({ product, stockPrice, currentState }) => {
    return (
        <StockInfoColumn>
            <StockInfoText type="title">{product}</StockInfoText>
            <StockPriceRow>
                <StockPrice>{stockPrice} 🥕</StockPrice>
                <CurrentStockState current={currentState}>{currentState}</CurrentStockState>
            </StockPriceRow>
        </StockInfoColumn>
    );
};

export const StockGraph = ({ onClickDetail, onClickHint }) => {
    const product = '개굴자동차';
    const currentState = 'up';
    const stockPrice = '89,000';
    const { turn } = useUserStore();

    // + 버튼 활성화
    const [isExpanded, setIsExpanded] = useState(false);
    const [isOpened, setIsOpened] = useState(false);
    const handleToggle = () => {
        setIsExpanded(!isExpanded);
        setIsOpened(!isOpened);
    };

    return (
        <StockDetailCard>
            <StockDetailRow>
                <InfoColumn product={product} currentState={currentState} stockPrice={stockPrice} />
                <PlusButton onClick={handleToggle}> {!isExpanded ? '+' : '-'}</PlusButton>
            </StockDetailRow>
            <LineGraph turn={turn} />
            <DetailButtonContainer>
                <Collapse in={isOpened} timeout="auto" unmountOnExit>
                    <ButtonContainer>
                        <ActiveButton onClick={onClickDetail}>상세 정보</ActiveButton>
                        <DetailButton onClick={onClickHint}>힌트</DetailButton>
                    </ButtonContainer>
                </Collapse>
            </DetailButtonContainer>
        </StockDetailCard>
    );
};

export default StockGraph;
