import { Component, Input } from "@angular/core";
import { SharedModule } from "../../../../../shared";
import { Chat } from "../../../../../types";

@Component({
    selector: 'chat-list',
    standalone: true,
    imports: [
        SharedModule,
    ],
    template: `
        <div class="chat-list">
            <a
                href="#"
                class="flex items-center mb-4 relative no-underline"
                *ngFor="let chat of chats"
            >
                <div class="flex-shrink-0">
                    <img
                        class="img-fluid"
                        src="https://mehedihtml.com/chatbox/assets/img/user.png"
                        alt="user img"
                    />
                    <span
                        class="block absolute bottom-[3px] left-[34px] h-[12px] w-[12px] bg-[#00DB75] rounded-full border-2 border-solid border-white"
                    ></span>
                </div>
                <div class="flex-grow-1 ms-3">
                    <h3
                        class="text-[#222] text-[16px] font-medium leading-6 capitalize mb-0"
                    >
                        {{ chat.physicianName || "No doctor yet" }}
                    </h3>
                    <p
                        class="text-[#343434] leading-6 capitalize mb-0"
                    >
                        {{ chat.customerEmail || "No customer yet" }}
                    </p>
                </div>
            </a>
        </div>
    `
})

export class ChatListComponent 
{ 
    @Input() chats: Chat[] = [];
}