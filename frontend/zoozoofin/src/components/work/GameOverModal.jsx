import React, {useState, useEffect} from 'react'
import styled from 'styled-components'

const Backdrop = styled.div`
  position: absolute;
  border: 1px solid black;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  background-color: black;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Info = styled.div`
  font-family: 'neodgm_code';
  color: #f9bf69;
  font-size: 50px;
  text-shadow: 1px 1px 2px red;
`

const GameOverModal = () => {
    
  return (
    <Backdrop>
      <Info>GAME OVER</Info>
    </Backdrop>
  )
}

export default GameOverModal
