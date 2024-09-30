import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import Bubble from '@components/root/bubble';
import { useStore } from '../store.js';

import CheckCredit from '@components/loan/actions/CheckCredit';
import RepayLoan from '@components/loan/actions/RepayLoan';
import JoinLoan from '@components/loan/actions/JoinLoan';
import InstructLoan from '@components/loan/actions/InstructLoan';

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

    const navigate = useNavigate();

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

    const [isLoading, setIsLoading] = useState(true);

    // 입장 시 1.5초정도 로딩 페이지
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    // 로딩 중일 때 Loader 컴포넌트 렌더링
    if (isLoading || !currentScript) return <div>대출 코너 입장중...</div>;

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
            case '대출 안내':
                return <InstructLoan />;

            case '은행으로 이동':
                return navigate('/bank');

            case 'END':
                return navigate('/myroom');

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
