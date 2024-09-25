import styled from 'styled-components';
import { NormalIcon } from '@components/root/icon';
import IconChicken from '@assets/images/icons/icon_chicken.svg?react';
import { ProductDetailInfo, ProductJoinInfo } from '@components/root/productDetailInfo';
import { Divider } from '@components/root/card';
import { Card } from '@components/root/card';

const ProductName = styled.div`
    font-size: 14px;
    color: ${({ theme }) => theme.colors.gray};
`;

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
        <Card>
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
        </Card>
    );
};
