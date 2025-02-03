import { StayType } from "../enums";

export interface Stay {
    stayId: number;
    patientId: number;
    patientName: string;
    roomId: number;
    roomType: string;
    startTime: Date;
    endTime: Date;
    type: StayType;
    reason?: string | null;
}