import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import Bubble from '@components/root/bubble';
import { useStore } from '../store.js';

import JoinProduct from '@components/bank/actions/JoinProduct';
import TerminateProduct from '@components/bank/actions/TerminateProduct';
import JoinLoan from '@components/bank/actions/JoinLoan';
import Bankrupt from '@components/bank/actions/Bankrupt';

import { getApiClient } from '@stores/apiClient';

const apiClient = getApiClient();

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

    const navigate = useNavigate();

    // 대출 코너로 이동
    useEffect(() => {
        if (currentScript && currentScript.content === '대출 코너로 입장') {
            fetchTutorialScript('loan');
            navigate('/loan');
        }
    }, [currentScript, navigate, fetchTutorialScript]);

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
        if (!nextScript) {
            console.error('다음 스크립트 ID가 없습니다');
            return;
        }
        setCurrentId(nextScript);
    };

    // 로딩 중일 때 Loader 컴포넌트 렌더링
    if (!currentScript) return <div>은행 입장중...</div>;

    if (currentScript.type === 'script') {
        return (
            <BankBlock>
                <BubbleBlock
                    npc={'꿀찌'}
                    type={currentScript.type}
                    content={currentScript.content}
                    responses={currentScript.responses}
                    onClick={handleResponseClick}
                />
            </BankBlock>
        );
    }

    if (currentScript.type === 'action') {
        switch (currentScript.content) {
            case '예금 상품 조회':
                return <JoinProduct productType={'deposit'} />;
            case '적금 상품 조회':
                return <JoinProduct productType={'savings'} />;

            case '예금 상품 해지 조회':
                return <TerminateProduct productType={'deposit'} />;

            case '적금 상품 해지 조회':
                return <TerminateProduct productType={'savings'} />;
            case '파산 처리':
                return (
                    <Bankrupt
                        action={() => {}}
                        // action = 파산 처리하는 함수
                        // Bankrupt Component 자체에서 처리할 수 있을지 확인
                        goToScript={() =>
                            handleResponseClick(currentScript.responses[0].nextScript)
                        }
                    />
                );
            case 'END':
                return <div>스크립트 끝남</div>;
            default:
                return <div>해당하는 페이지가 없어요. 현재 Action을 확인해주세요.</div>;
        }
    }
};

export default Bank;
