// 대출 중도 상환 상세 정보 확인 카드
import { useState } from 'react';
import styled from 'styled-components';
import { ProductJoinInfo } from '@components/root/productDetailInfo';
import { Card, Divider } from '@components/root/card';
import { Button } from '@components/root/buttons';
import { StampModal } from '@components/root/stampModal';

import { getApiClient } from '@stores/apiClient';

const InfoTitleBlock = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const InfoTitle = styled.div`
    font-size: 14px;
    color: ${({ theme }) => theme.colors.gray};
`;

const InfoContentBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
`;

const InfoContent = styled.div`
    font-size: 10px;
    color: ${({ theme }) => theme.colors.gray};
`;

const CardBlock = styled(Card)`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 8px 0;
`;

const WarningText = styled.div`
    margin: 10px 0;
    font-size: 10px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.warn};
`;

const repayLoan = async (loanId) => {
    const apiClient = getApiClient();

    console.log('joinProducts - productId:', loanId);

    const productData = {
        loanId: loanId,
    };

    try {
        console.log('Request Data:', productData);

        const res = await apiClient.patch('/loan/my', productData, {
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

export const LoanRepayDetailCard = ({
    loanId,
    loanNumber,
    loanType,
    isRepayAvailable,
    loanAmount,
    payBackTurn,
    loanPeriod,
    loanRate,
    loanRemain,
    handleClick,
    warning,
    goToScript,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <CardBlock onClick={handleClick}>
            <InfoTitleBlock>
                <InfoTitle>대출 {loanNumber}</InfoTitle>
                <InfoContentBox>
                    {warning ? (
                        <Button size={'small'} color={'warn'}>
                            경고
                        </Button>
                    ) : payBackTurn === loanPeriod ? (
                        <Button size={'small'} color={'primaryDeep'}>
                            만기
                        </Button>
                    ) : (
                        <Button size={'small'} color={'tertiary'}>
                            납입중
                        </Button>
                    )}
                    <InfoContent>
                        {payBackTurn} / {loanPeriod}
                    </InfoContent>
                </InfoContentBox>
            </InfoTitleBlock>
            <Divider isLine={true} />
            <ProductJoinInfo
                $isLoan={true}
                infoTitle={'대출 원금'}
                infoContent={`${loanAmount}원`}
            />
            <ProductJoinInfo $isLoan={true} infoTitle={'대출 금리'} infoContent={`${loanRate}%`} />
            <ProductJoinInfo
                $isLoan={true}
                infoTitle={'상환 방식'}
                infoContent={
                    loanType === 1
                        ? '만기균등상환'
                        : loanType === 2
                          ? '원금균등상환'
                          : '원리금균등상환'
                }
            />
            {isRepayAvailable && (
                <WarningText>중도상환시 원금에 대해 1%의 수수료가 부과됩니다.</WarningText>
            )}
            <ProductJoinInfo
                $isLoan={true}
                infoTitle={'남은 상환 금액'}
                infoContent={`${loanRemain}원`}
            />
            <Button
                size={'normal'}
                color={isRepayAvailable ? 'primary' : 'inactive'}
                onClick={() => setIsModalOpen(true)}
            >
                상환하기
            </Button>
            {isModalOpen && (
                <StampModal
                    action={() => repayLoan(loanId)}
                    goToScript={goToScript}
                    handleCloseModal={() => setIsModalOpen(false)}
                />
            )}
        </CardBlock>
    );
};
