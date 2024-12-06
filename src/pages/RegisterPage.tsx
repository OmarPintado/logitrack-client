import React, { useState } from 'react';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Mail, Lock, Camera } from 'lucide-react'; // Ejemplo de íconos de SHADCN

export const RegisterPage: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const navigate = useNavigate();

    const handleRegister = () => {
        // Implementar la lógica para registrar al usuario
        console.log('User registered', { name, email, password });
        navigate('/login'); // Redirigir al login después de registrarse
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setProfileImage(e.target.files[0]);
        }
    };

    return (
        <div className="w-full max-w-screen-sm mx-auto p-4 sm:p-6 text-center">
            <h2 className="text-primary text-2xl font-semibold my-10">Crear Cuenta</h2>

            {/* Imagen de perfil */}
            <div className="mb-6">
                <label htmlFor="profile-image" className="cursor-pointer">
                    <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto flex items-center justify-center">
                        {profileImage ? (
                            <img
                                src={URL.createObjectURL(profileImage)}
                                alt="Perfil"
                                className="w-full h-full object-cover rounded-full"
                            />
                        ) : (
                            <Camera className="text-gray-500 w-12 h-12" />
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
            <div className="mb-6 relative">
                <Input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    placeholder="Nombre"
                    className="pl-10" // Agregar un padding a la izquierda para el ícono
                />
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>

            {/* Campo de email */}
            <div className="mb-6 relative">
                <Input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    placeholder="Correo electrónico"
                    className="pl-10" // Agregar un padding a la izquierda para el ícono
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>

            {/* Campo de contraseña */}
            <div className="mb-6 relative">
                <Input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    placeholder="Contraseña"
                    className="pl-10" // Agregar un padding a la izquierda para el ícono
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

            {/* Botón de registro */}
            <Button className="my-4 w-full" onClick={handleRegister}>
                Registrarse
            </Button>

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
