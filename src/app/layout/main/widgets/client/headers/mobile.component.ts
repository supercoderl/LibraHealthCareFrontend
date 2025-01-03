import { Component } from "@angular/core";
import { SharedModule } from "../../../../../shared";
import { MenuService } from "../../../../../shared/utils/menu";

@Component({
    selector: 'header-mobile',
    standalone: true,
    imports: [
        SharedModule
    ],
    template: `
    <div
    class="md:hidden h-17.5 bg-white shadow-mobile w-full z-20 fixed top-0 left-0 transition-all duration-500 flex items-center justify-between"
    >
        <a
            href="javascrip:void(0)"
            class="p-5 transition-all duration-500"
            (click)="menuSrv.toogleOpenMenu()"
        >
            <span
                nz-icon
                nzType="{{ menuSrv.isMenuOpen() ? 'close' : 'menu' }}"
                nzTheme="outline"
                class="text-2xl"
            ></span>
        </a>

        <a
            routerLink="/"
            class="inline-block transition-all duration-500 text-center"
            rel="home"
        >
            <img
                src="../../../../../assets/images/logo/logo.png"
                class="h-10"
                alt="MedServices – WordPress Theme For Hospital, Clinics"
            />
        </a>

        <a
            href="tel:+61-2 3456 7890"
            class="p-5 transition-all duration-500 z-10"
        >
            <span nz-icon nzType="phone" nzTheme="outline" class="text-2xl"></span>
        </a>
    </div>
    `
})

export class MobileClientHeader {
    constructor(public menuSrv: MenuService) { }
}