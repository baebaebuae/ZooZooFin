import { LargeIcon } from '@components/root/icon';
import IconNews from '@assets/images/icons/stocks/icon_news.png';
import { Divider } from '@components/stock/common/card/StoreCards';
import { StockDetailCard } from '@components/stock/common/card/DetailCard';
import {
    CardTitle,
    NewsList,
    NewsTitle,
    NewsName,
} from '@components/stock/common/container/StockDetailContainer';
import useStockStore from '../common/store/StockStore';
import { useEffect } from 'react';

export const StockNews = () => {
    const { clickedStockInfo } = useStockStore();
    const newsItems = clickedStockInfo.news;

    return (
        <StockDetailCard>
            <CardTitle>
                <LargeIcon icon={IconNews} />
                뉴스
            </CardTitle>
            {[0, 1, 2].map((index) => (
                <NewsList key={index}>
                    {clickedStockInfo.news && clickedStockInfo.news[index] ? (
                        <>
                            <NewsTitle>{clickedStockInfo.news[index].title}</NewsTitle>
                            <NewsName>-주주경제-</NewsName>
                        </>
                    ) : (
                        <>
                            <NewsTitle>뉴스 준비중 . . .</NewsTitle>
                            <NewsName>-주주경제-</NewsName>
                        </>
                    )}
                    <Divider />
                </NewsList>
            ))}
        </StockDetailCard>
    );
};
export default StockNews;
