import styled from 'styled-components';

// SmallButton,LargeButton으로 파일 분리 예정 - 이유: color 분리

export const Button = styled.div`
    color: white;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 28px;
    background-color: ${({ theme }) => theme.colors.primaryDeep};
`;

export const BasicButton = styled(Button)`
    font-family: 'OneMobilePop';
`;

export const SmallButton = styled(BasicButton)`
    font-size: 14px;
    height: 20px;
    padding: 10px 20px;
`;

export const SmallButtonBorder = styled(SmallButton)`
    border: 5px solid white;
`;

export const NormalButton = styled(BasicButton)`
    font-size: 24px;
    padding: 14px 28px;
`;

export const NormalButtonBorder = styled(NormalButton)`
    border: 5px solid white;
`;

export const TinyButton = styled(Button)`
    font-size: 10px;
    padding: 6px 10px;
`;
export const TinyButtonBorderBlank = styled(Button)`
    font-size: 10px;
    padding: 6px 10px;
    border: 1px solid #0069c3;
    background: white;
    color: gray;
`;
