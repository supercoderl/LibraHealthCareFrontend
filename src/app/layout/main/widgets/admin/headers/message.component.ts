import { Component } from "@angular/core";
import { MenuService } from "../../../../../shared/utils/menu";
import { SharedModule } from "../../../../../shared";

@Component({
    selector: 'navbar-message',
    template: `
    <div class="ml-3 md:ml-4 relative">
      <a
        href="javascript:void(0)"
        class="dropdown-button text-[#1b2e4b] relative cursor-pointer"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        (click)="menuSrv.toggleMenu('messages')"
      >
        <span
          nz-icon
          nzType="message"
          nzTheme="outline"
          class="md:text-[18px]"
        ></span>
        <span
          class="flex w-[15px] h-[15px] justify-center items-center rounded-full absolute top-[-6px] right-[-6px] bg-[#dc3545] text-white text-[8px]"
          >5</span
        >
      </a>
      <div
        *ngIf="menuSrv.isMenuActive('messages')"
        class="dropdown-container mt-4 mr-[-81px] z-40 md:mr-[-12px] w-[300px] p-0 absolute text-[#001737] bg-white border-[1px] border-solid border-[rgba(131,_146,_165,_0.27)] right-0 before:right-[77px] md:before:right-[10px] before:left-auto before:content-[''] before:absolute before:top-[-10px] before:border-b-[10px] before:border-x-[10px] before:border-solid before:border-b-[rgba(72,_94,_144,_0.16)] before:border-x-transparent after:right-[77.5px] md:after:right-[11px] after:left-auto after:content-[''] after:absolute after:top-[-8.5px] after:border-b-[9px] after:border-x-[9px] after:border-solid after:border-b-white after:border-x-transparent"
      >
        <div
          class="py-[12px] px-4 uppercase text-[12px] font-[600] tracking-wide text-[#1b2e4b] border-b-[1px] border-solid border-[rgba(72,_94,_144,_0.16)] mb-[5px]"
        >
        {{ "app.message.new" | i18n }}
        </div>
        <a
          href=""
          class="transition-none block rounded-[0.25rem] whitespace-normal py-[8px] px-[10px] mx-[5px] w-auto"
        >
          <div class="flex">
            <div class="flex-shrink-0 mt-[2px] w-[32px] h-[32px] relative">
              <img
                src="https://themepixels.me/demo/dashforge2/assets/img/img6.jpg"
                class="w-full h-full rounded-full object-cover"
                alt=""
              />
            </div>
            <div class="media-body ml-[15px]">
              <strong class="font-[500] text-[#1b2e4b]">Socrates Itumay</strong>
              <p class="mb-[2px]">nam libero tempore cum so...</p>
              <span class="text-[#8392a5] text-[11px]">Mar 15 12:32pm</span>
            </div>
            <!-- media-body -->
          </div>
          <!-- media -->
        </a>
        <a
          href=""
          class="transition-none block rounded-[0.25rem] whitespace-normal py-[8px] px-[10px] mx-[5px] w-auto"
        >
          <div class="flex">
            <div class="flex-shrink-0 mt-[2px] w-[32px] h-[32px] relative">
              <img
                src="https://themepixels.me/demo/dashforge2/assets/img/img6.jpg"
                class="w-full h-full rounded-full object-cover"
                alt=""
              />
            </div>
            <div class="media-body ml-[15px]">
              <strong class="font-[500] text-[#1b2e4b]">Socrates Itumay</strong>
              <p class="mb-[2px]">nam libero tempore cum so...</p>
              <span class="text-[#8392a5] text-[11px]">Mar 15 12:32pm</span>
            </div>
            <!-- media-body -->
          </div>
          <!-- media -->
        </a>
        <a
          href=""
          class="transition-none block rounded-[0.25rem] whitespace-normal py-[8px] px-[10px] mx-[5px] w-auto"
        >
          <div class="flex">
            <div class="flex-shrink-0 mt-[2px] w-[32px] h-[32px] relative">
              <img
                src="https://themepixels.me/demo/dashforge2/assets/img/img6.jpg"
                class="w-full h-full rounded-full object-cover"
                alt=""
              />
            </div>
            <div class="media-body ml-[15px]">
              <strong class="font-[500] text-[#1b2e4b]">Socrates Itumay</strong>
              <p class="mb-[2px]">nam libero tempore cum so...</p>
              <span class="text-[#8392a5] text-[11px]">Mar 15 12:32pm</span>
            </div>
            <!-- media-body -->
          </div>
          <!-- media -->
        </a>
        <a
          href=""
          class="transition-none block rounded-[0.25rem] whitespace-normal py-[8px] px-[10px] mx-[5px] w-auto"
        >
          <div class="flex">
            <div class="flex-shrink-0 mt-[2px] w-[32px] h-[32px] relative">
              <img
                src="https://themepixels.me/demo/dashforge2/assets/img/img6.jpg"
                class="w-full h-full rounded-full object-cover"
                alt=""
              />
            </div>
            <div class="media-body ml-[15px]">
              <strong class="font-[500] text-[#1b2e4b]">Socrates Itumay</strong>
              <p class="mb-[2px]">nam libero tempore cum so...</p>
              <span class="text-[#8392a5] text-[11px]">Mar 15 12:32pm</span>
            </div>
            <!-- media-body -->
          </div>
          <!-- media -->
        </a>
        <div
          class="mt-5px border-t-[1px] border-solid border-[rgba(72,_94,_144,_0.16)] p-[10px] text-center tracking-wide uppercase"
        >
          <a href="javascript:void(0)" class="text-[#8392a5] transition-all duration-300"
            >{{ "app.message.view-all" | i18n }}</a
          >
        </div>
      </div>
      <!-- dropdown-menu -->
    </div>
    `,
    standalone: true,
    imports: [SharedModule]
})

export class NavbarMessage {
    constructor(public menuSrv: MenuService) {}
}