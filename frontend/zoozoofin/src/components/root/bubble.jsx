// 말풍선
import Bubble from '@assets/images/bubble.svg?react';
import styled from 'styled-components';

export const BubbleBox = styled.div`
    width: 100px;
`;

const BubbleBubble = () => {
    return <Bubble width={320} />;
};

export default BubbleBubble;
