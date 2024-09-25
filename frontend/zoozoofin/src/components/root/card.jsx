import styled from 'styled-components';

export const Card = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
    width: 240px;
    padding: 20px 30px;
    border-radius: 20px;
    border: 6px solid ${({ theme }) => theme.colors.primary};
    background: white;
`;

export const Divider = styled.div`
    width: 100%;
    height: 1px;
    margin: ${({ isLine }) => (isLine ? '4px' : '0px')};
    background-color: ${({ isLine, theme }) => (isLine ? theme.colors.background : 'transparent')};
`;
