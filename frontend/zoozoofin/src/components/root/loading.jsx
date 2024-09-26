import styled from 'styled-components';
import { Modal } from '@components/root/modal';

const BlockTitle = styled.div`
    font-size: 16px;
    font-weight: bold;
    color: black;
    margin: 10px;
`;

export const Loading = ({ content }) => {
    const applyStamp = () => {
        setTimeout(() => {}, 1500);
    };

    return (
        <Modal>
            <BlockTitle>{content}</BlockTitle>
        </Modal>
    );
};
