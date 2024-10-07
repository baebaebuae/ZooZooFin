// 대출 정보 확인 카드
import { useState } from 'react';
import styled from 'styled-components';

import { ProductDetailInfo, ProductJoinInfo } from '@components/root/productDetailInfo';
import { Card, Divider } from '@components/root/card';
import { StampButton } from '@components/root/buttons';
import { StampModal } from '@components/root/stampModal';

import { getApiClient } from '@stores/apiClient';

const InfoTitle = styled.div`
    font-size: 18px;
    color: ${({ theme }) => theme.colors.gray};
    margin: 8px 0;
`;

const CardBlock = styled(Card)`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 8px 0;
`;

// loanType : 대출 방식
// 1 : 만기 일시 상환
// 2 : 원금 균등 상환
// 3 : 원리금 균등 상환

// loanAmounts : 대출 원금
// loanPeriod : 대출 기간

const joinLoan = async (loanType, loanAmounts, loanPeriod) => {
    const apiClient = getApiClient();

    console.log('joinProducts - loanType:', loanType);
    console.log('joinProducts - loanAmounts:', loanAmounts);
    console.log('joinProducts - loanPeriod:', loanPeriod);

    const productData = {
        loanType: loanType,
        loanAmounts: loanAmounts,
        loanPeriod: loanPeriod,
    };

    try {
        console.log('Request Data:', productData);

        const res = await apiClient.post('/loan', productData, {
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

export const LoanCheckCard = ({
    loanAmount,
    expectedFinalAmount,
    loanPeriod,
    expectedFinalTurn,
    loanRate,
    repayType,
    goToNextCard,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const RepayTypes = { 만기: 1, 원금: 2, 원리금: 3 };

    return (
        <CardBlock>
            <InfoTitle>대출 상세 정보</InfoTitle>
            <ProductDetailInfo
                infoTitle1={'대출 기간'}
                infoContent1={`${loanPeriod}턴`}
                infoTitle2={'대출 금리'}
                infoContent2={`${loanRate}%`}
                $isLoan={true}
                isEarlyTermination={false}
            ></ProductDetailInfo>
            <Divider $isLine={true} />
            <ProductJoinInfo
                $isLoan={true}
                infoTitle={'가입 금액'}
                infoContent={`${loanAmount.toLocaleString()}🥕`}
            />
            <ProductJoinInfo
                $isLoan={true}
                infoTitle={'상환 예상 회차'}
                infoContent={`${expectedFinalTurn}턴`}
            />
            <ProductJoinInfo
                $isLoan={true}
                infoTitle={'상환 방식'}
                infoContent={`${repayType}균등상환`}
            />
            <Divider $isLine={false} />
            <ProductJoinInfo
                $isLoan={true}
                infoTitle={'상환 예상 금액'}
                infoContent={`${expectedFinalAmount.toLocaleString()}🥕`}
            />
            <StampButton onClick={() => setIsModalOpen(true)} />

            {isModalOpen && (
                <StampModal
                    action={() => joinLoan(RepayTypes[repayType], loanAmount, loanPeriod)}
                    goToScript={goToNextCard}
                    handleCloseModal={() => setIsModalOpen(false)}
                />
            )}
        </CardBlock>
    );
};
