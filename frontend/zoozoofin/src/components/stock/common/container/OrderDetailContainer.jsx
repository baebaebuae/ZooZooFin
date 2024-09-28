import styled from 'styled-components';
import { CarrotIcon } from '@components/stock/common/icon/StockIcons';
import StockInputBox from '@components/stock/common/container/StockInputBox';

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
                {content} {showIcon && <CarrotIcon />}
            </TextStyle>
        </ColumnContainerBox>
    );
};

// 구매 / 판매 => prop으로 받아서 처리할 예정 (변수명 변경 예정)
export const BuyingOrder = ({ maxStock, maxMoney }) => {
    return (
        <RowContainerBox>
            <ColumnInfoBox title={'최대 구매 가능 주'} content={maxStock} showIcon={false} />
            <ColumnInfoBox title={'최대 구매 가능 금액'} content={maxMoney} showIcon={true} />
        </RowContainerBox>
    );
};

export const InputOrder = () => {
    return (
        <StockInputBox
            title={'구매할 주'}
            amount1={1}
            amount2={5}
            amount3={10}
            amount4={25}
            maxAmount={50}
            onSavingsAmountChange={() => {}}
            isSavings={true}
        />
    );
};

export const TotalPrice = ({ total }) => {
    return <ColumnInfoBox title={'총 구매할 금액'} content={total} showIcon={true} />;
};
