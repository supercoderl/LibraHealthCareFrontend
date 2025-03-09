import { Component, Input } from "@angular/core";
import { SharedModule } from "../../../../shared";
import { Appointment } from "../../../../types";

@Component({
    selector: 'appointment',
    standalone: true,
    imports: [
        SharedModule
    ],
    template: `
    <nz-table
      #rowSelectionTable
      [nzData]="appointments"
      [nzShowPagination]="false"
      [nzScroll]="{ y: '400px' }"
      [nzLoading]="loading"
    >
      <thead>
        <tr>
          <th>{{ "app.management.start-time" | i18n }}</th>
          <th>{{ "app.management.end-time" | i18n }}</th>
          <th>{{ "app.management.examination-room" | i18n }}</th>
        </tr>
      </thead>
      <tbody>
        @for (data of rowSelectionTable.data; track data) {
          <tr>
            <td>{{ data.startTime | date : "yyyy-MM-dd" : "UTC+0" }}</td>
            <td>{{ data.endTime | date : "yyyy-MM-dd" : "UTC+0" }}</td>
            <td>{{ data.examinationRoom }}</td>
          </tr>
        }
      </tbody>
    </nz-table>
    `
})

export class AppointmentComponent {
    @Input() loading!: boolean;
    @Input() appointments!: Appointment[]
}