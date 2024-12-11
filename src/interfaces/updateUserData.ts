export interface UpdateUserData {
    [key: string]: string | File | undefined;
    fullName: string;
    email: string;
    profileImage?: File;
}
