import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import GameOverModal from './GameOverModal';
import TimeBar from './TimeBar';

import BtnSvg from '@assets/images/work/button.svg?react';
import BlackCarrot from '@assets/images/work/bad_carrot.svg?react';
import GoldCarrot from '@assets/images/work/gold_carrot.svg?react';
import Carrot from '@assets/images/work/good_carrot.svg?react';
import BasketIcon from '@assets/images/work/bag-dynamic-color.svg?react';

const GameContainer = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 270px;
    height: 385px;
    margin: 0 auto;
    transform: translate(44px, 40px);
`;
const Basket = styled.div`
    position: absolute;
    bottom: -8px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    margin: 0;
`;
const Object = styled.div`
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
`;
const ButtonContainer = styled.div`
    position: absolute;
    top: 380px;
    margin: auto;
    display: flex;
    justify-content: center;
    gap: 30px;
    transform: translate(27%);
`;
const Btn = styled(BtnSvg)`
    width: 100px;
    cursor: pointer;
    &:active {
        transform: scale(0.95);
    }
`;
const BasketSvg = styled(BasketIcon)`
    width: 50px;
    height: 50px;
    padding: 0;
    margin: 0;
`;
const Info = styled.div`
    color: white;
    font-family: 'neodgm_code';
    text-align: end;
    margin: 0 8px;
    z-index: 1;
    display: flex;
    justify-content: end;
    align-items: center;
    > svg {
        /* border: 1px solid black; */
        height: 20px;
        width: 20px;
        margin-bottom: 2px;
    }
`;

const GameDevice = ({ isGameActive, gameOver, time }) => {
    const [basketX, setBasketX] = useState(110);
    const [score, setScore] = useState(0);
    const [intervalId, setIntervalId] = useState(null);

    const [objects, setObjects] = useState([]);

    // 당근 점수 랜덤으로 구현 -> 랜덤 비율 존재해야함
    // 꽝:당근:황금당근 = 1:17:1
    const createObject = () => {
        const objectX = Math.random() * 240;
        const objectScore = Math.floor(Math.random() * 20);
        const carrot =
            objectScore === 0 || objectScore === 1 ? 'black' : objectScore === 20 ? 'gold' : 'red';

        return { id: Date.now(), x: objectX, y: 0, carrot };
    };

    // 물체 떨어지기
    useEffect(() => {
        const interval = setInterval(() => {
            if (!gameOver && isGameActive) {
                // 각 물체의 위치 업데이트
                setObjects((prevObjects) => prevObjects.map((obj) => ({ ...obj, y: obj.y + 5 })));

                // 충돌 체크
                setObjects((prevObjects) =>
                    prevObjects.filter((obj) => {
                        if (obj.y > 320 && obj.x > basketX - 25 && obj.x < basketX + 25) {
                            updateScore(obj.carrot);
                            return false; // 충돌한 물체는 제거
                        }
                        return obj.y <= 350; // 화면을 벗어난 물체는 제거
                    })
                );
            }
        }, 25);
        return () => clearInterval(interval);
    }, [isGameActive, basketX, gameOver, objects]);

    // 새로운 물체를 일정 간격으로 생성
    useEffect(() => {
        const spawnInterval = setInterval(() => {
            if (!gameOver && isGameActive) {
                setObjects((prevObjects) => [...prevObjects, createObject()]);
            }
        }, 800); // 0.8초마다 새로운 물체 생성
        return () => clearInterval(spawnInterval);
    }, [isGameActive, gameOver]);

    // 점수 업데이트
    const updateScore = (carrot) => {
        if (carrot === 'black') {
            setScore((prevScore) => Math.max(prevScore - 1000000, 0));
        } else if (carrot === 'gold') {
            setScore((prevScore) => prevScore + 1000000);
        } else {
            setScore((prevScore) => prevScore + 100000);
        }
    };

    // 바구니 이동
    const moveBasket = (dir) => {
        if (!gameOver && isGameActive && dir === 'left') {
            const leftInterval = setInterval(() => {
                setBasketX((prevX) => Math.max(prevX - 10, 0));
            }, 100);
            setIntervalId(leftInterval);
        }
        if (!gameOver && isGameActive && dir === 'right') {
            const rightInterval = setInterval(() => {
                setBasketX((prevX) => Math.min(prevX + 10, 220));
            }, 100);
            setIntervalId(rightInterval);
        }
    };

    const stopMove = () => {
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        }
    };

    const renderCarrot = (carrot) => {
        if (carrot === 'black') {
            return <BlackCarrot />;
        }
        if (carrot === 'gold') {
            return <GoldCarrot />;
        }
        return <Carrot />;
    };
    return (
        <>
            <GameContainer>
                {gameOver && <GameOverModal score={score} />}
                <TimeBar time={time} />

                <Info>
                    <Carrot />
                    {score.toLocaleString()}
                </Info>

                <Basket style={{ left: `${basketX}px` }}>
                    <BasketSvg />
                </Basket>

                {objects.map((obj) => (
                    <Object key={obj.id} style={{ top: `${obj.y}px`, left: `${obj.x}px` }}>
                        {renderCarrot(obj.carrot)}
                    </Object>
                ))}
            </GameContainer>
            <ButtonContainer>
                <Btn
                    onMouseDown={() => moveBasket('left')}
                    onTouchStart={() => moveBasket('left')}
                    onMouseUp={stopMove}
                    onTouchEnd={stopMove}
                    onMouseLeave={stopMove}
                ></Btn>
                <Btn
                    onMouseDown={() => moveBasket('right')}
                    onTouchStart={() => moveBasket('right')}
                    onMouseUp={stopMove}
                    onTouchEnd={stopMove}
                    onMouseLeave={stopMove}
                ></Btn>
            </ButtonContainer>
        </>
    );
};

export default GameDevice;
