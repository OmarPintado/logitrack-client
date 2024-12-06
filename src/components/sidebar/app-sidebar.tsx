import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
} from '@/components/ui/sidebar.tsx';
import { NavUser } from '@/components/sidebar/nav-user.tsx';
import { NavProjects } from '@/components/sidebar/nav-projects.tsx';
import {
    BriefcaseBusiness,
    CircleDollarSign,
    CircleUserRound,
} from 'lucide-react';
import { NavHeader } from '@/components/sidebar/nav-header.tsx';

const data = {
    user: {
        name: 'shadcn',
        email: 'm@example.com',
        avatar: '/avatars/shadcn.jpg',
    },
    projects: [
        {
            name: 'Colaboradores',
            url: '/dashboard',
            icon: BriefcaseBusiness,
        },
        {
            name: 'Clientes',
            url: '/dashboard/clients',
            icon: CircleUserRound,
        },
        {
            name: 'Créditos',
            url: '/dashboard/credits',
            icon: CircleDollarSign,
        },
    ],

    app: {
        name: 'DEVUELVE.PE',
        logo: import.meta.env.VITE_LOGO_URL!,
    },
};

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <NavHeader app={data.app}></NavHeader>
            </SidebarHeader>
            <SidebarContent>
                <NavProjects projects={data.projects} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
        </Sidebar>
    );
}
