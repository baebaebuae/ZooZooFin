import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { getApiClient } from "@/stores/apiClient";
import { theme } from "@/styles/theme";
import backgroundImage from '@/assets/images/background/start.png';
import { Button } from '@/components/root/buttons';
import Portfolio from '../components/character/Portfolio';

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
`;

const PageContainer = styled.div`
  font-family: 'ONE Mobile POP', sans-serif;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
  position: relative;
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

const CharacterHistory = () => {
  const [animalData, setAnimalData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const apiClient = getApiClient();
        const response = await apiClient.get('/member/animal');
        setAnimalData(response.data);
      } catch (error) {
        console.error('Error fetching animal data:', error);
        setAnimalData({
          animalNumber: 3,
          animals: [
            { animalId: 1, animalTypeId: 1, animalName: "토토", animalAssets: 1000000, createdDate: "2024.08.15" },
            { animalId: 2, animalTypeId: 2, animalName: "삐삐", animalAssets: 2000000, createdDate: "2024.08.15" },
            { animalId: 3, animalTypeId: 3, animalName: "리치덕", animalAssets: 3000000, createdDate: "2024.08.02" },
          ]
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAnimalClick = (animal) => {
    setSelectedAnimal(animal);
    setIsPortfolioOpen(true);
  };

  const handleClosePortfolio = () => {
    setIsPortfolioOpen(false);
    setSelectedAnimal(null);
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
      <GlobalStyle />
      <PageContainer>
        <ContentWrapper>
          {animalData.animals.map((animal, index) => {
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
          })}
        </ContentWrapper>
        {isPortfolioOpen && selectedAnimal && (
          <Portfolio 
            isOpen={isPortfolioOpen}
            onClose={handleClosePortfolio}
            animalId={selectedAnimal.animalId}
            animalImage={animalImages[selectedAnimal.animalTypeId]}
            createdDate={selectedAnimal.createdDate} 
          />
        )}
      </PageContainer>
    </ThemeProvider>
  );
};

export default CharacterHistory;