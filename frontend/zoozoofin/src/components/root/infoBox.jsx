// 주의사항 확인, 대출 가능/불가능 등 정보 알려주는 박스
import styled from 'styled-components';

export const InfoBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 250px;
    height: 30px;
    padding: 12px 0px;
    font-size: 18px;
    font-weight: bold;
    color: white;
    border-radius: 20px;
    background-color: ${({ theme, color }) => theme.colors[color]};
`;
