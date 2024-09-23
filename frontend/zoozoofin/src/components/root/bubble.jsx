// 말풍선
import BubbleBlock from '@assets/images/components/bubbleBlock.svg?react';
import styled from 'styled-components';
import { BadgeNormal } from './badge';

const BubbleContainer2 = styled.div`
    position: fixed;
    bottom: 0;
`;

const BubbleContainer = styled.div`
    position: relative;
    /* width: 320px; */
    margin: 20px 0px;
`;

const BubbleBlockStyle = styled(BubbleBlock)`
    width: 380px;
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
    top: 30px;
    left: 50px;
    width: 260px;
`;

const LineBlock = styled.div`
    margin-bottom: 12px;
`;

const BubbleLine = styled.span`
    text-align: left;
    margin-bottom: 8px;
    line-height: 1.4;
    font-size: 14px;
    color: black;
`;

const HighlightBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 6px;
`;

const BubbleLineHighlight = styled.span`
    font-size: 14px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.tertiary};
`;

const ResponseButton = styled.button`
    font-family: 'OneMobile';
    font-size: 14px;
    background-color: transparent;
    border: none;
`;

export const Bubble = ({ npc, type, content, responses, onClick }) => {
    const parseContent = (content) => {
        const parts = content.split(/(\*\*.*?\*\*)/); // 정규식
        // console.log(parts);
        return parts.map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <BubbleLineHighlight key={index}>{part.slice(2, -2)}</BubbleLineHighlight>;
            } else {
                return <BubbleLine key={index}>{part}</BubbleLine>;
            }
        });
    };

    // responses의 length가 1이면
    // 전체 클릭으로 넘어갈 수 있도록 설정
    // responseKey만 넘겨주기
    // Object.keys(responses)[0]
    // BubbleContainer에만 설정

    const handleContainerClick = (responses) => {
        const currentKey = Object.keys(responses)[0];
        if (Object.keys(responses).length === 1 && currentKey === 'next') {
            onClick(currentKey);
        }
    };

    // console.log(Object.keys(responses).length);

    return (
        <BubbleContainer2>
            <BubbleContainer onClick={() => handleContainerClick(responses)}>
                <BadgeNormalStyle>{npc}</BadgeNormalStyle>
                <BubbleBlockStyle />
                <BubbleBox>
                    <LineBlock>{parseContent(content)}</LineBlock>
                    <HighlightBlock>
                        {Object.keys(responses).map((responseKey, index) => (
                            <ResponseButton key={index} onClick={() => onClick(responseKey)}>
                                ▶ {responseKey}
                            </ResponseButton>
                        ))}
                    </HighlightBlock>
                </BubbleBox>
            </BubbleContainer>
        </BubbleContainer2>
    );
};

export default Bubble;
