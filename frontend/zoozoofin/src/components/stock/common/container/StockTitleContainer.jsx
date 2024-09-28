import { Collapse } from '@mui/material';

import {
    BuyingContent,
    CompanyName,
    BuyingMoneyContent,
    CurrentStockState,
    StockPrice,
    ButtonContainer,
} from '@components/stock/common/container/StoreContainer';
import { CarrotIcon } from '@components/stock/common/icon/StockIcons';
import { ActiveButton, DetailButton } from '@components/stock/common/button/Button';
import { Divider } from '@components/stock/common/card/StoreCards';

export const StockTitle = ({ companyName, stockPrice, currentState, onToggle }) => {
    return (
        <BuyingContent onClick={onToggle} style={{ cursor: 'pointer' }}>
            <CompanyName>{companyName}</CompanyName>
            <BuyingMoneyContent>
                <CurrentStockState current={currentState}>{currentState}</CurrentStockState>
                <StockPrice>
                    {stockPrice} <CarrotIcon />
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
}) => {
    return (
        <>
            <BuyingContent onClick={onToggle}>
                <CompanyName>{companyName}</CompanyName>
                <BuyingMoneyContent>
                    <CurrentStockState current={currentState}>{currentState}</CurrentStockState>
                    <StockPrice>
                        {stockPrice} <CarrotIcon />
                    </StockPrice>
                </BuyingMoneyContent>
            </BuyingContent>
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <p>{info}</p>
                <ButtonContainer>
                    <ActiveButton variant="contained">구매하기</ActiveButton>
                    <DetailButton variant="outlined">상세 정보</DetailButton>
                </ButtonContainer>
            </Collapse>
            <Divider />
        </>
    );
};

export default StockTitleContainer;
