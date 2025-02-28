import { Nurse } from "./nurse";
import { Physician } from "./physician";

export interface User {
    userId: string;
    userName: string;
    email: string;
    isActive: boolean;
    isEmailConfirmed: boolean;
    roles?: string[];
    lastLoggedIn?: Date | null;
    avatar: string;
    background: string;
    physician?: Physician | null;
    nurse?: Nurse | null;
}