import { TreatmentType } from "../enums";

export interface Treatment {
    treatmentId: number;
    name: string;
    type: TreatmentType;
    description?: string | null;
}