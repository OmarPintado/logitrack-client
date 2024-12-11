import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Camera, Mail, User } from 'lucide-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from '@/hooks/use-toast.ts';
import { updateUser } from '@/services/userService.ts';

const validationSchema = Yup.object({
    fullName: Yup.string().required('El nombre es obligatorio'),
    email: Yup.string()
        .email('Correo electrónico no válido')
        .required('El correo electrónico es obligatorio'),
    password: Yup.string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
});

export const UserUpdatePage: React.FC = () => {
    const [profileImage, setProfileImage] = useState<File | null>(null);

    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const updateUserData = {
                    ...values,
                    file: profileImage,
                };

                const response = await updateUser(updateUserData);

                localStorage.setItem('user', JSON.stringify({
                    ...response,
                    profileUrl: response.url_profile || (profileImage ? URL.createObjectURL(profileImage) : "")
                }));

                toast({
                    title: 'Actualizaste tus datos',
                    description: `${response.fullName}`,
                    variant: 'default',
                    duration: 2000,
                });

            } catch (error) {
                toast({
                    title: 'Error al registrar usuario',
                    // @ts-ignore
                    description: `${error.message}`,
                    variant: 'destructive',
                    duration: 2000,
                });
            }
        },
    });

    // Obtener datos del localStorage
    useEffect(() => {
        const userData = localStorage.getItem('user');

        if (userData) {
            const { fullName, email, url_profile } = JSON.parse(userData);
            formik.setValues({ fullName, email });
            setProfileImage(url_profile ? url_profile : null);
        }
    }, []);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setProfileImage(e.target.files[0]);
        }
    };

    return (
        <>
            <div className="flex items-center justify-center min-h-screen">
                <div className='w-full max-w-md p-6 bg-white shadow-md rounded-md'>
                    <div className='flex justify-center mb-4 sm:mb-6'>
                        <h2 className='text-primary text-xl sm:text-2xl md:text-3xl font-semibold mb-4 sm:mb-6 md:mb-8 text-center'>
                            Actualizar mis datos
                        </h2>
                    </div>

                    {/* Imagen de perfil */}
                    <div className='flex justify-center mb-4 sm:mb-6'>
                        <label htmlFor='profile-image' className="cursor-pointer">
                            <div
                                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-200 flex items-center justify-center">
                                {profileImage ? (
                                    <img
                                        src={typeof profileImage === 'string' ? profileImage : URL.createObjectURL(profileImage)}
                                        alt="Perfil"
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                ) : (
                                    <Camera className="text-gray-500 w-10 h-10 sm:w-12 sm:h-12"/>
                                )}
                            </div>
                        </label>
                        <input
                            type="file"
                            id="profile-image"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>

                    {/* Campo de nombre */}
                    <div className="mb-4 sm:mb-6">
                        <div className="relative">
                            <Input
                                type="text"
                                id="fullName"
                                value={formik.values.fullName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Nombre"
                                className="pl-8 sm:pl-10 w-full"
                            />
                            <User
                                className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-500"/>
                        </div>
                        {formik.touched.fullName && formik.errors.fullName && (
                            <div className="mt-2 text-left text-red-500 text-sm">
                                {formik.errors.fullName}
                            </div>
                        )}
                    </div>

                    {/* Campo de email */}
                    <div className="mb-4 sm:mb-6">
                        <div className="relative">
                            <Input
                                type="email"
                                id="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Correo electrónico"
                                className="pl-8 sm:pl-10 w-full"
                            />
                            <Mail
                                className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-500"/>
                        </div>
                        {formik.touched.email && formik.errors.email && (
                            <div className="mt-2 text-left text-red-500 text-sm">
                                {formik.errors.email}
                            </div>
                        )}
                    </div>

                    {/* Actualización de datos */}
                    <Button className="my-4 w-full" onClick={() => formik.submitForm()} disabled={formik.isSubmitting || !formik.isValid}>
                        {formik.isSubmitting ? 'Actualizando...' : 'Actualizar datos'}
                    </Button>
                </div>
            </div>
        </>
    );
};
