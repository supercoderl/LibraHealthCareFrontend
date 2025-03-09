import { Component } from "@angular/core";
import { SharedModule } from "../../../.././../shared";

@Component({
    selector: 'calendar-search',
    template: `
        <div
      class="absolute top-0 left-0 right-0 h-[55px] border-b-[1px] border-solid border-[rgba(72,_94,_144,_0.16)] flex items-center pr-[15px] pl-[20px]"
    >
      <span nz-icon nzType="search" nzTheme="outline" class="mr-[10px]"></span>
      <div class="flex-1 flex items-center">
        <input
          type="search"
          class="border-0 outline-none bg-transparent p-0 text-[#1b2e4b]"
          [placeholder]="'app.search' | i18n"
        />
      </div>
      <button nz-button nzType="primary">
        <span nz-icon nzType="plus" nzTheme="outline"></span>
      </button>
    </div>
    `,
    standalone: true,
    imports: [SharedModule]
})

export class CalendarSearch {}