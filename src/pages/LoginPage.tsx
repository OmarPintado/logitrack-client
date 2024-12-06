import React, { useState } from 'react';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, LogInIcon, Mail } from 'lucide-react';
import { toast } from '@/hooks/use-toast.ts';

export const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const logoDevuelvePe =
        'https://djparty-server-users.s3.sa-east-1.amazonaws.com/ca764e72-340c-414d-8663-0b93860c709d.png';

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const handleLogin = () => {
        // Lógica para manejar el inicio de sesión
        const credentialsValid =
            email === 'test@example.com' || password === '123'; // Validación de ejemplo

        if (!credentialsValid) {
            // Mostrar el toast si las credenciales son incorrectas
            toast({
                title: 'Error de inicio de sesión',
                description: 'Las credenciales proporcionadas son incorrectas.',
                variant: 'destructive',
                duration: 3000,
            });
        } else {
            navigate('/dashboard');
        }
    };

    return (
        <>
            <div className="w-full max-w-screen-sm mx-auto p-4 sm:p-6 text-center">
                <h2 className="text-primary text-2xl font-semibold my-10">
                    Inicia Sesión
                </h2>

                <img
                    src={logoDevuelvePe}
                    alt="logo devuelve.pe"
                    className="flex m-auto w-1/3"
                />
                <div className="my-10 relative">
                    <Input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setEmail(e.target.value)
                        }
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
                        value={password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setPassword(e.target.value)
                        }
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
                <Button className="my-1" onClick={handleLogin}>
                    <LogInIcon /> Acceder
                </Button>

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
