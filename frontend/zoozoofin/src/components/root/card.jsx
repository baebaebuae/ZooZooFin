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
