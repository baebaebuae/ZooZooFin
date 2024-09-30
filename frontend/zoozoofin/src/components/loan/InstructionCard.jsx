import styled from 'styled-components';

const Background = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
`;

const Box = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 220px;
    min-height: 300px;
    padding: 40px 35px;
    border-radius: 40px;
    border: 10px solid white;
    background: ${({ theme }) => theme.colors.bubble};
    z-index: 1000;
`;

export const InstructionCard = ({ children }) => {
    return (
        <Background>
            <Box>{children}</Box>
        </Background>
    );
};
