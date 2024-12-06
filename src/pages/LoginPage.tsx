import React, { useState } from 'react';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LogInIcon } from 'lucide-react';

export const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const logoDevuelvePe =
        'https://djparty-server-users.s3.sa-east-1.amazonaws.com/DevuelvePE%20rezise.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA2AUOPC7S5CWRHYZJ%2F20241206%2Fsa-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241206T041318Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXNhLWVhc3QtMSJHMEUCIQDY5%2Bx1E48pphh6sXdZ0bmSJVStQD5XaZzS9t6ovVQ4SwIgZ%2FUxAu7k1qtj8DlqZhLP121VmBUKLb%2BYohovcjjprDIq7AIIJRAAGgw2ODg1NjcyOTM5MjUiDI2CAfJIYtjOFQaZNyrJArRVOJYLxx5V9xT0qx37LviYYZ9ERF7nAdJl2n%2F%2FNh2GMr9O5hpKYUmeDRDktiDVxMgfViiX25rX5C6KzD5sqogpXTvsB5v1aDxFkYM5huyFdeRkARhuWC7KTOioQP%2BPrX%2F%2FtQ3H8YjkhWkuXY7HLhJrNomN57CoR%2BQlceMA3CUjAwOOMGGAP5x5n%2BAdaNh9XmzRot260%2Bk8En8BDKVlPwVbU4h7OCCSr3C4sknmWR9uEhLDxwRMzlFfo4spewvSQl2gJOtbQtJ00cLNZuzglb80%2FGlMQwk9xuFYy3GyRbrBPhwKIrw6SqH8rRTLNdYydnget2mBjzdf%2Bh05K3%2F5IBBYFxlXsLG5quPmj5MBY6NyVrHBlleDO6dwH70MkWtiSpLImyPJStq6XGm6Qfp%2FJG%2FshI%2BnkhWl%2F4n2bVzyElmc7XEX60TIhrTMMLLzyboGOrMCtP21OTW%2FfMaHm3RyO31wgYnJVhCldsXxox%2BCgGkNzkuNRbpJ5JhsLNGKPWh6z4FvPqN4wzHzkbwK6gwfDKmqvv6TWV5ol3zBaUX8pwiQBCeIVEFq0njQHqk%2FjBQlnwBwhVThjeOYdJbAGzTS%2Byb4xpkb%2FG%2FnlowVglf9AQYOaDBcD31VnJuegUEe4mGdURClensF7eesfc9vxDPpanP%2FqlAYht6rL7HsxK6cnSz4ykjSVVKnzkqaS8nrk6Vq5PeBQ3bBgb%2BGqyWVjb5LBF0DDVLgXYJtX9i2lJ2giIJyY1whRgm2JpOeGX49JLRPneDCC8W8212MASdUhGCx9U6MkBEschMSrvp9d6llMnivfrNDLMT4BV289IzClBxCj7TqpBUBW9caLcP4u%2BMdYqdpy3clzA%3D%3D&X-Amz-Signature=0412b05fd1692c684df9e04cf9bcdc5cbfad71028a31bf15e56e15bc665876bb&X-Amz-SignedHeaders=host&response-content-disposition=inline';

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const handleLogin = () => {
        if (email === 'user@example.com' || password === '123') {
            // Redirigir al dashboard después de iniciar sesión
            navigate('/dashboard');
        } else {
            alert('Credenciales incorrectas');
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
                <div className="my-10">
                    <Input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setEmail(e.target.value)
                        }
                        placeholder="Email"
                    />
                </div>
                <div className="my-10 relative">
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        value={password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setPassword(e.target.value)
                        }
                        placeholder="Contraseña"
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
