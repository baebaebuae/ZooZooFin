import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Modal } from '@components/root/modal';
import { Check, X } from 'lucide-react';
import { getApiClient } from '@/stores/apiClient';
import CreditBox from '@components/root/creditBox';
import { Button } from '@components/root/buttons';
import { useNavigate } from 'react-router-dom';
import { theme } from "@/styles/theme"; //테마 파일(색상코드)
import useAnimalInfoStore from '@/stores/useAnimalInfoStore';

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
    align-items: flex-start;
    z-index: 10000;
    z-index: 1;
`;

const StyledModal = styled(Modal)`
  font-family: 'ONE Mobile POP', sans-serif;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 20px;
  padding: 20px;
  width: 100%;
  max-width: 300px;
  height: 80vh;
  margin: 0 auto;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  z-index: 10001; // ModalBackdrop보다 높은 z-index
  position: relative; // 추가
`;

const ModalContent = styled.div`
  font-family: 'ONE Mobile POP', sans-serif;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 20px;
  padding: 20px;
  width: 90%;
  max-width: 300px;
  max-height: 80vh;
  overflow: hidden;
  position: relative;
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
  color: ${({ theme }) => theme.colors.gray};
  margin-bottom: 5px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primaryDeep};
  margin: 0;
  max-width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;


const StyledButton = styled(Button)`
  max-width: 20%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border: 3px solid white;
  font-weight: bold;
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
      ${({ theme }) => theme.colors.tertiary} -0.25%,
      ${({ theme }) => theme.colors.yellow} 26.3%,
      ${({ theme }) => theme.colors.warn} 99.96%
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
  background-color: ${props => props.completed ? props.activeColor : 'white'};
  border: 2px solid ${props => props.activeColor};
  border-radius: 20px;
  padding: 5px 15px;
  cursor: ${props => props.completed ? 'default' : 'pointer'};
  transition: all 0.3s ease;

  &:hover {
    opacity: ${props => props.completed ? 1 : 0.5};
  }
`;
const BadgeIcon = styled.div`
    margin-right: 5px;
    font-size: 20px;
`;

const BadgeText = styled.span`
  font-size: 15px;
  font-weight: bold;
  color: ${props => props.completed ? 'white' : props.activeColor};
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
    align-items: flex-end;
`;

const AssetLabel = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray};
`;

const AssetValue = styled.span`
  font-size: 14px;
  font-weight: ${props => props.bold ? 'bold' : 'normal'};
  color: ${props => props.color || "Black"};
`;

const Spacer = styled.div`
  height: 15px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: -5px;
  right: 0px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.gray};
`;


const CharacterInfo = ({ onClose }) => {
  const navigate = useNavigate();
  const {
      animalName,
      animalAbility,
      animalHierarchy,
      animalCredit,
      isWorkToday,
      isSolvedQuizToday,
      totalAmount,
      totalAssets,
      totalDeposit,
      totalSavings,
      totalStock,
      totalLoan,
      totalCapital,
      fetchAnimalInfo,
      isLoading,
      error
  } = useAnimalInfoStore();

  useEffect(() => {
      fetchAnimalInfo();
  }, [fetchAnimalInfo]);

  const handleBadgeClick = (type) => {
      if (type === 'quiz' && !isSolvedQuizToday) {
          navigate('/school');
          onClose();
      } else if (type === 'work' && !isWorkToday) {
          navigate('/work');
          onClose();
      } else {
          console.log('이미 완료된 작업입니다.');
      }
  };

  if (isLoading) {
      return <div>Loading...</div>;
  }

  if (error) {
      return <div>Error: {error}</div>;
  }

  const allTasksCompleted = isSolvedQuizToday && isWorkToday;

  return (
      <>
          <GlobalStyle />
          <ModalBackdrop onClick={onClose}>
              <StyledModal onClose={onClose} onClick={(e) => e.stopPropagation()}>
                  <ModalContent>
                      <CloseButton onClick={onClose}>&times;</CloseButton>
                      <Header>
                          <Subtitle>{animalHierarchy}</Subtitle>
                          <TopSection>
                              <Title title={animalName}>{animalName}</Title>
                              <StyledButton size="small" color="primary" title={animalAbility}>{animalAbility}</StyledButton>
                          </TopSection>
                      </Header>
                      <CreditSection>
                          <FullWidthCreditBox grade={animalCredit} />
                      </CreditSection>
                      <BadgeContainer>
                          <BadgeItem 
                              completed={isSolvedQuizToday}
                              activeColor={theme.colors.primary}
                              onClick={() => !isSolvedQuizToday && handleBadgeClick('quiz')}
                          >
                              <BadgeIcon>
                                  {'✏️'}
                              </BadgeIcon>
                              <BadgeText completed={isSolvedQuizToday} activeColor={theme.colors.primary}>
                                  {isSolvedQuizToday ? '완료' : 'GO'}
                              </BadgeText>
                          </BadgeItem>
                          <BadgeItem 
                              completed={isWorkToday}
                              activeColor={theme.colors.orange}
                              onClick={() => !isWorkToday && handleBadgeClick('work')}
                          >
                              <BadgeIcon>
                                  🥕
                              </BadgeIcon>
                              <BadgeText completed={isWorkToday} activeColor={theme.colors.orange}>
                                  {isWorkToday ? '완료' : 'GO'}
                              </BadgeText>
                          </BadgeItem>
                      </BadgeContainer>
                      <AssetSection>
                          <AssetRow>
                              <AssetLabel>총자산</AssetLabel>
                              <AssetValue bold>{totalAmount.toLocaleString()}🥕</AssetValue>
                          </AssetRow>
                      </AssetSection>
                      <Spacer />
                      <AssetSection>
                          <AssetRow>
                              <AssetLabel>현금</AssetLabel>
                              <AssetValue>{totalAssets.toLocaleString()}🥕</AssetValue>
                          </AssetRow>
                          <AssetRow>
                              <AssetLabel>예금</AssetLabel>
                              <AssetValue>{totalDeposit.toLocaleString()}🥕</AssetValue>
                          </AssetRow>
                          <AssetRow>
                              <AssetLabel>적금</AssetLabel>
                              <AssetValue>{totalSavings.toLocaleString()}🥕</AssetValue>
                          </AssetRow>
                          <AssetRow>
                              <AssetLabel>주식</AssetLabel>
                              <AssetValue>{totalStock.toLocaleString()}🥕</AssetValue>
                          </AssetRow>
                          <AssetRow>
                              <AssetLabel>대출</AssetLabel>
                              <AssetValue color={theme.colors.warn}>
                                  {totalLoan > 0 ? `-${totalLoan.toLocaleString()}` : totalLoan.toLocaleString()}🥕
                              </AssetValue>
                          </AssetRow>
                          <AssetRow>
                              <AssetLabel>캐피탈</AssetLabel>
                              <AssetValue color={theme.colors.warn}>
                                  {totalCapital > 0 ? `-${totalCapital.toLocaleString()}` : totalCapital.toLocaleString()}🥕
                              </AssetValue>
                          </AssetRow>
                      </AssetSection>
                  </ModalContent>
              </StyledModal>
          </ModalBackdrop>
      </>
  );
};

export default CharacterInfo;