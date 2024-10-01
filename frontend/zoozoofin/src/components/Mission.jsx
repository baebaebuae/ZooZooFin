import React from 'react';
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

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    margin: 10px 0;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(139, 69, 19, 0.3);
    border-radius: 3px;
    transition: background-color 0.2s;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: rgba(139, 69, 19, 0.5);
  }

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
  cursor: pointer; 
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

const MissionDashboard = ({ isOpen, onClose }) => {
  const missions = [
    { name: '은행 방문하기', completed: true, page: 'bank' },
    { name: '퀴즈 풀기', completed: false, page: 'school' },
    { name: '일하러가기', completed: false, page: 'work' },
    { name: '주식 거래하기', completed: false, page: 'stock' },
    { name: 'ETF 거래하기', completed: false, page: 'stock' },
    { name: '대출거래소 방문하기', completed: true, page: 'loan' },
    { name: '콩팥 캐피탈 방문하기', completed: false, page: 'lender' },
    { name: '노트북 열어보기', completed: false, page: 'laptop' },
    { name: '예적금 상품 확인하기', completed: false, page: 'bank' },
    { name: '신용도 확인하기', completed: false, page: 'loan' }
  ];

  const incompleteMissions = missions.filter(mission => !mission.completed);
  const completedMissions = missions.filter(mission => mission.completed);

  const handleMissionClick = (page) => {
    window.location.href = `/${page}`; // 페이지 이동
  };

  if (!isOpen) return null;

  return (
    <>
      <GlobalStyle />
      <ModalOverlay onClick={onClose}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <CloseButton onClick={onClose}>&times;</CloseButton>
          <ScrollableContent>
            <Title>미션</Title>
            {incompleteMissions.length > 0 && (
              <>
                <Subtitle>미션을 완료하고 골드를 받아보세요!</Subtitle>
                <MissionList>
                  {incompleteMissions.map((mission, index) => (
                    <MissionItem key={index} onClick={() => handleMissionClick(mission.page)}>
                      <MissionText>{mission.name}</MissionText>
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
                    <MissionItem key={index} onClick={() => handleMissionClick(mission.page)}>
                      <CompletedIcon />
                      <MissionText>{mission.name}</MissionText>
                    </MissionItem>
                  ))}
                </MissionList>
              </>
            )}
          </ScrollableContent>
        </ModalContent>
      </ModalOverlay>
    </>
  );
};

export default MissionDashboard;