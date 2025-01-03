import { Component } from "@angular/core";
import { SharedModule } from "../../../../shared";

@Component({
    selector: 'calendar-upcoming-event',
    template: `
    <div class="p-[20px] mb-[20px]">
        <label class="text-[10px] uppercase font-[500] mb-[15px] inline-block"
          >Upcoming Events</label
        >
        <div class="schedule-group">
          <a
            href="javascript:void(0)"
            class="block px-[10px] text-[#1b2e4b] transition-all duration-300 border-l-[2px] border-solid border-[rgba(72,_94,_144,_0.16)]"
          >
            <h6 class="mb-[3px]">Company Standup Meeting</h6>
            <span class="text-[12px] text-[#8392a5] block"
              >8:00am - 9:00am, Engineering Room</span
            > </a
          ><!-- schedule-item -->
          <a
            href="javascript:void(0)"
            class="block px-[10px] text-[#1b2e4b] transition-all duration-300 border-l-[2px] border-solid border-[rgba(72,_94,_144,_0.16)] mt-[20px]"
          >
            <h6 class="mb-[3px]">Start Dashboard Concept</h6>
            <span class="text-[12px] text-[#8392a5] block"
              >9:30am - 11:30am, Office Desk</span
            > </a
          ><!-- schedule-item -->
          <a
            href="javascript:void(0)"
            class="block px-[10px] text-[#1b2e4b] transition-all duration-300 border-l-[2px] border-solid border-[rgba(72,_94,_144,_0.16)] mt-[20px]"
          >
            <h6 class="mb-[3px]">Chat Design Presentation</h6>
            <span class="text-[12px] text-[#8392a5] block"
              >2:30pm - 3:00pm, Visual Room</span
            > </a
          ><!-- schedule-item -->
        </div>
        <!-- schedule-group -->
      </div>
    `,
    standalone: true,
    imports: [SharedModule]
})

export class CalendarUpcomingEvent { }