import { isAxiosError } from 'axios';
import { ApiError } from './apiError.ts';

export const handleAxiosError = (error: unknown): Error => {
    if (isAxiosError(error)) {
        if (error.response) {
            const { status, data } = error.response;
            return new ApiError(
                data.message || 'Error desconocido',
                status,
                JSON.stringify(data),
            );
        } else if (error.request) {
            return new Error('Error de red: No se pudo conectar al servidor');
        }
    }
    return new Error('Error desconocido');
};
