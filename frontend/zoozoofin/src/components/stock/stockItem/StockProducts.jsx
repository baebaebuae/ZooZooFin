import { useState } from 'react';
import { StockBuyingCard, Divider } from '@components/stock/common/card/StoreCards';
import StockTitleContainer from '@components/stock/common/container/StockTitleContainer';

export const StockProducts = ({ field, onStockSelected, type }) => {
    const [open, setOpen] = useState([false, false, false]);

    const handleToggle = (index) => {
        const newOpen = [...open];
        newOpen[index] = !newOpen[index];
        setOpen(newOpen);
    };

    // field별 리스트 조회 후 출력 예정
    const stockItems = [
        {
            companyName: '개굴전자',
            stockPrice: '82,000',
            currentState: 'test',
            info: '개굴전자는 해외 5개 지역 총괄, 100개의 종속 기업으로 구성된 글로벌 전자 기업임',
        },
        {
            companyName: 'companyname1',
            stockPrice: '000,000',
            currentState: 'down',
            info: 'Company 1의 상세 설명입니다.',
        },
        {
            companyName: 'companyname2',
            stockPrice: '000,000',
            currentState: 'up',
            info: 'Company 2의 상세 설명입니다.',
        },
    ];

    const handleClickStock = () => {
        onStockSelected(true);
        console.log('check!');
    };

    return (
        <StockBuyingCard>
            {stockItems.map((item, index) => (
                <StockTitleContainer
                    key={index}
                    companyName={item.companyName}
                    stockPrice={item.stockPrice}
                    currentState={item.currentState}
                    info={item.info}
                    isOpen={open[index]}
                    onToggle={() => handleToggle(index)}
                    isStockSelected={handleClickStock}
                    type={type}
                />
            ))}
        </StockBuyingCard>
    );
};

export default StockProducts;
