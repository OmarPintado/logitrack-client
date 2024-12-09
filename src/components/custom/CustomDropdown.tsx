import React from 'react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Ellipsis } from 'lucide-react';

interface DropdownProps {
    options: {
        label: string;
        icon: React.ReactNode;
        onClick: () => void;
    }[];
}

export const CustomDropdown: React.FC<DropdownProps> = ({ options }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="secondary">
                    <Ellipsis />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                {options.map((option, index) => (
                    <DropdownMenuItem
                        className="cursor-pointer py-2"
                        key={index}
                        onClick={option.onClick}
                    >
                        {option.icon}
                        {option.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
