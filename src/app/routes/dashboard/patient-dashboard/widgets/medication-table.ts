import { Component, Input } from "@angular/core";
import { SharedModule } from "../../../../shared";
import { MedicalRecord } from "../../../../types";

@Component({
    selector: 'medication-table',
    standalone: true,
    imports: [
        SharedModule
    ],
    template: `
        <nz-card nzTitle="Medications">
            <nz-table
                #rowSelectionTable
                [nzData]="medicalRecords"
                [nzShowPagination]="false"
                [nzScroll]="{ x: 'fit-content', y: '310.25px' }"
                [nzLoading]="loading"
            >
                <thead>
                    <tr>
                        <th>Heart Beat</th>
                        <th>Condition</th>
                    </tr>
                </thead>
                <tbody>
                    @for (data of rowSelectionTable.data; track data) {
                    <tr>
                        <td>{{ data.heartBeat }}</td>
                        <td>{{ data.condition }}</td>
                    </tr>
                    }
                </tbody>
            </nz-table>
        </nz-card>
    `
})

export class MedicationTable {
    @Input() loading!: boolean;
    @Input() medicalRecords!: MedicalRecord[];
}