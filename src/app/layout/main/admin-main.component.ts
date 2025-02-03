import { Component, inject, OnInit, Renderer2 } from "@angular/core";
import { SharedModule } from "../../shared";
import { I18nPipe, SettingsService, User } from "@delon/theme";
import { environment } from "../../../environments/environment";
import { LayoutDefaultModule } from '@delon/theme/layout-default';
import { RouterOutlet } from "@angular/router";
import { SettingDrawerModule } from '@delon/theme/setting-drawer';
import { MenuService } from "../../shared/utils/menu";
import { NavbarMenu } from "./widgets/admin/headers/menu.component";
import { NavbarSearch } from "./widgets/admin/headers/search.component";
import { NavbarMessage } from "./widgets/admin/headers/message.component";
import { NavbarNotification } from "./widgets/admin/headers/notification.component";
import { NavbarProfile } from "./widgets/admin/headers/profile.component";
import { SearchBarAdmin } from "./widgets/admin/headers/search-bar-component";
import { SignalrService } from "../../services/signalr.service";
import { DA_SERVICE_TOKEN } from "@delon/auth";
import { Message } from "../../types";

@Component({
    selector: 'layout-admin-main',
    templateUrl: './admin-main.component.html',
    standalone: true,
    imports: [
        SharedModule,
        RouterOutlet,
        I18nPipe,
        LayoutDefaultModule,
        SettingDrawerModule,
        NavbarMenu,
        NavbarSearch,
        NavbarMessage,
        NavbarNotification,
        NavbarProfile,
        SearchBarAdmin
    ],
    providers: [MenuService]
})

export class AdminMainLayoutComponent implements OnInit {
    private readonly settings = inject(SettingsService);
    public readonly menuSrv = inject(MenuService);
    private readonly serviceToken = inject(DA_SERVICE_TOKEN);

    searchToggleStatus = false;
    showSettingDrawer = !environment.production;
    messages: Message[] = [];

    get user(): User {
        return this.settings.user;
    }

    constructor(private renderer: Renderer2, private signalRService: SignalrService) {
        this.renderer.listen('window', 'click', (e: Event) => {
            const target = e.target as HTMLElement;
            const a = target.closest('a')?.classList;

            if (!a) {
                this.menuSrv.toggleMenu(null);
            }
        })
    }

    ngOnInit(): void {
        if (this.serviceToken.get()?.token) {
            // Connect SignalR
            this.signalRService.startConnection(this.serviceToken.get()?.token!);

            // Listen new message
            this.signalRService.onMessageReceived((message, result) => {
                this.messages.push(message);
            });
        }
        else {
            console.warn("You have not signed in!!!");
        }
    }
}