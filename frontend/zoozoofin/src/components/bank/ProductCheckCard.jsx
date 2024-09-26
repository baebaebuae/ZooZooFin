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

export const ProductCheckCard = ({
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
            {/* 이후에 페이지 이동시 props로 값 받아서 넘겨줘야함 */}
            <Divider $isLine={true} />
            <ProductJoinInfo
                infoTitle={'가입 금액'}
                infoContent={`${savingsAmount.toLocaleString()}원`}
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
                    extraAmount={(savingsAmount * specialRate) / 100}
                ></ExtraInfo>
            )}
            {/* 임의로 캐릭터 능력 추가 금액을 가입 금액을 기준으로 계산해놓음. 실제 추가 금액 얼마인지 확인 */}
            <StampButton onClick={() => setIsModalOpen(true)} />

            {isModalOpen && <StampModal goToScript={goToScript} />}
        </Card>
    );
};
