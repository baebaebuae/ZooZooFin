import styled from 'styled-components';

// 이런 버튼도 전체 Button이라는 공통 Component Style을 지정한 후 적용!
export const EnterButton = styled.button`
    font-family: 'OneMobilePop';
    border-radius: 26px;
    border: 5px solid #fff;
    background: var(--Primary---deep, #0069c3);
    padding: 10px 20px;
    color: white;
`;

export const LoginButtonBlock = styled.div`
    display: flex;
`;

const LoginButton = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 50%;
`;

export const KakaoButton = styled(LoginButton)`
    background-color: yellow;
`;
export const NaverButton = styled(LoginButton)`
    background-color: green;
`;
export const GoogleButton = styled(LoginButton)`
    background-color: blue;
`;
