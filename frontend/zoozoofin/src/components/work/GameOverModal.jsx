import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { getApiClient } from '@/stores/apiClient';
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
  console.log(score)
  const handleClick = async () => {
    const apiClient = getApiClient();
    try {
        const res = await apiClient.patch('/work', {
          "paidAmount": score
        }
        );
        if (res && res.status === 200) {
          console.log('PATCH 요청 성공:', res.data);
          // 지도로 이동하기
      }
    } catch (error) {
        console.log(error);
    }
};
  return (
    <Backdrop>
      <Info>GAME OVER</Info>
      <ExitBtn onClick={handleClick}>
        {score.toLocaleString()} 당근 수확 =&gt;
      </ExitBtn>
    </Backdrop>
  )
}

export default GameOverModal
