import { useEffect, useState } from 'react';

import styled from 'styled-components';

import { ProductDetailInfo, ProductJoinInfo } from '@components/root/productDetailInfo';
import { Card, Divider } from '@components/root/card';
import { InputBox } from '@components/inputBox';
import { LoanButton, Button } from '@components/root/buttons';
import { TurnSliderLoan } from '@components/root/slider';

import { LoanCalculator } from '@components/loan/LoanCalculator';
import useCapitalStore from '@components/lender/store/CapitalStore';

import CapitalCalturator from '@components/lender/CapitalCalcurator';

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

const RepayTypeButtonBox = styled.div`
    display: flex;
    gap: 10px;
`;

const BlockTitle = styled.div`
    font-size: 16px;
    color: ${({ theme }) => theme.colors.gray};
`;

const LoanTypeName = styled.div`
    font-weight: bold;
    font-size: 18px;
`;

const RepayTypeBox = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    margin-top: 20px;
`;

// 만기일시상환 계산식
const getMaturityInterest = (loanAmount, loanRate, loanPeriod) => {
    // 복리 계산
    const interest = loanAmount * Math.pow(1 + loanRate / 100, loanPeriod) - loanAmount;
    return Math.floor(interest + loanAmount);
};

const RepayTypeBlock = ({ loanType, handleModalOpen }) => {
    return (
        <RepayTypeBox>
            <LoanTypeName>{loanType}</LoanTypeName>
            <Button size={'small'} color={'tertiary'} onClick={handleModalOpen}>
                설명
            </Button>
        </RepayTypeBox>
    );
};
export const ProductDetail = ({ currentTurn }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleModalOpen = () => {
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden'; // 외부 스크롤 막기
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
        document.body.style.overflow = 'auto'; // 외부 스크롤 허용
    };
    // useCaptialStore 저장
    const { loanAmount, loanPeriod, expectedFinalAmount, expectedFinalTurn } = useCapitalStore();
    const { setLoanAmount, setLoanPeriod, setExpectedFinalAmount, setExpectedFinalTurn } =
        useCapitalStore();

    // 대출 금액 변경 시 최종 상환 금액 계산
    useEffect(() => {
        if (loanAmount > 0 && loanPeriod > 0) {
            const loanRate = 10; // 이자율
            const expectedLoanReturn = getMaturityInterest(loanAmount, loanRate, loanPeriod);
            setExpectedFinalAmount(expectedLoanReturn);
        } else {
            setExpectedFinalAmount(0);
        }
    }, [loanAmount, loanPeriod, setExpectedFinalAmount]);

    // 대출 기간 변경 시 예상 상환 턴 업데이트
    useEffect(() => {
        if (loanPeriod > 0) {
            setExpectedFinalTurn(loanPeriod + currentTurn);
        }
    }, [loanPeriod, currentTurn, setExpectedFinalTurn]);

    // 캐피탈 최대 대출 금액 1억
    const maxAmount = 100000000;

    return (
        <>
            {isModalOpen && <CapitalCalturator handleCloseModal={handleCloseModal} />}

            <RepayTypeBlock loanType={'만기일시상환'} handleModalOpen={handleModalOpen} />
            <Divider $isLine={true} />
            <InputBox
                title={'대출할 금액'}
                amount1={500000}
                amount2={1000000}
                amount3={5000000}
                amount4={10000000}
                maxAmount={maxAmount}
                onSavingsAmountChange={setLoanAmount}
            />
            <TurnSliderLoan
                title={'대출 기간'}
                min={1}
                max={50 - currentTurn}
                onTurnChange={setLoanPeriod}
            />
            <ProductDetailInfo
                infoTitle1={'상환 예상 회차'}
                infoContent1={`${expectedFinalTurn}턴`}
                infoTitle2={'상환 예상 금액'}
                infoContent2={`${expectedFinalAmount.toLocaleString()} 🥕`}
                $isLoan={true}
                isEarlyTermination={false}
            />
        </>
    );
};
