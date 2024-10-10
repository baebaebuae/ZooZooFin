import React, {useState, useEffect} from 'react';
import GameButton from '@components/work/GameButton.jsx';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import GameDescription from '@components/work/GameDescription';
import { getApiClient } from '@/stores/apiClient';

const ButtonContainer = styled.div`
    display: flex;
    width: 100%;
    height: 640px;
    border: 1px solid black;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 7px;
`;
const Work = () => {
    const [openModal, setOpenModal] = useState(false)
    const [isWorkToday, setIsWorkToday] = useState()
    const [status, setStatus] = useState()
    const navigate = useNavigate();

    const handleGameStart = () => {
        // 게임을 완료한 경우
        if (isWorkToday){
            setStatus("warning")
            setOpenModal(true)
        } else {
            navigate('./inGame')
        }
    };
    const handleGameDescription = () => {
        setOpenModal(true)
    }
    const handleGameExit = () => {
    navigate('/map')
    }

    useEffect(() => {
        console.log('useEffect 실행', isWorkToday)
        const fetchGameState = async() => {
            const apiClient = getApiClient();
            try {
                const res = await apiClient.get('/animal/info')
                if (res && res.status === 200) {
                    setIsWorkToday(res.data.body.isWorkToday);
                }
            } catch (error) {
                console.log(error);
            }
        }
        if (!isWorkToday || isWorkToday.length == 0){
            fetchGameState();
        }
    }, [isWorkToday])

    return (
        <>
        {openModal && <GameDescription 
            setOpenModal={setOpenModal}
            status={status}
        />}
            <ButtonContainer>
                <GameButton
                    emoji="🥕"
                    text="당근 받기"
                    onClick={handleGameStart}
                    $startColor="#FF6B00"
                    $endColor="#FFDCC2"
                ></GameButton>
                <GameButton
                    emoji="💡"
                    text="설명 보기"
                    onClick={handleGameDescription}
                    $startColor="#08C600"
                    $endColor="#D1D9D1"
                ></GameButton>
                <GameButton text="게임 나가기" onClick={handleGameExit}></GameButton>
            </ButtonContainer>
        </>
    );
};

export default Work;
