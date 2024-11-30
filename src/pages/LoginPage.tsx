import React, { useState } from 'react';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { useNavigate } from 'react-router-dom';

export const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        if (email === 'user@example.com' && password === 'password') {
            // Redirigir al dashboard después de iniciar sesión
            navigate('/dashboard');
        } else {
            alert('Credenciales incorrectas');
        }
    };

    return (
        <>
            <div className="w-full max-w-screen-sm mx-auto p-4 sm:p-6 text-center">
                <h2 className="text-primary text-2xl font-semibold mb-2.5">Iniciar Sesión</h2>
                <div className="mb-2.5">
                    <label htmlFor="email">Email</label>
                    <Input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setEmail(e.target.value)
                        }
                        placeholder="Introduce tu email"
                    />
                </div>
                <div className="mb-2.5">
                    <label htmlFor="password">Contraseña</label>
                    <Input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setPassword(e.target.value)
                        }
                        placeholder="Introduce tu contraseña"
                    />
                </div>
                <Button className='mt-5' onClick={handleLogin}>Iniciar sesión</Button>
            </div>
        </>
    );
};
