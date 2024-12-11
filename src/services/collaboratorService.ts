import { makeRequest } from '@/utils/apiUtils.ts';
import { newClient } from '@/interfaces/newClient.interface.ts';

// Función para obtener los colaboradores
export const getResumeCollaborator = async () => {
    return await makeRequest('get', '/collaborator');
};

// Función para crear un nuevo colaborador
export const createCollaborator = async (newCollaborator: newClient) => {
    return await makeRequest('post', '/collaborator', newCollaborator);
};
