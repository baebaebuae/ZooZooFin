import styled from 'styled-components';
import React from 'react';

const Button = styled.button`
    width: 262px;
    height: 68px;
    font-family: 'OneMobilePop', cursive;
    font-size: 24px;
    color: #fff;
    text-shadow:
        0px 2px 0px rgba(79, 79, 79, 0.6),
        0px 2px 8px rgba(0, 0, 0, 0.25);
    background: ${(props) =>
        `linear-gradient(340deg, ${props.$startColor || '#737373'} 8.88%, ${props.$endColor || '#d9d9d9'} 83.05%)`};

    box-shadow:
        0px 19px 5px 0px rgba(0, 0, 0, 0),
        0px 12px 5px 0px rgba(0, 0, 0, 0.04),
        0px 7px 4px 0px rgba(0, 0, 0, 0.12),
        0px 3px 3px 0px rgba(0, 0, 0, 0.2),
        0px 1px 2px 0px rgba(0, 0, 0, 0.24),
        0px 0px 0px 0px rgba(0, 0, 0, 0.24);

    border-radius: 24px;
    border: 4px solid #6e6f44;
    display: flex;
    align-items: center;
    justify-content: center;

    gap: 5px;
`;
const Emoji = styled.span`
    font-size: 22px;
`;

const GameButton = ({ onClick, emoji, text, $startColor, $endColor }) => {
    return (
        <Button onClick={onClick} $startColor={$startColor} $endColor={$endColor}>
            <Emoji>{emoji}</Emoji>
            {text}
            <Emoji>{emoji}</Emoji>
        </Button>
    );
};

export default GameButton;
