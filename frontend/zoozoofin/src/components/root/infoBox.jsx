// 주의사항 확인, 대출 가능/불가능 등 정보 알려주는 박스
import styled from 'styled-components';

const InfoBoxBlock = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4px;
    width: 90%;
    height: 30px;
    padding: 25px 0px;
    color: white;
    border-radius: 30px;
    background-color: ${({ theme, color }) => theme.colors[color]};
`;

const InfoTitle = styled.div`
    font-size: 12px;
`;

const InfoTitleHighlight = styled.span`
    font-weight: bold;
`;

const InfoValue = styled.div`
    font-size: 18px;
    font-weight: bold;
`;

export const InfoBox = ({ color, infoContent }) => {
    return (
        <>
            <InfoBoxBlock color={color}>
                <InfoValue>{infoContent}</InfoValue>
            </InfoBoxBlock>
        </>
    );
};

export const LaptopInfoBox = ({ color, infoTitle, infoContent }) => {
    const userName = '토토';

    return (
        <>
            <InfoBoxBlock color={color}>
                <InfoTitle>
                    {userName && <InfoTitleHighlight>{userName}</InfoTitleHighlight>}
                    {infoTitle}
                </InfoTitle>
                <InfoValue>{infoContent}</InfoValue>
            </InfoBoxBlock>
        </>
    );
};
