import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
export const NavHeader = ({
    app,
}: {
    app: {
        name: string;
        logo: string;
    };
}) => {
    return (
        <>
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={app.logo} alt={app.name} />
                    <AvatarFallback className="rounded-lg">DP</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{app.name}</span>
                </div>
            </div>
        </>
    );
};
