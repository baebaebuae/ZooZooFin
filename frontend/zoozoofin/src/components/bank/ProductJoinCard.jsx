import { useState } from 'react';
import styled from 'styled-components';
import { NormalIcon } from '@components/root/icon';
import { ProductDetailInfo } from '@components/root/productDetailInfo';
import { InputBox } from '@components/inputBox';
import { Card } from '@components/root/card';
import { Button } from '@components/root/buttons';
import IconChicken from '@assets/images/icons/icon_chicken.png';
import IconZoozoo from '@assets/images/icons/icon_chick.png';
import IconCat from '@assets/images/icons/icon_cat.png';
import IconBear from '@assets/images/icons/icon_bear.png';
import IconRaccon from '@assets/images/icons/icon_raccon.png';
import useUserStore from '@stores/useUserStore';

const Block = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

const ProductName = styled.div`
    font-size: 14px;
    color: ${({ theme }) => theme.colors.gray};
`;

const getProductIcon = (productName) => {
    switch (productName) {
        case '주주예금':
            return IconZoozoo;
        case '꼬꼬예금':
            return IconChicken;
        case '야옹예금':
            return IconCat;
        case '주주적금':
            return IconZoozoo;
        case '너굴적금':
            return IconRaccon;
        case '곰곰적금':
            return IconBear;
    }
};

export const ProductJoinCard = ({
    productType,
    productName,
    productPeriod,
    productRate,
    isLoan,
    currentTurn,
    maxAmount,
    saveAmount,
}) => {
    const [savingsAmount, setSavingsAmount] = useState(0);
    const [expectedFinalAmount, setExpectedFinalAmount] = useState(0);

    const { animalAssets } = useUserStore();

    function handleSavingsAmountChange(newAmount) {
        setSavingsAmount(newAmount);

        const rate = Math.ceil((productRate / 100 / productPeriod) * 1000) / 1000;
        const a = (productPeriod * (productPeriod + 1)) / 2;

        const expectedSavingsReturn = newAmount * productPeriod + newAmount * a * rate;
        // 예금일 때는 단순 계산(원금+(원금*이율*턴수))
        const expectedDepositReturn = newAmount + newAmount * (productRate / 100);

        setExpectedFinalAmount(isSavings ? expectedSavingsReturn : expectedDepositReturn);
    }

    const isSavings = productType === 'savings';
    const productIcon = getProductIcon(productName);
    return (
        <Block>
            <Card>
                <NormalIcon icon={productIcon}></NormalIcon>
                <ProductName>{productName}</ProductName>
                <ProductDetailInfo
                    infoTitle1={'기간'}
                    infoContent1={`${productPeriod}턴`}
                    infoTitle2={'이율'}
                    infoContent2={`${productRate}%`}
                    isLoan={isLoan}
                ></ProductDetailInfo>
                <InputBox
                    title={'저축할 금액'}
                    amount1={isSavings ? 10000 : 100000}
                    amount2={isSavings ? 50000 : 500000}
                    amount3={isSavings ? 100000 : 1000000}
                    amount4={isSavings ? 500000 : 5000000}
                    maxAmount={animalAssets}
                    onSavingsAmountChange={handleSavingsAmountChange}
                    isSavings={isSavings}
                ></InputBox>
                <ProductDetailInfo
                    infoTitle1={'만기 예상 회차'}
                    infoContent1={`${productPeriod + currentTurn}턴`}
                    infoTitle2={'예상 금액'}
                    infoContent2={`${expectedFinalAmount.toLocaleString()}🥕`}
                    isLoan={isLoan}
                ></ProductDetailInfo>
            </Card>
            <Button
                size={'normal'}
                color={'primaryDeep'}
                onClick={() => {
                    savingsAmount > 0 && saveAmount(savingsAmount, expectedFinalAmount);
                }}
            >
                다음
            </Button>
        </Block>
    );
};
