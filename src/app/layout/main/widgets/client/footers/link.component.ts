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
        {{ "app.footer.useful-links" | i18n }}
        </h2>
        <ul class="m-0 p-0">
          <li class="mb-4 relative mb-2.5">
            <a
              routerLink="/"
              class="font-medium text-16 text-white transition-all duration-500"
              >{{ "menu.home" | i18n }}</a
            >
          </li>
          <li class="mb-4 relative mb-2.5">
            <a
              routerLink="care-health"
              class="font-medium text-16 text-white transition-all duration-500"
              >{{ "menu.care-health" | i18n }}</a
            >
          </li>
          <li class="mb-4 relative mb-2.5">
            <a
              routerLink="career"
              class="font-medium text-16 text-white transition-all duration-500"
              >{{ "menu.career" | i18n }}</a
            >
          </li>
          <li class="mb-4 relative mb-2.5">
            <a
              routerLink="diagnosis"
              class="font-medium text-16 text-white transition-all duration-500"
              >{{ "menu.diagnosis" | i18n }}</a
            >
          </li>
          <li class="mb-4 relative mb-2.5">
            <a
              routerLink="auth/login"
              class="font-medium text-16 text-white transition-all duration-500"
              >{{ "app.footer.login-register" | i18n }}</a
            >
          </li>
        </ul>
    </div>
    `
})

export class LinkClientFooter { }