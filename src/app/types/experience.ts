import { ExperienceStatus } from "../enums";

export interface Experience {
    experienceId: number;
    patientId: number;
    patientName: string;
    procedureId: number;
    procedureName: string;
    stayId?: number | null;
    date: Date;
    physicianId: string;
    physicianName: string;
    assistingNurseId: string;
    nurseName: string;
    status: ExperienceStatus;
    notes?: string | null;
    duration?: Date | null;
}