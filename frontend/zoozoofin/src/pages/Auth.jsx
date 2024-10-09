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
        const apiClient = getApiClient();
        const fetchUserState = async () => {
            if (accessToken && accessToken.length > 0) {
                try {
                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('refreshToken', refreshToken);

                    const res = await apiClient.get('/member/animal');
                    if (res.status === 200){
                        const animalNumber = res.data.body.animalNumber;
                        if (animalNumber && animalNumber > 0){
                            navigate('../myroom');
                        } else {
                            navigate('../tutorial')
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
