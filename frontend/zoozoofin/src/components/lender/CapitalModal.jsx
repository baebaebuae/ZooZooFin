import styled from 'styled-components';
import { Modal } from '@components/root/modal';

import { ActiveButton } from '@components/stock/common/button/Button';

const ClosedButton = styled(ActiveButton)`
    background-color: #67eb00;
    width: 100%;
    margin-top: 20px;
`;
const BubbleLineHighlight = styled.span`
    font-size: 15px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.tertiary};
    text-shadow:
        -2px 0 white,
        0 2px white,
        2px 0 white,
        0 -2px white;
`;
const ScriptFor14 = [
    '왜 신용도가 낮아져?',
    '선이자가 뭐야?',
    '복리가 뭐야?',
    '왜 일시 상환을 하는거야?',
    '다 확인했어.',
];

const CapitalDescriptionModal = ({ index, onClose }) => {
    return (
        <Modal onClose={onClose}>
            <BubbleLineHighlight>{ScriptFor14[index]} </BubbleLineHighlight>
            <ClosedButton onClick={onClose}>닫기</ClosedButton>
        </Modal>
    );
};

export const CapitalModal = ({ index, onClose }) => {
    return <CapitalDescriptionModal index={index} onClose={onClose} />;
};
