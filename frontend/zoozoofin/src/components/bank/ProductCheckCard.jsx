import { useState } from 'react';
import styled from 'styled-components';
import IconChicken from '@assets/images/icons/icon_chicken.png';
import IconZoozoo from '@assets/images/icons/icon_chick.png';
import IconCat from '@assets/images/icons/icon_cat.png';
import IconBear from '@assets/images/icons/icon_bear.png';
import IconRaccon from '@assets/images/icons/icon_raccon.png';
import { NormalIcon } from '@components/root/icon';
import { ProductDetailInfo, ProductJoinInfo, ExtraInfo } from '@components/root/productDetailInfo';
import { StampButton } from '@components/root/buttons';
import { Divider } from '@components/root/card';
import { Card } from '@components/root/card';
import { StampModal } from '@components/root/stampModal';

import { getApiClient } from '@stores/apiClient';

import { useAnimalStore } from '../../store.js';

const ProductName = styled.div`
    font-size: 14px;
    color: ${({ theme }) => theme.colors.gray};
`;

const joinProduct = async (animalId, productType, typeId, money) => {
    const apiClient = getApiClient();

    console.log('joinProducts - productType:', productType);
    console.log('joinProducts - typeId:', typeId);
    console.log('joinProducts - money:', money);

    const productData = {
        typeId: typeId,
        money: money,
    };

    try {
        console.log(`Request URL: /${productType}`);
        console.log('Request Data:', productData);

        const res = await apiClient.post(`/${productType}`, productData, {
            headers: { animalId: animalId },
        });

        if (res.status === 200) {
            console.log(res.data);
        } else {
            console.error('Unexpected status code:', res.status);
        }
    } catch (error) {
        console.error('error: ', error);
        return error;
    }
};

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

export const ProductCheckCard = ({
    productType,
    productTypeId,
    productName,
    productPeriod,
    productRate,
    isLoan,
    currentTurn,
    savingsAmount,
    expectedFinalAmount,
    specialRate,
    goToScript,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { nowAnimal } = useAnimalStore();
    const productIcon = getProductIcon(productName);
    return (
        <Card>
            <NormalIcon icon={productIcon}></NormalIcon>
            <ProductName>{productName}</ProductName>
            <ProductDetailInfo
                infoTitle1={'기간'}
                infoContent1={`${productPeriod}턴`}
                infoTitle2={'이율'}
                infoContent2={`${productRate}%`}
                isLoan={isLoan}
            />
            <Divider $isLine={true} />
            <ProductJoinInfo
                infoTitle={'만기 회차'}
                infoContent={`${productPeriod + currentTurn}턴`}
                $isLoan={true}
            />
            <ProductJoinInfo
                infoTitle={'가입 금액'}
                infoContent={
                    productType === 'savings'
                        ? `${savingsAmount.toLocaleString()}🥕 / 턴`
                        : `${savingsAmount.toLocaleString()}🥕`
                }
                $isLoan={true}
            />
            <Divider $isLine={false} />
            <ProductJoinInfo
                infoTitle={'예상 지급액'}
                infoContent={`${expectedFinalAmount.toLocaleString()}🥕`}
                $isLoan={true}
            />
            {/* 임의로 캐릭터 능력 추가 금액을 가입 금액을 기준으로 계산해놓음. 실제 추가 금액 얼마인지 확인 */}
            {/* {specialRate > 0 && (
                <ExtraInfo
                    extraRate={specialRate}
                    extraAmount={(specialRate / 100) * savingsAmount}
                ></ExtraInfo>
            )} */}
            {/* 주석처리만 해둠. 캐릭터 특별 능력이 생긴다면 './actions/JoinProduct'에서 specialRate값 받아오기 */}
            <StampButton onClick={() => setIsModalOpen(true)} />

            {isModalOpen && (
                <StampModal
                    action={() =>
                        joinProduct(nowAnimal.animalId, productType, productTypeId, savingsAmount)
                    }
                    goToScript={goToScript}
                    handleCloseModal={() => setIsModalOpen(false)}
                />
            )}
        </Card>
    );
};
