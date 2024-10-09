import { useEffect, useState } from 'react';
import { StockDetailCard } from '@components/stock/common/card/DetailCard';
import {
    StockDetailRow,
    StockInfoColumn,
    StockInfoText,
    StockPriceRow,
    DetailButtonContainer,
} from '@components/stock/common/container/StockDetailContainer';
import {
    RateState,
    StockPrice,
    ButtonContainer,
} from '@components/stock/common/container/StoreContainer';
import { CarrotIcon } from '@components/stock/common/icon/StockIcons';
import { PlusButton, ActiveButton, DetailButton } from '@components/stock/common/button/Button';

import { Collapse } from '@mui/material';
import LineGraph from '../common/graph/LineGraph';

import useUserStore from '../../../stores/useUserStore';
import useStockStore from '../common/store/StockStore';

const formatStockRate = (stockRate) => {
    if (stockRate < 0) {
        return `▼ ${Math.abs(stockRate)} %`; // 음수일 경우 부호를 빼고 ▼를 붙임
    } else if (stockRate > 0) {
        return `▲ ${Math.abs(stockRate)} %`; // 양수일 경우 + 부호를 붙이고 ▲를 붙임
    } else {
        return `0`; // 0일 경우 그대로 출력
    }
};
const InfoColumn = ({ product, stockPrice, stockRate }) => {
    return (
        <StockInfoColumn>
            <StockInfoText type="title">{product}</StockInfoText>
            <StockPriceRow>
                <StockPrice>{stockPrice ? `${stockPrice.toLocaleString()} 🥕` : 0}</StockPrice>
                <RateState rate={stockRate}>{formatStockRate(stockRate)}</RateState>
            </StockPriceRow>
        </StockInfoColumn>
    );
};

export const StockGraph = ({ onClickDetail, onClickHint }) => {
    const { turn } = useUserStore();
    const { clickedStockDetail, clickedStockInfo, setClickedStockCharts } = useStockStore();
    const [stockInfo, setStockInfo] = useState([]);

    // 현재 turn의 주식 정보 가져오기
    useEffect(() => {
        if (turn && clickedStockInfo['chart']) {
            const nowTurn = turn + 25;
            // console.log(clickedStockInfo['chart']);
            setStockInfo(clickedStockInfo['chart'][nowTurn]);
        }
    }, [clickedStockInfo['chart'], turn]);

    // 그래프 작성을 위한 주식 차트 저장
    useEffect(() => {
        if (clickedStockDetail) {
            setClickedStockCharts(clickedStockDetail.chartDetail);
        }
    }, [clickedStockDetail, setClickedStockCharts]);

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
                <InfoColumn
                    product={clickedStockInfo.stockName}
                    stockRate={stockInfo ? stockInfo['rate'] : 0}
                    stockPrice={stockInfo['endPrice']}
                />
                <PlusButton onClick={handleToggle}> {!isExpanded ? '+' : '-'}</PlusButton>
            </StockDetailRow>
            <LineGraph />
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
