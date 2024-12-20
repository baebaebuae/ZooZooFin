import styled, { keyframes } from 'styled-components';
import { useState, useEffect } from 'react';
import CharRabbit from '@assets/images/characters/rabbit.png';
import { useNavigate, useLocation } from 'react-router-dom';

import { getApiClient } from '@stores/apiClient';
import { useAnimalStore } from '../store.js';

const FinalLevelBlock = styled.div`
    height: 640px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    z-index: 1000000;
`;

const FinalLevel = styled.div`
    font-family: 'OneMobilePop';
    text-shadow:
        -2px 0px white,
        0px 2px white,
        2px 0px white,
        0px -2px white;
    color: ${({ theme }) => theme.colors.tertiaryDeep};
    z-index: 1000000;
`;

const FinalLevelTitle = styled(FinalLevel)`
    font-size: 20px;
    z-index: 1000000;
`;

const FinalLevelDividerBlock = styled.div`
    display: flex;
    align-items: center;
    z-index: 1000000;
`;
const FinalLevelDividerCircle = styled.div`
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.orange};
`;

const FinalLevelDivider = styled.div`
    height: 2.5px;
    width: 240px;
    background-color: ${({ theme }) => theme.colors.tertiaryDeep};
`;

const FinalLevelValue = styled(FinalLevel)`
    font-size: 28px;
`;

const NextGameInfoBox = styled.div`
    margin: 10px 0;
    background-color: white;
    color: ${({ theme }) => theme.colors.tertiaryDeep};
    font-weight: bold;
    font-size: 12px;
    text-align: center;
    border-radius: 20px;
    z-index: 1000000;
`;

const NextGameInfoBoxTitle = styled.div`
    margin: 12px 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const NextGameInfoBoxInside = styled.div`
    border-radius: 20px;
    padding: 20px 50px;
    margin: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-size: 16px;
    background-color: ${({ theme }) => theme.colors.bubble};
`;

const NextGameInfoBoxInsideTitle = styled.div`
    font-family: 'OneMobilePop';
    color: ${({ theme }) => theme.colors.tertiaryDeep};
`;

const NextGameInfoBoxInsideValue = styled(NextGameInfoBoxInsideTitle)`
    /* margin-top: 10px; */
    color: ${({ theme }) => theme.colors.orange};
`;

const FinalButtonBlock = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    z-index: 1000000;
`;

const FinalButton = styled.div`
    text-align: center;
    font-weight: bold;
    border-radius: 50px;
    width: 160px;
    padding: 10px;
`;

const FinalPortfolioButton = styled(FinalButton)`
    background-color: ${({ theme }) => theme.colors.bubble};
    color: ${({ theme }) => theme.colors.tertiaryDeep};
    border: 3px solid ${({ theme }) => theme.colors.tertiaryDeep};
`;
const FinalCheckButton = styled(FinalButton)`
    background-color: ${({ theme }) => theme.colors.tertiaryDeep};
    border: 3px solid white;
    color: white;
`;

const CharImage = styled.img`
    z-index: 1000000;
`;

const fadeInBlur = keyframes`
  0% {
    opacity: 0;
    filter: blur(10px);
  }
  100% {
    opacity: 1;
    filter: blur(0);
  }
`;

// 사라지는 애니메이션
const fadeOutBlur = keyframes`
  0% {
    opacity: 1;
    filter: blur(0);
  }
  100% {
    opacity: 0;
    filter: blur(10px);
  }
`;

const FinalMessageBlock = styled.div`
    color: ${({ theme }) => theme.colors.tertiaryDeep};
    font-weight: bold;
    text-shadow:
        -1px 0px white,
        0px 1px white,
        1px 0px white,
        0px -1px white;
    font-size: 18px;
    animation: ${({ $isFadingOut }) => ($isFadingOut ? fadeOutBlur : fadeInBlur)} 1s ease-in-out
        forwards;
    z-index: 1000000;
`;

const endGame = async (animalId, endingType) => {
    const apiClient = getApiClient();
    console.log('Starting endGame function');
    console.log('animalId:', animalId);
    console.log('endingType:', endingType);

    const productData = {
        endingType: endingType,
    };

    try {
        console.log('Sending POST request to /ending');
        console.log(productData);
        const res = await apiClient.post('ending', productData);

        console.log('Response received:', res);
        if (res.status === 200) {
            console.log('Ending successfully processed');
            console.log(res.data);
        } else {
            console.error('Unexpected status code:', res.status);
        }
    } catch (error) {
        console.error('Error in endGame:', error);
        return error;
    }
};

const Ending = () => {
    const [characterData, setCharacterData] = useState(null);

    const [content, setContent] = useState(1);
    const [isFadingOut, setIsFadingOut] = useState(false);

    const navigate = useNavigate();
    const { nowAnimal } = useAnimalStore();

    useEffect(() => {
        if (content <= 3) {
            const timer = setTimeout(() => {
                setIsFadingOut(true);
                const fadeOutTimer = setTimeout(() => {
                    setContent(content + 1);
                    setIsFadingOut(false);
                }, 2000);

                return () => clearTimeout(fadeOutTimer);
            }, 3000);

            return () => clearTimeout(timer);
        }

        if (content === 5) {
            const timer = setTimeout(() => {
                setIsFadingOut(true);

                const fadeOutTimer = setTimeout(() => {
                    navigate('/createanimal');
                }, 2000);

                return () => clearTimeout(fadeOutTimer);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [content, navigate]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiClient = getApiClient();
                const response = await apiClient.get('/animal/info');
                console.log(response);
                if (response.data && response.data.body) {
                    setCharacterData(response.data.body);
                } else {
                    console.log('No data received from API, using fallback data');
                }
            } catch (error) {
                console.error('Error fetching character data:', error);
                console.log('Using fallback data due to error');
            }
        };

        fetchData();
    }, []);

    const postEnding = (animalId, endingType) => {
        endGame(animalId, endingType);
        setContent(content + 1);
    };

    const receivedEndingType = location.state ? location.state.endingType : 'A001';

    const charFinalLevel = characterData ? characterData.animalHierarchy : '계급 없음';

    // happy, bad에 따라, 레벨에 따라 보상 차등 지급

    // 기본 100만원 + ?%
    const benefits = {
        '가난한 당근': 1, // 1000000 당근
        '당근 알바생': 1.01, // 1010000 당근
        '당근 매니저': 1.05, // 1050000 당근
        '당근 부장': 2, // 2000000 당근
        '당근 전무': 6, // 6000000 당근
        '당근 사장': 8, // 8000000 당근
        '당근 투자왕': 10, // 11000000 당근
        '계급 없음': 0,
    };

    const penalties = [5, 10];

    const finalMessages = [
        '게임이 모두 종료되었어.',
        '주주시티에서 즐거운 시간 보냈니?',
        '마지막으로 최종 레벨과 결과를 확인해보자!',
        '',
        '그 동안 함께해서 정말 즐거웠어. 또 보자!',
    ];

    return (
        <>
            <FinalLevelBlock>
                {content < 4 && (
                    <FinalMessageBlock $isFadingOut={isFadingOut}>
                        {finalMessages[content - 1]}
                    </FinalMessageBlock>
                )}
                {content === 5 && (
                    <FinalMessageBlock $isFadingOut={isFadingOut}>
                        {finalMessages[content - 1]}
                    </FinalMessageBlock>
                )}
                {content === 4 && (
                    <>
                        <FinalLevelTitle>최종 계급</FinalLevelTitle>
                        <FinalLevelDividerBlock>
                            <FinalLevelDividerCircle />
                            <FinalLevelDivider />
                            <FinalLevelDividerCircle />
                        </FinalLevelDividerBlock>
                        <FinalLevelValue>{charFinalLevel}</FinalLevelValue>
                        <NextGameInfoBox>
                            <NextGameInfoBoxTitle>
                                다음 게임
                                {receivedEndingType === 'A001' ? ' 보상' : ' 패널티'}
                            </NextGameInfoBoxTitle>
                            <NextGameInfoBoxInside>
                                {charFinalLevel === '가난한 당근' ||
                                charFinalLevel === '계급 없음' ? (
                                    <NextGameInfoBoxInsideTitle>
                                        보상 없음
                                    </NextGameInfoBoxInsideTitle>
                                ) : (
                                    <>
                                        <NextGameInfoBoxInsideTitle>
                                            초기 자본
                                        </NextGameInfoBoxInsideTitle>
                                        <NextGameInfoBoxInsideValue>
                                            {receivedEndingType === 'A001' ? ' x ' : ' x -'}
                                            {receivedEndingType === 'A001'
                                                ? benefits[charFinalLevel]
                                                    ? benefits[charFinalLevel]
                                                    : 0
                                                : penalties[0]}
                                        </NextGameInfoBoxInsideValue>
                                    </>
                                )}
                            </NextGameInfoBoxInside>
                        </NextGameInfoBox>
                        <CharImage src={CharRabbit} width={120} />

                        <FinalButtonBlock>
                            {/* <FinalPortfolioButton>최종 포트폴리오</FinalPortfolioButton> */}
                            {/* 최종 endingType 보내는 post 함수 */}
                            <FinalCheckButton
                                onClick={() => postEnding(nowAnimal.animalId, receivedEndingType)}
                            >
                                다 확인했어!
                            </FinalCheckButton>
                        </FinalButtonBlock>
                    </>
                )}
            </FinalLevelBlock>
        </>
    );
};

export default Ending;
