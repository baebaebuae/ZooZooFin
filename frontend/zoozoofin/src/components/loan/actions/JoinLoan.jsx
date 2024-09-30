import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Loading } from '@components/root/loading';
import { LoanJoinCard } from '@components/loan/LoanJoinCard';
import { LoanCheckCard } from '@components/loan/LoanCheckCard';
import { CheckCreditCardMini } from '@components/loan/CheckCreditCardMini';

import { MessageBox } from '@components/root/messageBox';
import { NormalIcon } from '@components/root/icon';
import IconChick from '@assets/images/icons/icon_chick.svg?react';

const Block = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

const JoinLoan = ({ goToScript }) => {
    const [currentCard, setCurrentCard] = useState(1);

    // const [products, setProducts] = useState([]);
    const [loanAmount, setLoanAmount] = useState(null);
    const [expectedFinalAmount, setExpectedFinalAmount] = useState(null);

    const [loanPeriod, setLoanPeriod] = useState(0);
    const [expectedFinalTurn, setExpectedFinalTurn] = useState(0);

    const [repayType, setRepayType] = useState(null);

    // 도장 찍은 후 -로딩중- 모달 뜨고 사라지는 함수
    useEffect(() => {
        if (currentCard > 2) {
            const timer = setTimeout(() => {
                goToNextCard();
                goToScript();
            }, 2000);

            return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
        }
    }, [currentCard]);

    const goToNextCard = () => {
        setCurrentCard(currentCard + 1);
    };

    const saveLoanInfo = (
        loanAmount,
        expectedFinalAmount,
        loanPeriod,
        expectedFinalTurn,
        repayType
    ) => {
        goToNextCard();
        setLoanAmount(loanAmount);
        setExpectedFinalAmount(expectedFinalAmount);
        setLoanPeriod(loanPeriod);
        setExpectedFinalTurn(expectedFinalTurn);
        setRepayType(repayType);
    };

    const joinGuideMessages = {
        1: '얼마를 대출할거야?',
        2: '내용을 확인하고 아래에 서명해.',
    };

    return (
        <Block>
            {currentCard < 3 && (
                <MessageBox>
                    <NormalIcon icon={IconChick} />
                    <div>{joinGuideMessages[currentCard]}</div>
                </MessageBox>
            )}

            {(() => {
                if (currentCard === 1) {
                    return (
                        <>
                            {/* loanLimit, loanRate 등 각 변수 임의로 지정 */}
                            <CheckCreditCardMini
                                loanLimit={500000}
                                loanAvailable={300000}
                                characterCredit={5}
                            />
                            <LoanJoinCard
                                currentTurn={10}
                                maxAmount={50000000}
                                saveLoanInfo={saveLoanInfo}
                                loanRate={5}
                            />
                        </>
                    );
                } else if (currentCard === 2) {
                    return (
                        <LoanCheckCard
                            loanAmount={loanAmount}
                            expectedFinalAmount={expectedFinalAmount}
                            loanPeriod={loanPeriod}
                            expectedFinalTurn={expectedFinalTurn}
                            loanRate={5}
                            repayType={repayType}
                            goToNextCard={goToNextCard}
                        />
                    );
                } else if (currentCard === 3) {
                    return <Loading content={'대출 처리중'} />;
                }
            })()}
        </Block>
    );
};

export default JoinLoan;
