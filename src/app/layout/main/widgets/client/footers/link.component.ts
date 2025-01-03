import { Component } from "@angular/core";
import { SharedModule } from "../../../../../shared";

@Component({
    selector: 'footer-link',
    standalone: true,
    imports: [
        SharedModule
    ],
    template: `
    <div class="footer-widget footer-menu">
        <h2
          class="pb-4 relative text-white mb-4 text-20 font-bold capitalize before:content-[''] before:absolute before:bottom-0 before:left-0 before:bg-white before:w-7.8 before:h-0.5"
        >
          Useful Links
        </h2>
        <ul class="m-0 p-0">
          <li class="mb-4 relative mb-2.5">
            <a
              routerLink="/"
              class="font-medium text-16 text-white transition-all duration-500"
              >Home</a
            >
          </li>
          <li class="mb-4 relative mb-2.5">
            <a
              routerLink="care-health"
              class="font-medium text-16 text-white transition-all duration-500"
              >Care & Health</a
            >
          </li>
          <li class="mb-4 relative mb-2.5">
            <a
              routerLink="career"
              class="font-medium text-16 text-white transition-all duration-500"
              >Career</a
            >
          </li>
          <li class="mb-4 relative mb-2.5">
            <a
              routerLink="diagnosis"
              class="font-medium text-16 text-white transition-all duration-500"
              >Diagnosis</a
            >
          </li>
          <li class="mb-4 relative mb-2.5">
            <a
              routerLink="auth/login"
              class="font-medium text-16 text-white transition-all duration-500"
              >Login/Register</a
            >
          </li>
        </ul>
    </div>
    `
})

export class LinkClientFooter { }