import styled from 'styled-components';
import { NormalIcon } from '@components/root/icon';
import IconChicken from '@assets/images/icons/icon_chicken.svg?react';
import { ProductDetailInfo, ProductJoinInfo } from '@components/root/productDetailInfo';
import { StampButton } from '@components/root/buttons';
import { Divider } from '@components/root/card';
import { InfoBox } from '@components/root/infoBox';
import { Card } from '@components/root/card';

const ProductName = styled.div`
    font-size: 14px;
    color: ${({ theme }) => theme.colors.gray};
`;

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
        <Card>
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
        </Card>
    );
};
