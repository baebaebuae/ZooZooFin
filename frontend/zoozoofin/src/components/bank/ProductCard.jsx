import styled from 'styled-components';
import { NormalIcon } from '@components/root/icon';
import IconChicken from '@assets/images/icons/icon_chicken.svg?react';
import { ProductDetailInfo } from '@components/root/productDetailInfo';
import { Card } from '@components/root/card';

const ProductName = styled.div`
    font-size: 14px;
    color: ${({ theme }) => theme.colors.gray};
`;

export const ProductCard = ({ productName, turn, rate, isLoan, handleClick }) => {
    // axios 실행 함수

    return (
        <Card onClick={handleClick}>
            <NormalIcon icon={IconChicken}></NormalIcon>
            <ProductName>{productName}</ProductName>
            <ProductDetailInfo
                infoTitle1={'기간'}
                infoContent1={`${turn}턴`}
                infoTitle2={'이율'}
                infoContent2={`${rate}%`}
                $isLoan={isLoan}
                isEarlyTermination={false}
            ></ProductDetailInfo>
        </Card>
    );
};
