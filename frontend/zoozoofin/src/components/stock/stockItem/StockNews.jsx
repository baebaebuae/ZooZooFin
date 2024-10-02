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

export const StockNews = () => {
    return (
        <StockDetailCard>
            <CardTitle>
                <LargeIcon icon={IconNews} />
                뉴스
            </CardTitle>
            <NewsList>
                <NewsTitle>뉴스 제목1</NewsTitle>
                <NewsName>-너굴경제-</NewsName>
                <Divider />
            </NewsList>
            <NewsList>
                <NewsTitle>뉴스 제목2</NewsTitle>
                <NewsName>-너굴경제-</NewsName>
                <Divider />
            </NewsList>
            <NewsList>
                <NewsTitle>뉴스 제목3</NewsTitle>
                <NewsName>-너굴경제-</NewsName>
                <Divider />
            </NewsList>
        </StockDetailCard>
    );
};
export default StockNews;
