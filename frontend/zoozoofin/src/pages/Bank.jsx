import { useState, useEffect } from 'react';

import styled from 'styled-components';
import ActionContainer from '@components/bank/ActionContainer.jsx';
import Bubble from '@components/root/bubble';
import { useStore } from '../store.js';

const BankBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const BankContainer = styled.div`
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

const Bank = () => {
    const { scripts, fetchTutorialScript } = useStore();
    const [currentId, setCurrentId] = useState(1);
    const [currentScript, setCurrentScript] = useState(null);

    // scripts 가져오기(비동기)
    useEffect(() => {
        if (!scripts || scripts.length === 0) {
            const realScript = async () => {
                fetchTutorialScript('bank');
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
    if (!currentScript) return <div>주주시티에 입장하는 중...</div>;

    if (currentScript.type === 'action' && currentScript.content === 'INPUT_NAME')
        return (
            <div>
                이름 입력 모달
                <button onClick={() => handleResponseClick(currentScript.responses[0].nextScript)}>
                    next
                </button>
            </div>
        );

    return (
        <BankBlock>
            {/* type==='script'일 때 */}
            {/* <BubbleBlock /> 렌더링 */}
            {/* script id 더하는 함수 작동 예정 */}

            {/* type==='action'일 때 */}
            {/* 해당 action명 받아서 ActionContainer의 content 전환 */}
            {/* 단일 id */}

            {currentScript.type === 'script' ? (
                <BubbleBlock
                    npc={'꿀찌'}
                    type={currentScript.type}
                    content={currentScript.content}
                    responses={currentScript.responses}
                    onClick={handleResponseClick}
                />
            ) : (
                <ActionContainer currentAction={'terminateSavings'} />
            )}
        </BankBlock>
    );
};

export default Bank;
