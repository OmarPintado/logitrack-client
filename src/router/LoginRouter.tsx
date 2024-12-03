import { Route, Routes } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage.tsx';
import { DashboardPage } from '../pages/DashboardPage.tsx';
import { SidebarProvider } from '@/components/ui/sidebar';
import Layout from '../pages/Layout.tsx';

export const LoginRouter = () => {
    return (
        <>
            <SidebarProvider>
                <Routes>
                    <Route path="" element={<LoginPage />} />
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
