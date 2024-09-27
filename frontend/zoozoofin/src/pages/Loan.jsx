import { useState, useEffect } from 'react';

import styled from 'styled-components';
import Bubble from '@components/root/bubble';
import { useStore } from '../store.js';

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
        setCurrentId(nextScript);
    };

    // 로딩 중일 때 Loader 컴포넌트 렌더링
    if (!currentScript) return <div>대출 코너 입장중...</div>;

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
                // return <CheckLoan productType={'loan'} />;
                return <div>joinLoan으로 이동</div>;

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
