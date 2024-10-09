import styled from 'styled-components';
import { NormalIcon } from '@components/root/icon';
import IconChicken from '@assets/images/icons/icon_chicken.png';
import IconZoozoo from '@assets/images/icons/icon_chick.png';
import IconCat from '@assets/images/icons/icon_cat.png';
import IconBear from '@assets/images/icons/icon_bear.png';
import IconRaccon from '@assets/images/icons/icon_raccon.png';
import { ProductDetailInfo, ProductJoinInfo } from '@components/root/productDetailInfo';
import { Divider } from '@components/root/card';
import { Card } from '@components/root/card';

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
export const ProductTerminationCard = ({
    productType,
    productName,
    period,
    rate,
    payment,
    amount,
    restTurn,
    endTurn,
    handleClick,
}) => {
    const productIcon = getProductIcon(productName);
    return (
        <Card onClick={handleClick}>
            <NormalIcon icon={productIcon}></NormalIcon>
            <ProductName>{productName}</ProductName>
            <ProductDetailInfo
                infoTitle1={'기간'}
                infoContent1={`${period.toLocaleString()}턴`}
                infoTitle2={'이율'}
                infoContent2={`${rate}%`}
                $isLoan={productType === 'loan'}
            />
            <Divider $isLine={true} />
            <ProductJoinInfo
                infoTitle={'가입 금액'}
                infoContent={
                    productType === 'deposit'
                        ? `${amount.toLocaleString()}🥕`
                        : `${payment.toLocaleString()}🥕 / 턴`
                }
            />
            <ProductJoinInfo infoTitle={'만기 회차'} infoContent={`${endTurn}턴`} />
            <ProductJoinInfo infoTitle={'남은 회차'} infoContent={`${restTurn}턴`} />
        </Card>
    );
};
