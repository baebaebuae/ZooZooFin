import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import styled from 'styled-components';
import Bubble from '@components/root/bubble';
import { useStore, useAnimalStore } from '../store.js';

import JoinProduct from '@components/bank/actions/JoinProduct';
import TerminateProduct from '@components/bank/actions/TerminateProduct';
import Bankrupt from '@components/bank/actions/Bankrupt';
import { Loader } from '@components/Loader';

import Pig from '@/assets/images/characters/characters/Pig.gif';

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
    /* bottom: 0;
    right: 0; */
    top: 320px;
    left: -10px;
`;

const ImageContainer = styled.div`
    position: fixed;
    /* bottom: 16%;
    right: -69%; */
    top: 220px;
    left: 160px;
`;

const NpcImage = styled.img`
    /* width: 700px; */
    /* width: 360px; */
    /* height: 325px; */
    /* height: 200px; */
    width: 200px;
    object-fit: contain;
`;

const Bank = () => {
    const { setScripts, scripts, fetchTutorialScript } = useStore();

    const [currentId, setCurrentId] = useState(1);
    const [currentScript, setCurrentScript] = useState(null);

    const location = useLocation();

    const { nowAnimal, getAnimalData } = useAnimalStore();

    useEffect(() => {
        const fetchAnimalData = async () => {
            await getAnimalData();
            setScripts([]); // 스크립트 상태 초기화
        };

        fetchAnimalData();
    }, [location.pathname, setScripts, getAnimalData]);

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

            if (script?.content.includes('${name}')) {
                const updatedScript = {
                    ...script,
                    content: script.content.replace('${name}', `**${nowAnimal.animalName}**`),
                };
                setCurrentScript(updatedScript);
            }

            console.log(script);
        }
    }, [scripts, currentId, nowAnimal.animalName]);

    const handleResponseClick = (nextScript) => {
        // if (!nextScript) {
        //     console.error('다음 스크립트 ID가 없습니다');
        // }
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
    if (isLoading || !currentScript) {
        return <Loader loadingText={'은행으로 입장하는 중...'} />;
    }

    // NPC
    if (currentScript.type === 'script') {
        return (
            <BankBlock>
                <ImageContainer>
                    <NpcImage src={Pig} alt="NPC" />
                </ImageContainer>
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
                return (
                    <JoinProduct
                        productType={'deposit'}
                        goToScript={() =>
                            handleResponseClick(currentScript.responses[0].nextScript)
                        }
                    />
                );
            case '적금 상품 조회':
                return (
                    <JoinProduct
                        productType={'savings'}
                        goToScript={() =>
                            handleResponseClick(currentScript.responses[0].nextScript)
                        }
                    />
                );

            case '예금 상품 해지 조회':
                return (
                    <TerminateProduct
                        productType={'deposit'}
                        goToScript={() =>
                            handleResponseClick(currentScript.responses[0].nextScript)
                        }
                    />
                );

            case '적금 상품 해지 조회':
                return (
                    <TerminateProduct
                        productType={'savings'}
                        goToScript={() =>
                            handleResponseClick(currentScript.responses[0].nextScript)
                        }
                    />
                );
            case '파산 처리':
                return (
                    <Bankrupt
                        action={() => {
                            navigate('/ending', {
                                state: {
                                    endingType: 'A002',
                                },
                            });
                        }}
                        // action = 파산 처리하는 함수 = Ending에 'A002'(파산 엔딩) 보내기
                        goToScript={() =>
                            handleResponseClick(currentScript.responses[0].nextScript)
                        }
                    />
                );
            case 'END':
                return navigate('/map');
            default:
                return <div>해당하는 페이지가 없어요. 현재 Action을 확인해주세요.</div>;
        }
    }
};

export default Bank;
