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
          <th>Name</th>
          <th>Brand</th>
          <th>Type</th>
          <th>Unit</th>
          <th>Price</th>
          <th>Stock</th>
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