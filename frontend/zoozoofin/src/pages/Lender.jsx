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

import Boar from '@/assets/images/characters/characters/Boar.gif';

import ExplainBubble from '@components/lender/ExplainBubble.jsx';
import { CapitalModal } from '@components/lender/CapitalModal';

import { getApiClient } from '@stores/apiClient';
import useUserStore from '../stores/useUserStore.js';

const CapitalBlock = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    padding: 10px 0px;
    gap: 21px;
    margin: 0px auto;
    margin-top: 20px;
    width: 100%;
    /* overflow-x: hidden; */
    overflow-y: auto;
`;

const ImageContainer = styled.div`
    position: fixed;
    bottom: 25%;
    right: -30%;
`;

const NpcImage = styled.img`
    width: 65%;
    height: 65%;
    object-fit: contain;
`;

const BubbleBlock = styled(Bubble)`
    position: fixed;
    bottom: 0;
    right: 0;
`;

const CapitalWrapper = styled.div`
    width: 95%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 21px;
    margin: 0px auto;
`;

// response Button 커스텀
const ConfirmButton = styled.button`
    color: white;
    display: inline-flex;
    flex-direction: row;
    justify-content: center;

    font-family: 'OneMobilePop';
    font-size: 18px;
    align-items: center;
    border-radius: 28px;
    cursor: pointer;

    background-color: ${({ theme, color }) => theme.colors[color]};
    border: 5px solid white;
    position: fixed;
    bottom: 7%;
    padding: 10px 20px;
    width: 62%;

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
        if (!nextScript) {
            console.error('다음 스크립트 ID가 없습니다');
        }
        setCurrentId(nextScript);
    };

    const [isLoading, setIsLoading] = useState(true);
    const { fetchTotalRepay, totalRepay, totalTurn, checkCaptial, capitalExist } =
        useCapitalStore();
    const { animalAssets, turn } = useUserStore();

    // 입장 시 1.5초정도 로딩 페이지
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
            // 캐피탈 가능 여부 확인
            checkCaptial();
            // 현재 캐피탈 확인
            fetchTotalRepay();
        }, 1500);

        return () => clearTimeout(timer);
    });

    // 대출 상품 선택 완료 확인 변수
    const [isProductConfirmed, setIsProductConfirmed] = useState(false);
    // 서류 처리 로딩 변수
    const [isDone, setIsDone] = useState(false);
    // 신청 총 대출 금액
    const { loanAmount, loanPeriod } = useCapitalStore();

    // script 14 설명 모달을 위한 코드
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [indexModal, setIndexModal] = useState(null);

    // 설명 모달을 여는 함수
    const openModal = (index) => {
        if (index < 4) {
            setIsModalOpen(true);
            setIndexModal(index);
        } else if (index === 4) {
            handleResponseClick(15);
        }
    };

    // 설명 모달을 닫는 함수
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // 대출 상환 준비중
    useEffect(() => {
        if (currentScript && currentScript.scriptId === 19) {
            if (animalAssets && totalRepay) {
                if (animalAssets >= totalRepay) {
                    // post 요청 (상환)
                    handleResponseClick(20);
                } else {
                    handleResponseClick(21);
                }
            }
            // 상환 가능 여부를 확인
        }
    }, [currentScript, animalAssets, totalRepay]);

    // 로딩 중일 때 Loader 컴포넌트 렌더링
    if (isLoading || !currentScript) {
        return <Loader loadingText={'캐피탈로 입장하는 중...'} />;
    }
    if (currentScript.scriptId === 2 && capitalExist) {
        currentScript.content = '뭐야 이전 대출부터 갚고 오라고!';
        currentScript.responses = [
            {
                nextScript: 0,
                selection: '헉! 알겠습니다!',
            },
        ];
    }
    if (currentScript.type === 'script') {
        const responses =
            currentScript.scriptId === 6 || currentScript.scriptId === 18
                ? currentScript.responses.map((response) => ({ ...response, selection: null }))
                : currentScript.responses;

        // 설명 모달을 처리하기 위한 조건문 작성

        if (currentScript.scriptId === 14) {
            return (
                <CapitalBlock>
                    {isModalOpen && <CapitalModal index={indexModal} onClose={closeModal} />}
                    <CapitalWrapper>
                        <ImageContainer>
                            <NpcImage src={Boar} />
                        </ImageContainer>
                        <ExplainBubble
                            npc={'멧과장'}
                            type={currentScript.type}
                            content={currentScript.content}
                            responses={responses}
                            onClick={openModal}
                        />
                    </CapitalWrapper>
                </CapitalBlock>
            );
        } else {
            return (
                <>
                    <CapitalBlock>
                        {isModalOpen && <CapitalModal onClose={closeModal} />}
                        <CapitalWrapper>
                            <ImageContainer>
                                <NpcImage src={Boar} />
                            </ImageContainer>
                            <BubbleBlock
                                npc={'멧과장'}
                                type={currentScript.type}
                                content={currentScript.content}
                                responses={responses}
                                onClick={handleResponseClick}
                            />
                        </CapitalWrapper>
                    </CapitalBlock>
                    {currentScript.scriptId === 6 && (
                        <ConfirmButton
                            color={'tertiaryDeep'}
                            onClick={() => {
                                handleResponseClick(7);
                            }}
                        >
                            {(loanAmount * 0.1).toLocaleString()}🥕 준비
                        </ConfirmButton>
                    )}
                    {currentScript.scriptId === 18 &&
                        (turn === totalTurn ? (
                            <ConfirmButton
                                color={'tertiaryDeep'}
                                onClick={() => {
                                    handleResponseClick(19);
                                }}
                            >
                                {totalRepay ? totalRepay.toLocaleString() : 0} 🥕 준비
                            </ConfirmButton>
                        ) : (
                            <ConfirmButton
                                color={'tertiaryDeep'}
                                onClick={() => {
                                    handleResponseClick(0);
                                }}
                            >{`${totalTurn}턴에 갚으러 올게요 ...`}</ConfirmButton>
                        ))}
                </>
            );
        }
    }

    // 캐피탈 서류 작성 API 연결

    const handleProductConfirmation = () => {
        setIsProductConfirmed(true);
    };

    const handleScript = () => {
        const PostCaptialInfo = async (capitalAmounts, capitalPeriod) => {
            const apiClient = getApiClient();
            const capitalData = {
                capitalAmounts: capitalAmounts,
                capitalPeriod: capitalPeriod,
            };

            try {
                console.log(capitalData);
                if (capitalData) {
                    const res = await apiClient.post('/capital', capitalData);
                    if (res.status === 200) {
                        console.log('Capital Done!');
                        setIsDone(true);
                    } else {
                        console.error('Unexpected status code:', res.status);
                    }
                }
            } catch (error) {
                console.error('Capital Post Error: ', error);
                return error;
            }
        };

        if (loanAmount && loanPeriod) {
            PostCaptialInfo(loanAmount, loanPeriod);
        }
        // 3초의 서류 처리 중
        setTimeout(() => {
            handleResponseClick(currentScript.responses[0].nextScript);
        }, 3000);
    };

    if (currentScript.type === 'action') {
        if (currentScript.content === '대출서류작성') {
            return (
                <CapitalBlock>
                    {!isProductConfirmed && (
                        <CapitalWrapper>
                            <JoinCapital onProductConfirm={handleProductConfirmation} />
                        </CapitalWrapper>
                    )}
                    {/* 서명 화면 전환 */}
                    {isProductConfirmed && !isDone && (
                        <CapitalWrapper>
                            <CapitalCheck goToNextScript={handleScript} />
                        </CapitalWrapper>
                    )}
                    {/* 서명 후 서류 처리 로딩 */}
                    {isProductConfirmed && isDone && <Loading content={'서류 처리 중'} />}
                </CapitalBlock>
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
