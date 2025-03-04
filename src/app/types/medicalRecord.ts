export interface MedicalRecord {
    medicalRecordId: number;
    patientId: number;
    heartBeat: number;
    patientName: string;
    recordDate: Date;
    condition: string;
}