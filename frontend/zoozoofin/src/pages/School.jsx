import React, { useState, useEffect } from 'react';
import Bubble from '@components/root/bubble';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import Sheep from '@/assets/images/characters/characters/Sheep.gif';
import useAnimalInfoStore from '@/stores/useAnimalInfoStore';

const SchoolContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 360px;
    height: 640px;
    position: relative;
    overflow: hidden; 
`;

const ImageContainer = styled.div`
    position: absolute;
    bottom: 38%;
    right: 1%;
    height: 50%;
`;

const SheepImage = styled.img`
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
`;

const BubbleBlock = styled(Bubble)`
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    z-index: 1; 
`;

const LoadingMessage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: 18px;
    color: ${({ theme }) => theme.colors.primary};
`;

const School = () => {
    const { animalName, fetchAnimalInfo, isLoading } = useAnimalInfoStore();
    const [score, setScore] = useState(null);
    const [dialogue, setDialogue] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        fetchAnimalInfo();
    }, [fetchAnimalInfo]);

    useEffect(() => {
        if (animalName) {
            setDialogue({
                content: `${animalName}, 시험을 보러 온거니?`,
                responses: [
                    { selection: '네! 시험보고싶어요!', nextScript: 'START_QUIZ' },
                    { selection: '아니요.. 더 공부하고 올게요', nextScript: 'EXIT' }
                ]
            });
        }
    }, [animalName]);

    useEffect(() => {
        if (location.state && location.state.score) {
            setScore(location.state.score);
            if (parseInt(location.state.score) >= 80) {
                setDialogue({
                    content: `와우! ${location.state.score}점이나 받았구나! 정말 잘했어!`,
                    responses: [{ selection: '감사합니다!', nextScript: 'END' }]
                });
            } else {
                setDialogue({
                    content: `${location.state.score}점이구나. 다음에는 더 잘할 수 있을 거야!`,
                    responses: [{ selection: '넵... 더 열심히 공부할게요.', nextScript: 'END' }]
                });
            }
        }
    }, [location, animalName]);

    const handleResponseClick = (nextScript) => {
        if (nextScript === 'START_QUIZ') {
            navigate('/testpaper');
        } else if (nextScript === 'EXIT') {
            navigate(-1);
        } else if (nextScript === 'END') {
            navigate(-3);
        }
    };

    console.log('현재 대화 내용:', dialogue?.content);
    console.log('현재 응답 옵션:', dialogue?.responses);
    console.log('Animal Name:', animalName);
    console.log('Is Loading:', isLoading);

    if (isLoading || !dialogue) {
        return <LoadingMessage>학교에 입장하는 중...</LoadingMessage>;
    }

    return (
        <SchoolContainer>
            <ImageContainer>
                <SheepImage src={Sheep} alt="Sheep Teacher" />
            </ImageContainer>
            {dialogue && dialogue.content && dialogue.responses && (
                <BubbleBlock
                    npc={'양티처'}
                    type={'dialogue'}
                    content={dialogue.content}
                    responses={dialogue.responses}
                    onClick={handleResponseClick}
                />
            )}
        </SchoolContainer>
    );
};

export default School;