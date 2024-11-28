// 진행도 바(ex. 대출 상환 진행도)
import styled from 'styled-components';

const ProgressBoxContainer = styled.div`
    width: 250px;
    width: 100%;
    color: gray;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ProgressBarBack = styled.div`
    width: 250px;
    border-radius: 10px;
    height: 20px;
    background-color: ${({ theme }) => theme.colors.background};
`;

const ProgressBarFront = styled.div`
    border-radius: 10px;
    width: ${(props) => (props.$rate ? `${props.$rate * 2.5}px` : '0px')};
    height: 20px;
    background-color: ${({ theme }) => theme.colors.tertiary};
`;

const ProgressInfoBox = styled.div`
    width: 90%;
    display: flex;
    justify-content: space-between;
    margin-top: 4px;
`;
const ProgressRate = styled.div`
    font-size: 10px;
`;
const RestTurn = styled.div`
    font-size: 10px;
`;

const BoldText = styled.span`
    margin: 0px 4px;
    font-weight: bold;
`;

export default function ProgressBox({ isLoan, rate, restTurn }) {
    return (
        <ProgressBoxContainer>
            <ProgressBarBack>
                <ProgressBarFront $rate={rate} />
            </ProgressBarBack>
            <ProgressInfoBox>
                <ProgressRate>
                    <BoldText>{rate}%</BoldText>
                    {isLoan ? '갚았어요!🔥' : '진행중🔥'}
                </ProgressRate>
                {isLoan ? null : (
                    <RestTurn>
                        남은 만기 회차<BoldText>{restTurn}턴</BoldText>
                    </RestTurn>
                )}
            </ProgressInfoBox>
        </ProgressBoxContainer>
    );
}
