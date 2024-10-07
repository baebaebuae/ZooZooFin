import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import { useStore } from '../store.js';

import { Button } from '@components/root/buttons.jsx';
import { Loading } from '@components/root/loading';
import Bubble from '@components/root/bubble';
import { Loader } from '@components/Loader';

import { NormalIcon } from '@components/root/icon';
import IconCarrot from '@assets/images/icons/icon_carrot.png';

import JoinCapital from '@components/lender/actions/JoinCapital.jsx';
import CapitalCheck from '@components/lender/actions/CheckCapital.jsx';
import useCapitalStore from '@components/lender/store/CapitalStore.js';

const CapitalBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 0px;
    gap: 21px;
    margin: 0px auto;
    width: 95%;
`;

const BubbleBlock = styled(Bubble)`
    position: fixed;
    bottom: 0;
    right: 0;
`;

// response Button 커스텀
const ConfirmButton = styled.button`
    color: white;
    display: inline-flex;
    flex-direction: row;
    justify-content: center;

    font-family: 'OneMobilePop';
    font-size: 20px;
    align-items: center;
    border-radius: 28px;
    cursor: pointer;

    background-color: ${({ theme, color }) => theme.colors[color]};
    border: 5px solid white;
    position: fixed;
    bottom: 7%;
    padding: 10px 20px;
    width: 62%;
    gap: 5px;

    // 가운데 배치
    left: 50%;
    transform: translateX(-50%);
`;

const Lender = () => {
    const { setScripts, scripts, fetchTutorialScript } = useStore();
    const [currentId, setCurrentId] = useState(1);
    const [currentScript, setCurrentScript] = useState(null);

    useEffect(() => {
        setScripts([]); // 스크립트 상태 초기화
    }, [setScripts]);

    const navigate = useNavigate();

    // 대출 scripts 비동기 처리
    useEffect(() => {
        if (!scripts || scripts.length === 0) {
            const realScript = async () => {
                fetchTutorialScript('capital');
            };
            realScript();
        }
    }, [fetchTutorialScript, scripts]);

    // currentScript 설정
    useEffect(() => {
        if (scripts.length > 0) {
            const script = scripts.find((script) => script.scriptId === currentId);
            setCurrentScript(script);
        }
    }, [scripts, currentId]);

    const handleResponseClick = (nextScript) => {
        if (currentScript.scriptId === 14 && !nextScript) {
            console.log('설명 컴포넌트로 전환 예정.');
        } else {
            if (!nextScript) {
                console.error('다음 스크립트 ID가 없습니다');
            }
            setCurrentId(nextScript);
        }
    };

    const [isLoading, setIsLoading] = useState(true);

    // 입장 시 1.5초정도 로딩 페이지
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    // 대출 상품 선택 완료 확인 변수
    const [isProductConfirmed, setIsProductConfirmed] = useState(false);
    // 서류 처리 로딩 변수
    const [isDone, setIsDone] = useState(false);
    // 총 대출 금액
    const { loanAmount } = useCapitalStore();

    // 로딩 중일 때 Loader 컴포넌트 렌더링
    if (isLoading || !currentScript) {
        return <Loader loadingText={'캐피탈로 입장하는 중...'} />;
    }

    if (currentScript.type === 'script') {
        const responses =
            currentScript.scriptId === 6
                ? currentScript.responses.map((response) => ({ ...response, selection: null }))
                : currentScript.responses;

        return (
            <>
                <CapitalBlock>
                    <BubbleBlock
                        npc={'멧과장'}
                        type={currentScript.type}
                        content={currentScript.content}
                        responses={responses}
                        onClick={handleResponseClick}
                    />
                </CapitalBlock>
                {currentScript.scriptId === 6 && (
                    <ConfirmButton
                        color={'tertiaryDeep'}
                        onClick={() => {
                            handleResponseClick(7);
                        }}
                    >
                        {loanAmount.toLocaleString()}
                        <NormalIcon icon={IconCarrot} />
                        준비
                    </ConfirmButton>
                )}
            </>
        );
    }

    const handleProductConfirmation = () => {
        setIsProductConfirmed(true);
    };

    const handleScript = () => {
        setIsDone(true);
        // 3초의 서류 처리 중
        setTimeout(() => {
            handleResponseClick(currentScript.responses[0].nextScript);
        }, 3000);
    };

    if (currentScript.type === 'action') {
        if (currentScript.content === '대출서류작성') {
            return (
                <>
                    {!isProductConfirmed && (
                        <CapitalBlock>
                            <JoinCapital onProductConfirm={handleProductConfirmation} />
                        </CapitalBlock>
                    )}
                    {/* 서명 화면 전환 */}
                    {isProductConfirmed && !isDone && (
                        <CapitalBlock>
                            <CapitalCheck goToNextScript={handleScript} />
                        </CapitalBlock>
                    )}
                    {/* 서명 후 서류 처리 로딩 */}
                    {isProductConfirmed && isDone && <Loading content={'서류 처리 중'} />}
                </>
            );
        }
        if (currentScript.content === '대출 처리 중') {
            // 3초의 대출 처리 중
            setTimeout(() => {
                handleResponseClick(currentScript.responses[0].nextScript);
            }, 3000);
            return <Loading content={'대출 처리중'} />;
        }

        if (currentScript.content === 'END') {
            return navigate('/map');
        }
    }
};

export default Lender;
