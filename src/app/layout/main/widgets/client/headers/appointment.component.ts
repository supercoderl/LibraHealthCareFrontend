import { Component } from "@angular/core";
import { SharedModule } from "../../../../../shared";

@Component({
    selector: 'header-appointment',
    standalone: true,
    imports: [
        SharedModule
    ],
    template: `
    <div class="hidden md:inline-block float-right text-right">
        <span
          class="bg-primary block transition-all duration-500 text-white mt-3.75 ml-2.5 py-2.5 px-3.75 rounded-4"
          ><a
            target="_self"
            routerLink="/"
            title="Make an Appointment"
            class="text-white transition-all duration-500"
            >Make an Appointment</a
          ></span
        >
      </div>
    `
})

export class AppointmentClientHeader { }