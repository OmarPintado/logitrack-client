import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
} from '@/components/ui/sidebar.tsx';
import { NavUser } from '@/components/sidebar/nav-user.tsx';
import { NavProjects } from '@/components/sidebar/nav-projects.tsx';
import { Frame, Map, PieChart } from 'lucide-react';
import { NavHeader } from '@/components/sidebar/nav-header.tsx';

const data = {
    user: {
        name: 'shadcn',
        email: 'm@example.com',
        avatar: '/avatars/shadcn.jpg',
    },
    projects: [
        {
            name: 'Design Engineering',
            url: '#',
            icon: Frame,
        },
        {
            name: 'Sales & Marketing',
            url: '#',
            icon: PieChart,
        },
        {
            name: 'Travel',
            url: '#',
            icon: Map,
        },
    ],

    app: {
        name: 'DEVUELVE.PE',
        logo: 'https://djparty-server-users.s3.sa-east-1.amazonaws.com/DevuelvePE%20rezise.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA2AUOPC7S6G57Q6S2%2F20241203%2Fsa-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241203T200355Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDQaCXNhLWVhc3QtMSJHMEUCIQCUIoKN%2BA1cdI3xAfkNj8y7lPrvHgdCMkXD9tfkd8iEOQIgDK70q6qKm6fRXTfCCBgMDRa%2BMam1SUU3lylAYY0%2BrWIq9QII3f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2ODg1NjcyOTM5MjUiDErRBWLgaPNC2LAhpSrJAuISdeAXOY1aI7mg79M0WuXApVAJILiyOaZWVnbiU8xmlYyhQlcDGnxtBvtZSkX1ZWKRvA6LblLdSjwDtuD8WaerzVI4wGKdWNbvDPWeyNKwYNjXVU%2FzvgFRUUM0mITk47MwxG5brP9t745M%2B19knj%2B2j%2FQwXIuk0Q7ShGdoDkNElflU5xOJVY6qffQfy7J%2B37f8zPG1HF2LCy0t5LEjxcZIRuA9u4nLDoAsSMoK4Ca1n2ADL%2FoDmSIZ8zuxBaVyCTZjpDhsBvqBsdepuxhURhipUFBeHrehF8hlG71HMwfJj3rB5%2F9lXIm5GsMAYLUEWRnfwb8%2B%2BFPNgpFBDbwoQIq3oYPdUZqYauAEF1kt5wVeLnMgHwMy67QMeK50mAWpcD%2Fzszdtsgp%2Bw8SMk6J6MMI5NZbxt1%2B6ywke8k8pYiU0s246SDeJoXgqMMHDvboGOrMCRv5qFrtTHA0sSfsaU%2FJb1VgdDKWAiMXCxR7LB1tFISQYQP9TrxxR8cg0ybNPeJbMWyyjkT2uElZzyAF6S9QHnfjgM1OoxYL1rB0PEPATJEezj7AmEEvD9hsGKOiyyjW2BEgji4n5HebgBEhXf3GG2Pn%2BDuikIe7VkV1TbRo3%2BNYvYRFi3qHb8LFnM9u5OORyd4m41iyPrty%2B7R4wtnMCr1i6otM5SoD1HT2MuhCxtpjz0SYi48FEjZD6sQ4zzFuOws5RNc35Cy0bAsQZhupBSZnuiG7jqHQFYy9T3egk963bQDEUl76PA4Wh5KPMU4grtqe%2BliIdZb1HjvEo2EcAqdgis5dm6wh7qFgApg%2BnCQ9euKF%2BqccjfQt8NuER5W6EionZWpChTF0iqTKTj8QDxrf4Vg%3D%3D&X-Amz-Signature=7dbfe680ff0460e1e2651c495233168482f2cce49d30b57decd755a072ab8b6c&X-Amz-SignedHeaders=host&response-content-disposition=inline',
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
