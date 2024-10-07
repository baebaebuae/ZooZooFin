import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { CarrotIcon } from '@components/stock/common/icon/StockIcons';
import StockInputBox from '@components/stock/common/container/StockInputBox';
import useStockStore from '@components/stock/common/store/StockStore';
const ColumnContainerBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0px;
    gap: 5px;
`;

const RowContainerBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0px;
    gap: 20px;
`;

const TextStyle = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    gap: 3px;
    padding: 2px 0px;
    height: 25px;
    color: ${({ type, theme }) => (type === 'content' ? theme.colors.primaryDeep : 'black')};
    font-size: ${({ size }) => (size === 'large' ? '17px' : '14px')};
    font-weight: ${({ type }) => (type === 'content' ? 'bold' : 'normal')};
`;

const ColumnInfoBox = ({ title, content, showIcon }) => {
    return (
        <ColumnContainerBox>
            <TextStyle type="title">{title}</TextStyle>
            <TextStyle type="content" size="large">
                {content} {showIcon && '🥕'}
            </TextStyle>
        </ColumnContainerBox>
    );
};

// 구매 / 판매 => prop으로 받아서 처리할 예정 (변수명 변경 예정)
export const OrderSubtitle = ({ type, maxStock, maxMoney }) => {
    const [stockTitle, setStockTitle] = useState(null);
    const [priceTitle, setPriceTitle] = useState(null);
    useEffect(() => {
        if (type === 'buy') {
            setStockTitle('최대 구매 가능 주');
            setPriceTitle('최대 구매 가능 금액');
        } else {
            setStockTitle('최대 판매 가능 주');
            setPriceTitle('최대 판매 가능 금액');
        }
    }, [type]);

    return (
        <RowContainerBox>
            <ColumnInfoBox title={stockTitle} content={maxStock} showIcon={false} />
            <ColumnInfoBox title={priceTitle} content={maxMoney} showIcon={true} />
        </RowContainerBox>
    );
};

export const TotalPrice = ({ title, total }) => {
    return (
        <ColumnInfoBox
            title={title}
            content={total !== null ? total.toLocaleString() : total}
            showIcon={true}
        />
    );
};

export const InputOrder = ({ type, stockPrice }) => {
    const [title, setTitle] = useState(0);
    const [totalTitle, setTotalTitle] = useState(null);

    useEffect(() => {
        if (type === 'buy') {
            setTitle('구매할 주');
            setTotalTitle('총 구매할 금액');
        } else {
            setTitle('판매할 주');
            setTotalTitle('총 판매할 금액');
        }
    }, [type]);

    const { totalPrice, setTotalPrice } = useStockStore();

    const handleTotal = (total) => {
        const calculatedTotalPrice = total * stockPrice;
        if (calculatedTotalPrice !== totalPrice) {
            setTotalPrice(calculatedTotalPrice);
        }
    };
    return (
        <>
            <StockInputBox
                title={title}
                amount1={1}
                amount2={5}
                amount3={10}
                amount4={25}
                maxAmount={50}
                onSavingsAmountChange={() => {}}
                isSavings={true}
                handleTotal={handleTotal}
                type={type}
            />

            <TotalPrice title={totalTitle} total={totalPrice} />
        </>
    );
};
