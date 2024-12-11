import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CreditCard, Edit2, Plus, Search } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from '@/components/ui/table';
import { toast } from '@/hooks/use-toast';
import { CustomDropdown } from '../components/custom/CustomDropdown';
import collaboratorImage from '../assets/images/collaborator.png';
import { EditClientDialog } from '@/dialog/editClientDialog.tsx'
import { getResumeCollaborator } from '@/services/collaboratorService.ts';
import { CreateCollaboratorDialog } from '@/dialog/createCollaboratorDialog.tsx';
import { Collaborator } from '@/interfaces/collaborator.interface.ts';

export const CollaboratorPage: React.FC = () => {
    const [ collaborators, setCollaborators ] = useState<any>([]);
    const [ searchQuery, setSearchQuery ] = useState('');
    const [ createDialogOpen, setCreateDialogOpen ] = useState(false);
    const [ editDialogOpen, setEditDialogOpen ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoading(true);
            getResumeCollaborator()
                .then((data) => setCollaborators(data))
                .catch((error) =>
                    toast({
                        title: 'Error',
                        description: error.message,
                        variant: 'destructive',
                    }),
                ).finally(
                () => {
                    setIsLoading(false)
                }
            );
            console.log(collaborators);
        } else {
            toast({
                title: 'Error',
                description: 'Token no encontrado',
                variant: 'destructive',
            });
        }
    }, []);


    const handleNewCollaborator = () => {
        setCreateDialogOpen(true);
    };

    const handleEditCollaborator = () => {
        setEditDialogOpen(true);
    };

    const handleAmortize = (clientName: string) => {
        toast({
            title: 'Amortización de deuda',
            description: `Amortizando deuda del cliente: ${clientName}`,
            variant: 'default',
            duration: 2000,
        });
    };

    const dropdownOptions = (clientName: string) => [
        {
            label: 'Asignar crédito',
            icon: <CreditCard className='mr-2'/>,
            onClick: () => handleAmortize(clientName),
        },
        {
            label: 'Editar colaborador',
            icon: <Edit2 className='mr-2'/>,
            onClick: () => handleEditCollaborator(),
        },
    ];

    return (
        <div className='flex w-full h-screen'>
            <div className='flex-grow p-4 sm:p-6 overflow-hidden'>
                <div className='flex justify-between items-center mb-6'>
                    <img
                        src={collaboratorImage}
                        alt='imagen cliente'
                        className='rounded-full'
                    />
                    <h2 className='text-primary text-3xl font-semibold'>
                        Colaboradores
                    </h2>
                    <Button
                        className='flex items-center'
                        onClick={handleNewCollaborator}
                    >
                        <Plus className='mr-2'/> Nuevo Colaborador
                    </Button>
                </div>

                {/* Buscador */}
                <div className='flex items-center mb-6 gap-2 w-full'>
                    <Input
                        placeholder='Buscar colaborador...'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className='flex-grow'
                    />
                    <Button
                        variant='outline'
                        className='flex items-center w-auto'
                    >
                        <Search className='mr-2'/> Buscar
                    </Button>
                </div>

                {/* Tabla de colaboradores */}
                <Table className='w-full sm:table-fixed divide-gray-200'>
                    <TableHeader className='w-full'>
                        <TableRow>
                            {/* Nombre */}
                            <TableHead
                                className='px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase sm:w-2/12 md:w-2/12 lg:w-2/12'>
                                Nombre
                            </TableHead>
                            {/* Cuota mensual */}
                            <TableHead
                                className='px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase sm:w-2/12  md:w-1/12 lg:w-1/12'>
                                Teléfono
                            </TableHead>
                            {/* Teléfono */}
                            <TableHead
                                className='px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase sm:w-2/12 md:w-1/12 lg:w-1/12'>
                                DNI
                            </TableHead>
                            {/* Próximo pago */}
                            <TableHead
                                className='px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase sm:w-2/12 md:w-1/12 lg:w-1/12'>
                                Dirección
                            </TableHead>
                            {/* Tasa */}
                            <TableHead
                                className='px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase sm:w-1/12 md:w-1/12 lg:w-1/12'>
                                Clientes a cargo
                            </TableHead>
                            {/* Acciones */}
                            <TableHead
                                className='px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase sm:w-2/12 md:w-2/12 lg:w-2/12'>
                                Acciones
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {collaborators.length > 0 && !isLoading ? (
                            collaborators.map((collaborator: Collaborator) => (
                                <TableRow
                                    key={collaborator.id}
                                    className='hover:bg-gray-50 '
                                >
                                    {/* Nombre */}
                                    <TableCell className='px-5 py-3 sm:w-2/12 md:w-2/12 lg:w-2/12'>
                                        {collaborator.fullName}
                                    </TableCell>
                                    {/* Cuota mensual */}
                                    <TableCell className='px-2 py-3 sm:w-2/12  md:w-1/12 lg:w-1/12'>
                                        {collaborator.phone}
                                    </TableCell>
                                    {/* DNI */}
                                    <TableCell className='px-5 py-3 sm:w-2/12 md:w-1/12 lg:w-1/12'>
                                        {collaborator.dni}
                                    </TableCell>
                                    {/* Dirección */}
                                    <TableCell className='px-5 py-3 sm:w-2/12 md:w-1/12 lg:w-1/12'>
                                        {collaborator.address}
                                    </TableCell>
                                    {/* Tasa */}
                                    <TableCell className='px-5 py-3 sm:w-1/4 md:w-1/12 lg:w-1/12 '>
                                        {collaborator.clients || 0}
                                    </TableCell>
                                    {/* Acciones */}
                                    <TableCell
                                        className='px-5 py-3 flex items-center space-x-2 sm:w-2/12 md:w-2/12 lg:w-2/12'>
                                        <CustomDropdown
                                            options={dropdownOptions(
                                                collaborator.id,
                                            )}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={6}
                                    className='text-center w-full'
                                >
                                    {isLoading ? 'Cargando colaboradores...' : 'No se encontraron resultados'}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

                <CreateCollaboratorDialog
                    isOpen={createDialogOpen}
                    onClose={() => setCreateDialogOpen(false)}
                    title='Colaborador nuevo'
                />
                <EditClientDialog
                    isOpen={editDialogOpen}
                    onClose={() => setEditDialogOpen(false)}
                    title='Editar colaborador'
                />
            </div>
        </div>
    );
};
