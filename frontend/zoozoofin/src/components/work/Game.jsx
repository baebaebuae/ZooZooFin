import React, { useState, useEffect } from 'react';
import GameDevice from './GameDevice';
import styled from 'styled-components';
import DeviceImg from '@assets/images/work/device.png'

const Container = styled.div`
    display: flex;
`;
const Device = styled.img`
    width: 350px;
    margin: 0 auto;
`
const Countdown = styled.div`
    position: absolute;
    z-index: 1;
    width: 350px;
    top: 32%;
    font-family: 'neodgm_code';
    text-shadow: 2px 1px 2px black;
    color: #f9bf69;
    font-size: 50px;
    text-align: center;
`
const Game = () => {
    const [time, setTime] = useState(30);
    const [gameOver, setGameOver] = useState(false);
    const [isGameActive, setIsGameActive] = useState(false);
    const [countdown, setCountdown] = useState(3);

    // 카운트다운 및 게임 시작
    useEffect(() => {
        console.log(countdown)
        if (countdown >= 0) {
            const countdownTimer = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);
            return () => clearInterval(countdownTimer);
        } else if (countdown < 0) {
            startGame();
        }
    }, [countdown]);

    // 제한시간
    useEffect(() => {
        if (time <= 0) {
            setGameOver(true);
            setIsGameActive(false);
        } else if (isGameActive) {
            const timer = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [time, isGameActive]);

    // 게임 시작
    const startGame = () => {
        setGameOver(false);
        setTime(30); // 초기 시간 설정
        setIsGameActive(true); // 게임 활성화
    };

    // 컴포넌트가 마운트될 때 카운트다운 시작
    useEffect(() => {
        setCountdown(3);
        setIsGameActive(false);
    }, []);

    return (
        <div>
            <Container>
                {countdown >= 0 && (
                    <Countdown>
                        {countdown}
                    </Countdown>
                )}
                <Device src={DeviceImg}/>
                <GameDevice 
                isGameActive={isGameActive}
                gameOver={gameOver} time={time} />
            </Container>
        </div>
    );
};

export default Game;
