import { Collapse } from '@mui/material';

import {
    BuyingContent,
    CompanyName,
    BuyingMoneyContent,
    CurrentStockState,
    StockPrice,
    ButtonContainer,
    TitleCoulumn,
} from '@components/stock/common/container/StoreContainer';
import { CarrotIcon } from '@components/stock/common/icon/StockIcons';
import { ActiveButton, DetailButton } from '@components/stock/common/button/Button';
import { Divider } from '@components/stock/common/card/StoreCards';
import { useEffect, useState } from 'react';

export const StockTitle = ({ companyName, stockPrice, currentState, onToggle }) => {
    return (
        <BuyingContent onClick={onToggle} style={{ cursor: 'pointer' }}>
            <CompanyName>{companyName}</CompanyName>
            <BuyingMoneyContent>
                <CurrentStockState current={currentState}>{currentState}</CurrentStockState>
                <StockPrice>
                    {stockPrice.toLocaleString()} <CarrotIcon />
                </StockPrice>
            </BuyingMoneyContent>
        </BuyingContent>
    );
};

export const StockTitleContainer = ({
    companyName,
    stockPrice,
    currentState,
    info,
    isOpen,
    onToggle,
    // 구매 화면 이동 테스트를 위해 추가 => 데이터 연결 후 삭제 예정
    isStockSelected,
    type,
    channel,
    onDetailClick,
}) => {
    const [value, setValue] = useState(null);
    useEffect(() => {
        if (type === 'buy') {
            setValue('구매하기');
        } else {
            setValue('판매하기');
        }
    }, [type]);

    const handleClickStock = () => {
        isStockSelected(true);
    };
    const handleDetailClick = () => {
        if (onDetailClick) {
            onDetailClick(companyName);
        }
    };

    return (
        <>
            <BuyingContent onClick={onToggle}>
                <TitleCoulumn>
                    {channel === 'ETF' && <CompanyName type="title">{companyName}</CompanyName>}
                    <CompanyName>{companyName}</CompanyName>
                </TitleCoulumn>
                <BuyingMoneyContent>
                    <CurrentStockState current={currentState}>{currentState}</CurrentStockState>
                    <StockPrice>
                        {stockPrice.toLocaleString()} <CarrotIcon />
                    </StockPrice>
                </BuyingMoneyContent>
            </BuyingContent>
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <p>{info}</p>
                <ButtonContainer>
                    <ActiveButton onClick={handleClickStock}>{value}</ActiveButton>
                    <DetailButton onClick={handleDetailClick}>상세 정보</DetailButton>
                </ButtonContainer>
            </Collapse>
            <Divider />
        </>
    );
};

export default StockTitleContainer;
