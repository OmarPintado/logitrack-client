import { makeRequest } from '@/utils/apiUtils.ts';
import { newClient } from '@/interfaces/newClient.interface.ts';

// Función para obtener los clientes
export const getResumeClients = async () => {
    return await makeRequest('get', '/client');
};

// Función para crear un nuevo cliente
export const createClient = async (newClient: newClient) => {
    return await makeRequest('post', '/client', newClient);
};

// Función para actualizar un cliente
export const updateClient = async (updateClient: newClient) => {
    return await makeRequest('patch', '/client', updateClient);
};
