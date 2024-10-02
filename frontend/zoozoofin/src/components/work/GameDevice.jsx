import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import GameOverModal from './GameOverModal'
import TimeBar from './TimeBar'
import leftBtn from '@assets/images/work/Arrow_drop_left.png'
import rightBtn from '@assets/images/work/Arrow_drop_right.png'
import OrangeLeftBtn from '@assets/images/work/orangeLeftBtn.svg?react'
import OrangeRightBtn from '@assets/images/work/orangeRightBtn.svg?react'

const GameContainer = styled.div`
  position: relative;
  width: 300px;
  height: 400px;
  background-color: #f0f0f0;
  margin: 0 auto;
  border: 2px solid black;
`
const Basket = styled.div`
  position: absolute;
  bottom: 0;
  width: 100px;
  height: 20px;
  background-color: blue;
`
const Object = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: ${(props) => props.$carrot ? props.$carrot : 'blue'};
  border-radius: 50%;
`
const ButtonContainer = styled.div`
  margin: 10px auto;
  display: flex;
  justify-content: center;
  gap: 10px;
`
const LeftBtn = styled(OrangeLeftBtn)`
  width: 30px;
  height: 30px;
`
const RightBtn = styled(OrangeRightBtn)`
  width: 30px;
  height: 30px;
`

const GameDevice = ({gameOver, setScore, time}) => {
  const [basketX, setBasketX] = useState(100)
  const [objectScore, setObjectScore] = useState(Math.floor(Math.random() * 10))
  const [objectX, setObjectX] = useState(Math.random() * 300)
  const [objectY, setObjectY] = useState(0)
  const [carrot, setCarrot] = useState("red")

  // mouse event
  const [intervalId, setIntervalId] = useState(null);

  // 당근 점수 랜덤으로 구현 -> 랜덤 비율 존재해야함
  // 꽝:당근:황금당근 = 1:8:1

   // 물체 떨어지기
   useEffect(() => {
    const interval = setInterval(async() => {
        if (!gameOver){
          setObjectY((prevY) => prevY + 5);
        if (objectY > 380) {
          resetObjectPosition();
        }
    }
      // 충돌 판정 (물체가 바구니 안에 들어왔는지 확인)
      if (objectY > 350 && objectX > basketX && objectX < basketX + 100) {
        updateScore();
        resetObjectPosition();
      }
    }, 25);
    return () => clearInterval(interval);
  }, [objectY, objectX, basketX, gameOver]);

  // 당근 위치 리셋
  const resetObjectPosition = () => {
    setObjectY(0);
    setObjectX(Math.random() * 300);
    
    const newScore = Math.floor(Math.random() * 10);
    setObjectScore(newScore);

    const newCarrot = newScore === 0 ? 'black' : newScore === 9 ? 'gold' : 'red';

    setCarrot(newCarrot);
  };

  // 점수 업데이트
  const updateScore = () => {
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
    if (!gameOver && dir === 'left') {
      const leftInterval = setInterval(() => {
        setBasketX((prevX) => Math.max(prevX - 10, 0));
      }, 100);
      setIntervalId(leftInterval);
    }
    if (!gameOver && dir === "right") {
      const rightInterval = setInterval(() => {
        setBasketX((prevX) => Math.min(prevX + 10, 200));
      }, 100);
      setIntervalId(rightInterval);
    }
}

  const stopMove = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  return (
    <>
    <TimeBar time={time}/>
    <GameContainer>
      {gameOver && <GameOverModal/>}
      <Basket style={{ left: `${basketX}px` }} />
      <Object style={{ top: `${objectY}px`, left: `${objectX}px` }} $carrot={carrot}/>
    </GameContainer>
    <ButtonContainer>
      <LeftBtn onMouseDown={()=>moveBasket("left")}
        onMouseUp={stopMove}
        onMouseLeave={stopMove}>
      </LeftBtn>
      <RightBtn onMouseDown={()=>moveBasket("right")}
        onMouseUp={stopMove}
        onMouseLeave={stopMove}>
      </RightBtn>
    </ButtonContainer>
    </>
  )
}

export default GameDevice
