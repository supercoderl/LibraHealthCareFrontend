import { Component } from "@angular/core";
import { SharedModule } from "../../../../../shared";

@Component({
    selector: 'header-logo',
    standalone: true,
    imports: [
        SharedModule
    ],
    template: `
    <div class="w-1/2 flex-0/2 relative px-3.75">
          <a
            routerLink="/"
            class="text-darkGray transition-all duration-500"
            rel="home"
            ><img
              src="../../../../../assets/images/logo/logo.png"
              width="180"
              height="40"
              alt="MedServices – WordPress Theme For Hospital, Clinics"
          /></a>
          <a
            routerLink="/"
            class="hidden"
            rel="home text-darkGray transition-all duration-500"
            ><img
              src="../../../../../assets/images/logo/logo.png"
              width="180"
              height="40"
              alt="MedServices – WordPress Theme For Hospital, Clinics"
          /></a>
        </div>
    `
})

export class LogoClientHeader { }