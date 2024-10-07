import React, {useState, useEffect} from 'react'
import styled from 'styled-components'

const Backdrop = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Info = styled.div`
  font-family: 'neodgm_code';
  color: #f9bf69;
  font-size: 50px;
  text-shadow: 2px 1px 2px black;
`
const ExitBtn = styled.button`
  font-family: 'neodgm_code';
  font-size: 15px;
  font-feature-settings: "calt";
`
const GameOverModal = ({score}) => {

  return (
    <Backdrop>
      <Info>GAME OVER</Info>
      <ExitBtn>
        {score.toLocaleString()} 당근 수확 =&gt;
      </ExitBtn>
    </Backdrop>
  )
}

export default GameOverModal
