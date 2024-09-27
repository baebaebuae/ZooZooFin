import { useState } from 'react';
import styled from 'styled-components';
import { Button } from '@components/root/buttons';
import { NormalIcon } from '@components/root/icon';
import IconChicken from '@assets/images/icons/icon_chicken.svg?react';
import { ProductDetailInfo, ProductJoinInfo } from '@components/root/productDetailInfo';
import { StampButton } from '@components/root/buttons';
import { Divider } from '@components/root/card';
import { InfoBox } from '@components/root/infoBox';
import { Card } from '@components/root/card';
import { StampModal } from '@components/root/stampModal';

const ProductName = styled.div`
    font-size: 14px;
    color: ${({ theme }) => theme.colors.gray};
`;

export const ProductTerminationDetailCard = ({
    productType,
    productName,
    period,
    amount,
    payment,
    finalReturn,
    restTurn,
    endTurn,
    warning,
    goToNextCard,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);



    return (
        <Card>
            <NormalIcon icon={IconChicken}></NormalIcon>
            <ProductName>{productName}</ProductName>
            {warning && (
                <Button size={'small'} $isBorder={false} color={'warn'}>
                    경고
                </Button>
            )}

            <InfoBox color={'warn'}>중도해지</InfoBox>

            <ProductDetailInfo
                infoTitle1={'기간'}
                infoContent1={`${period}턴`}
                infoTitle2={'이율'}
                infoContent2={'0.5%'} // 해지는 이율 고정임
                isLoan={productType === 'loan'}
                isEarlyTermination={true}
            />
            <Divider $isLine={true} />
            <ProductJoinInfo
                infoTitle={'가입 금액'}
                infoContent={
                    payment && productType === 'savings'
                        ? `${payment.toLocaleString()}원 / 턴` // payment가 있고 savings일 때
                        : `${amount.toLocaleString()}원` //
                }
            />
            <ProductJoinInfo infoTitle={'만기 회차'} infoContent={`${endTurn}턴`} />
            <ProductJoinInfo infoTitle={'남은 회차'} infoContent={`${restTurn}턴`} />

            <Divider $isLine={false} />

            {/* 예금일 때는 없는 컴포넌트 처리 */}
            {payment && productType === 'savings' && (
                <ProductJoinInfo
                    infoTitle={'납입 금액'}
                    infoContent={`${amount.toLocaleString()}원`}
                />
            )}

            <ProductJoinInfo
                infoTitle={'지급액'}
                infoContent={`${finalReturn.toLocaleString()}원`}
            />
            <StampButton onClick={() => setIsModalOpen(true)} />
            {isModalOpen && (
                <StampModal
                    goToScript={goToNextCard}
                    handleCloseModal={() => setIsModalOpen(false)}
                />
            )}
        </Card>
    );
};
