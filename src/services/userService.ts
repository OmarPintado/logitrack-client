import axios from 'axios';
import { UpdateUserData } from '@/interfaces/updateUserData.ts';

const baseURL = import.meta.env.VITE_BASE_URL;

export const updateUser = async (updateUserData: UpdateUserData) => {
    const token = localStorage.getItem('token');
    const formData = new FormData();

    // Agregar datos del usuario a FormData
    for (const key in updateUserData) {
        if (updateUserData.hasOwnProperty(key)) {
            formData.append(key, updateUserData[key]);
        }
    }

    // Configuración de los encabezados para la solicitud multipart/form-data
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.patch(`${baseURL}/user`, formData, config);
    return response.data;
};
