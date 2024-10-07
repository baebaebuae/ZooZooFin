import { useEffect, useState } from 'react';
import { StockBuyingCard, Divider } from '@components/stock/common/card/StoreCards';
import StockTitleContainer from '@components/stock/common/container/StockTitleContainer';
import useStockStore from '../common/store/StockStore';

// 판매 보유주식 api 연결 후 확인

export const StockProducts = ({ field, onStockSelected, type, channel, handleDetailClick }) => {
    const [open, setOpen] = useState([false, false, false]);
    const handleToggle = (index) => {
        const newOpen = [...open];
        newOpen[index] = !newOpen[index];
        setOpen(newOpen);
    };
    const handleClickStock = () => {
        onStockSelected(true);
        console.log('check!');
    };

    // field별 리스트 조회 후 출력
    // field api 반영 되면 수정 예정, 현재 반영 x
    const [stockItems, setStockItems] = useState(null); // stockItems 상태 선언

    const { domesticStocks, overseasStocks, ETFStocks } = useStockStore();

    useEffect(() => {
        if (channel === '국내 주식') {
            console.log('check channel!!');
            setStockItems(domesticStocks);
            console.log(stockItems);
        } else if (channel === '해외 주식') {
            setStockItems(overseasStocks);
        } else if (channel === 'ETF') {
            setStockItems(ETFStocks);
        }
        // console.log(stockItems);
    }, [channel, stockItems, domesticStocks, overseasStocks, ETFStocks]);

    return (
        <StockBuyingCard>
            {stockItems &&
                stockItems.map((item, index) => (
                    <StockTitleContainer
                        key={index}
                        stockId={item.stockId}
                        stockName={item.stockName}
                        stockRate={item.rate}
                        stockIntro={item.stockIntro}
                        isOpen={open[index]}
                        onToggle={() => handleToggle(index)}
                        isStockSelected={handleClickStock}
                        type={type}
                        channel={channel}
                        onDetailClick={handleDetailClick}
                    />
                ))}
        </StockBuyingCard>
    );
};

export default StockProducts;
