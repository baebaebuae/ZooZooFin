import styled from 'styled-components';
import CharRabbit from '@assets/images/characters/rabbit.png';
// 현재 캐릭터 최종 레벨 불러오기

import { useNavigate } from 'react-router-dom';

const FinalLevelBlock = styled.div`
    height: 640px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
`;

const FinalLevel = styled.div`
    font-family: 'OneMobilePop';
    text-shadow:
        -2px 0px white,
        0px 2px white,
        2px 0px white,
        0px -2px white;
    color: ${({ theme }) => theme.colors.tertiaryDeep};
`;

const FinalLevelTitle = styled(FinalLevel)`
    font-size: 20px;
`;

const FinalLevelDividerBlock = styled.div`
    display: flex;
    align-items: center;
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
    font-size: 40px;
`;

const NextGameInfoBox = styled.div`
    background-color: white;
    color: ${({ theme }) => theme.colors.tertiaryDeep};
    font-weight: bold;
    text-align: center;
    border-radius: 20px;
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
    text-align: center;
    background-color: ${({ theme }) => theme.colors.bubble};
    color: ${({ theme }) => theme.colors.orange};
    font-family: 'OneMobilePop';
`;

const FinalButtonBlock = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
`;

const FinalButton = styled.div`
    text-align: center;
    font-weight: bold;
    border-radius: 50px;
    width: 160px;
    padding: 10px;
    border: 3px solid ${({ theme }) => theme.colors.tertiaryDeep};
`;

const FinalPortfolioButton = styled(FinalButton)`
    background-color: ${({ theme }) => theme.colors.bubble};
    color: ${({ theme }) => theme.colors.tertiaryDeep};
`;
const FinalCheckButton = styled(FinalButton)`
    background-color: ${({ theme }) => theme.colors.tertiaryDeep};
    color: white;
`;

const Ending = () => {
    const navigate = useNavigate();

    const endingType = 'happy';
    // 대출 상환 x, 직접 파산, 마지막 턴 마이너스일 경우
    // bad 1
    // 제 3금융 상환하지 못했을 경우
    // bad 2

    const charFinalLevel = 6; // 현재 캐릭터 정보에서 가져오기
    // happy, bad에 따라 -!
    const benefits = [2, 2, 2, 2, 10, 10, 20, 20, 20, 20];
    const penalties = [5, 10];

    const postEnding = () => {
        // post 함수

        // 로딩중 띄우기

        // navigate 함수
        navigate('/start');
    };

    return (
        <>
            <FinalLevelBlock>
                <FinalLevelTitle>최종 레벨</FinalLevelTitle>
                <FinalLevelDividerBlock>
                    <FinalLevelDividerCircle />
                    <FinalLevelDivider />
                    <FinalLevelDividerCircle />
                </FinalLevelDividerBlock>
                <FinalLevelValue>{charFinalLevel}</FinalLevelValue>
                <NextGameInfoBox>
                    <NextGameInfoBoxTitle>
                        다음 게임
                        {endingType === 'happy' ? ' 보상' : ' 패널티'}
                    </NextGameInfoBoxTitle>
                    <NextGameInfoBoxInside>
                        수익
                        {endingType === 'happy' ? ' +' : ' -'}
                        {/* {benefits[endingType][charFinalLevel - 1]} % */}
                        {endingType === 'happy'
                            ? `${benefits[charFinalLevel - 1]}`
                            : `${penalties[0]}`}
                        {/* 변수가 어떻게 넘어올지 몰라서 임의로 지정함 */}%
                    </NextGameInfoBoxInside>
                </NextGameInfoBox>
                <img src={CharRabbit} width={120} />

                <FinalButtonBlock>
                    <FinalPortfolioButton>최종 포트폴리오</FinalPortfolioButton>
                    <FinalCheckButton onClick={() => postEnding()}>다 확인했어!</FinalCheckButton>
                    {/* 최종 endingType 보내는 post 함수 */}
                </FinalButtonBlock>
            </FinalLevelBlock>
        </>
    );
};

export default Ending;
