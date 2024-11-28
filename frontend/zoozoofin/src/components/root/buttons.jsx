import styled from 'styled-components';

export const Button = styled.button`
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
    border: ${({ $isBorder }) => ($isBorder ? `5px solid white` : 'none')};
`;

export const SmallBlankButton = styled.button`
    color: white;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 28px;
    background-color: ${({ theme, color }) => theme.colors[color]};
    padding: 6px 10px;
    font-size: 10px;
    border: ${({ $isBorder, color }) =>
        $isBorder ? `1px solid  ${({ theme }) => theme.colors[color]}` : 'none'};
`;

export const LoanButton = styled(Button)`
    background-color: ${({ theme, $isSelected }) => ($isSelected ? theme.colors.yellow : 'white')};
    border: ${({ theme, $isSelected }) =>
        $isSelected ? 'none' : `2px solid ${theme.colors.yellow}`};
    color: ${({ theme, $isSelected }) => ($isSelected ? 'white' : theme.colors.gray)};
`;

export const StampButton = ({ onClick }) => {
    return (
        <>
            <Button size={'normal'} $isBorder={true} color={'primary'} onClick={onClick}>
                서명하기
            </Button>
        </>
    );
};
