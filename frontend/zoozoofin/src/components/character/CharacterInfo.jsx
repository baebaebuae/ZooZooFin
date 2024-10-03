import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from "styled-components";
import { Modal } from "@components/root/modal";
import { Check, X } from "lucide-react";
import { getApiClient } from "@/stores/apiClient";
import CreditBox from '@components/root/creditBox';
import { BadgeStroke } from '@components/root/badge';
import { useNavigate } from 'react-router-dom';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'ONE Mobile POP';
    src: url('/assets/fonts/ONE Mobile POP.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }
`;

const ModalBackdrop = styled.div`
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

const StyledModal = styled(Modal)`
  font-family: 'ONE Mobile POP', sans-serif;
  background-color: #f0f0f0;
  border-radius: 20px;
  padding: 20px;
  width: 100%;
  max-width: 300px;
  height: 80vh;
  margin: 0 auto;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  z-index: 1001;
`;

const ModalContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-grow: 1;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: 100%;
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  width: 100%;
`;

const Subtitle = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #0080ff;
  margin: 0;
  max-width: 45%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledBadgeStroke = styled(BadgeStroke)`
  font-size: 12px;
  padding: 2px 8px;
  max-width: 45%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const CreditSection = styled.div`
  margin-bottom: 15px;
  width: 100%;
`;

const FullWidthCreditBox = styled(CreditBox)`
  width: 100% !important;

  & > div {
    width: 100% !important;
  }

  & > div > div {
    width: 100% !important;
  }

  .gQkfQu {
    width: 100% !important;
    height: 7px;
    border-radius: 5px;
    background: linear-gradient(
      270deg,
      #4ec306 -0.25%,
      #f0e92d 26.3%,
      #f00 99.96%
    );
  }
`;

const BadgeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  width: 100%;
`;

const BadgeItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.completed ? props.activeColor : '#ffffff'};
  border: 2px solid ${props => props.activeColor};
  border-radius: 20px;
  padding: 5px 15px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const BadgeIcon = styled.div`
  margin-right: 5px;
  font-size: 20px;
`;

const BadgeText = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.completed ? '#ffffff' : props.activeColor};
`;

const AssetSection = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: ${props => props.marginBottom || '0'};
`;

const AssetRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const AssetLabel = styled.span`
  font-size: 14px;
  color: #666;
`;

const AssetValue = styled.span`
  font-size: 14px;
  font-weight: ${props => props.bold ? 'bold' : 'normal'};
  color: ${props => props.color || '#333'};
`;

const Spacer = styled.div`
  height: 15px;
`;

const CharacterInfo = ({ onClose }) => {
  const [characterData, setCharacterData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiClient = getApiClient();
        const response = await apiClient.get('/animal/info');
        setCharacterData(response.data.body);
      } catch (error) {
        console.error('Error fetching character data:', error);
      }
    };

    fetchData();
  }, []);

  const handleBadgeClick = (type) => {
    if (type === 'quiz' && !characterData.isSolveQuizToday) {
      navigate('/school');
      onClose();
    } else if (type === 'work' && !characterData.isWorkToday) {
      navigate('/work');
      onClose();
    } else {
      console.log('이미 완료된 작업입니다.');
    }
  };

  if (!characterData) {
    return <div>Loading...</div>;
  }

  const allTasksCompleted = characterData.isSolveQuizToday && characterData.isWorkToday;

  return (
    <>
      <GlobalStyle />
      <ModalBackdrop onClick={onClose}>
        <StyledModal onClose={onClose} onClick={(e) => e.stopPropagation()}>
          <ModalContent>
            <Header>
              <Subtitle>{characterData.animalHierarchy}</Subtitle>
              <TopSection>
                <Title title={characterData.animalName}>{characterData.animalName}</Title>
                <StyledBadgeStroke title={characterData.animalAbility}>{characterData.animalAbility}</StyledBadgeStroke>
              </TopSection>
            </Header>
            <CreditSection>
              <FullWidthCreditBox grade={characterData.animalCredit} />
            </CreditSection>
            <BadgeContainer>
              {allTasksCompleted ? (
                <BadgeItem 
                  completed={true}
                  activeColor="#4CAF50"
                  onClick={() => console.log('모든 작업이 완료되었습니다.')}
                >
                  <BadgeIcon>
                    <Check size={20} color="#ffffff" />
                  </BadgeIcon>
                  <BadgeText completed={true} activeColor="#4CAF50">
                    완료
                  </BadgeText>
                </BadgeItem>
              ) : (
                <>
                  <BadgeItem 
                    completed={characterData.isSolveQuizToday}
                    activeColor="#007BFF"
                    onClick={() => handleBadgeClick('quiz')}
                  >
                    <BadgeIcon>
                      {characterData.isSolveQuizToday ? <Check size={20} color="#007BFF" /> : '✏️'}
                    </BadgeIcon>
                    <BadgeText completed={characterData.isSolveQuizToday} activeColor="#007BFF">
                      GO
                    </BadgeText>
                  </BadgeItem>
                  <BadgeItem 
                    completed={characterData.isWorkToday}
                    activeColor="#FFA500"
                    onClick={() => handleBadgeClick('work')}
                  >
                    <BadgeIcon>
                      {characterData.isWorkToday ? <Check size={20} color="#FFA500" /> : '🥕'}
                    </BadgeIcon>
                    <BadgeText completed={characterData.isWorkToday} activeColor="#FFA500">
                      GO
                    </BadgeText>
                  </BadgeItem>
                </>
              )}
            </BadgeContainer>
            <AssetSection>
              <AssetRow>
                <AssetLabel>순자산</AssetLabel>
                <AssetValue bold>{characterData.totalAmount.toLocaleString()}원</AssetValue>
              </AssetRow>
            </AssetSection>
            <Spacer />
            <AssetSection>
              <AssetRow>
                <AssetLabel>현금</AssetLabel>
                <AssetValue>{characterData.totalAssets.toLocaleString()}원</AssetValue>
              </AssetRow>
              <AssetRow>
                <AssetLabel>예금</AssetLabel>
                <AssetValue>{characterData.totalDeposit.toLocaleString()}원</AssetValue>
              </AssetRow>
              <AssetRow>
                <AssetLabel>적금</AssetLabel>
                <AssetValue>{characterData.totalSavings.toLocaleString()}원</AssetValue>
              </AssetRow>
              <AssetRow>
                <AssetLabel>주식</AssetLabel>
                <AssetValue>{characterData.totalStock.toLocaleString()}원</AssetValue>
              </AssetRow>
              <AssetRow>
                <AssetLabel>대출</AssetLabel>
                <AssetValue color="#ff0000">-{characterData.totalLoan.toLocaleString()}원</AssetValue>
              </AssetRow>
            </AssetSection>
          </ModalContent>
        </StyledModal>
      </ModalBackdrop>
    </>
  );
};

export default CharacterInfo;