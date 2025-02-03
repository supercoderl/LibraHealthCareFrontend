export interface Message {
    messageId: number;
    chatId: string;
    content: string;
    sentTime: Date;
    sender?: string | null;
    isRead: boolean;
    isSystem: boolean;
}