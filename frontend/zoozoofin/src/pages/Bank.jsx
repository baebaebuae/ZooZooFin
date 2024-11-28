import React, { useState, useEffect } from 'react';
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
    width: 360px;
    height: 640px;
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
    top: 220px;
    left: 140px;
    position: absolute;
`;

const ImageContainer = styled.div`
    top: 200px;
    left: 180px;
    position: absolute;
`;

const NpcImage = styled.img`
    width: 200px;
    object-fit: contain;
`;

const Bank = () => {
    const { setScripts, scripts, fetchTutorialScript } = useStore();
    const [currentId, setCurrentId] = useState(1);
    const [currentScript, setCurrentScript] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const location = useLocation();
    const navigate = useNavigate();

    const { nowAnimal, getAnimalData } = useAnimalStore();

    useEffect(() => {
        const fetchAnimalData = async () => {
            await getAnimalData();
            setScripts([]);
        };

        fetchAnimalData();
    }, [location.pathname, setScripts, getAnimalData]);

    useEffect(() => {
        if (currentScript && currentScript.content === '대출 코너로 입장') {
            fetchTutorialScript('loan');
            navigate('/loan');
        }
    }, [currentScript, navigate, fetchTutorialScript]);

    useEffect(() => {
        if (!scripts || scripts.length === 0) {
            const realScript = async () => {
                fetchTutorialScript('bank');
            };
            realScript();
        }
    }, [fetchTutorialScript, scripts]);

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
        setCurrentId(nextScript);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading || !currentScript) {
        return <Loader loadingText={'은행으로 입장하는 중...'} />;
    }

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
                        goToScript={() =>
                            handleResponseClick(currentScript.responses[0].nextScript)
                        }
                    />
                );
            case 'END':
                return navigate('/map');
            default:
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
    }
};

export default Bank;