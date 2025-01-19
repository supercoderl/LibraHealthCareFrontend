export interface Diagnosis {
    diagnosisId: number;
    userId?: string | null;
    symptoms: string;
    diagnosisResult: string;
    medicalRecordId?: number | null;
    date: Date;
    physicianId?: string | null;
    isConfirmed: boolean;
    isPatient: boolean;
}