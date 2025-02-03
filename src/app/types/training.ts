import { TrainingStatus } from "../enums";

export interface Training {
    trainingId: number;
    physicianId: string;
    physicianName: string;
    treatmentId: number;
    treatmentName: string;
    name: string;
    description?: string | null;
    institutionName: string;
    status: TrainingStatus;
    certificationDate?: Date | null;
    certificationExpireDate?: Date | null;
    documentUrl?: string | null;
}