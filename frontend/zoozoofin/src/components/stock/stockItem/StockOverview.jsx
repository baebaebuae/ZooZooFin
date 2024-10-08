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
import { useEffect, useState } from 'react';
import { ExplainModal } from '@components/stock/stockItem/StockModal';

import useStockStore from '@components/stock/common/store/StockStore';

export const StockOverview = () => {
    const [stockDetail, setStockDetail] = useState({});
    const { clickedStockDetail } = useStockStore();
    const [stockInfo, setStockInfo] = useState({
        시가총액: '',
        배당수익률: '',
        PBR: '',
        PER: '',
        ROE: '',
    });

    useEffect(() => {
        setStockDetail(clickedStockDetail);
    }, clickedStockDetail);

    useEffect(() => {
        if (stockDetail) {
            const marketCap = stockDetail.marketCap;
            const dividedYield = stockDetail.dividedYield;
            const PBR = stockDetail.PBR;
            const PER = stockDetail.PER;
            const ROE = stockDetail.ROE;

            setStockInfo({
                시가총액: marketCap,
                배당수익률: dividedYield,
                PBR: PBR,
                PER: PER,
                ROE: ROE,
            });
        }
    });

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
                <Title quarter={stockDetail.period ? stockDetail.period : 0} />
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
