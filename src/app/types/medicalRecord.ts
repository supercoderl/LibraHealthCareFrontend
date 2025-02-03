export interface MedicalRecord {
    medicalRecordId: number;
    patientId: number;
    patientName: string;
    recordDate: Date;
    condition: string;
}