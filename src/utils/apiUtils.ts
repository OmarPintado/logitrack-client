import apiClient from '@/services/apiClient.ts';
import { handleAxiosError } from '@/utils/handleAxiosError.ts';

// Función para obtener el token
export const getToken = (): string => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Token no encontrado');
    }
    return token;
};

// Función genérica para hacer solicitudes HTTP
export const makeRequest = async (method: 'get' | 'post' | 'patch', url: string, data?: any) => {
    try {
        const token = getToken();
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        const response = await apiClient({
            method,
            url,
            data,
            headers,
        });

        return response.data;
    } catch (error) {
        throw handleAxiosError(error);
    }
};
