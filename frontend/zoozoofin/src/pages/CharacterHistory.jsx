import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { getApiClient } from "@/stores/apiClient";
import { theme } from "@/styles/theme";
import backgroundImage from '@/assets/images/background/start.png';
import { Button } from '@/components/root/buttons';
import Portfolio from '../components/character/Portfolio';
import { useNavigate } from 'react-router-dom'; 
import { Loading } from '@components/root/loading';

import mungmung from '@assets/images/characters/mungmungprofile.png';

// 캐릭터 이미지 import
import AnimalType1Image from '@/assets/images/history/1.png';
import AnimalType2Image from '@/assets/images/history/2.png';
import AnimalType3Image from '@/assets/images/history/3.png';

// 이미지 생성
const animalImages = {
  1: AnimalType1Image,
  2: AnimalType2Image,
  3: AnimalType3Image,
};

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'ONE Mobile POP';
    src: url('/assets/fonts/ONE Mobile POP.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  body {
    margin: 0;
    padding: 0;
    overflow: ${props => props.modalOpen ? 'hidden' : 'auto'};
  }
`;

const PageContainer = styled.div`
  font-family: 'ONE Mobile POP', sans-serif;
  background-color: white;
  position: relative;
  min-height: 100%;
  width: 100%;

  &::before {
    content: '';
    position: fixed; 
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url(${backgroundImage});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 1;
    z-index: 1;
  }

  & > * {
    position: relative;
    z-index: 2;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const CharacterCard = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Character1 = styled(CharacterCard)`
  top: 390px;
  right: 100px;
`;

const Character2 = styled(CharacterCard)`
  top: 210px;
  right: 170px;
`;

const Character3 = styled(CharacterCard)`
  top: 200px;
  right: 60px; 
`;

const CharacterImage = styled.img`
  width: 130px;
  height: 130px;
`;

const SmallerCharacterImage = styled(CharacterImage)`
  width: 90px;
  height: 140px;
`;

const CharacterDate = styled.div`
  font-size: 12px;
  color: white;
  text-shadow: 
    -1px -1px 0 black,  
    1px -1px 0 black,
    -1px 1px 0 black,
    1px 1px 0 black;
  margin-bottom: 5px;
`;

const LoadingIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.gray};
`;

const CustomButton = styled(Button)`
  font-size: 12px; 
  padding: 7px 15px;
  border: 3px solid white; 
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.gray};
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const NoCharacterWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  max-width: 400px;
`;

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
`;

const IconWrapper = styled.div`
  margin-right: 20px;
  padding-bottom:50px;
`;

const NoCharacterMessage = styled.div`
  color: black;
  font-size: 22px;
  font-weight: bold;
  flex: 1;
  text-align: left;
  white-space: pre-line;  // 줄바꿈
  padding-bottom:50px;
`;

const CharacterHistory = () => {
  const [animalData, setAnimalData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const apiClient = getApiClient();
        const response = await apiClient.get('/member/animal');
        if (response.data && response.data.animals && response.data.animals.length > 0) {
          setAnimalData(response.data);
        } else {
          console.log('No data received from API or no animals available');
          setAnimalData({ animals: [] });
        }
      } catch (error) {
        console.error('Error fetching animal data:', error);
        setAnimalData({ animals: [] });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (isPortfolioOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isPortfolioOpen]);

  const handleAnimalClick = (animal) => {
    setSelectedAnimal(animal);
    setIsPortfolioOpen(true);
  };

  const handleClosePortfolio = () => {
    setIsPortfolioOpen(false);
    setSelectedAnimal(null);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <LoadingIndicator>Loading...</LoadingIndicator>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle modalOpen={isPortfolioOpen} />
      <PageContainer>
        <ContentWrapper>
          <CloseButton onClick={handleGoBack}>&times;</CloseButton>
          
          {animalData.animals.length === 0 ? (
            <NoCharacterWrapper>
              <MessageContainer>
                <IconWrapper>
                  <img src={mungmung} alt="Mungmung Character" width="80" height="80" />
                </IconWrapper>
                <NoCharacterMessage>
                  아직 완료된{'\n'}캐릭터가 없어!
                </NoCharacterMessage>
              </MessageContainer>
              <div></div>
              <CustomButton 
                size="large" 
                color="primaryDeep"
                onClick={handleGoBack}
              >
                돌아가기
              </CustomButton>
            </NoCharacterWrapper>
          ) : (
            animalData.animals.map((animal, index) => {
              const CharacterComponent = index === 0 ? Character1 : index === 1 ? Character2 : Character3;
              const ImageComponent = index === 2 ? SmallerCharacterImage : CharacterImage;
              
              return (
                <CharacterComponent key={animal.animalId}>
                  <ImageComponent src={animalImages[animal.animalTypeId]} alt={animal.animalName} />
                  <CharacterDate>{new Date(animal.createdDate).toLocaleDateString()}</CharacterDate>
                  <CustomButton 
                    size="large" 
                    color="primaryDeep"
                    onClick={() => handleAnimalClick(animal)}
                  >
                    {animal.animalName}
                  </CustomButton>
                </CharacterComponent>
              );
            })
          )}
        </ContentWrapper>
      </PageContainer>
      {isPortfolioOpen && selectedAnimal && (
        <ModalWrapper>
          <Portfolio 
            isOpen={isPortfolioOpen}
            onClose={handleClosePortfolio}
            animalId={selectedAnimal.animalId}
            animalImage={animalImages[selectedAnimal.animalTypeId]}
            createdDate={selectedAnimal.createdDate} 
          />
        </ModalWrapper>
      )}
    </ThemeProvider>
  );
};

export default CharacterHistory;