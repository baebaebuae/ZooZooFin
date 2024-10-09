import styled from 'styled-components';
import { Modal } from '@components/root/modal';
import { LargeIcon } from '@components/root/icon';
import CharBoar from '@assets/images/characters/boar.png';

import { ActiveButton } from '@components/stock/common/button/Button';
import Image0 from '@assets/images/capital/0.png';
import Image1 from '@assets/images/capital/1.png';
import Image2 from '@assets/images/capital/2.png';
import Image3 from '@assets/images/capital/3.png';

const ClosedButton = styled(ActiveButton)`
    background-color: #67eb00;
    width: 100%;
    margin-top: 20px;
`;
const BubbleLineHighlight = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 10px;
    font-size: 15px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.tertiary};
    text-shadow:
        -2px 0 white,
        0 2px white,
        2px 0 white,
        0 -2px white;
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
`;

const CapitalImage = styled.img`
    width: 110%;
    height: 110%;
    object-fit: contain;
`;
const ScriptFor14 = [
    '왜 신용도가 낮아져?',
    '선이자가 뭐야?',
    '복리가 뭐야?',
    '왜 일시 상환을 하는거야?',
    '다 확인했어.',
];
const ImageList = [Image0, Image1, Image2, Image3];

const CapitalDescriptionModal = ({ index, onClose }) => {
    return (
        <Modal onClose={onClose}>
            <CapitalImage src={ImageList[index]} />

            <ClosedButton onClick={onClose}>닫기</ClosedButton>
        </Modal>
    );
};

export const CapitalModal = ({ index, onClose }) => {
    return <CapitalDescriptionModal index={index} onClose={onClose} />;
};
