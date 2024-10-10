import axios from 'axios';
const API_URL = import.meta.env.VITE_URL;

export const createApiClient = (accessToken) => {
    if (!accessToken) {
        console.error('createApiClient: accessToken이 제공되지 않았습니다.');
        throw new Error('Access token is required to create an API client.');
    }
    return axios.create({
        baseURL: API_URL,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};

const getAccessToken = () => localStorage.getItem('accessToken');
const getRefreshToken = () => localStorage.getItem('refreshToken');
const setAccessToken = (token) => localStorage.setItem('accessToken', token);
const setRefreshToken = (token) => localStorage.setItem('refreshToken', token);
const clearAccessToken = () => localStorage.removeItem('accessToken');
const clearRefreshToken = () => localStorage.removeItem('refreshToken'); 

export const isLoggedIn = () => !!getAccessToken();

export const getApiClient = () => {
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();
    if (accessToken) {
        console.log('getApiClient: accessToken이 존재합니다.');
    }
    const apiClient = createApiClient(accessToken);

    apiClient.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
           
            const originalRequest = error.config;
            if (originalRequest._retry) {
                console.error('Refresh token request failed again, stopping further requests.');
                return Promise.reject(new Error('Unauthorized, please log in again.'));
            }
            originalRequest._retry = true;
            if (error.response?.data.httpStatus === 401 && !originalRequest._retry) {
                try {
                    if (refreshToken) {
                        const res = await apiClient.patch('/auth/reissue', {
                            refreshToken: refreshToken,
                        });
                        console.log(res)
                        if (res.status == 200){
                            setAccessToken(res.data.body.accessToken);
                            setRefreshToken(res.data.body.refreshToken);
                            originalRequest.headers['Authorization'] = `Bearer ${getAccessToken()}`;
                            return apiClient(originalRequest);
                        } else {
                            clearAccessToken();
                            clearRefreshToken();
                            return Promise.reject(new Error('Token reissue failed, logging out.'));
                        } 
                    }
                } catch (err) {
                    clearAccessToken();
                    clearRefreshToken();
                    return Promise.reject(err);
                } 
            } 
            else {
                clearAccessToken();
                clearRefreshToken();
                console.log(window.location.href)
                const currentURL = window.location.href;
                if (currentURL.includes("localhost")){
                    window.location.href = 'http://localhost:5173/start'
                } else {
                    window.location.href = `${API_URL}/start`
                }
                return Promise.reject(new Error('No refresh token'));
            }
            if (error.response?.status == 400) {
                console.error('Bad Request (400):', error.response.data);
                return Promise.reject(new Error('Request failed with status 400, stopping further requests.'));
            }

            return Promise.reject(error);
        }
    );

    return apiClient;
};
