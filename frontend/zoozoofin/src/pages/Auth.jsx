import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getApiClient } from '@stores/apiClient';
import { Loader } from '@components/Loader';

const Auth = () => {
    const navigate = useNavigate();
    const url = new URL(window.location.href);
    const accessToken = url.searchParams.get('accessToken');
    const refreshToken = url.searchParams.get('refreshToken');
    
    useEffect(() => {
        
        const fetchUserState = async () => {
            if (accessToken && accessToken.length > 0) {
                try {
                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('refreshToken', refreshToken);
                    const apiClient = getApiClient();
                    const res = await apiClient.get('/member/start');
                    if (res.status === 200){
                        const isStarted = res.data.body.isStarted;
                        const isActivated = res.data.body.isActivated;
                        
                        if (isStarted && isActivated){
                            // play 여부
                            navigate('../myroom');
                        } else {
                            // re-play 여부
                            navigate('../createanimal', {
                                state: {
                                    isStarted: isStarted
                                }
                            });
                        }
                    } else {
                        console.error(res.status)
                    }
                } catch (error) {
                    console.error(error);
                }

            } else {
                console.error('인증 실패');
            }
        };
        fetchUserState();
    }, [accessToken, refreshToken]);

    return <Loader loadingText={'로딩 중...'} />;
};

export default Auth;
