// 말풍선
import BubbleBlock from '@assets/images/components/bubbleBlock.svg?react';
import styled from 'styled-components';
import { BadgeNormal } from './badge';

const BubbleContainer = styled.div`
    position: relative;
    width: 320px;
    margin: 20px 0px; // 삭제 예정
`;

const BubbleBlockStyle = styled(BubbleBlock)`
    width: 320px;
    height: auto;
    position: relative;
`;

const BadgeNormalStyle = styled(BadgeNormal)`
    position: absolute;
    top: -20px;
    left: 40px;
    z-index: 1;
`;

const BubbleBox = styled.div`
    position: absolute;
    top: 24px;
    left: 50px;
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 220px;
`;

const BubbleLine = styled.div`
    text-align: left;
    margin-bottom: 8px;
    line-height: 1.4;
    font-size: 14px;
    color: black;
`;

const BubbleLineHighLight = styled.span`
    font-weight: bold;
    color: ${({ theme }) => theme.colors.tertiary};
`;

export const Bubble = ({ npc, content, response1, response2 }) => {
    return (
        <BubbleContainer>
            <BadgeNormalStyle>{npc}</BadgeNormalStyle>
            <BubbleBlockStyle />
            <BubbleBox>
                <BubbleLine>
                    <BubbleLineHighLight>강조내용: Script 형식과 맞출 예정</BubbleLineHighLight>
                </BubbleLine>
                <BubbleLine>{content}</BubbleLine>
                <BubbleLine>▶ {response1}</BubbleLine>
                <BubbleLine>▶ {response2}</BubbleLine>
            </BubbleBox>
        </BubbleContainer>
    );
};

export default Bubble;
