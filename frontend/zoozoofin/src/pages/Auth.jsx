import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getApiClient } from '@stores/apiClient';

const Auth = () => {
    const navigate = useNavigate();
    const url = new URL(window.location.href);
    const accessToken = url.searchParams.get('accessToken');
    const refreshToken = url.searchParams.get('refreshToken');
    
    useEffect(() => {
        
        const fetchUserState = async () => {
            if (accessToken && accessToken.length > 0) {
                try {
                    // console.log(accessToken, refreshToken);
                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('refreshToken', refreshToken);
                    const apiClient = getApiClient();
                    const res = await apiClient.get('/member/animal');
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
                                    isActivated: isStarted
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

    return <div>Loading</div>;
};

export default Auth;
