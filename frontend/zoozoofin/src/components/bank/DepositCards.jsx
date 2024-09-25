import { useState } from 'react';
import styled from 'styled-components';
import { NormalIcon } from '@components/root/icon';
import IconChicken from '@assets/images/icons/icon_chicken.svg?react';
import { ProductDetailInfo } from '@components/root/productDetailInfo';
import { InputBox } from '@components/inputBox';
// import { ButtonBase } from '@components/root/buttons';

const ProductName = styled.div`
    font-size: 14px;
    color: ${({ theme }) => theme.colors.gray};
`;

export const ProductCard = ({ productName, turn, rate, isLoan }) => {
    return (
        <>
            <NormalIcon icon={IconChicken}></NormalIcon>
            <ProductName>{productName}</ProductName>
            <ProductDetailInfo
                infoTitle1={'기간'}
                infoContent1={`${turn}턴`}
                infoTitle2={'이율'}
                infoContent2={`${rate}%`}
                $isLoan={isLoan}
            ></ProductDetailInfo>
        </>
    );
};

export const ProductJoinCard = ({
    productName,
    turn,
    rate,
    isLoan,
    currentTurn,
    maxAmount,
    isSavings,
}) => {
    const [savingsAmount, setSavingsAmount] = useState(0);

    function handleSavingsAmountChange(newAmount) {
        setSavingsAmount(newAmount);
    }

    return (
        <>
            {' '}
            <NormalIcon icon={IconChicken}></NormalIcon>
            <ProductName>{productName}</ProductName>
            <ProductDetailInfo
                infoTitle1={'기간'}
                infoContent1={`${turn}턴`}
                infoTitle2={'이율'}
                infoContent2={`${rate}%`}
                $isLoan={isLoan}
            ></ProductDetailInfo>
            <InputBox
                title={'저축할 금액'}
                amount1={10000}
                amount2={50000}
                amount3={100000}
                amount4={500000}
                maxAmount={maxAmount}
                onSavingsAmountChange={handleSavingsAmountChange}
                isSavings={isSavings}
            ></InputBox>
            <ProductDetailInfo
                infoTitle1={'만기 예상 회차'}
                infoContent1={`${turn + currentTurn}턴`}
                infoTitle2={'예상 금액'}
                infoContent2={
                    isSavings ? `${savingsAmount * 1.03}원` : `${savingsAmount * turn * 1.03}`
                }
                // 백엔드 계산 로직 받아와서 적용
                $isLoan={isLoan}
            ></ProductDetailInfo>
        </>
    );
};
