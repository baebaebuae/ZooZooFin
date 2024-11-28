import styled from 'styled-components';
import { Modal } from '@components/root/modal';
import CircularProgress from '@mui/material/CircularProgress';

const BlockTitle = styled.div`
    font-size: 20px;
    font-weight: bold;
    /* color: ${({ theme }) => theme.colors.gray}; */
    color: black;

    margin-bottom: 50px;
`;

export const Loading = ({ content }) => {
    return (
        <Modal>
            <BlockTitle>{content}</BlockTitle>
            <svg width={0} height={0}>
                <defs>
                    <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#67EB00" />
                        <stop offset="100%" stopColor="#08B9FF" />
                    </linearGradient>
                </defs>
            </svg>
            <CircularProgress
                size={60}
                color="primary"
                sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }}
            />
        </Modal>
    );
};
