import { Component, Input } from "@angular/core";
import { SharedModule } from "../../../../shared";
import { Appointment } from "../../../../types";

@Component({
  selector: 'appointment-table',
  standalone: true,
  imports: [
    SharedModule
  ],
  template: `
<nz-table
      #rowSelectionTable
      [nzData]="appointments"
      [nzShowPagination]="false"
      [nzScroll]="{ y: '450px'}"
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
            <td>{{ data.endTime |date : "yyyy-MM-dd" : "UTC+0" }}</td>
            <td>{{ data.examinationRoom }}</td>
          </tr>
        }
      </tbody>
    </nz-table>
    `
})

export class AppointmentTable {
  @Input() loading!: boolean;
  @Input() appointments!: Appointment[];
}