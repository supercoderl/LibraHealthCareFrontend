import { Component, ElementRef, HostListener, inject, Renderer2 } from "@angular/core";
import { SharedModule } from "../../shared";
import { MenuService } from "../../shared/utils/menu";
import { MobileClientHeader } from "./widgets/client/headers/mobile.component";
import { LogoClientHeader } from "./widgets/client/headers/logo.component";
import { InfoClientHeader } from "./widgets/client/headers/info.component";
import { MenuClientHeader } from "./widgets/client/headers/menu.component";
import { AppointmentClientHeader } from "./widgets/client/headers/appointment.component";
import { LinkClientFooter } from "./widgets/client/footers/link.component";
import { ServiceClientFooter } from "./widgets/client/footers/service.component";
import { ContactClientFooter } from "./widgets/client/footers/contact.component";
import { CopyrightClientFooter } from "./widgets/client/footers/copyright.component";
import { AboutClientFooter } from "./widgets/client/footers/about.component";
import { ScrollUpButton } from "../../components/buttons/scroll-up.component";
import { ChatButton } from "../../components/buttons/chat.component";

@Component({
    selector: 'layout-client-main',
    standalone: true,
    imports: [
        SharedModule,
        MobileClientHeader,
        LogoClientHeader,
        InfoClientHeader,
        MenuClientHeader,
        AppointmentClientHeader,
        AboutClientFooter,
        LinkClientFooter,
        ServiceClientFooter,
        ContactClientFooter,
        CopyrightClientFooter,
        ScrollUpButton,
        ChatButton
    ],
    templateUrl: './client-main.component.html',
    providers: [MenuService]
})

export class ClientMainComponent {
    private lastScrollTop = 0;
    public readonly menuSrv = inject(MenuService);

    constructor(private el: ElementRef, private renderer: Renderer2) { }

    @HostListener('window:scroll', [])
    onWindowScroll() {
        const header = this.el.nativeElement.querySelector('#menu');
        const topSection = this.el.nativeElement.querySelector('#top-section');
        const scrollTop = window.scrollY || document.documentElement.scrollTop;

        // Lấy chiều cao của div trên header
        const topSectionHeight = topSection?.offsetHeight || 0;

        if (scrollTop > this.lastScrollTop) {
            // Kéo xuống: header cố định ở top: 0
            this.renderer.setStyle(header, 'top', '0');
        } else if (scrollTop <= topSectionHeight) {
            // Kéo lên và trong vùng của topSection: header trả về vị trí cũ
            this.renderer.setStyle(header, 'top', `${topSectionHeight}px`);
        }

        this.lastScrollTop = scrollTop;
    }
}