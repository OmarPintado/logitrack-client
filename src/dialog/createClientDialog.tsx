import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from '@/hooks/use-toast.ts';
import { createClient } from '@/services/clientService.ts';

interface ClientDialogProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
}

const validationSchema = Yup.object({
    fullName: Yup.string().required('Nombre completo es requerido'),
    dni: Yup.string().required('DNI es requerido'),
    phone: Yup.string().nullable(),
    address: Yup.string().nullable(),
});

export const CreateClientDialog: React.FC<ClientDialogProps> = ({
                                                                    isOpen,
                                                                    onClose,
                                                                    title,
                                                                }: ClientDialogProps) => {
    const formik = useFormik({
        initialValues: {
            fullName: '',
            dni: '',
            phone: '',
            address: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await createClient(values);
                toast({
                    title: 'Usuario creado',
                    description: `${response.fullName}`,
                    duration: 2000,
                });
                onClose();
            } catch (error) {
                toast({
                    title: 'Error al crear usuario',
                    // @ts-ignore
                    description: `${error.message}`,
                    variant: 'destructive',
                    duration: 2000,
                });
            }
        },
    });

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        Por favor, complete la información del cliente.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={formik.handleSubmit}>
                    <div className='space-y-4'>
                        <Input
                            placeholder='Nombre'
                            name='fullName'
                            value={formik.values.fullName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <Input
                            placeholder='DNI'
                            name='dni'
                            value={formik.values.dni}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <Input
                            placeholder='Teléfono'
                            name='phone'
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <Input
                            placeholder='Ubicación'
                            name='address'
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    <div className='mt-4 flex justify-end space-x-2'>
                        <Button variant='outline' onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button
                            type='submit'
                            disabled={formik.isSubmitting || !formik.isValid}
                        >
                            {formik.isSubmitting ? 'Guardando...' : 'Guardar'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};
