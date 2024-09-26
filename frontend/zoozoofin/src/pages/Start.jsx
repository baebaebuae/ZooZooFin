import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    EnterButton,
    LoginButtonBlock,
    KakaoButton,
    NaverButton,
    GoogleButton,
} from '@styles/components/start/Buttons';
const API_URI = import.meta.env.VITE_URL;

const Start = () => {
    const [isEntered, setIsEntered] = useState(false); // API

    const handleEnter = () => {
        setIsEntered(true);
    };

    const handleSocialLogin = async (domain) => {
        window.location.href = `${API_URI}/oauth/${domain}`;
    };

    // const test = async () => {
    //     const apiClient = getApiClient();
    //     try {
    //         const res = await apiClient.get('/member/profile');
    //         console.log(res.data.message);
    //         console.log(res.data.body);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    return (
        <>
            <h1>시작화면</h1>
            {isEntered ? (
                <div style={{ backgroundColor: 'black' }}>
                    <EnterButton onClick={handleEnter}>입장 버튼</EnterButton>
                </div>
            ) : (
                <LoginButtonBlock>
                    소셜 로그인 버튼 Block
                    <KakaoButton onClick={() => handleSocialLogin('kakao')} />
                    <NaverButton onClick={() => handleSocialLogin('naver')} />
                    <GoogleButton onClick={() => handleSocialLogin('google')} />
                </LoginButtonBlock>
            )}
            <Link to="/tutorial">튜토리얼</Link>
            <Link to="/myroom">내 방</Link>
        </>
    );
};

export default Start;
