import { Component, Input } from "@angular/core";
import { SharedModule } from "../../../../shared";
import { Physician } from "../../../../types";

@Component({
    selector: 'doctor-status',
    standalone: true,
    imports: [
        SharedModule
    ],
    template: `
    <nz-table
        #rowSelectionTable
        [nzData]="physicians"
        [nzShowPagination]="false"
        [nzScroll]="{ y: '450px'}"
        [nzLoading]="loading"
    >
        <thead>
            <tr>
                <th>{{ "app.management.name" | i18n }}</th>
                <th>{{ "app.management.position" | i18n }}</th>
            </tr>
        </thead>
        <tbody>
            @for (data of rowSelectionTable.data; track data) {
                <tr>
                    <td>{{ data.name }}</td>
                    <td>{{ data.position }}</td>
                </tr>
            }
        </tbody>
    </nz-table>
    `
})

export class DoctorStatus {
    @Input() loading!: boolean;
    @Input() physicians!: Physician[];
}