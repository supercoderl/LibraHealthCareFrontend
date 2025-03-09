import { ChangeDetectorRef, Component, ElementRef, inject, OnInit, ViewChild } from "@angular/core";
import { SharedModule } from "../../shared";
import { DA_SERVICE_TOKEN } from "@delon/auth";
import { SignalrService } from "../../services/signalr.service";
import { MemberRole } from "../../enums";
import { _HttpClient } from "@delon/theme";
import { finalize } from "rxjs";
import { ChatStateService, NotyfService } from "../../services";
import { Message } from "../../types";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
    selector: 'chat-button',
    standalone: true,
    imports: [
        SharedModule
    ],
    template: `
        <div class="fixed bottom-20 right-5">
            <button (click)="toggleOpen()" class="p-2 bg-tertiary rounded-full cursor-pointer">
                <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 4L12.854 20L10.5324 12.4676M19 4L3 10.146L10.5324 12.4676M19 4L10.5324 12.4676" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </div>

        <div 
            class="fixed bottom-20 right-5"
            [ngClass]="isOpen ? 'z-max' : 'z-min'"
        >
            <div 
                class="flex flex-col bg-transparent w-350 h-420 transition-all duration-500"
                [class.opacity-100]="isOpen"
                [class.opacity-0]="!isOpen"
                [class.translate-y-0]="isOpen"
                [class.translate-y-900]="!isOpen"
            >
                <div class="sticky top-0 bg-primary flex items-center justify-between px-3 py-2 rounded-t-2xl">
                    <h4 class="text-16 text-white m-0">{{ 'app.chat-support' | i18n }}</h4>
                    <a (click)="toggleClose()">
                        <span 
                            nz-icon 
                            nzType="close" 
                            nzTheme="outline"
                            class="!text-white"
                        ></span>
                    </a>
                </div>
                <div #scrollContainer class="relative px-3 py-1.5 flex flex-col overflow-y-auto bg-white h-full">
                    <div *ngFor="let message of messages">
                        <div [ngSwitch]="message.isSystem">
                            <!-- System Notification -->
                            <div 
                                *ngSwitchCase="true"
                                class="text-gray-500 my-2 italic text-center"
                            >
                                {{ message.content }}
                            </div>

                            <div
                                *ngSwitchDefault
                                [ngSwitch]="message.sender"
                            >
                                <!-- Message from user -->
                                <div 
                                    *ngSwitchCase="userId"
                                    class="bg-tertiary my-2 text-white px-2 py-1 rounded-md max-w-[60.6%] w-fit ml-auto"
                                >
                                    {{ message.content }}
                                </div>

                                <!-- Message from other -->
                                <div 
                                    *ngSwitchDefault
                                    class="bg-gray-100 my-2 max-w-[60.6%] w-fit mr-auto px-2 py-1 rounded-md"
                                >
                                    {{ message.content }}
                                </div>
                            </div>
                        </div>
                        <!-- <div class="typing bg-gray-100 my-2 max-w-[60.6%] w-fit will-change-transform w-auto rounded-t-md rounded-br-md px-2 py-3 table mr-auto relative before:content-[''] before:absolute before:-bottom-[2px] before:-left-[2px] before:h-2.5 before:w-2.5 before:rounded-full after:content-[''] after:absolute after:-bottom-[10px] after:-left-[10px] after:h-2.5 after:w-2.5 after:rounded-full">
                            <span class="dot h-1.5 w-1.5 float-left mx-0.5 bg-[#9e9ea1] block rounded-full opacity-[0.4]"></span>
                            <span class="dot h-1.5 w-1.5 float-left mx-0.5 bg-[#9e9ea1] block rounded-full opacity-[0.4]"></span>
                            <span class="dot h-1.5 w-1.5 float-left mx-0.5 bg-[#9e9ea1] block rounded-full opacity-[0.4]"></span>
                        </div> -->
                    </div>

                    <div 
                        class="absolute top-0 left-0 bg-white h-full w-full flex items-center justify-center"
                        [ngClass]="chatStateService.isJoinBtnRequired ? 'block' : 'hidden'"
                    >
                        <button
                            class="cursor-pointer text-white flex gap-2 items-center bg-primary px-4 py-2 rounded-lg font-medium text-sm hover:bg-secondary transition-all ease-in duration-200"
                            (click)="chatStateService.joinChat(roleUser, cdr, null)"
                        >
                            <svg width="16px" height="16px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="none">
                                <path stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M25 7H7a4 4 0 00-4 4v10a4 4 0 004 4h11l6 4v-4h1a4 4 0 004-4V11a4 4 0 00-4-4z"/>
                                <circle cx="9.5" cy="17.5" r="1.5" fill="#ffffff"/>
                                <circle cx="14.5" cy="17.5" r="1.5" fill="#ffffff"/>
                                <circle cx="19.5" cy="17.5" r="1.5" fill="#ffffff"/>
                            </svg>
                            {{ 'app.start-chat' | i18n }}
                        </button>
                    </div>

                    <div 
                        class="absolute top-0 left-0 bg-white h-full w-full flex items-center justify-center"
                        [ngClass]="chatStateService.isLoginRequired ? 'block' : 'hidden'"
                    >
                        <button
                            class="cursor-pointer text-white flex gap-2 items-center bg-primary px-4 py-2 rounded-lg font-medium text-sm hover:bg-secondary transition-all ease-in duration-200"
                            routerLink="/auth/login"
                        >
                            <svg width="16px" height="16px" fill="#ffffff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <g>
                                    <path fill="none" d="M0 0h24v24H0z"/>
                                    <path d="M10 11V8l5 4-5 4v-3H1v-2h9zm-7.542 4h2.124A8.003 8.003 0 0 0 20 12 8 8 0 0 0 4.582 9H2.458C3.732 4.943 7.522 2 12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10c-4.478 0-8.268-2.943-9.542-7z"/>
                                </g>
                            </svg>
                            Login to continue
                        </button>
                    </div>
                </div>
                <form 
                    class="sticky bg-primary bottom-0 flex items-center justify-between p-3 rounded-b-[10px]"
                    [ngClass]="chatStateService.isLoginRequired || chatStateService.isJoinBtnRequired ? 'hidden' : 'flex'"
                    [formGroup]="form"
                >
                    <img src="../../../assets/images/chat/emojis.svg" alt="">
                    <img src="../../../assets/images/chat/microphone.svg" alt="">
                    <input 
                        type="text" 
                        placeholder="Write a message..." 
                        class="border-0 py-1.5 px-3 rounded-[30px] w-2/3 outline-none"
                        formControlName="message"
                        name="message"
                        (keydown.enter)="sendMessage()"
                    >
                    <a 
                        class="text-white m-0 cursor-pointer"
                        href="javascript:void(0)"
                        (click)="sendMessage()"
                    >
                        Send
                    </a>
                </form>
            </div>
        </div>
    `,
    styleUrl: './style.css'
})

export class ChatButton implements OnInit {
    @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

    isOpen: boolean = false;
    userId?: string | null = null;
    messages: Message[] = [];
    roleUser: MemberRole = MemberRole.User;

    form = inject(FormBuilder).nonNullable.group({
        message: ['', [Validators.required]]
    });

    private readonly serviceToken = inject(DA_SERVICE_TOKEN);
    private readonly http = inject(_HttpClient);

    constructor(
        private signalRService: SignalrService,
        protected cdr: ChangeDetectorRef,
        private notyfService: NotyfService,
        protected chatStateService: ChatStateService,
    ) { }

    toggleOpen(): void {
        this.isOpen = true;
    }

    toggleClose(): void {
        this.isOpen = false;
    }

    onGet(chatId?: string | null): void {
        if (!chatId) {
            this.notyfService.error("ChatId is invalid. Try again!");
            return;
        }

        this.http.get('/api/v1/Message', { chatId })
            .pipe(
                finalize(() => {
                    this.cdr.detectChanges();
                })
            )
            .subscribe(res => {
                this.messages = res?.data?.items ?? [];
                setTimeout(() => this.scrollToBottom(), 100);
            });
    };

    async sendMessage(): Promise<void> {
        try {
            const { message } = this.form.controls;
            message.markAsDirty();
            message.updateValueAndValidity();

            if (message.invalid) return;

            this.cdr.detectChanges();

            await this.signalRService.sendMessage(this.form.value.message ?? '', false).then(() => this.form.reset());
            setTimeout(() => this.scrollToBottom(), 100);
        } catch (err) {
            console.log(err);
        }
    }

    private scrollToBottom() {
        try {
            this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
        } catch (err) {
            console.log('Scroll error:', err);
        }
    }

    ngOnInit(): void {
        if (this.serviceToken.get()?.token) {
            this.userId = this.serviceToken.get()?.["userId"];
            this.chatStateService.isLoginRequired = false;

            // Connect SignalR
            this.signalRService.startConnection(this.serviceToken.get()?.token!);

            // Listen new message
            this.signalRService.onMessageReceived((message, result) => {
                this.messages.push(message);
                setTimeout(() => this.scrollToBottom(), 100);
            });

            this.signalRService.onAddUser((user, chatId) => {
                this.onGet(chatId);

                if (this.messages.filter(m => !m.isSystem).length === 0) {
                    this.signalRService.sendMessage(`${user.userName} has joined the chat.`, true);
                    this.cdr.detectChanges();
                }
            });
        }

        this.cdr.detectChanges();
    }
}