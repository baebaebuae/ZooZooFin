import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import CorrectSVG from '@assets/images/mission/complete.svg?react';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'ONE Mobile POP';
    src: url('/path/to/ONE Mobile POP.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #FFE8B8;
  border-radius: 20px;
  padding: 20px;
  width: 90%;
  max-width: 300px;
  max-height: 80vh;
  overflow: hidden;
  font-family: 'ONE Mobile POP', sans-serif;
  position: relative;
`;

const ScrollableContent = styled.div`
  max-height: calc(80vh - 40px);
  overflow-y: auto;
  padding-right: 20px;
  margin-right: -20px;

  /* 스크롤바 전체 */
  &::-webkit-scrollbar {
    width: 6px;
  }

  /* 스크롤바 트랙 (배경) */
  &::-webkit-scrollbar-track {
    background: transparent;
    margin: 10px 0;
  }

  /* 스크롤바 핸들 */
  &::-webkit-scrollbar-thumb {
    background-color: rgba(139, 69, 19, 0.3);
    border-radius: 3px;
    transition: background-color 0.2s;
  }

  /* 스크롤바 핸들 호버 시 */
  &::-webkit-scrollbar-thumb:hover {
    background-color: rgba(139, 69, 19, 0.5);
  }

  /* Firefox를 위한 스크롤바 스타일 */
  scrollbar-width: thin;
  scrollbar-color: rgba(139, 69, 19, 0.3) transparent;
`;

const Title = styled.h2`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
  color: #8B4513;
  text-shadow: 
    -2px -2px 0 #FFF,
    2px -2px 0 #FFF,
    -1px 1px 0 #FFF,
    1px 1px 0 #FFF;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #8B4513;
  margin-bottom: 20px;
  text-align: center;
  font-weight: bold;
`;

const MissionList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const MissionItem = styled.li`
  background-color: #FFFFFF;
  border-radius: 15px;
  padding: 15px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const MissionText = styled.span`
  font-size: 16px;
  color: #000000;
  font-weight: bold;
  text-align: center;
`;

const CompletedIcon = styled(CorrectSVG)`
  width: 40px;
  height: 40px;
  position: absolute;
  left: 10px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #8B4513;
`;

const MissionDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const missions = [
    { text: '신용도 확인하기', completed: false },
    { text: '퀴즈 풀기', completed: false },
    { text: '주식 매수하기', completed: true },
    { text: '주식 기업 정보 조사하기', completed: false },
    { text: '예적금 상품 확인하기', completed: true },
    { text: '주식 거래소 방문하기', completed: true },
    { text: '은행 방문하기', completed: true },
    { text: '은행 방문하기', completed: true },
    { text: '은행 방문하기', completed: false },
    { text: '은행 방문하기', completed: false },
  ];

  const incompleteMissions = missions.filter(mission => !mission.completed);
  const completedMissions = missions.filter(mission => mission.completed);

  return (
    <>
      <GlobalStyle />
      <button onClick={() => setIsModalOpen(true)}>미션</button>
      {isModalOpen && (
        <ModalOverlay onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={() => setIsModalOpen(false)}>&times;</CloseButton>
            <ScrollableContent>
              <Title>미션</Title>
              {incompleteMissions.length > 0 && (
                <>
                  <Subtitle>미션을 완료하고 골드를 받아보세요!</Subtitle>
                  <MissionList>
                    {incompleteMissions.map((mission, index) => (
                      <MissionItem key={index}>
                        <MissionText>{mission.text}</MissionText>
                      </MissionItem>
                    ))}
                  </MissionList>
                </>
              )}
              {completedMissions.length > 0 && (
                <>
                  <Subtitle>----------------- 완료한 미션 -----------------</Subtitle>
                  <MissionList>
                    {completedMissions.map((mission, index) => (
                      <MissionItem key={index}>
                        <CompletedIcon />
                        <MissionText>{mission.text}</MissionText>
                      </MissionItem>
                    ))}
                  </MissionList>
                </>
              )}
            </ScrollableContent>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default MissionDashboard;