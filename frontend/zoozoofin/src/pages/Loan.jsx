import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import Bubble from '@components/root/bubble';
import { useStore, useAnimalStore } from '../store.js';

import CheckCredit from '@components/loan/actions/CheckCredit';
import RepayLoan from '@components/loan/actions/RepayLoan';
import JoinLoan from '@components/loan/actions/JoinLoan';
import InstructLoan from '@components/loan/actions/InstructLoan';

import { Loader } from '@components/Loader';

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

    const { nowAnimal, getAnimalData } = useAnimalStore();

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

            if (script?.content.includes('${name}')) {
                const updatedScript = {
                    ...script,
                    content: script.content.replace('${name}', `**${nowAnimal.animalName}**`),
                };
                setCurrentScript(updatedScript);
            }
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
    if (isLoading || !currentScript) return <Loader loadingText={'대출 코너로 입장하는 중...'} />;

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
                return (
                    <InstructLoan
                        goToScript={() =>
                            handleResponseClick(currentScript.responses[0].nextScript)
                        }
                    />
                );

            case '은행으로 이동':
                return navigate('/bank');

            case 'END':
                return navigate('/map');

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
