export interface User {
    userId: string;
    userName: string;
    email: string;
    isActive: boolean;
    isEmailConfirmed: boolean;
    lastLoggedIn?: Date | null;
}