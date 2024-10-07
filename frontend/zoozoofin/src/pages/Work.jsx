import React, {useState} from 'react';
import GameButton from '@components/work/GameButton.jsx';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import GameDescription from '@components/work/GameDescription';

const ButtonContainer = styled.div`
    display: flex;
    height: 550px;
    width: 100%;
    /* border: 1px solid black; */
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 7px;
`;
const Work = () => {
    const [openModal, setOpenModal] = useState(false)
    const navigate = useNavigate();
    const handleGameStart = () => {
        console.log('test')
        navigate('./inGame')
    };
    const handleGameDescription = () => {
        console.log('modal')
        setOpenModal(true)
    }
    const handleGameExit = () => {
    navigate('/map')
    }
    return (
        <>
        {openModal && <GameDescription setOpenModal={setOpenModal}/>}
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
