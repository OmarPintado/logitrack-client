import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;

export const updateUser = async (updateUserData: any) => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('Token no encontrado. Debes estar autenticado.');
    }

    const formData = new FormData();

    // Iterar sobre las propiedades de updateUserData
    Object.entries(updateUserData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
            formData.append(key, value as string | Blob);
        }
    });

    // Configuración de los encabezados
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        },
        timeout: 10000,
    };

    try {
        // Enviar la solicitud PATCH
        const response = await axios.patch(`${baseURL}/user`, formData, config);
        return response.data;
    } catch (error) {
        // Manejo de errores
        if (axios.isAxiosError(error)) {
            console.error('Error al hacer la solicitud:', error.message);
            throw new Error(error.message || 'Error desconocido al enviar los datos');
        } else {
            console.error('Error desconocido:', error);
            throw new Error('Error desconocido al enviar los datos');
        }
    }
};
