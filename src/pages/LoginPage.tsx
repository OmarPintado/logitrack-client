import React, { useState } from 'react';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Eye, EyeOff, Lock, LogInIcon, Mail } from 'lucide-react';
import { toast } from '@/hooks/use-toast.ts';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { authenticateUser } from '@/services/authService.ts';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext.tsx';

// Esquema de validación de Yup
const validationSchema = Yup.object({
    email: Yup.string()
        .email('Correo electrónico no válido')
        .required('El correo electrónico es obligatorio'),
    password: Yup.string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
        .required('La contraseña es obligatoria'),
});

export const LoginPage: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await authenticateUser(values);
                login(response)
                navigate('/dashboard');
            } catch (error) {
                toast({
                    title: 'Error al iniciar sesión',
                    // @ts-ignore
                    description: `${error.message}`,
                    variant: 'destructive',
                    duration: 2000,
                });
            }
        },
    });

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <>
            <div className="w-full max-w-screen-sm mx-auto p-4 sm:p-6 text-center">
                <h2 className="text-primary text-2xl font-semibold my-10">
                    Inicia Sesión
                </h2>

                <img
                    src={import.meta.env.VITE_LOGO_URL}
                    alt="logo devuelve.pe"
                    className="flex m-auto w-1/3"
                />
                <form onSubmit={formik.handleSubmit}>
                <div className="my-10 relative">
                    <Input
                        type="email"
                        id="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Email"
                        className="pl-10"
                    />
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>
                <div className="my-10 relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Contraseña"
                        className="pl-10"
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                </div>
                <Button type='submit' className="my-1" disabled={formik.isSubmitting || !formik.isValid}>
                    <LogInIcon />  {formik.isSubmitting ? 'Accediendo...' : 'Acceder'}
                </Button>
                </form>

                <div className="my-5">
                    <p>
                        ¿Eres usuario nuevo?{' '}
                        <a
                            href="/register"
                            className="text-blue-500 hover:underline"
                        >
                            Regístrate
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
};
