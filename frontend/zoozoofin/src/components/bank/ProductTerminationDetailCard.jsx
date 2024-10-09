import { useState } from 'react';
import styled from 'styled-components';
import { Button } from '@components/root/buttons';
import { NormalIcon } from '@components/root/icon';
import IconChicken from '@assets/images/icons/icon_chicken.png';
import { ProductDetailInfo, ProductJoinInfo } from '@components/root/productDetailInfo';
import { StampButton } from '@components/root/buttons';
import { Divider } from '@components/root/card';
import { InfoBox } from '@components/root/infoBox';
import { Card } from '@components/root/card';
import { StampModal } from '@components/root/stampModal';

import { getApiClient } from '@stores/apiClient';

import { useAnimalStore } from '../../store.js';

const ProductName = styled.div`
    font-size: 14px;
    color: ${({ theme }) => theme.colors.gray};
`;

const terminateProduct = async (animalId, productType, productId) => {
    const apiClient = getApiClient();

    console.log('joinProducts - productType:', productType);
    console.log('joinProducts - productId:', productId);

    const productData = {
        ...(productType === 'deposit' && { depositId: productId }),
        ...(productType === 'savings' && { savingsId: productId }),
    };

    try {
        console.log(`Request URL: /${productType}/my`);
        console.log('Request Data:', productData);

        const res = await apiClient.patch(`/${productType}/my`, productData, {
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


export const ProductTerminationDetailCard = ({
    productType,
    productId,
    productName,
    period,
    amount,
    // 현재 해지시 예상 금액 변수 추가예정
    payment,
    deleteReturn,
    restTurn,
    endTurn,
    warning,
    goToScript,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { nowAnimal } = useAnimalStore();

    return (
        <Card>
            <NormalIcon icon={IconChicken}></NormalIcon>
            <ProductName>{productName}</ProductName>
            {warning && (
                <Button size={'small'} $isBorder={false} color={'warn'}>
                    경고
                </Button>
            )}
            <InfoBox infoContent={'중도해지'} color={'warn'} />
            <ProductDetailInfo
                infoTitle1={'기간'}
                infoContent1={`${period}턴`}
                infoTitle2={'이율'}
                infoContent2={'0.5%'} // 해지는 이율 고정임
                $isLoan={productType === 'loan'}
                isEarlyTermination={true}
            />
            <Divider $isLine={true} />
            <ProductJoinInfo
                infoTitle={'가입 금액'}
                infoContent={
                    payment && productType === 'savings'
                        ? `${payment.toLocaleString()}원 / 턴` // payment가 있고 savings일 때
                        : `${amount.toLocaleString()}원`
                }
            />
            <ProductJoinInfo infoTitle={'만기 회차'} infoContent={`${endTurn}턴`} />
            <ProductJoinInfo infoTitle={'남은 회차'} infoContent={`${restTurn}턴`} />
            <Divider $isLine={false} />
            {/* 예금일 때는 없는 컴포넌트 처리 */}
            {payment && productType === 'savings' && (
                <ProductJoinInfo
                    infoTitle={'납입 금액'}
                    infoContent={`${amount.toLocaleString()}🥕`}
                />
            )}
            <ProductJoinInfo
                infoTitle={'지급액'}
                // finalReturn -> 현재 해지시 예상 금액 변수 추가되면 수정
                infoContent={`${deleteReturn.toLocaleString()}🥕`}
            />
            <StampButton onClick={() => setIsModalOpen(true)} />
            {isModalOpen && (
                <StampModal
                    action={() => terminateProduct(nowAnimal.animalId, productType, productId)}
                    goToScript={goToScript}
                    handleCloseModal={() => setIsModalOpen(false)}
                />
            )}
        </Card>
    );
};
