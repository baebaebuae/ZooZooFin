// 말풍선
import Bubble from '@assets/images/components/bubble.svg?react';
import styled from 'styled-components';

const BubbleContainer = styled.div`
    position: relative;
    width: 320px;
`;

const BubbleBox = styled.div`
    position: absolute;
    top: 50px;
    left: 50px;
    color: black;
`;

const BubbleLine = styled.div`
    margin-bottom: 8px;
    font-size: 14px;
`;

export const BubbleBubble = () => {
    return (
        <BubbleContainer>
            <Bubble width={320} />
            <BubbleBox>
                <BubbleLine>NPC 대사 1</BubbleLine>
                <BubbleLine>NPC 대사 2</BubbleLine>
                <BubbleLine>▶ 선택지 1</BubbleLine>
                <BubbleLine>▶ 선택지 2</BubbleLine>
            </BubbleBox>
        </BubbleContainer>
    );
};

export default BubbleBubble;
