// 진행도 바(ex. 대출 상환 진행도)
import styled from 'styled-components';

const ProgressBoxStyle = styled.div`
    width: 250px;
    color: gray;
`;

const ProgressTitle = styled.div`
    font-size: 12px;
    margin-bottom: 6px;
`;

const ProgressBarBack = styled.div`
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

export default function ProgressBox({ rate, restTurn }) {
    return (
        <ProgressBoxStyle>
            <ProgressTitle>Title</ProgressTitle>
            <ProgressBarBack>
                <ProgressBarFront $rate={rate} />
            </ProgressBarBack>
            <ProgressInfoBox>
                <ProgressRate>
                    <BoldText>{rate}%</BoldText>
                    진행중🔥
                </ProgressRate>
                <RestTurn>
                    남은 만기 회차<BoldText>{restTurn}턴</BoldText>
                </RestTurn>
            </ProgressInfoBox>
        </ProgressBoxStyle>
    );
}
