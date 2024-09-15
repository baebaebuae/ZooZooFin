// 주의사항 확인, 대출 가능/불가능 등 정보 알려주는 박스
import styled from 'styled-components';

const InfoBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 260px;
    height: 70px;
    height: 16px 0px;
    color: white;
    border-radius: 30px;
`;

export const InfoBoxPrimary = styled(InfoBox)`
    background-color: ${({ theme }) => theme.colors.primaryDeep};
`;

export const InfoBoxWarn = styled(InfoBox)`
    background-color: ${({ theme }) => theme.colors.warn};
`;
