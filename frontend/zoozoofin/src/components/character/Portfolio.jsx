import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { getApiClient } from "@/stores/apiClient";
import CreditBox from '@components/root/creditBox';
import { Button } from '@components/root/buttons';
import Chart from 'react-apexcharts';
import { theme } from "@/styles/theme";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'ONE Mobile POP';
    src: url('/assets/fonts/ONE Mobile POP.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }
`;

// 모달의 padding값 때문에 재설정
const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const ModalBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 270px;
  min-height: 300px;
  padding: 20px 20px;
  border-radius: 40px;
  border: 10px solid white;
  background: ${({ theme }) => theme.colors.background};
  z-index: 1000;
  overflow-y: auto;
  max-height: 80vh;
`;

const CustomModal = ({ children, onClose }) => {
  return (
    <ModalBackground onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>{children}</ModalBox>
    </ModalBackground>
  );
};

const ScrollableContent = styled.div`
  width: 100%;
  overflow-y: auto;
  padding-right: 10px;
  margin-right: -10px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    margin: 10px 0;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.inactive};
    border-radius: 3px;
    transition: background-color 0.2s;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: ${({ theme }) => theme.colors.gray};
  }

  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => `${theme.colors.inactive} transparent`};
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
  max-width: 45%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledButton = styled(Button)`
  max-width: 45%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border: 3px solid white;
  font-weight: bold;
`;

const RedButton = styled(Button)`
  display: block;
  width: 100%;
  margin: 10px 0;
  border: 5px solid white;
`;

const CreditSection = styled.div`
  margin-bottom: 15px;
  width: 100%;
`;

const FullWidthCreditBox = styled(CreditBox)`
  .gQkfQu {
    width: 120% !important;
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

const SectionTitle = styled.h3`
  font-size: 20px;
  margin: 30px 0 15px 0;
  color: ${({ theme }) => theme.colors.primaryDeep};
  text-align: center;
`;

const Section = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 20px;
  width: 100%;
  box-sizing: border-box;
`;

const AssetRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const AssetLabel = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray};
`;

const AssetValue = styled.span`
  font-size: 14px;
  font-weight: ${props => props.bold ? 'bold' : 'normal'};
  color: ${props => props.color || 'black'};
`;

const PercentageBox = styled.div`
  background-color: transparent;
  border: 5px solid ${({ theme }) => theme.colors.primary};
  border-radius: 30px;
  padding: 10px;
  margin: 10px 0;
  text-align: center;
`;

const PercentValue = styled.span`
  color: ${({ theme }) => theme.colors.primaryDeep};
  font-weight: bold;
`;

const LoadingIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.gray};
`;

const ChartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  margin-bottom: 20px;
`;

const CharacterImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const CharacterImage = styled.img`
  height: 180px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const PortfolioTitle = styled.div`
  font-size: 22px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primaryDeep};
  margin-bottom: 10px;
  text-align: center;
  text-shadow: 
    -1px -1px 0 white,  
    1px -1px 0 white,
    -1px 1px 0 white,
    1px 1px 0 white;
`;

const CharacterDate = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.gray};
  margin-bottom: 15px;
  text-align: center;
  font-weight: bold;
`;

const Portfolio = ({ isOpen, onClose, animalId, animalImage, createdDate }) => {
  const [characterData, setCharacterData] = useState(null);
  const [portfolioData, setPortfolioData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fallbackData = {
    characterData: {
      animalName: "토토",
      animalHierarchy: "당근 알바생",
      animalAbility: "예금우대",
      animalCredit: 5,
      totalAmount: 1000000,
      totalAssets: 500000,
      totalDeposit: 200000,
      totalSavings: 200000,
      totalStock: 100000,
      totalLoan: 0,
    },
    portfolioData: {
      animalName: "토토",
      animalAsset: 1000000,
      animalCredit: 650,
      portfolio: {
        depositPercent: 20,
        savingsPercent: 30,
        stockPercent: 50,
        investmentStyle: "공격투자형",
        ending: "string",
        ReturnRate: 12,
        totalFundsPercent: 34
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const apiClient = getApiClient();
        const characterResponse = await apiClient.get(`/animal/info/`);
        setCharacterData(characterResponse.data.body);

        const portfolioResponse = await apiClient.get(`/animal/${animalId}`);
        if (portfolioResponse.data.body) {
          setPortfolioData(portfolioResponse.data.body);
        } else {
          throw new Error('No portfolio data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setCharacterData(fallbackData.characterData);
        setPortfolioData(fallbackData.portfolioData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [animalId]);

  if (!isOpen) return null;

  if (isLoading) {
    return (
      <CustomModal onClose={onClose}>
        <LoadingIndicator>Loading...</LoadingIndicator>
      </CustomModal>
    );
  }

  const data = {
    character: characterData || fallbackData.characterData,
    portfolio: portfolioData || fallbackData.portfolioData
  };

  const chartOptions = {
    chart: { type: 'pie' },
    labels: ['예금', '적금', '주식'],
    colors: [theme.colors.primary, theme.colors.yellow, theme.colors.orange],
    legend: { position: 'bottom' },
    responsive: [{ breakpoint: 480, options: { chart: { width: '100%' }, legend: { position: 'bottom' } } }]
  };

  const chartSeries = [
    data.portfolio.portfolio.depositPercent,
    data.portfolio.portfolio.savingsPercent,
    data.portfolio.portfolio.stockPercent
  ];

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <CustomModal onClose={onClose}>
        <ScrollableContent>
          <CloseButton onClick={onClose}>&times;</CloseButton>
          <Header>
            <CharacterImageContainer>
              <CharacterImage src={animalImage} alt={characterData.animalName} />
              <PortfolioTitle>금융 포트폴리오</PortfolioTitle>
              <CharacterDate>생성일: {new Date(createdDate).toLocaleDateString()}</CharacterDate>
            </CharacterImageContainer>
          </Header>
          <Subtitle>{characterData.animalHierarchy}</Subtitle>
          <TopSection>
            <Title title={characterData.animalName}>{characterData.animalName}</Title>
            <StyledButton size="small" color="primary" title={characterData.animalAbility}>
              {characterData.animalAbility}
            </StyledButton>
          </TopSection>
          <CreditSection>
            <FullWidthCreditBox grade={characterData.animalCredit} />
          </CreditSection>
          <Section>
            <AssetRow>
              <AssetLabel>순자산</AssetLabel>
              <AssetValue bold>{characterData.totalAmount.toLocaleString()}원</AssetValue>
            </AssetRow>
          </Section>
          <Section>
            {['현금', '예금', '적금', '주식', '대출'].map((label, index) => (
              <AssetRow key={index}>
                <AssetLabel>{label}</AssetLabel>
                <AssetValue color={label === '대출' ? theme.colors.warn : undefined}>
                  {label === '대출' ? '-' : ''}{characterData[['totalAssets', 'totalDeposit', 'totalSavings', 'totalStock', 'totalLoan'][index]].toLocaleString()}원
                </AssetValue>
              </AssetRow>
            ))}
          </Section>
          <SectionTitle>내 투자 성향</SectionTitle>
          <RedButton size="normal" color="warn">
            {portfolioData.portfolio.investmentStyle}
          </RedButton>
          <SectionTitle>나는 이런 비율로 투자했어요.</SectionTitle>
          <ChartContainer>
            <Chart 
              options={chartOptions} 
              series={chartSeries} 
              type="pie" 
              width="100%" 
              height="100%" 
            />
          </ChartContainer>
          <SectionTitle>전체 사용자 대비 내 순위</SectionTitle>
          <PercentageBox>
            <p>수익률 상위 <PercentValue>{portfolioData.portfolio.ReturnRate}%</PercentValue></p>
          </PercentageBox>
          <PercentageBox>
            <p>총 자금 상위 <PercentValue>{portfolioData.portfolio.totalFundsPercent}%</PercentValue></p>
          </PercentageBox>
        </ScrollableContent>
      </CustomModal>
    </ThemeProvider>
  );
};

export default Portfolio;