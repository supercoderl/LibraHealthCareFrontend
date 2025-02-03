export interface Prescription {
    prescriptionId: number;
    physicianId: string;
    physicianName: string;
    patientId: number;
    patientName: string;
    medicationId: number;
    medicationName: string;
    date: Date;
    appointmentId: number;
    examinationRoom: string;
    dose: string;
    frequency: string;
    duration: number;
    instructions: string;
    updatedDate?: Date | null;
    createdBy: string;
}