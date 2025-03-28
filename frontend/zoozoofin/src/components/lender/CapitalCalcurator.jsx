// 대출 이사 계산기
// 모달로 띄우는 게 좋을듯

import { useState } from 'react';

import styled from 'styled-components';
import { Card } from '@components/root/card';
import { Button } from '@components/root/buttons';

// component로 빼면 import 수정
import { RepayTypeBlock } from '@components/loan/LoanJoinCard';

import { TurnSliderInterest } from '@components/root/slider';
import { InputBoxLoan } from '@components/inputBox';

import CapitalRepayTable from '@components/lender/CapitalRepayTable';

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
    z-index: 1000;
`;

const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
`;

// 모달 닫기 버튼 생성
const ButtonRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: 100%;
    padding-left: 30px;
`;

const ClosedButton = styled(Button)`
    display: flex;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.primaryShadow};
    font-size: 18px;
    padding: 2px 6px;
    border-radius: 100%;
`;

const CapitalCalturator = ({ repayType, handleCloseModal }) => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [isResultOpen, setIsResultOpen] = useState(false);

    const [loanAmount, setLoanAmount] = useState(0);
    const [loanPeriod, setLoanPeriod] = useState(0);
    const [loanRate, setLoanRate] = useState(0);

    const closeModal = () => {
        setIsModalOpen(false);
        handleCloseModal();
    };

    const handleLoanAmountChange = (newAmount) => {
        setLoanAmount(newAmount);
    };
    const handleLoanPeriodChange = (newPeriod) => {
        setLoanPeriod(newPeriod);
    };
    const handleLoanRateChange = (newRate) => {
        setLoanRate(newRate);
    };

    const handleClick = () => {
        setIsResultOpen(!isResultOpen); // 이전 상태를 기반으로 업데이트
        console.log(isResultOpen);
    };

    return (
        <>
            {isModalOpen && (
                <ModalBackground onClick={closeModal}>
                    <CardBlock onClick={(e) => e.stopPropagation()}>
                        <ButtonRow>
                            <ClosedButton onClick={closeModal}>X</ClosedButton>
                        </ButtonRow>
                        <InfoTitle>대출 이자 계산기</InfoTitle>
                        <RepayTypeBlock loanType={'만기일시상환'} />
                        <InputBoxLoan
                            title={'대출원금'}
                            amount1={500000}
                            amount2={1000000}
                            amount3={5000000}
                            amount4={10000000}
                            // 상태 업데이트가 잘못된 시점에 일어나지 않도록 적절한 이벤트에서만 호출
                            onLoanAmountChange={(newAmount) => {
                                handleLoanAmountChange(newAmount);
                            }}
                            isSavings={false}
                        ></InputBoxLoan>{' '}
                        <TurnSliderInterest
                            unit={'턴'}
                            title={'대출기간'}
                            min={1}
                            max={50}
                            onValueChange={handleLoanPeriodChange}
                        />
                        <TurnSliderInterest
                            unit={'%'}
                            title={'대출금리'}
                            min={1}
                            max={10}
                            onValueChange={handleLoanRateChange}
                        />
                        <Button size={'normal'} color={'primary'} onClick={handleClick}>
                            계산하기
                        </Button>
                        {isResultOpen && <h1>표 구현중...</h1>}
                    </CardBlock>
                </ModalBackground>
            )}
        </>
    );
};

export default CapitalCalturator;
