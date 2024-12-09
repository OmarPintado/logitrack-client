import { LoginData, User, UserRegister } from '@/interfaces';
import apiClient from './apiClient.ts';
import { handleAxiosError } from '@/utils/handleAxiosError.ts';

export const registerUser = async (userData: UserRegister): Promise<User> => {
    try {
        const { data } = await apiClient.post<User>('/auth/register', userData);
        return data;
    } catch (error) {
        throw handleAxiosError(error);
    }
};

export const authenticateUser = async (loginData: LoginData) => {
    try {
        const { data } = await apiClient.post<User>('/auth/login', loginData);
        return data;
    } catch (error) {
        throw handleAxiosError(error);
    }
};
