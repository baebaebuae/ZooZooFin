import { StockDetailCard } from '@components/stock/common/card/DetailCard';
import {
    Title,
    OverviewList,
    GraphTitle,
} from '@components/stock/common/container/StockOverviewContainer';
import { CardTitle } from '@components/stock/common/container/StockDetailContainer';
import IconGraph from '@assets/images/icons/stocks/icon_graph.png';
import { LargeIcon } from '@components/root/icon';
import { MovingAverage } from '@components/stock/common/graph/MovingAverage';
import { useState } from 'react';
import { ExplainModal } from '@components/stock/stockItem/StockModal';

export const StockOverview = () => {
    const quarter = 1;
    const stockInfo = {
        시가총액: '491.2조',
        배당수익률: '1.94%',
        PBR: '1.3배',
        PER: '18.1배',
        ROE: '7.7%',
    };

    const [nowList, setNowList] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModal = (list) => {
        setNowList(list);
        console.log('modal ready for', nowList);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            {isModalOpen && <ExplainModal list={nowList} onClose={handleCloseModal} />}

            <StockDetailCard>
                <Title quarter={quarter} />
                {Object.entries(stockInfo).map(([list, item]) => (
                    <OverviewList key={list} list={list} item={item} onClick={handleModal} />
                ))}
            </StockDetailCard>
            <StockDetailCard>
                <CardTitle>
                    <LargeIcon icon={IconGraph} />
                    <GraphTitle onClick={handleModal} />
                </CardTitle>
                <MovingAverage turn={15} />
            </StockDetailCard>
        </>
    );
};

export default StockOverview;
