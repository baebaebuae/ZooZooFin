import React, {useState, useEffect} from 'react'
import GameDevice from './GameDevice'

const Game = () => {
    
    const [score, setScore] = useState(0);
    const [time, setTime] = useState(100);
    const [gameOver, setGameOver] = useState(false)
    
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
      <h1>점수: {score}</h1>
      <div>{time}</div>
      <GameDevice gameOver={gameOver}
      setScore={setScore}/>
    </div>
  )
}

export default Game
