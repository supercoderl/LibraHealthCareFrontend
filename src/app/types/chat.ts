export interface Chat {
    chatId: string;
    userId?: string | null;
    customerEmail: string;
    physicianId?: string | null;
    physicianName: string;
    isOpen: boolean;
    lastActive: Date;
    message: string;
}