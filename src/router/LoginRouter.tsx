import { Route, Routes } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage.tsx';
import { DashboardPage } from '../pages/DashboardPage.tsx';
import { SidebarProvider } from '@/components/ui/sidebar';
import Layout from '../pages/Layout.tsx';
import { RegisterPage } from '@/pages/RegisterPage.tsx';

export const LoginRouter = () => {
    return (
        <>
            <SidebarProvider>
                <Routes>
                    <Route path="" element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />
                    <Route
                        path="/dashboard"
                        element={
                            <Layout>
                                <DashboardPage />
                            </Layout>
                        }
                    />
                </Routes>
            </SidebarProvider>
        </>
    );
};
