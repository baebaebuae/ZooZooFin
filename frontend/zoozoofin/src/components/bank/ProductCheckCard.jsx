import { useState } from 'react';
import styled from 'styled-components';

import { NormalIcon } from '@components/root/icon';
import IconChicken from '@assets/images/icons/icon_chicken.svg?react';
import { ProductDetailInfo, ProductJoinInfo, ExtraInfo } from '@components/root/productDetailInfo';
import { StampButton } from '@components/root/buttons';
import { Divider } from '@components/root/card';
import { Card } from '@components/root/card';
import { StampModal } from '@components/root/stampModal';

const ProductName = styled.div`
    font-size: 14px;
    color: ${({ theme }) => theme.colors.gray};
`;

import axios from 'axios';

const URL = import.meta.env.VITE_URL;
// 상품 가입하기(POST)
const joinProducts = async (productType, typeId, money) => {
    console.log('joinProducts - productType:', productType);
    console.log('joinProducts - typeId:', typeId);
    console.log('joinProducts - money:', money);
    try {
        const res = await axios({
            method: 'post',
            url: `${URL}/${productType}`,
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': `http://localhost:5173`,
                'Access-Control-Allow-Credentials': 'true',
            },
            data: {
                typeId: typeId,
                money: money, // Key 이름 확인
            },
        });
        if (res.status === 200) {
            console.log(res.data); // POST 잘 갔는지 확인
        }
    } catch (error) {
        // console.error('error: ', error);
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

    console.log('productCheckCard에서 productTypeId 출력함: ', productTypeId);

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
                        ? `${savingsAmount.toLocaleString()}원 / 턴`
                        : `${savingsAmount.toLocaleString()}원`
                }
            />
            <ProductJoinInfo
                infoTitle={'만기 회차'}
                infoContent={`${productPeriod + currentTurn}턴`}
            />
            <Divider $isLine={false} />
            <ProductJoinInfo
                infoTitle={'예상 지급액'}
                infoContent={`${expectedFinalAmount.toLocaleString()}원`}
            />
            {specialRate > 0 && (
                <ExtraInfo
                    extraRate={specialRate}
                    extraAmount={(specialRate / 100) * savingsAmount}
                ></ExtraInfo>
            )}
            {/* 임의로 캐릭터 능력 추가 금액을 가입 금액을 기준으로 계산해놓음. 실제 추가 금액 얼마인지 확인 */}
            <StampButton onClick={() => setIsModalOpen(true)} />

            {isModalOpen && (
                <StampModal
                    action={() => joinProducts(productType, productTypeId, savingsAmount)}
                    goToScript={goToScript}
                    handleCloseModal={() => setIsModalOpen(false)}
                />
            )}
        </Card>
    );
};
