import { useState } from 'react';
import styled from 'styled-components';
import { NormalIcon } from '@components/root/icon';
import IconChicken from '@assets/images/icons/icon_chicken.svg?react';
import { ProductDetailInfo, ProductJoinInfo, ExtraInfo } from '@components/root/productDetailInfo';
import { InputBox } from '@components/inputBox';
import { StampButton } from '@components/root/buttons';
import { Divider } from '@components/root/card';
import { InfoBox } from '@components/root/infoBox';

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
                    isSavings
                        ? `${(savingsAmount * 1.03).toLocaleString()}원`
                        : `${(savingsAmount * turn * 1.03).toLocaleString()}원`
                }
                // 백엔드 계산 로직 받아와서 적용
                $isLoan={isLoan}
            ></ProductDetailInfo>
        </>
    );
};

export const ProductCheckCard = ({
    productName,
    turn,
    rate,
    isLoan,
    currentTurn,
    savingsAmount,
    finalSavingsAmount,
    ifSpecial,
}) => {
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
            />
            {/* 이후에 페이지 이동시 props로 값 받아서 넘겨줘야함 */}
            <Divider isLine={true} />
            <ProductJoinInfo
                infoTitle={'가입 금액'}
                infoContent={`${savingsAmount.toLocaleString()}원`}
            />
            <ProductJoinInfo infoTitle={'만기 회차'} infoContent={`${turn + currentTurn}턴`} />
            <Divider isLine={false} />
            <ProductJoinInfo
                infoTitle={'예상 지급액'}
                infoContent={`${finalSavingsAmount.toLocaleString()}원`}
            />
            {ifSpecial && <ExtraInfo extraRate={5} savingsAmount={savingsAmount}></ExtraInfo>}
            {/* 임의로 캐릭터 능력 추가 금액을 가입 금액을 기준으로 계산해놓음. 실제 추가 금액 얼마인지 확인 */}
            <StampButton />
        </>
    );
};

export const ProductTerminationCard = ({
    productName,
    turn,
    rate,
    isLoan,
    currentTurn,
    restTurn,
    savingsAmount,
}) => {
    return (
        <>
            <NormalIcon icon={IconChicken}></NormalIcon>
            <ProductName>{productName}</ProductName>
            <ProductDetailInfo
                infoTitle1={'기간'}
                infoContent1={`${turn.toLocaleString()}턴`}
                infoTitle2={'이율'}
                infoContent2={`${rate}%`}
                $isLoan={isLoan}
            />
            <Divider isLine={true} />
            <ProductJoinInfo
                infoTitle={'가입 금액'}
                infoContent={`${savingsAmount.toLocaleString()}원`}
            />
            <ProductJoinInfo infoTitle={'만기 회차'} infoContent={`${turn + currentTurn}턴`} />
            <ProductJoinInfo infoTitle={'남은 회차'} infoContent={`${restTurn}턴`} />
        </>
    );
};

export const ProductTerminationDetailCard = ({
    productName,
    turn,
    isLoan,
    currentTurn,
    restTurn,
    savingsAmount,
    finalSavingsAmount,
}) => {
    return (
        <>
            <NormalIcon icon={IconChicken}></NormalIcon>
            <ProductName>{productName}</ProductName>

            <InfoBox color={'warn'}>중도해지</InfoBox>

            <ProductDetailInfo
                infoTitle1={'기간'}
                infoContent1={`${turn}턴`}
                infoTitle2={'이율'}
                infoContent2={`0.5%`}
                $isLoan={isLoan}
                isEarlyTermination={true}
            />
            <Divider isLine={true} />
            <ProductJoinInfo
                infoTitle={'가입 금액'}
                infoContent={`${savingsAmount.toLocaleString()}원`}
            />
            <ProductJoinInfo infoTitle={'만기 회차'} infoContent={`${turn + currentTurn}턴`} />
            <ProductJoinInfo infoTitle={'남은 회차'} infoContent={`${restTurn}턴`} />

            <Divider isLine={false} />
            <ProductJoinInfo
                infoTitle={'지급액'}
                infoContent={`${finalSavingsAmount.toLocaleString()}원`}
            />
            <StampButton />
        </>
    );
};
