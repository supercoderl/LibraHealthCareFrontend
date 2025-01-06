import { Specialization } from "../enums";

export interface Nurse {
    nurseId: string;
    name: string;
    position: string;
    registered: boolean;
    ssn: number;
    specialization: Specialization;
    mobile: string;
    userId: string;
    address?: string | null;
    hiringDate: Date;
    shiftSchedule: string;
}