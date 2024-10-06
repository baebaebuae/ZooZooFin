import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { getApiClient } from '@/stores/apiClient';
import { theme } from "@/styles/theme";
import { X } from 'lucide-react';
import { Button } from '@components/root/buttons';
import { useNavigate } from 'react-router-dom';

// Today card background images
import LoanCardBg from '@/assets/images/wallet/card/today/loan.png';
import WorkCardBg from '@/assets/images/wallet/card/today/work.png';
import StockCardBg from '@/assets/images/wallet/card/today/stock.png';
import DepositCardBg from '@/assets/images/wallet/card/today/deposit.png';
import CapitalCardBg from '@/assets/images/wallet/card/today/capital.png';

// Tomorrow card background images
import TomorrowLoanCardBg from '@/assets/images/wallet/card/tomorrow/loan.png';
import TomorrowDepositCardBg from '@/assets/images/wallet/card/tomorrow/deposit.png';
import TomorrowCapitalCardBg from '@/assets/images/wallet/card/tomorrow/capital.png';

// card icon(개구리, 돼지 등)
import CapitalIcon from '@/assets/images/wallet/card/icon/boar.png'
import StockIcon from '@/assets/images/wallet/card/icon/frog.png'
import BankPigIcon from '@/assets/images/wallet/card/icon/pig.png'
import BankRacconIcon from '@/assets/images/wallet/card/icon/raccon.png'
import WorkIcon from '@/assets/images/wallet/card/icon/zoozoo.png'

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'ONE Mobile POP';
    src: url('/assets/fonts/ONE Mobile POP.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const WalletContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 300px;
  height: 85vh;
  padding: 10px;
  border-radius: 40px;
  background-color: ${({ theme }) => theme.colors.yellow};
  border: 8px solid white;
  overflow-y: auto;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 24px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
`;

const StyledButton = styled(Button)`
  background-color: ${({ active, theme }) => active ? theme.colors.primaryDeep : theme.colors.gray};
  border: 4px solid white;
  font-size: 14px;
  flex: 1;
  margin: 0 5px;

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }
`;

const CardContainer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.yellow};
  border-radius: 20px;
  padding: 15px;
  margin-bottom: 20px;
`;

const Card = styled.div`
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 15px;
  color: white;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-size: cover; 
  background-position: center;
  background-image: url(${props => props.backgroundImage});
  height: ${props => props.height || '180px'};
  flex-grow: 1;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const IconWrapper = styled.div`
  width: 30px;
  height: 30px;
  margin-right: 10px;
  background-image: url(${props => props.icon});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const CardTitle = styled.div`
  font-size: 13px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: auto;
`;

const TransactionItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
`;

const TransactionLabel = styled.span`
  font-size: 14px;
`;

const TransactionValue = styled.span`
  font-size: 14px;
  font-weight: bold;
`;

const fallbackData = {
  daily_charge: 50000,
  loan_make: 1000000,
  loan_repay: 50000,
  stock_buy: 500000,
  stock_sell: 600000,
  deposit_make: 200000,
  deposit_finish: 1000000,
  savings_make: 100000,
  savings_pay: 10000,
  savings_finish: 500000,
  capital_make: 2000000,
  capital_repay: 100000
};

const nextDayFallbackData = {
  nextLoanRepayment: 50000,
  nextSavingsPayment: 200000,
  nextCapitalRepayment: 100000,
};

const Wallet = ({ onClose = () => {} }) => {
  const [walletData, setWalletData] = useState(fallbackData);
  const [nextDayData, setNextDayData] = useState(nextDayFallbackData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('today');
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
    navigate(-1); 
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const apiClient = getApiClient();
        const todayResponse = await apiClient.get('/home/turn-record');
        const nextDayResponse = await apiClient.get('/home/next-turn-record');

        if (todayResponse.data && todayResponse.data.body) {
          setWalletData(todayResponse.data.body);
        } else {
          setWalletData(fallbackData);
        }

        if (nextDayResponse.data && nextDayResponse.data.body) {
          setNextDayData(nextDayResponse.data.body);
        } else {
          setNextDayData(nextDayFallbackData);
        }
      } catch (error) {
        setError(error.message);
        setWalletData(fallbackData);
        setNextDayData(nextDayFallbackData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const loadImage = (imageSrc) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = imageSrc;
        img.onload = () => {
          resolve(img);
        };
        img.onerror = (e) => {
          reject(e);
        };
      });
    };

    const imagesToLoad = [
      LoanCardBg, WorkCardBg, StockCardBg, DepositCardBg, CapitalCardBg,
      TomorrowLoanCardBg, TomorrowDepositCardBg, TomorrowCapitalCardBg
    ];

    Promise.all(imagesToLoad.map(loadImage))
      .then(() => {
        setImagesLoaded(true);
      })
      .catch(() => {
        setImagesLoaded(true);
      });
  }, []);


  const todayCards = [
    {
      title: '너굴 BANK',
      backgroundImage: LoanCardBg,
      icon: BankRacconIcon,
      height: '180px',
      transactions: [
        { label: '은행대출', value: walletData.loan_make },
        { label: '은행대출이자', value: -walletData.loan_repay }
      ]
    },
    {
      title: 'ZOO ZOO BANK',
      backgroundImage: WorkCardBg,
      icon: WorkIcon,
      height: '180px', 
      transactions: [
        { label: '근무수당', value: walletData.daily_charge }
      ]
    },
    {
      title: '개굴 주식연구소',
      backgroundImage: StockCardBg,
      icon: StockIcon,
      height: '200px',
      transactions: [
        { label: '주식 매수', value: -walletData.stock_buy },
        { label: '주식 매도', value: walletData.stock_sell }
      ]
    },
    {
      title: '꿀꿀 BANK',
      backgroundImage: DepositCardBg,
      icon: BankPigIcon,
      height: '235px',
      transactions: [
        { label: '적금만기', value: walletData.savings_finish },
        { label: '예금만기', value: walletData.deposit_finish },
        { label: '적금신규등록', value: -walletData.savings_make },
        { label: '예금신규등록', value: -walletData.deposit_make },
        { label: '적금', value: -walletData.savings_pay },
      ]
    },
    {
      title: '콩팥 캐피탈',
      backgroundImage: CapitalCardBg,
      icon: CapitalIcon,
      height: '170px', 
      transactions: [
        { label: '캐피탈대출', value: walletData.capital_make },
        { label: '캐피탈원금상환', value: -walletData.capital_repay }
      ]
    },
  ];

  const nextDayCards = [
    {
      title: '너굴 BANK',
      backgroundImage: TomorrowLoanCardBg,
      icon: BankRacconIcon,
      height: '140px', 
      transactions: [
        { label: '은행대출이자', value: -nextDayData.nextLoanRepayment }
      ]
    },
    {
      title: '꿀꿀 BANK',
      backgroundImage: TomorrowDepositCardBg,
      icon: BankPigIcon,
      height: '140px',
      transactions: [
        { label: '적금', value: -nextDayData.nextSavingsPayment }
      ]
    },
    {
      title: '콩팥 캐피탈',
      backgroundImage: TomorrowCapitalCardBg,
      icon: CapitalIcon,
      height: '140px',
      transactions: [
        { label: '캐피탈상환', value: -nextDayData.nextCapitalRepayment }
      ]
    },
  ];

  if (isLoading || !imagesLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ModalWrapper>
        <WalletContent>
          <CloseButton onClick={handleClose}>
            <X size={24} />
          </CloseButton>

          <ButtonContainer>
            <StyledButton
              size="large"
              color={activeTab === 'today' ? 'primaryDeep' : 'gray'}
              active={activeTab === 'today'}
              onClick={() => setActiveTab('today')}
            >
              오늘 거래 내역
            </StyledButton>
            <StyledButton
              size="large"
              color={activeTab === 'tomorrow' ? 'primaryDeep' : 'gray'}
              active={activeTab === 'tomorrow'}
              onClick={() => setActiveTab('tomorrow')}
            >
              내일 빠져나갈 돈
            </StyledButton>
          </ButtonContainer>
          
          <CardContainer>
            {activeTab === 'today' ? (
              todayCards.map((card, index) => (
                <Card 
                  key={index} 
                  backgroundImage={card.backgroundImage} 
                  height={card.height}
                >
                  <CardHeader>
                    <IconWrapper icon={card.icon} />
                    <CardTitle>{card.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {card.transactions.map((transaction, tIndex) => (
                      <TransactionItem key={tIndex}>
                        <TransactionLabel>{transaction.label}</TransactionLabel>
                        <TransactionValue>
                          {transaction.value >= 0 ? '+' : ''}{transaction.value.toLocaleString()}원
                        </TransactionValue>
                      </TransactionItem>
                    ))}
                  </CardContent>
                </Card>
              ))
            ) : (
              nextDayCards.map((card, index) => (
                <Card 
                  key={index} 
                  backgroundImage={card.backgroundImage} 
                  height={card.height} 
                >
                  <CardHeader>
                    <IconWrapper icon={card.icon} />
                    <CardTitle>{card.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {card.transactions.map((transaction, tIndex) => (
                      <TransactionItem key={tIndex}>
                        <TransactionLabel>{transaction.label}</TransactionLabel>
                        <TransactionValue>
                          {transaction.value.toLocaleString()}원
                        </TransactionValue>
                      </TransactionItem>
                    ))}
                  </CardContent>
                </Card>
              ))
            )}
          </CardContainer>
        </WalletContent>
      </ModalWrapper>
    </ThemeProvider>
  );
};

export default Wallet;
