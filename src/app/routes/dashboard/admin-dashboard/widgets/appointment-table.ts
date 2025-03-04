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
          <th>Start Time</th>
          <th>End Time</th>
          <th>Examination Room</th>
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