import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('AUTH_TOKEN');

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.error('Interceptor Error:', error);
        return Promise.reject(error);
    },
);

export default apiClient;
