// 말풍선
import BubbleBlock from '@assets/images/components/bubbleBlock.svg?react';
import styled from 'styled-components';

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

const BadgeNormalStyle = styled.div`
    top: -20px;
    left: 40px;
    z-index: 1;
    font-size: 14px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    padding: 10px 14px;
    color: white;
    background-color: ${({ theme, color }) => theme.colors[color]};
    border: 2px solid white;
    position: absolute;
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
    line-height: 1.8;
    font-size: 14px;
    color: black;
`;

const ResponseBlock = styled.div`
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
    display: inline-flex;
    align-items: center;
`;

const ResponseSymbol = styled.span`
    margin-right: 5px;
`;

// 설명을 위한 모달 창
export const ExplainBubble = ({ npc, type, content, responses, onClick }) => {
    const parseContent = (content) => {
        const splitLines = content.split(/\n/);
        // const parts = splitLines.split(/(\*\*.*?\*\*)/); // 정규식

        return splitLines.map((line, lineIndex) => {
            const parts = line.split(/(\*\*.*?\*\*)/);
            return (
                <div key={lineIndex}>
                    {' '}
                    {parts.map((part, index) => {
                        if (part.startsWith('**') && part.endsWith('**')) {
                            return (
                                <BubbleLineHighlight key={index}>
                                    {part.slice(2, -2)}
                                </BubbleLineHighlight>
                            );
                        } else {
                            return <BubbleLine key={index}>{part}</BubbleLine>;
                        }
                    })}{' '}
                </div>
            );
        });
    };

    return (
        <BubbleContainer2>
            <BubbleContainer>
                <BadgeNormalStyle color={'tertiary'}>{npc}</BadgeNormalStyle>
                <BubbleBlockStyle />
                <BubbleBox>
                    <LineBlock>{parseContent(content)}</LineBlock>
                    <ResponseBlock>
                        {responses.map((response, index) => (
                            <ResponseButton key={index} onClick={() => onClick(index)}>
                                {response.selection && (
                                    <>
                                        <ResponseSymbol>▶ </ResponseSymbol>
                                        {response.selection}
                                    </>
                                )}
                            </ResponseButton>
                        ))}
                    </ResponseBlock>
                </BubbleBox>
            </BubbleContainer>
        </BubbleContainer2>
    );
};

export default ExplainBubble;
