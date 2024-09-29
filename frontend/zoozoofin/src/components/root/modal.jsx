import styled from 'styled-components';

const ModalBackground = styled.div`
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

const ModalBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 220px;
    min-height: 300px;
    padding: 40px 35px;
    border-radius: 40px;
    border: 10px solid white;
    background: ${({ theme }) => theme.colors.background};
    z-index: 1000;
`;

export const Modal = ({ children, onClose }) => {
    return (
        <ModalBackground onClick={onClose}>
            <ModalBox onClick={(e) => e.stopPropagation()}>{children}</ModalBox>
        </ModalBackground>
    );
};
