import { Component, Input } from "@angular/core";
import { SharedModule } from "../../../../shared";
import { Medication } from "../../../../types";

@Component({
  selector: 'medication-component',
  standalone: true,
  imports: [
    SharedModule
  ],
  template: `
    <nz-table
        #rowSelectionTable
        [nzData]="medications"
        [nzShowPagination]="false"
        [nzScroll]="{ y: '450px'}"
        [nzLoading]="loading"
    >
      <thead>
        <tr>
          <th>{{ "app.management.name" | i18n }}</th>
          <th>{{ "app.management.brand" | i18n }}</th>
          <th>{{ "app.management.type" | i18n }}</th>
          <th>{{ "app.management.unit" | i18n }}</th>
          <th>{{ "app.management.price" | i18n }}</th>
          <th>{{ "app.management.stock" | i18n }}</th>
        </tr>
      </thead>
      <tbody>
        @for (data of rowSelectionTable.data; track data) {
          <tr>
            <td>{{ data.name }}</td>
            <td>{{ data.brand }}</td>
            <td>{{ data.type }}</td>
            <td>{{ data.unit }}</td>
            <td>{{ data.price }}</td>
            <td>{{ data.stockQuantity }}</td>
          </tr>
        }
      </tbody>
    </nz-table>
    `
})

export class MedicationComponent {
  @Input() loading!: boolean;
  @Input() medications!: Medication[]
}