import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { getApiClient } from "@/stores/apiClient";
import CreditBox from '@components/root/creditBox';
import { BadgeStroke } from '@components/root/badge';
import Chart from 'react-apexcharts';
import { Modal } from "@components/root/modal";
import { theme } from "@/styles/theme";

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
  background-color: ${({ theme }) => theme.colors.yellow};
  border-radius: 20px;
  padding: 10px;
  width: 200%;
  max-width: 200px;
  height: 80vh;
  margin: 0 auto;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  z-index: 1001;
  border: 4px solid white;
`;

const ModalContent = styled.div`
  font-family: 'ONE Mobile POP', sans-serif;
  background-color: ${({ theme }) => theme.colors.yellow};
  border-radius: 20px;
  padding: 10px;
  width: 90%;
  max-width: 200px;
  max-height: 80vh;
  overflow: hidden;
  position: relative;
`;


const ScrollableContent = styled.div`
  max-height: calc(80vh - 40px);
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
  top: -5px;
  right: -2px;
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

const StyledBadgeStroke = styled(BadgeStroke)`
  font-size: 12px;
  padding: 2px 8px;
  max-width: 45%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const RedBadgeStroke = styled(BadgeStroke)`
  background-color: ${({ theme }) => theme.colors.warn};
  color: white;
  text-align: center;
  display: block;
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
  font-size: 18px;
  margin: 40px 0 10px 0;
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
`;

const Portfolio = ({ isOpen, onClose }) => {
  const [characterData, setCharacterData] = useState(null);
  const [portfolioData, setPortfolioData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fallbackPortfolioData = {
    animalName: "토토",
    animalAsset: 0,
    animalCredit: 0,
    portfolio: {
      depositPercent: 20,
      savingsPercent: 30,
      stockPercent: 50,
      investmentStyle: "공격투자형",
      ending: "string",
      ReturnRate: 12,
      totalFundsPercent: 34
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const apiClient = getApiClient();
        const characterResponse = await apiClient.get('/animal/info');
        setCharacterData(characterResponse.data.body);

        try {
          const portfolioResponse = await apiClient.get('/animal/1');
          if (portfolioResponse.data.body) {
            setPortfolioData(portfolioResponse.data.body);
          } else {
            setPortfolioData(fallbackPortfolioData);
          }
        } catch (portfolioError) {
          console.error('Error fetching portfolio data:', portfolioError);
          setPortfolioData(fallbackPortfolioData);
        }
      } catch (error) {
        console.error('Error fetching character data:', error);
        setPortfolioData(fallbackPortfolioData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (!isOpen) return null;

  if (isLoading || !characterData || !portfolioData) {
    return (
      <ModalBackdrop onClick={onClose}>
        <StyledModal onClose={onClose} onClick={(e) => e.stopPropagation()}>
          <LoadingIndicator>Loading...</LoadingIndicator>
        </StyledModal>
      </ModalBackdrop>
    );
  }

  const chartOptions = {
    chart: { type: 'donut' },
    labels: ['예금', '적금', '주식'],
    colors: [theme.colors.primary, theme.colors.yellow, theme.colors.orange],
    legend: { position: 'bottom' },
    responsive: [{ breakpoint: 480, options: { chart: { width: '100%' }, legend: { position: 'bottom' } } }]
  };

  const chartSeries = [
    portfolioData.portfolio.depositPercent,
    portfolioData.portfolio.savingsPercent,
    portfolioData.portfolio.stockPercent
  ];

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ModalBackdrop onClick={onClose}>
        <StyledModal onClose={onClose} onClick={(e) => e.stopPropagation()}>
          <ModalContent>
            <CloseButton onClick={onClose}>&times;</CloseButton>
            <ScrollableContent>
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
              <RedBadgeStroke>{portfolioData.portfolio.investmentStyle}</RedBadgeStroke>
              <SectionTitle>나는 이런 비율로 투자했어요.</SectionTitle>
              <Section>
                <ChartContainer>
                  <Chart 
                    options={chartOptions} 
                    series={chartSeries} 
                    type="donut" 
                    width="100%" 
                    height="100%" 
                  />
                </ChartContainer>
              </Section>
              <SectionTitle>전체 사용자 대비 내 순위</SectionTitle>
              <PercentageBox>
                <p>수익률 상위 <PercentValue>{portfolioData.portfolio.ReturnRate}%</PercentValue></p>
              </PercentageBox>
              <PercentageBox>
                <p>총 자금 상위 <PercentValue>{portfolioData.portfolio.totalFundsPercent}%</PercentValue></p>
              </PercentageBox>
            </ScrollableContent>
          </ModalContent>
        </StyledModal>
      </ModalBackdrop>
    </ThemeProvider>
  );
};

export default Portfolio;