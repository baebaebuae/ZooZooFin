import styled from 'styled-components';
import { NormalIcon } from '@components/root/icon';
import IconChicken from '@assets/images/icons/icon_chicken.png';
import IconZoozoo from '@assets/images/icons/icon_chick.png';
import IconCat from '@assets/images/icons/icon_cat.png';
import IconBear from '@assets/images/icons/icon_bear.png';
import IconRaccon from '@assets/images/icons/icon_raccon.png';
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

export const ProductCard = ({ productName, productPeriod, productRate, handleClick }) => {
    const productIcon = getProductIcon(productName);
    return (
        <CardBlock onClick={handleClick}>
            <NormalIcon icon={productIcon}></NormalIcon>
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
