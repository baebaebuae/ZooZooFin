import React, {useState, useEffect} from 'react'
import styled from 'styled-components'

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
  background-color: red;
  border-radius: 50%;
`
const GameDevice = ({gameOver, setScore}) => {
  const [basketX, setBasketX] = useState(100)
  const [objectX, setObjectX] = useState(Math.random() * 300)
  const [objectY, setObjectY] = useState(0)

   // 물체 떨어지기
   useEffect(() => {
    const interval = setInterval(() => {
        if (!gameOver){
          setObjectY((prevY) => prevY + 5);
        if (objectY > 380) {
            setObjectY(0);
            setObjectX(Math.random() * 300);
        }
    }

      // 충돌 판정 (물체가 바구니 안에 들어왔는지 확인)
      if (objectY > 350 && objectX > basketX && objectX < basketX + 100) {
        setScore((prevScore) => prevScore + 1);
        setObjectY(0);
        setObjectX(Math.random() * 300);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [objectY, objectX, basketX]);
  const moveBasket = (dir) => {
    console.log(basketX)
    if (dir === "left") {
        setBasketX((prevX) => Math.max(prevX - 10, 0));
    }
    if (dir === "right") {
        setBasketX((prevX) => Math.min(prevX + 10, 200));
    }
}
  return (
    <>
    <GameContainer>
      <Basket style={{ left: `${basketX}px` }} />
      <Object style={{ top: `${objectY}px`, left: `${objectX}px` }} />
    </GameContainer>
    <button onClick={() => moveBasket("left")}>left</button>
    <button onClick={() => moveBasket("right")}>right</button>
    </>
  )
}

export default GameDevice
