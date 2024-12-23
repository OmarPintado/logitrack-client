import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CreditCard, Edit2, Plus, Search } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from '@/components/ui/table';
import { toast } from '@/hooks/use-toast';
import { Client } from '@/interfaces/client.interface';
import { CustomDropdown } from '../components/custom/CustomDropdown';
import clientImage from '../assets/images/client.png';
import { CreateClientDialog } from '@/dialog/createClientDialog.tsx';
import { EditClientDialog } from '@/dialog/editClientDialog.tsx'
import { getResumeClients } from '@/services/clientService.ts';

export const ClientsPage: React.FC = () => {
    const [ clients, setClients ] = useState<Client[]>([]);
    const [ searchQuery, setSearchQuery ] = useState('');
    const [ createDialogOpen, setCreateDialogOpen ] = useState(false);
    const [ editDialogOpen, setEditDialogOpen ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoading(true);
            getResumeClients()
                .then((data) => setClients(data))
                .catch((error) =>
                    toast({
                        title: 'Error',
                        description: error.message,
                        variant: 'destructive',
                    }),
                ).finally(
                () => {
                    setIsLoading(false)
                });
            console.log(clients);
        } else {
            toast({
                title: 'Error',
                description: 'Token no encontrado',
                variant: 'destructive',
            });
        }
    }, []);

    const handleNewClient = () => {
        setCreateDialogOpen(true);
    };

    const handleEditClient = () => {
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

    const dropdownOptions = (clientId: string) => [
        {
            label: 'Amortizar deuda',
            icon: <CreditCard className='mr-2'/>,
            onClick: () => handleAmortize(clientId),
        },
        {
            label: 'Editar cliente',
            icon: <Edit2 className='mr-2'/>,
            onClick: () => handleEditClient(),
        },
    ];

    return (
        <div className='flex w-full h-screen'>
            <div className='flex-grow p-4 sm:p-6 overflow-hidden'>
                <div className='flex justify-between items-center mb-6'>
                    <img
                        src={clientImage}
                        alt='imagen cliente'
                        className='rounded-full'
                    />
                    <h2 className='text-primary text-3xl font-semibold'>
                        Clientes
                    </h2>
                    <Button
                        className='flex items-center'
                        onClick={handleNewClient}
                    >
                        <Plus className='mr-2'/> Nuevo Cliente
                    </Button>
                </div>

                {/* Buscador */}
                <div className='flex items-center mb-6 gap-2 w-full'>
                    <Input
                        placeholder='Buscar cliente...'
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

                {/* Tabla de clientes */}
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
                                Cuota mensual
                            </TableHead>
                            {/* Deuda pendiente */}
                            <TableHead
                                className='px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase sm:w-2/12 md:w-1/12 lg:w-1/12'>
                                Deuda pendiente
                            </TableHead>
                            {/* Deuda total */}
                            <TableHead
                                className='px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase sm:w-2/12 md:w-1/12 lg:w-1/12'>
                                Deuda total
                            </TableHead>
                            {/* Próximo pago */}
                            <TableHead
                                className='px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase sm:w-1/12 md:w-1/12 lg:w-1/12'>
                                Próximo pago
                            </TableHead>
                            {/* Acciones */}
                            <TableHead
                                className='px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase sm:w-2/12 md:w-2/12 lg:w-2/12'>
                                Acciones
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {clients.length > 0 && !isLoading ? (
                            clients.map((client) => (
                                <TableRow
                                    key={client.client.id}
                                    className='hover:bg-gray-50 '
                                >
                                    {/* Nombre */}
                                    <TableCell className='px-5 py-3 sm:w-2/12 md:w-2/12 lg:w-2/12'>
                                        {client.client.fullName}
                                    </TableCell>
                                    {/* Cuota mensual */}
                                    <TableCell className='px-2 py-3 sm:w-2/12  md:w-1/12 lg:w-1/12'>
                                        ${client.monthlyPayment}
                                    </TableCell>
                                    {/* Deuda pendiente */}
                                    <TableCell className='px-5 py-3 sm:w-2/12 md:w-1/12 lg:w-1/12'>
                                        ${client.pendingAmount}
                                    </TableCell>
                                    {/* Deuda Total */}
                                    <TableCell className='px-5 py-3 sm:w-2/12 md:w-1/12 lg:w-1/12'>
                                        {client.totalAmount}
                                    </TableCell>
                                    {/* Próximo pago */}
                                    <TableCell className='px-5 py-3 sm:w-1/4 md:w-1/12 lg:w-1/12 '>
                                        {client.nextPayment || 'Sin deuda'}
                                    </TableCell>
                                    {/* Acciones */}
                                    <TableCell
                                        className='px-5 py-3 flex items-center space-x-2 sm:w-2/12 md:w-2/12 lg:w-2/12'>
                                        <CustomDropdown
                                            options={dropdownOptions(
                                                client.client.id,
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
                                    {isLoading ? 'Cargando clientes...' : 'No se encontraron resultados'}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

                <CreateClientDialog
                    isOpen={createDialogOpen}
                    onClose={() => setCreateDialogOpen(false)}
                    title='Cliente nuevo'
                />
                <EditClientDialog
                    isOpen={editDialogOpen}
                    onClose={() => setEditDialogOpen(false)}
                    title='Editar cliente'
                />
            </div>
        </div>
    );
};
