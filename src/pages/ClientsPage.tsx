import React, { useState } from 'react';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Search, Plus, Edit2, CreditCard } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table.tsx';
import { toast } from '@/hooks/use-toast.ts';
import { Client } from '@/interfaces/client.interfaz.ts';
import { CustomDropdown } from '../components/custom/CustomDropdown.tsx';
import clientImage from '../assets/images/client.png';

export const ClientsPage: React.FC = () => {
    const [clients, setClients] = useState<Client[]>([
        {
            name: 'Juan Pérez',
            monthlyQuota: 100,
            totalDebt: 5000,
            nextPayment: '2024-12-15',
            rate: 5,
        },
        {
            name: 'Ana Gómez',
            monthlyQuota: 200,
            totalDebt: 10000,
            nextPayment: '2024-12-20',
            rate: 7,
        },
        {
            name: 'Luis Martínez',
            monthlyQuota: 150,
            totalDebt: 7500,
            nextPayment: '2024-12-18',
            rate: 6,
        },
    ]);

    const [searchQuery, setSearchQuery] = useState('');

    const filteredClients = clients.filter((client) =>
        client.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const handleEdit = (clientName: string) => {
        toast({
            title: 'Editar cliente',
            description: `Editando cliente: ${clientName}`,
            variant: 'default',
            duration: 2000,
        });
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
            label: 'Amortizar deuda',
            icon: <CreditCard className="mr-2" />,
            onClick: () => handleAmortize(clientName),
        },
        {
            label: 'Editar cliente',
            icon: <Edit2 className="mr-2" />,
            onClick: () => handleEdit(clientName),
        },
    ];

    return (
        <div className="flex w-full h-screen">
            <div className="flex-grow p-4 sm:p-6 overflow-hidden">
                <div className="flex justify-between items-center mb-6">
                    <img
                        src={clientImage}
                        alt="imagen cliente"
                        className="rounded-full"
                    />
                    <h2 className="text-primary text-3xl font-semibold">
                        Clientes
                    </h2>
                    <Button className="flex items-center">
                        <Plus className="mr-2" /> Nuevo Cliente
                    </Button>
                </div>

                {/* Buscador */}
                <div className="flex items-center mb-6 gap-2 w-full">
                    <Input
                        placeholder="Buscar cliente..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-grow"
                    />
                    <Button
                        variant="outline"
                        className="flex items-center w-auto"
                    >
                        <Search className="mr-2" /> Buscar
                    </Button>
                </div>

                {/* Tabla de clientes */}
                <Table className="w-full sm:table-fixed divide-gray-200">
                    <TableHeader className="w-full">
                        <TableRow>
                            {/* Nombre */}
                            <TableHead className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase sm:w-2/12 md:w-2/12 lg:w-2/12">
                                Nombre
                            </TableHead>
                            {/* Cuota mensual */}
                            <TableHead className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase sm:w-2/12  md:w-1/12 lg:w-1/12">
                                Cuota mensual
                            </TableHead>
                            {/* Deuda total */}
                            <TableHead className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase sm:w-2/12 md:w-1/12 lg:w-1/12">
                                Deuda total
                            </TableHead>
                            {/* Próximo pago */}
                            <TableHead className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase sm:w-2/12 md:w-1/12 lg:w-1/12">
                                Próximo pago
                            </TableHead>
                            {/* Tasa */}
                            <TableHead className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase sm:w-1/12 md:w-1/12 lg:w-1/12">
                                Tasa
                            </TableHead>
                            {/* Acciones */}
                            <TableHead className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase sm:w-2/12 md:w-2/12 lg:w-2/12">
                                Acciones
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredClients.length > 0 ? (
                            filteredClients.map((client, index) => (
                                <TableRow
                                    key={index}
                                    className="hover:bg-gray-50 "
                                >
                                    {/* Nombre */}
                                    <TableCell className="px-5 py-3 sm:w-2/12 md:w-2/12 lg:w-2/12">
                                        {client.name}
                                    </TableCell>
                                    {/* Cuota mensual */}
                                    <TableCell className="px-2 py-3 sm:w-2/12  md:w-1/12 lg:w-1/12">
                                        ${client.monthlyQuota}
                                    </TableCell>
                                    {/* Deuda total */}
                                    <TableCell className="px-5 py-3 sm:w-2/12 md:w-1/12 lg:w-1/12">
                                        ${client.totalDebt}
                                    </TableCell>
                                    {/* Próximo pago */}
                                    <TableCell className="px-5 py-3 sm:w-2/12 md:w-1/12 lg:w-1/12">
                                        {client.nextPayment}
                                    </TableCell>
                                    {/* Tasa */}
                                    <TableCell className="px-5 py-3 sm:w-1/4 md:w-1/12 lg:w-1/12 ">
                                        {client.rate}%
                                    </TableCell>
                                    {/* Acciones */}
                                    <TableCell className="px-5 py-3 flex items-center space-x-2 sm:w-2/12 md:w-2/12 lg:w-2/12">
                                        <CustomDropdown
                                            options={dropdownOptions(
                                                client.name,
                                            )}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={6}
                                    className="text-center w-full"
                                >
                                    No se encontraron resultados
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};
