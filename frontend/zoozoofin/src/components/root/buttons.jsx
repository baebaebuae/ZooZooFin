import styled from 'styled-components';

export const Button = styled.div`
    color: white;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 28px;
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.primaryDeep};
`;

export const ButtonBase = styled.button`
    color: white;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 28px;
    cursor: pointer;
    font-family: ${({ size }) => (size === 'small' ? 'OneMobile' : 'OneMobilePop')};
    background-color: ${({ theme, color }) => theme.colors[color]};
    padding: ${({ size }) =>
        size === 'small' ? '6px 10px' : size === 'large' ? '12px 20px' : '8px 12px'};
    font-size: ${({ size }) => (size === 'small' ? '10px' : size === 'large' ? '24px' : '14px')};
    border: ${({ isBorder }) => (isBorder ? `5px solid white` : 'none')};
`;

export const BasicButton = styled(Button)`
    font-family: 'OneMobilePop';
`;

export const TinyButton = styled(Button)`
    font-size: 10px;
    padding: 6px 10px;
    cursor: pointer;
`;

export const TinyButtonBorderBlank = styled(Button)`
    font-size: 10px;
    padding: 6px 10px;
    border: 1px solid #0069c3;
    background: white;
    color: gray;
`;
