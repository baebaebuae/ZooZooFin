import { useState } from 'react';
import styled from 'styled-components';
import { Modal } from '@components/root/modal';
import Stamp from '@assets/images/components/stamp.svg?react';

const BlockTitle = styled.div`
    font-size: 16px;
    font-weight: bold;
    /* color: ${({ theme }) => theme.colors.primaryShadow}; */
    color: black;
    margin: 10px;
`;

const StampBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    width: 150px;
    height: 80px;
    border-radius: 20px;
    background-color: white;
`;

export const StampModal = ({ action, goToScript, handleCloseModal }) => {
    const [isClicked, setIsClicked] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(true);

    const applyStamp = async () => {
        setIsClicked(true);
        console.log('Stamp clicked, action will be called');

        await action();

        setTimeout(() => {
            console.log('Moving to the next script');
            goToScript();
        }, 1500);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        handleCloseModal();
    };

    return (
        <>
            {isModalOpen && (
                <Modal onClose={closeModal}>
                    <BlockTitle>박스를 눌러서</BlockTitle>
                    <BlockTitle>도장을 찍어주세요</BlockTitle>
                    <StampBox onClick={applyStamp}>
                        {isClicked && <Stamp width={60} height={60} />}
                    </StampBox>
                </Modal>
            )}
        </>
    );
};
