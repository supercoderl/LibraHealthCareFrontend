import { AppointmentStatus } from "../enums";

export interface Appointment {
    appointmentId: number;
    patientId: number;
    preNurseId: string;
    physicianId: string;
    startTime: Date;
    endTime: Date;
    examinationRoom: string;
    status: AppointmentStatus;
    purpose?: string | null;
    notes?: string | null;
    reminder: Date;
}