import axios from 'axios';
const API_URL = import.meta.env.VITE_URL;
const TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
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

export const isLoggedIn = () => !!getAccessToken();

export const getApiClient = () => {
    const accessToken = TOKEN;
    // const accessToken = getAccessToken();
    console.log(accessToken);
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
            console.log(error.response.data.httpStatus);
            if (error.response.data.httpStatus === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                try {
                    if (refreshToken) {
                        console.log('accessToken을 재발급 받습니다.', refreshToken);
                        const res = await apiClient.patch('/auth/reissue', {
                            refreshToken: refreshToken,
                        });
                        console.log(res.data.message);
                        console.log(res.data);
                        setAccessToken(res.data.body.accessToken);
                        setRefreshToken(res.data.body.refreshToken);
                    } else {
                        return;
                    }
                    apiClient.defaults.headers.common['Authorization'] =
                        `Bearer ${getAccessToken()}`;
                    originalRequest.headers['Authorization'] = `Bearer ${getAccessToken()}`;

                    return apiClient(originalRequest);
                } catch (err) {
                    console.error('토큰 재발급 실패:', err);
                    return Promise.reject(err);
                }
            }

            return Promise.reject(error);
        }
    );

    return apiClient;
};
