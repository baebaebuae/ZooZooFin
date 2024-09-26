import styled from 'styled-components';
import { NormalIcon } from '@components/root/icon';
import IconChicken from '@assets/images/icons/icon_chicken.svg?react';
import { ProductDetailInfo } from '@components/root/productDetailInfo';
import { Card } from '@components/root/card';

const ProductName = styled.div`
    font-size: 14px;
    color: ${({ theme }) => theme.colors.gray};
`;

const CardBlock = styled(Card)`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 8px 0;
`;

// savings, deposit 정보 받아서 각각 다르게 axios 보내기. 재활용
export const ProductCard = ({
    productTypeId,
    productName,
    productPeriod,
    productRate,
    handleClick,
}) => {
    return (
        <CardBlock onClick={handleClick}>
            <NormalIcon icon={IconChicken}></NormalIcon>
            <ProductName>{productName}</ProductName>
            <ProductDetailInfo
                infoTitle1={'기간'}
                infoContent1={`${productPeriod}턴`}
                infoTitle2={'이율'}
                infoContent2={`${productRate}%`}
                isLoan={false}
                isEarlyTermination={false}
            ></ProductDetailInfo>
        </CardBlock>
    );
};
