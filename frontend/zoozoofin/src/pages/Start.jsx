import { useState } from 'react';
import {
    EnterButton,
    LoginButtonBlock,
    KakaoButton,
    NaverButton,
    GoogleButton,
} from '../styles/components/start/Buttons';

const Start = () => {
    const [isEntered, setIsEntered] = useState(false);

    const handleEnter = () => {
        setIsEntered(true);
    };

    return (
        <>
            <h1>시작화면</h1>
            {!isEntered ? (
                <div style={{ backgroundColor: 'black' }}>
                    <EnterButton onClick={handleEnter}>입장 버튼</EnterButton>
                </div>
            ) : (
                <LoginButtonBlock>
                    소셜 로그인 버튼 Block
                    <KakaoButton />
                    <NaverButton />
                    <GoogleButton />
                </LoginButtonBlock>
            )}
        </>
    );
};

export default Start;
