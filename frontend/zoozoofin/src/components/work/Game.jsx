import React, { useState, useEffect } from 'react';
import GameDevice from './GameDevice';
import TimeBar from './TimeBar';
import styled from 'styled-components';

const ScorePanel = styled.div`
    font-family: 'neodgm_code';
    font-size: 20px;
    width: 320px;
    margin: 10px auto;
    text-align: center;
`;
const Container = styled.div`
    border: 3px solid black;
    border-radius: 10px;
    box-shadow: 5px 5px 1px black;
    width: 320px;
    margin: 0 auto;
    background-color: #f8ece2;
`;
const Game = () => {
    const [score, setScore] = useState(0);
    const [time, setTime] = useState(30);
    const [gameOver, setGameOver] = useState(false);

    // 제한시간
    useEffect(() => {
        if (time <= 0) {
            setGameOver(true);
        } else {
            const timer = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [time]);
    return (
        <div>
            <ScorePanel>당근 {score.toLocaleString()}개 모았당~&gt;&lt;</ScorePanel>
            <Container>
                <GameDevice gameOver={gameOver} setScore={setScore} time={time} />
            </Container>
        </div>
    );
};

export default Game;
