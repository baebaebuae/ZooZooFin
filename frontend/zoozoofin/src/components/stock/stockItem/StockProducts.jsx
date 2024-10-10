import { useEffect, useState } from 'react';
import { StockBuyingCard, Divider } from '@components/stock/common/card/StoreCards';
import StockTitleContainer from '@components/stock/common/container/StockTitleContainer';
import useStockStore, { useUserStockStore } from '../common/store/StockStore';

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
    };

    const [stockItems, setStockItems] = useState(null);
    const [myStockItems, setMyStockItems] = useState(null);
    const { domesticStocks, overseasStocks, ETFStocks } = useStockStore();

    const { myDomesticStocks, myOverseasStocks, myETFStocks } = useUserStockStore();

    useEffect(() => {
        if (channel === '국내 주식') {
            console.log('check channel!!');
            setStockItems(domesticStocks);
            setMyStockItems(myDomesticStocks.holdingsList);
            console.log(myDomesticStocks);
        } else if (channel === '해외 주식') {
            setStockItems(overseasStocks);
            setMyStockItems(myOverseasStocks.holdingsList);
        } else if (channel === 'ETF') {
            console.log(overseasStocks);
            setStockItems(ETFStocks);
            setMyStockItems(myETFStocks.holdingsList);
        }

        // console.log(stockItems);
    }, [channel]);

    useEffect(() => {
        setOpen([false, false, false]); // 초기화할 때 open 상태도 초기화
    }, [field]);

    if (type === 'buy' && stockItems) {
        return (
            <StockBuyingCard>
                {stockItems
                    .filter((item) => item.stockField === field || item.stockField.includes(field)) // field 조건에 맞는 아이템만 필터링
                    .map((item, index) => (
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
    }
    if (type === 'sell' && myStockItems) {
        console.log(myStockItems);
        return (
            <StockBuyingCard>
                {myStockItems
                    .filter((item) => item.stockField === field) // field 조건에 맞는 아이템만 필터링
                    .map((item, index) => (
                        <StockTitleContainer
                            key={index}
                            stockId={item.stockId}
                            stockName={item.stockName}
                            stockRate={item.stockRate}
                            stockIntro={item.stockIntro}
                            isOpen={open[index]}
                            onToggle={() => handleToggle(index)}
                            isStockSelected={handleClickStock}
                            type={type}
                            channel={channel}
                            onDetailClick={handleDetailClick}
                            stockTotal={item.stockTotal}
                            stockCount={item.stockCount}
                        />
                    ))}
            </StockBuyingCard>
        );
    }
};

export default StockProducts;
