import { Component } from "@angular/core";
import { SharedModule } from "../../../../../shared";

@Component({
  selector: 'calendar-header-content',
  template: `
    <div
        class="h-[55px] mb-0 flex justify-between border-b-[1px] border-solid border-[rgba(72,_94,_144,_0.16)] px-4 text-center"
      >
        <div class="float-none flex items-center">
          <div nz-flex [nzGap]="8">
            <button nz-button nzType="default">
              <span nz-icon nzType="left"></span>
            </button>
            <button nz-button nzType="default">
              <span nz-icon nzType="right"></span>
            </button>
          </div>
          <button
            nz-button
            nzType="default"
            class="ml-[9px] px-4 text-[rgba(27,_46,_75,_0.7)] !hidden md:!block"
          >
            {{ "app.today" | i18n }}
          </button>
        </div>
        <div class="flex items-center">
          <h2 class="md:text-[20px] text-[16px] font-[500] m-0">
            Dec 15 – 21, 2024
          </h2>
        </div>
        <div class="hidden md:flex md:items-center float-none">
          <div class="">
            <button
              nz-button
              nzType="default"
              class="px-4 text-[rgba(27,_46,_75,_0.7)]"
            >
              {{"app.month" | i18n}}
            </button>
            <button
              nz-button
              nzType="default"
              class="px-4 !bg-[#f5f6fa] !border-[#c0ccda] !text-[#1b2e4b]"
            >
              {{"app.week" | i18n}}
            </button>
            <button
              nz-button
              nzType="default"
              class="px-4 text-[rgba(27,_46,_75,_0.7)]"
            >
              {{"app.day" | i18n}}
            </button>
            <button
              nz-button
              nzType="default"
              class="px-4 text-[rgba(27,_46,_75,_0.7)]"
            >
              {{"menu.list" | i18n}}
            </button>
          </div>
        </div>
      </div>
    `,
  standalone: true,
  imports: [SharedModule]
})

export class CalendarHeaderContent { }