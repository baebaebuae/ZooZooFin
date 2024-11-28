import { useState } from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';
import { Button } from '@components/root/buttons';
import mungmung from '@assets/images/characters/mungmungprofile.png';
import { useNavigate } from 'react-router-dom';
import useUserStore from '@stores/useUserStore';
import useAnimalInfoStore from '@/stores/useAnimalInfoStore';
import { Loader } from '@components/Loader';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'ONE Mobile POP';
    src: url('/assets/fonts/ONE Mobile POP.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }
`;

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
    justify-content: center;
    align-items: center;
    width: 280px;
    padding: 30px 20px;
    border-radius: 40px;
    border: 10px solid white;
    background: ${({ theme }) => theme.colors.background};
    z-index: 1001;
`;

const HeaderWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 20px;
`;

const Title = styled.h2`
    font-size: 20px;
    margin-left: 10px;
    text-align: left;
    font-weight: bold;
`;

const Subtitle = styled.p`
    font-size: 15px;
    color: ${({ theme }) => theme.colors.gray};
    margin-top: -10px;
    text-align: center;
`;

const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 20px;
    padding: 0 10px;
`;

const StyledButton = styled(Button)`
    width: 45%;
    border: 4px solid white;
    font-size: 15px;
    padding: 5px 10px;
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

const WarningMessage = styled.p`
    color: ${({ theme }) => theme.colors.warn};
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    margin-top: 10px;
    padding: 5px;
    border: 2px solid ${({ theme }) => theme.colors.warn};
    border-radius: 5px;
`;

const EndGameMessage = styled.p`
    color: ${({ theme }) => theme.colors.primaryDeep};
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    margin-top: 10px;
    padding: 5px;
    border: 2px solid ${({ theme }) => theme.colors.primaryDeep};
    border-radius: 5px;
`;

const NextTurn = ({ isOpen, onClose, onConfirm, bankruptcyRisk }) => {
    const navigate = useNavigate();
    const { turn, animalAssets } = useUserStore();
    const { animalName } = useAnimalInfoStore();
    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen) return null;

    const handleConfirm = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            if (turn === 50) {
                const endingType = animalAssets >= 0 ? 'A001' : 'A002';
                navigate('/ending', {
                    state: {
                        endingType: endingType,
                    },
                });
            } else {
                onConfirm();
                onClose();
            }
        }, 1000);
    };

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            {isLoading ? ( // 로딩 상태일 때 로딩창 표시
                <ModalBackground>
                    <ModalBox>
                        <Title>잠자러 가는중...</Title>
                    </ModalBox>
                </ModalBackground>
            ) : (
                <ModalBackground onClick={onClose}>
                    <ModalBox onClick={(e) => e.stopPropagation()}>
                        <CloseButton onClick={onClose}>&times;</CloseButton>
                        <HeaderWrapper>
                            <IconWrapper>
                                <img
                                    src={mungmung}
                                    alt="Mungmung Character"
                                    width="60"
                                    height="60"
                                />
                            </IconWrapper>
                            <Title>이제 자러 가는거야?</Title>
                        </HeaderWrapper>
                        <Subtitle>잠을 자면 이번 턴이 마무리되고, 다음 턴으로 넘어가요.</Subtitle>
                        {turn === 50 && (
                            <EndGameMessage>
                                ⚠️ 주의! 이번 턴이 마지막 턴이에요. ⚠️
                                <br />
                                {animalName} 캐릭터가 종료됩니다!
                            </EndGameMessage>
                        )}
                        {bankruptcyRisk && (
                            <WarningMessage>
                                ⚠️주의! 다음 턴에 파산이야!⚠️
                                <br />
                                (부족액: {bankruptcyRisk.deficit})
                            </WarningMessage>
                        )}
                        <ButtonWrapper>
                            <StyledButton size="large" color="primary" onClick={handleConfirm}>
                                {turn === 50 ? '게임 끝내기' : '응! 잘래'}
                            </StyledButton>
                            <StyledButton size="large" color="tertiary" onClick={onClose}>
                                아직이야!
                            </StyledButton>
                        </ButtonWrapper>
                    </ModalBox>
                </ModalBackground>
            )}
        </ThemeProvider>
    );
};

export default NextTurn;
