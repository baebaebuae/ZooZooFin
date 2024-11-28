import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Loading } from '@components/root/loading';
import { LoanJoinCard } from '@components/loan/LoanJoinCard';
import { LoanCheckCard } from '@components/loan/LoanCheckCard';
import { CheckCreditCardMini } from '@components/loan/CheckCreditCardMini';

import { MessageBox } from '@components/root/messageBox';
import { NormalIcon } from '@components/root/icon';
import IconChick from '@assets/images/icons/icon_chick.png';

import { useCreditStore } from '@stores/useCreditStore';
import useUserStore from '@/stores/useUserStore';

const Block = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    height: 540px;
    margin: 120px;
`;

const FixedMessageBox = styled.div`
    flex-shrink: 0;
`;

const ProductBlock = styled.div`
    flex-grow: 1;
    width: 100%;
    overflow-y: auto;
    /* max-height: 100%; */
    height: 500px;
    padding: 10px;
    box-sizing: border-box;
`;

const JoinLoan = ({ goToScript }) => {
    const [currentCard, setCurrentCard] = useState(1);

    // const [products, setProducts] = useState([]);
    const [loanAmount, setLoanAmount] = useState(null);
    const [expectedFinalAmount, setExpectedFinalAmount] = useState(null);

    const [loanPeriod, setLoanPeriod] = useState(0);
    const [expectedFinalTurn, setExpectedFinalTurn] = useState(0);

    const [repayType, setRepayType] = useState(null);

    const { credit, fetchCredit } = useCreditStore();
    const { turn } = useUserStore();

    useEffect(() => {
        if (!credit) {
            fetchCredit();
        }
    }, [credit, fetchCredit]);

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
                <FixedMessageBox>
                    <MessageBox>
                        <NormalIcon icon={IconChick} />
                        <div>{joinGuideMessages[currentCard]}</div>
                    </MessageBox>
                </FixedMessageBox>
            )}

            {(() => {
                if (currentCard === 1) {
                    return credit ? (
                        <ProductBlock>
                            <CheckCreditCardMini
                                loanLimit={credit.loanLimit.toLocaleString()}
                                loanAvailable={credit.loanAvailable.toLocaleString()}
                                characterCredit={credit.characterCredit}
                            />
                            <LoanJoinCard
                                currentTurn={turn}
                                maxAmount={credit.loanAvailable}
                                saveLoanInfo={saveLoanInfo}
                                loanRate={credit.loanRate}
                            />
                        </ProductBlock>
                    ) : (
                        <div>조회된 신용 정보가 없어요.</div>
                    );
                } else if (currentCard === 2) {
                    return (
                        <LoanCheckCard
                            loanAmount={loanAmount}
                            expectedFinalAmount={expectedFinalAmount}
                            loanPeriod={loanPeriod}
                            expectedFinalTurn={expectedFinalTurn}
                            loanRate={credit.loanRate}
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
