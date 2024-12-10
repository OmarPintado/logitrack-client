import React, { useState } from 'react';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { registerUser } from '@/services/authService.ts';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from '@/hooks/use-toast.ts';

// Esquema de validación de Yup
const validationSchema = Yup.object({
    fullName: Yup.string().required('El nombre es obligatorio'),
    email: Yup.string()
        .email('Correo electrónico no válido')
        .required('El correo electrónico es obligatorio'),
    password: Yup.string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
        .required('La contraseña es obligatoria'),
    confirmPassword: Yup.string()
        .required('La confirmación de la contraseña es obligatoria')
        .oneOf([Yup.ref('password'), ''], 'Las contraseñas deben coincidir'),
});

export const RegisterPage: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            // Validar que las contraseñas coincidan
            if (values.password !== values.confirmPassword) {
                toast({
                    title: 'Error en las contraseñas',
                    description:
                        'Las contraseñas no coinciden. Por favor, verifica.',
                    variant: 'destructive',
                    duration: 2000,
                });
                return;
            }

            // Enviar los datos al servidor
            try {
                const { confirmPassword, ...dataToSend } = values;
                const response = await registerUser(dataToSend);

                toast({
                    title: 'Registro de nuevo usuario',
                    description: `¡Bienvenido: ${response.fullName}!`,
                    variant: 'default',
                    duration: 2000,
                });

                navigate('/');
            } catch (err) {
                toast({
                    title: 'Error al registrar usuario',
                    // @ts-ignore
                    description: `${err.message}`,
                    variant: 'destructive',
                    duration: 2000,
                });
            }
        },
    });

    return (
        <div className="w-full max-w-screen-sm mx-auto p-4 sm:p-6 text-center">
            <h2 className="text-primary text-2xl font-semibold my-10">
                Crear Cuenta
            </h2>

            {/* Formulario con useFormik */}
            <form onSubmit={formik.handleSubmit}>
                {/* Campo de nombre */}
                <div className="mb-6">
                    <div className="relative">
                        <Input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formik.values.fullName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Nombre"
                            className="pl-10"
                        />
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    </div>
                    {formik.touched.fullName && formik.errors.fullName && (
                        <div className="mt-2 text-left text-red-500 text-sm">
                            {formik.errors.fullName}
                        </div>
                    )}
                </div>

                {/* Campo de email */}
                <div className="mb-6">
                    <div className="relative">
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Correo electrónico"
                            className="pl-10"
                        />
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    </div>
                    {formik.touched.email && formik.errors.email && (
                        <div className="mt-2 text-left text-red-500 text-sm">
                            {formik.errors.email}
                        </div>
                    )}
                </div>

                {/* Campo de contraseña */}
                <div className="mb-6">
                    <div className="relative">
                        <Input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Contraseña"
                            className="pl-10"
                        />
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? <EyeOff /> : <Eye />}
                        </button>
                    </div>
                    {formik.touched.password && formik.errors.password && (
                        <div className="mt-2 text-left text-red-500 text-sm">
                            {formik.errors.password}
                        </div>
                    )}
                </div>

                {/* Campo de confirmación de contraseña */}
                <div className="mb-6">
                    <div className="relative">
                        <Input
                            type={showPassword ? 'text' : 'password'}
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Confirmar contraseña"
                            className="pl-10"
                        />
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    </div>
                    {formik.touched.confirmPassword &&
                        formik.errors.confirmPassword && (
                            <div className="mt-2 text-left text-red-500 text-sm">
                                {formik.errors.confirmPassword}
                            </div>
                        )}
                </div>

                {/* Botón de registro */}
                <Button
                    type="submit"
                    className="my-4 w-full"
                    disabled={formik.isSubmitting || !formik.isValid}
                >
                    {formik.isSubmitting ? 'Registrando...' : 'Registrarse'}
                </Button>
            </form>

            <div className="my-5">
                <p>
                    ¿Ya tienes una cuenta?{' '}
                    <a href="/" className="text-blue-500 hover:underline">
                        Iniciar sesión
                    </a>
                </p>
            </div>
        </div>
    );
};
