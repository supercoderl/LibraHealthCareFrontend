import { ChangeDetectorRef, Component, ElementRef, inject, Input, OnInit, ViewChild } from "@angular/core";
import { SharedModule } from "../../../../../shared";
import { Chat, Message } from "../../../../../types";
import { SignalrService } from "../../../../../services/signalr.service";
import { FormBuilder, Validators } from "@angular/forms";
import { NotyfService } from "../../../../../services";
import { _HttpClient } from "@delon/theme";
import { finalize } from "rxjs";
import { TimeConverter } from "../../../../../shared/utils";
import { DA_SERVICE_TOKEN } from "@delon/auth";
import { NzModalService } from "ng-zorro-antd/modal";

@Component({
  selector: 'chat-box',
  standalone: true,
  imports: [
    SharedModule
  ],
  template: `
        <div class="chatbox">
            <div class="h-full">
              <div class="h-full outline-0">
                <div class="p-4 pb-0">
                  <div
                    class="flex flex-wrap items-center justify-between pl-4 border-b border-solid border-border"
                  >
                    <div>
                      <div class="flex items-center mb-4 relative no-underline">
                        <span class="chat-icon md:hidden"
                          ><img
                            class="img-fluid"
                            src="https://mehedihtml.com/chatbox/assets/img/arroleftt.svg"
                            alt="image title"
                        /></span>
                        <div
                          class="flex-shrink-0 rounded-full overflow-hidden w-11 h-11 bg-cover"
                        >
                          <img
                            class="img-fluid"
                            [src]="
                              chat ?
                                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDgSUH5DEGjn9xZFzG-dsi3sQBDcY1ELtj41U-mO56EJlRfiT97PROcW4WVqooypa2caA&usqp=CAU'
                                :
                                'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'
                            "
                            alt="user img"
                          />
                        </div>
                        <div class="flex-grow-1 ms-3">
                          <h3
                            class="text-[#222] text-[18px] font-semibold leading-6 mb-0"
                          >
                            {{ chat?.customerEmail || "No customer selected" }}
                          </h3>
                          <p class="text-[#343434] leading-6 capitalize mb-0">
                            {{ chat?.message || "..." }}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <ul class="flex items-center justify-end">
                        <li 
                          class="p-0 w-full dropdown"
                          *ngIf="chat"
                        >
                          <a
                            class="w-full text-[#180660] font-medium leading-6 capitalize mt-[5px] -mb-[1px] border border-solid border-transparent rounded-t dropdown-toggle"
                            href="javascript:void(0)"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            nz-dropdown 
                            nzTrigger="click" 
                            [nzDropdownMenu]="menu"
                            ><i class="fa fa-ellipsis-v" aria-hidden="true"></i
                          ></a>
                          <nz-dropdown-menu #menu="nzDropdownMenu">
                            <ul nz-menu>
                              <li 
                                nz-menu-item
                                (click)="showConfirm(true)"
                              >
                              {{ "app.chat.leave" | i18n }}
                              </li>
                              <li 
                                nz-menu-item
                                (click)="showConfirm(false)"
                              >
                              {{ "app.chat.clear" | i18n }}
                              </li>
                            </ul>
                          </nz-dropdown-menu>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div 
                  class="modal-body"
                  *ngIf="chat"
                >
                  <div class="msg-body">
                    <div #scrollContainer class="overflow-y-auto pl-4 pr-1 pt-4 h-[72vh] max-h-[72vh]">
                      <div *ngFor="let message of messages">
                        <div [ngSwitch]="message.isSystem">
                          <!-- System Notification -->
                          <div 
                            *ngSwitchCase="true"
                            class="text-gray-500 my-2 italic text-center"
                          >
                            <p>
                              {{ message.content }}
                            </p>
                          </div>

                          <div 
                            *ngSwitchDefault 
                            [ngSwitch]="message.sender"
                          >
                            <!-- Message from user -->
                            <div 
                              *ngSwitchCase="userId"
                              class="repaly mb-2 block w-full relative text-right before:content-[\\'\\'] before:block before:clear-both before:absolute before:bottom-[15px] before:-right-[7px] before:w-0 before:h-0 before:border-solid before:border-x-3 before:border-b-4 before:border-[#4b7bec] before:rotate-37"
                            >
                              <p 
                                class="text-white leading-6 p-2 bg-[#4b7bec] inline-block rounded-t-[10px] rounded-bl-[10px] mb-0"
                              >
                                {{ message.content }}
                              </p>
                              <span class="block text-black text-12 leading-6">
                                {{ timeConverter.formatTime(message.sentTime) }}
                              </span>
                            </div>

                            <!-- Message from other -->
                            <div 
                              *ngSwitchDefault
                              class="mb-2 block w-full relative before:content-[\\'\\'] before:block before:clear-both before:absolute before:-top-[6px] before:-left-[7px] before:w-0 before:h-0 before:border-x-3 before:border-b-4 before:border-[#f5f5f5] before:-rotate-37"
                            >
                              <p 
                                class="text-[#000] leading-6 p-2 bg-[#f5f5f5] inline-block rounded-b-[10px] rounded-tr-[10px] mb-0"
                              >
                                {{ message.content }}
                              </p>
                              <span class="block text-black text-12 leading-6">
                                {{ timeConverter.formatTime(message.sentTime) }}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div 
                  class="send-box"
                  *ngIf="chat"
                >
                  <form
                    class="flex items-center justify-between mb-4 px-4"
                    [formGroup]="form"
                  >
                    <input
                      type="text"
                      class="block w-[80%] py-[0.375rem] px-[0.75rem] leading-6 text-[#222] bg-white border border-solid border-[#ccc] appearance-none rounded-[0.25rem] transition-colors focus:outline-0 focus:shadow-[inherit]"
                      placeholder="Write message…"
                      formControlName="message"
                      name="message"
                      (keydown.enter)="sendMessage()"
                    />

                    <button
                        type="button"
                        class="border-0 bg-[#3867d6] py-[0.375rem] px-[5px] text-white rounded-[0.25rem] w-[24%] ml-[1%] focus:outline-0"
                        (click)="sendMessage()"
                    >
                      <i class="mr-[5px]" aria-hidden="true"></i> {{ "app.send" | i18n }}
                    </button>
                  </form>
                </div>
              </div>
            </div>
        </div>
    `
})

export class ChatBoxComponent implements OnInit {
  @Input() chat: Chat | null = null;
  @Input() resetChat!: () => void;
  @Input() onReload!: () => void;
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  messages: Message[] = [];
  userId?: string | null;
  shouldScrollToBottom: boolean = true;

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly http = inject(_HttpClient);
  private readonly serviceToken = inject(DA_SERVICE_TOKEN);

  form = inject(FormBuilder).nonNullable.group({
    message: ['', [Validators.required]]
  });

  constructor(
    private signalRService: SignalrService,
    private notyfService: NotyfService,
    protected timeConverter: TimeConverter,
    private modal: NzModalService
  ) { }

  trackByMessageId(index: number, message: Message): number {
    return message.messageId; // Dùng ID để xác định phần tử duy nhất
  }

  showConfirm(isLeaving: boolean): void {
    this.modal.confirm({
      nzTitle: `Do you want to ${isLeaving ? 'leave' : 'close'} the chat?`,
      nzContent: undefined,
      nzOnOk: () => isLeaving ? this.leave() : this.close()
    });
  }

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

  async leave(): Promise<void> {
    try {
      await this.signalRService.leave(true).then(() => this.resetChat());
      setTimeout(() => this.scrollToBottom(), 100);
    } catch (err) {
      console.log(err);
    }
  }

  async close(): Promise<void> {
    try {
      await this.signalRService.close().then(() => {
        this.resetChat();
        this.onReload();
      });
    } catch (err) {
      console.log(err)
    }
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
  }
}