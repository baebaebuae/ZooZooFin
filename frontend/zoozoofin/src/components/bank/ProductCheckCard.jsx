import { useState } from 'react';
import styled from 'styled-components';

import { NormalIcon } from '@components/root/icon';
import IconChicken from '@assets/images/icons/icon_chicken.png';
import { ProductDetailInfo, ProductJoinInfo, ExtraInfo } from '@components/root/productDetailInfo';
import { StampButton } from '@components/root/buttons';
import { Divider } from '@components/root/card';
import { Card } from '@components/root/card';
import { StampModal } from '@components/root/stampModal';

import { getApiClient } from '@stores/apiClient';

const ProductName = styled.div`
    font-size: 14px;
    color: ${({ theme }) => theme.colors.gray};
`;

const joinProduct = async (productType, typeId, money) => {
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
            headers: { animalId: 1 },
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

    return (
        <Card>
            <NormalIcon icon={IconChicken}></NormalIcon>
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
                infoTitle={'가입 금액'}
                infoContent={
                    productType === 'savings'
                        ? `${savingsAmount.toLocaleString()}🥕 / 턴`
                        : `${savingsAmount.toLocaleString()}🥕`
                }
            />
            <ProductJoinInfo
                infoTitle={'만기 회차'}
                infoContent={`${productPeriod + currentTurn}턴`}
            />
            <Divider $isLine={false} />
            <ProductJoinInfo
                infoTitle={'예상 지급액'}
                infoContent={`${expectedFinalAmount.toLocaleString()}🥕`}
            />
            {/* 임의로 캐릭터 능력 추가 금액을 가입 금액을 기준으로 계산해놓음. 실제 추가 금액 얼마인지 확인 */}
            {specialRate > 0 && (
                <ExtraInfo
                    extraRate={specialRate}
                    extraAmount={(specialRate / 100) * savingsAmount}
                ></ExtraInfo>
            )}
            <StampButton onClick={() => setIsModalOpen(true)} />

            {isModalOpen && (
                <StampModal
                    action={() => joinProduct(productType, productTypeId, savingsAmount)}
                    goToScript={goToScript}
                    handleCloseModal={() => setIsModalOpen(false)}
                />
            )}
        </Card>
    );
};
