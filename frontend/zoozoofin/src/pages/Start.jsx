import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import LogoMain from '@assets/images/icons/logo_main.svg';
import Google from '@assets/images/icons/start/google.png';
import Naver from '@assets/images/icons/start/naver.png';
import Kakao from '@assets/images/icons/start/kakao.png';

const StartBlock = styled.div`
    height: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 50px;
`;

const LoginButtonBlock = styled.div`
    height: 50px;
    display: flex;
    gap: 20px;
`;

const LoginButton = styled.img`
    width: 50px;
    height: 50px;
`;

const blinkAnimation = keyframes`
 0% {
    opacity: 1;
  }
  40% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const StartTextBox = styled.div`
    height: 30px;
    font-weight: bold;
    text-shadow:
        -1px -1px 0 white,
        1px -1px 0 white,
        -1px 1px 0 white,
        1px 1px 0 white;
`;

const StartTextAnimated = styled(StartTextBox)`
    animation: ${blinkAnimation} 2s infinite;
`;

const API_URI = import.meta.env.VITE_URL;

const Start = () => {
    const [isEntered, setIsEntered] = useState(false); // API

    const handleEnter = () => {
        setIsEntered(true);
    };

    const handleSocialLogin = async (domain) => {
        window.location.href = `${API_URI}/oauth/${domain}`;
        window.location.href = '/myroom';
    };

    return (
        <>
            {isEntered ? (
                <>
                    <StartBlock>
                        <StartTextBox>소셜 로그인</StartTextBox>
                        <LoginButtonBlock>
                            <LoginButton src={Google} onClick={() => handleSocialLogin('google')} />
                            <LoginButton src={Kakao} onClick={() => handleSocialLogin('kakao')} />
                            <LoginButton src={Naver} onClick={() => handleSocialLogin('naver')} />
                        </LoginButtonBlock>
                    </StartBlock>
                </>
            ) : (
                <StartBlock onClick={handleEnter}>
                    <img src={LogoMain} width={250} />
                    <StartTextAnimated>- 터치로 주주시티 입장 -</StartTextAnimated>
                </StartBlock>
            )}
        </>
    );
};

export default Start;
