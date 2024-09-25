import React from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const navigate = useNavigate();
    const url = new URL(window.location.href);
    const accessToken = url.searchParams.get('accessToken');
    const refreshToken = url.searchParams.get('refreshToken');

    useEffect(() => {
        console.log(accessToken, refreshToken);

        if (accessToken.length !== 0) {
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            // memberId -> animal 유무 체크
            navigate('../start');
        } else {
            console.error('카카오 인증 코드가 없습니다.');
        }
    }, [accessToken]);

    return <div>카카오 로그인 처리 중...</div>;
};

export default Auth;
