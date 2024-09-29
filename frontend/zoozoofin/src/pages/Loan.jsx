import { useState, useEffect } from 'react';

import styled from 'styled-components';
import Bubble from '@components/root/bubble';
import { useStore } from '../store.js';

import CheckCredit from '@components/loan/actions/CheckCredit';
import RepayLoan from '@components/loan/actions/RepayLoan';
import JoinLoan from '@components/loan/actions/JoinLoan';

// UI 테스트용
import { LoanInfoCard } from '@components/loan/LoanInfoCard';
import { LoanJoinCard } from '@components/loan/LoanJoinCard';
import { LoanRepayCard } from '@components/loan/LoanRepayCard';
import { CheckCreditCardMini } from '@components/loan/CheckCreditCardMini';
import { LoanCheckCard } from '@components/loan/LoanCheckCard';
import { LoanCalculator } from '@components/loan/LoanCalculator';
import { LoanRepayDetailCard } from '@components/loan/LoanRepayDetailCard';

const LoanBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const LoanContainer = styled.div`
    display: flex;
    justify-content: start;
    width: 360px;
    height: 640px;
`;

const BubbleBlock = styled(Bubble)`
    position: fixed;
    bottom: 0;
    right: 0;
`;

const Loan = () => {
    const { scripts, fetchTutorialScript } = useStore();
    const [currentId, setCurrentId] = useState(1);
    const [currentScript, setCurrentScript] = useState(null);

    // scripts 가져오기(비동기)
    useEffect(() => {
        if (!scripts || scripts.length === 0) {
            const realScript = async () => {
                fetchTutorialScript('loan');
            };
            realScript();
        }
    }, [fetchTutorialScript, scripts]);

    // currentScript 설정
    useEffect(() => {
        if (scripts.length > 0) {
            const script = scripts.find((script) => script.scriptId === currentId);
            setCurrentScript(script);
            console.log(script);
        }
    }, [scripts, currentId]);

    const handleResponseClick = (nextScript) => {
        if (!nextScript) {
            console.error('다음 스크립트 ID가 없습니다');
        }
        setCurrentId(nextScript);
    };

    // 로딩 중일 때 Loader 컴포넌트 렌더링
    if (!currentScript) return <div>대출 코너 입장중...</div>;

    if (currentScript.type === 'script' && currentId === 1) {
        return (
            <>
                {/* handleClick = 개별 대출 카드로 이동하는 함수 */}
                <LoanRepayCard
                    loanNumber={2}
                    payBackTurn={10}
                    loanRate={4}
                    loanPeriod={20}
                    loanRemain={35000000}
                    warning={true}
                    handleClick={() => {}}
                />
                <LoanInfoCard charName={'토랭이'} totalLoan={3000000} restLoan={1000000} />
                <LoanRepayDetailCard
                    loanNumber={2}
                    loanType={2}
                    isRepayAvailable={true}
                    loanRate={4}
                    payBackTurn={8}
                    loanPeriod={20}
                    loanAmount={1000000}
                    loanRemain={300000}
                    warning={false}
                />
                <LoanCalculator repayType={'원리금'} />
                <LoanCheckCard loanAmount={600000} loanPeriod={10} loanRate={5} />
                <CheckCreditCardMini
                    loanLimit={500000}
                    loanAvailable={300000}
                    characterCredit={5}
                />
                <LoanJoinCard currentTurn={10} />
            </>
        );
    }

    if (currentScript.type === 'script') {
        return (
            <LoanBlock>
                <BubbleBlock
                    npc={'너굴맨'}
                    type={currentScript.type}
                    content={currentScript.content}
                    responses={currentScript.responses}
                    onClick={handleResponseClick}
                />
            </LoanBlock>
        );
    }

    if (currentScript.type === 'action') {
        switch (currentScript.content) {
            case '대출 가능 여부 조회':
                return (
                    <CheckCredit
                        goToScript={(credit) =>
                            handleResponseClick(currentScript.responses[credit - 1].nextScript)
                        }
                    />
                );
            case '대출 서류':
                return (
                    <JoinLoan
                        goToScript={() =>
                            handleResponseClick(currentScript.responses[0].nextScript)
                        }
                    />
                );
            case '대출금 상환 서류':
                return (
                    <RepayLoan
                        goToScript={() =>
                            handleResponseClick(currentScript.responses[0].nextScript)
                        }
                    />
                );

            case 'END':
                return <div>스크립트 끝남</div>;
            default:
                return (
                    <LoanBlock>
                        <BubbleBlock
                            npc={'너굴맨'}
                            type={currentScript.type}
                            content={currentScript.content}
                            responses={currentScript.responses}
                            onClick={handleResponseClick}
                        />
                    </LoanBlock>
                );
        }
    }
};

export default Loan;
