import { StockDetailCard } from '@components/stock/common/card/DetailCard';
import {
    Title,
    OverviewList,
    GraphTitle,
} from '@components/stock/common/container/StockOverviewContainer';
import { CardTitle } from '@components/stock/common/container/StockDetailContainer';
import IconGraph from '@assets/images/icons/stocks/icon_graph.svg?react';
import { LargeIcon } from '@components/root/icon';
import { MovingAverage } from '@components/stock/common/graph/MovingAverage';

export const StockOverview = () => {
    const quarter = 1;
    const stockInfo = {
        시가총액: '491.2조',
        배당수익률: '1.94%',
        PBR: '1.3배',
        PER: '18.1배',
        ROE: '7.7%',
        PSR: '1.8배',
    };
    return (
        <>
            <StockDetailCard>
                <Title quarter={quarter} />
                {Object.entries(stockInfo).map(([list, item]) => (
                    <OverviewList key={list} list={list} item={item} />
                ))}
            </StockDetailCard>
            <StockDetailCard>
                <CardTitle>
                    <LargeIcon icon={IconGraph} />
                    <GraphTitle />
                </CardTitle>
                <MovingAverage turn={15} />
            </StockDetailCard>
        </>
    );
};

export default StockOverview;
