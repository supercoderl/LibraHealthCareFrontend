import { Component } from "@angular/core";
import { SharedModule } from "../../../../../shared";

@Component({
    selector: 'footer-contact',
    standalone: true,
    imports: [
        SharedModule
    ],
    template: `
    <div class="footer-widget footer-contact">
        <h2
          class="pb-4 relative text-white mb-4 text-20 font-bold capitalize before:content-[''] before:absolute before:bottom-0 before:left-0 before:bg-white before:w-7.8 before:h-0.5"
        >
          Contact Us
        </h2>
        <div class="text-white text-15">
          <div
            class="border-b border-solid border-secondary pb-4 mb-4 flex"
          >
            <span
              class="w-8 h-8 rounded-full border border-solid border-white text-white mr-[8px] flex items-center justify-center"
              nz-icon
              nzType="phone"
              nzTheme="outline"
            >
            </span>
            <div class="addr-info">
              <h6 class="mb-0 text-footer leading-3.5">
                Looking for Consultation
              </h6>
              <p class="text-white font-semibold mb-0">+84 349337045</p>
            </div>
          </div>
          <div
            class="border-b border-solid border-secondary pb-4 mb-4 flex"
          >
            <span
              class="w-8 h-8 rounded-full border border-solid border-white text-white mr-2 flex items-center justify-center"
              nz-icon
              nzType="mail"
              nzTheme="outline"
            ></span>
            <div class="addr-info">
              <h6 class="mb-0 text-footer leading-3.5">
                Email Address
              </h6>
              <p class="text-white font-semibold mb-0">
                minh.quang1720&#64;gmail.com
              </p>
            </div>
          </div>
          <div class="pb-4 flex items-center">
            <span
              class="w-8 h-8 rounded-full border border-solid border-white text-white mr-2 flex items-center justify-center"
              nz-icon
              nzType="environment"
              nzTheme="outline"
            ></span>
            <div class="addr-info">
              <h6 class="mb-0 text-footer leading-3.5">
                Address
              </h6>
              <p class="text-white font-semibold mb-0">
                District 12, HCMC, Viet Nam
              </p>
            </div>
          </div>
        </div>
    </div>
    `
})

export class ContactClientFooter { }