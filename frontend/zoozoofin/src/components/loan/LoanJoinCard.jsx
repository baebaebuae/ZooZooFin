// 대출 가입 카드
import { useState } from 'react';
import styled from 'styled-components';
import { ProductDetailInfo } from '@components/root/productDetailInfo';
import { Card, Divider } from '@components/root/card';
import { InputBox } from '@components/inputBox';
import { LoanButton, Button } from '@components/root/buttons';
import { TurnSliderLoan } from '@components/root/slider';
import { LoanCalculator } from './LoanCalculator';

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
    font-size: 16px;
`;

const RepayTypeBox = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
`;

export const RepayTypeBlock = ({ loanType, handleModalOpen }) => {
    return (
        <RepayTypeBox>
            <LoanTypeName>{loanType}</LoanTypeName>
            <Button size={'small'} color={'tertiary'} onClick={handleModalOpen}>
                설명
            </Button>
        </RepayTypeBox>
    );
};

// 만기균등상환 계산식
const getMaturityInterest = (loanAmount, loanRate, loanPeriod) => {
    // 이자 계산
    const interest = (loanAmount * loanRate * loanPeriod) / 100;

    return Math.floor(interest + loanAmount);
};

// 원리금균등상환 계산식
const getPrincipalInterest = (loanAmount, loanRate, loanPeriod) => {
    // 이자율
    const ratePerTurn = loanRate / 100;

    // 매 턴마다 상환해야 할 금액 계산
    const temp = Math.pow(1 + ratePerTurn, loanPeriod);
    const paymentPerTurn = (loanAmount * ratePerTurn * temp) / (temp - 1);

    const totalPayment = paymentPerTurn * loanPeriod;

    return Math.floor(totalPayment); // 상환시 총 금액
    // return Math.floor(paymentPerTurn);
};

// 원금균등상환 계산식
const getPrincipalRepayment = (loanAmount, loanRate, loanPeriod) => {
    // 매 턴마다 상환할 원금
    const principalRepayment = loanAmount / loanPeriod;

    // 전체 이자 계산
    let totalInterest = 0;
    for (let i = 0; i < loanPeriod; i++) {
        const remainingPrincipal = loanAmount - principalRepayment * i;
        totalInterest += (remainingPrincipal * loanRate) / 100;
    }

    // 총 상환 금액 = 원금 + 전체 이자
    const totalPayment = loanAmount + totalInterest;

    return Math.floor(totalPayment);
};

export const LoanJoinCard = ({ currentTurn, maxAmount, saveLoanInfo, loanRate }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleModalOpen = () => {
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden'; // 외부 스크롤 막기
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
        document.body.style.overflow = 'auto'; // 외부 스크롤 허용
    };

    const RepayTypes = ['원금', '원리금', '만기'];
    const [selectedRepayType, setSelectedRepayType] = useState(RepayTypes[0]);

    const RepayTypeButtonBlock = ({ title }) => {
        return (
            <>
                <BlockTitle>{title}</BlockTitle>
                <RepayTypeButtonBox>
                    {RepayTypes.map((loanType, index) => (
                        <LoanButton
                            key={index}
                            size={'normal'}
                            isSelected={loanType === selectedRepayType}
                            onClick={() => setSelectedRepayType(loanType)}
                        >
                            {loanType}
                        </LoanButton>
                    ))}
                </RepayTypeButtonBox>
            </>
        );
    };

    const [loanAmount, setLoanAmount] = useState(0);
    const [expectedFinalAmount, setExpectedFinalAmount] = useState(0);
    const [loanPeriod, setLoanPeriod] = useState(0);
    const [expectedFinalTurn, setExpectedFinalTurn] = useState(0);

    function handleLoanFinalAmount(repayType, newAmount, loanRate, newPeriod) {
        let expectedLoanReturn = 0; // 백엔드 대출 계산식 적용

        console.log('repayType: ', repayType);
        console.log('newAmount: ', newAmount);
        console.log('loanRate: ', loanRate);
        console.log('newPeriod: ', newPeriod);

        switch (repayType) {
            case '만기': {
                expectedLoanReturn = getMaturityInterest(newAmount, loanRate, newPeriod);
                break;
            }
            case '원금': {
                expectedLoanReturn = getPrincipalRepayment(newAmount, loanRate, newPeriod);
                break;
            }
            case '원리금': {
                expectedLoanReturn = getPrincipalInterest(newAmount, loanRate, newPeriod);
                break;
            }
            default: {
                console.error('잘못된 상환 유형입니다.');
            }
        }

        console.log('expectedLoanReturn: ', expectedLoanReturn);

        setExpectedFinalAmount(expectedLoanReturn);
    }

    function handleLoanAmountChange(newAmount) {
        setLoanAmount(newAmount);
        loanAmount > 0
            ? handleLoanFinalAmount(selectedRepayType, loanAmount, loanRate, loanPeriod)
            : setExpectedFinalAmount(0);
    }

    function handleTurnChange(newTurn) {
        setLoanPeriod(newTurn);
        setExpectedFinalTurn(newTurn + currentTurn);
    }

    return (
        <>
            {isModalOpen && (
                <LoanCalculator repayType={selectedRepayType} handleCloseModal={handleCloseModal} />
            )}
            <CardBlock>
                <InfoTitle>대출 서류</InfoTitle>
                <RepayTypeButtonBlock title="상환 방식" />
                <RepayTypeBlock
                    loanType={`${selectedRepayType}균등상환`}
                    handleModalOpen={handleModalOpen}
                />
                <Divider $isLine={true} />
                <InputBox
                    title={'대출할 금액'}
                    amount1={500000}
                    amount2={1000000}
                    amount3={5000000}
                    amount4={10000000}
                    maxAmount={maxAmount}
                    repayType={selectedRepayType}
                    onSavingsAmountChange={handleLoanAmountChange}
                ></InputBox>
                <TurnSliderLoan
                    title={'대출 기간'}
                    min={1}
                    max={50 - currentTurn}
                    onTurnChange={handleTurnChange}
                />
                <ProductDetailInfo
                    infoTitle1={'상환 예상 회차'}
                    infoContent1={`${expectedFinalTurn}턴`}
                    infoTitle2={'상환 예상 금액'}
                    infoContent2={`${expectedFinalAmount.toLocaleString()} 원`}
                    isLoan={true}
                    isEarlyTermination={false}
                ></ProductDetailInfo>
                <Button
                    size={'normal'}
                    color={'primaryDeep'}
                    onClick={() =>
                        saveLoanInfo(
                            loanAmount,
                            expectedFinalAmount,
                            loanPeriod,
                            expectedFinalTurn,
                            selectedRepayType
                        )
                    }
                >
                    다음
                </Button>
            </CardBlock>
        </>
    );
};
