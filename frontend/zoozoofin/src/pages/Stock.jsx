import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useStore, useAnimalStore } from '../store';

import Bubble from '@components/root/bubble';
import { Loader } from '@components/Loader';

import styled from 'styled-components';

import StockChannel from '@components/stock/stockList/StockChannel';
import StockBuy from '@components/stock/stockList/StockBuy';
import StockSell from '@components/stock/stockList/StockSell';
import StockResult from '@components/stock/stockList/StockResult';

import Frog from '@/assets/images/characters/characters/Frog.gif';

const SampleBlock = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    padding: 10px 0px;
    gap: 21px;
    margin: 0px auto;
    width: 95%;
`;

const ImageContainer = styled.div`
    position: fixed;
    max-width: 360px;
    bottom: 28%;
    right: -5%;
`;

const NpcImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
`;

const BubbleBlock = styled(Bubble)`
    position: fixed;
    bottom: 0;
    right: 0;
`;

const BubbleLine = styled.span`
    text-align: left;
    margin-bottom: 8px;
    line-height: 1.8;
    font-size: 14px;
    color: black;
`;

const BubbleLineHighlight = styled.span`
    font-size: 14px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.tertiary};
`;

const Stock = () => {
    const { setScripts, scripts, fetchTutorialScript } = useStore();
    const [currentId, setCurrentId] = useState(1);
    const [currentScript, setCurrentScript] = useState(null);
    const [channel, setChannel] = useState(null);
    const [isDone, setIsDone] = useState(false);

    const { nowAnimal, getAnimalData } = useAnimalStore();

    const navigate = useNavigate();

    useEffect(() => {
        setScripts([]);
        getAnimalData();
    }, [setScripts, getAnimalData]);

    // 주식 스크립트 가져오기
    useEffect(() => {
        if (!scripts || scripts.length === 0) {
            const realScript = async () => {
                fetchTutorialScript('stock');
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

    // 입장 시 1.5초정도 로딩 페이지
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    // 로딩 중일 때 Loader 컴포넌트 렌더링
    if (isLoading || !currentScript) {
        return <Loader loadingText={'주식거래소에 입장하는 중...'} />;
    }

    // 채널 선택 후 스크립트 이동(1)
    const handleChannelSelection = (channelName) => {
        setChannel(channelName); // 선택한 채널을 상태에 저장
        // 채널 이동ff
        handleResponseClick(currentScript.responses[0].nextScript);
    };
    const parseContent = (content) => {
        const parts = content.split(/(\*\*.*?\*\*)/);
        return (
            <>
                {parts.map((part, index) => {
                    if (part.startsWith('**') && part.endsWith('**')) {
                        return (
                            <BubbleLineHighlight key={index}>
                                {part.slice(2, -2)}
                            </BubbleLineHighlight>
                        );
                    } else {
                        return <BubbleLine key={index}>{part}</BubbleLine>;
                    }
                })}
            </>
        );
    };

    // 구매/판매 완료 후 => 결과 확인 컴포넌트 이동
    const handleOrderCompletion = (done) => {
        setIsDone(done);
    };

    const handleCompletion = () => {
        handleResponseClick(currentScript.responses[0].nextScript);
    };

    if (currentScript.type === 'script') {
        // 채널 선택 후 채널 이름 업데이트(2)
        if (currentScript.content.includes('${name}')) {
            currentScript.content = currentScript.content.replace(
                '${name}',
                `**${nowAnimal.animalName}**야!`
            );
        }

        if (currentScript.content.includes('${channel}')) {
            currentScript.content = currentScript.content.replace(
                '${channel}',
                `**${channel} 채널**`
            );
            // 답변 bold처리
            currentScript.responses = currentScript.responses.map((response) => {
                return {
                    ...response,
                    selection: <div>{parseContent(response.selection)}</div>,
                };
            });
        }

        return (
            <SampleBlock>
                <ImageContainer>
                    <NpcImage src={Frog} />
                </ImageContainer>
                <BubbleBlock
                    npc={'개굴'}
                    type={currentScript.type}
                    content={currentScript.content}
                    responses={currentScript.responses} // 볼드 처리된 responses
                    onClick={handleResponseClick}
                />
            </SampleBlock>
        );
    }

    if (currentScript.type === 'action') {
        console.log(currentScript.content);
        switch (currentScript.content) {
            case '주식거래소':
                return (
                    <SampleBlock>
                        <StockChannel onChannelSelect={handleChannelSelection} />
                    </SampleBlock>
                );
            case '주식구매':
                return (
                    <SampleBlock>
                        {!isDone ? (
                            <StockBuy channel={channel} onOrderCompletion={handleOrderCompletion} />
                        ) : (
                            <StockResult onComplete={handleCompletion} type="buy" />
                        )}
                    </SampleBlock>
                );
            case '주식판매':
                return (
                    <SampleBlock>
                        {!isDone ? (
                            <StockSell
                                channel={channel}
                                onOrderCompletion={handleOrderCompletion}
                            />
                        ) : (
                            <StockResult onComplete={handleCompletion} type="sell" />
                        )}
                    </SampleBlock>
                );
            case 'END':
                return navigate('/map');
        }
    }
};

export default Stock;
