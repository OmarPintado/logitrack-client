export interface User {
    id: string;
    fullName: string;
    email: string;
    isActive: boolean;
    roles: string[];
    url_profile: string | null;
}
