import { Route, Routes } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage.tsx';
import { DashboardPage } from '../pages/DashboardPage.tsx';
import { SidebarProvider } from '@/components/ui/sidebar';
import Layout from '../pages/Layout.tsx';
import { RegisterPage } from '@/pages/RegisterPage.tsx';
import { Toaster } from '@/components/ui/toaster.tsx';
import { ClientsPage } from '../pages/ClientsPage.tsx';
import { CreditsPage } from '../pages/CreditsPage.tsx';
import { AuthProvider } from '@/context/AuthContext.tsx';

export const LoginRouter = () => {
    return (
        <>
            <SidebarProvider>
                <Toaster />
                <AuthProvider>
                <Routes>
                    <Route path="" element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />

                    {/* Rutas privadas (Dashboard) */}

                    <Route
                        path="/dashboard/*"
                        element={
                            <Layout>
                                <Routes>
                                    <Route
                                        path=""
                                        element={<DashboardPage />}
                                    />
                                    <Route
                                        path="clients"
                                        element={<ClientsPage />}
                                    />
                                    <Route
                                        path="credits"
                                        element={<CreditsPage />}
                                    />
                                </Routes>
                            </Layout>
                        }
                    />
                </Routes>
                </AuthProvider>
            </SidebarProvider>
        </>
    );
};
