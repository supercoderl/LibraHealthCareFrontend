export interface Disease {
    diseaseId: number;
    name: string;
    description?: string | null;
    treatmentPlans: string;
    createdAt: Date;
    updatedAt?: Date | null;
}