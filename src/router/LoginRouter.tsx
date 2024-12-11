import { Route, Routes } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage.tsx';
import { DashboardPage } from '../pages/DashboardPage.tsx';
import Layout from '../pages/Layout.tsx';
import { RegisterPage } from '@/pages/RegisterPage.tsx';
import { Toaster } from '@/components/ui/toaster.tsx';
import { ClientsPage } from '../pages/ClientsPage.tsx';
import { CreditsPage } from '../pages/CreditsPage.tsx';
import { AuthProvider } from '@/context/AuthContext.tsx';
import ProtectedRoute from '@/router/ProtectedRoute.tsx';
import { CollaboratorPage } from '@/pages/CollaboratorPage.tsx';
import { UserUpdatePage } from '@/pages/UserUpdatePage.tsx';

export const LoginRouter = () => {
    return (
        <>
                <Toaster/>
                <AuthProvider>
                    <Routes>
                        <Route path='' element={<LoginPage/>}/>
                        <Route path='register' element={<RegisterPage/>}/>

                        {/* Rutas privadas (Dashboard) */}
                        <Route
                            path='/dashboard/*'
                            element={
                                <ProtectedRoute>
                                    <Layout>
                                        <Routes>
                                            <Route
                                                path=''
                                                element={<DashboardPage/>}
                                            />
                                            <Route
                                                path='collaborators'
                                                element={<CollaboratorPage/>}
                                            />
                                            <Route
                                                path='clients'
                                                element={<ClientsPage/>}
                                            />
                                            <Route
                                                path='credits'
                                                element={<CreditsPage/>}
                                            />
                                            <Route
                                                path='user'
                                                element={<UserUpdatePage/>}
                                            />
                                        </Routes>
                                    </Layout>
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </AuthProvider>
        </>
    );
};
