import { useState } from 'react';
import styled from 'styled-components';
import { StampModal } from '@components/root/stampModal';

const Block = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

const Bankrupt = ({ action, goToScript }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <Block>
            <StampModal
                action={action}
                goToScript={goToScript}
                handleCloseModal={() => setIsModalOpen(false)}
            />
        </Block>
    );
};

export default Bankrupt;
