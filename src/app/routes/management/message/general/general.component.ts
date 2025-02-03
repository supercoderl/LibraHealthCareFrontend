import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared';
import { Chat } from '../../../../types';
import { _HttpClient } from '@delon/theme';
import { delay, finalize } from 'rxjs';
import { DefaultLoadingComponent } from '../../../../components/loadings/default-loading.component';
import { SignalrService } from '../../../../services/signalr.service';
import { MemberRole } from '../../../../enums';
import { ChatListComponent } from './widgets/chat-list.component';
import { ChatBoxComponent } from './widgets/chat-box.component';

@Component({
  selector: 'app-general',
  standalone: true,
  imports: [
    SharedModule,
    DefaultLoadingComponent,
    ChatListComponent,
    ChatBoxComponent
  ],
  templateUrl: './general.component.html'
})
export class GeneralComponent implements OnInit {
  chats: Chat[] = [];
  chat: Chat | null = null;
  loading: boolean = false;
  private readonly http = inject(_HttpClient);
  private readonly cdr = inject(ChangeDetectorRef);

  constructor(public signalRService: SignalrService) { }

  onGet(): void {
    this.loading = true;
    this.http.get('/api/v1/Chat')
      .pipe(
        delay(600),
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe(res => {
        this.chats = res?.data?.items ?? [];
      });
  };

  async userClicked(chatInfo: Chat): Promise<void> {
    try {
      await this.signalRService.join(MemberRole.Physician, chatInfo.chatId);
      this.chat = chatInfo;
    } catch (err) { }
  }

  resetChat(): void {
    this.chat = null;
  }

  reload(): void {
    this.onGet();
    this.chat = null;
  }

  ngOnInit(): void {
    this.onGet();
  }
}
