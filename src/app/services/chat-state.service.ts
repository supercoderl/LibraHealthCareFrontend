import { ChangeDetectorRef, Injectable } from "@angular/core";
import { SignalrService } from ".";
import { MemberRole } from "../enums";

@Injectable({
    providedIn: 'root'
})

export class ChatStateService {
    isLoginRequired = true;
    isJoinBtnRequired = true;

    constructor(private signalRService: SignalrService) { }

    async joinChat(role: MemberRole, cdr: ChangeDetectorRef, chatId?: string | null): Promise<void> {
        try {
            await this.signalRService.join(role, chatId).then(() => {
                this.isJoinBtnRequired = false;
                cdr.detectChanges();
            });
        } catch (err) { }
    }
}