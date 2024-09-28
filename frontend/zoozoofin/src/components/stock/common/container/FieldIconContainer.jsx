import styled from 'styled-components';

// 주식 분야 아이콘
export const DefaultField = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 85px;
    height: 85px;
`;

export const DefaultFieldBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    width: 60px;
    height: 60px;
    border-radius: 50%;
`;

export const ActiveFieldBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.background};
    border: 5px solid white;
    width: 50px;
    height: 60px;
    border-radius: 50%;
`;

export const DefaultText = styled.p`
    margin: 0;
`;

export const AtciveText = styled.p`
    font-weight: bold;
    margin: 0;
    text-shadow:
        -1px 0 white,
        0 1px white,
        1px 0 white,
        0 -1px white;
`;
