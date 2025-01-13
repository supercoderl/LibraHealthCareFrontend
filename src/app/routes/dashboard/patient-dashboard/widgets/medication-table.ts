import { Component, OnInit } from "@angular/core";
import { SharedModule } from "../../../../shared";

interface ItemData {
    id: number;
    name: string;
    age: number;
}

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
                [nzData]="listOfData"
                [nzShowPagination]="false"
                [nzScroll]="{ x: 'fit-content', y: '310.25px' }"
            >
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                    </tr>
                </thead>
                <tbody>
                    @for (data of rowSelectionTable.data; track data) {
                    <tr>
                        <td>{{ data.name }}</td>
                        <td>{{ data.age }}</td>
                    </tr>
                    }
                </tbody>
            </nz-table>
        </nz-card>
    `
})

export class MedicationTable implements OnInit {
    listOfCurrentPageData: readonly ItemData[] = [];
    listOfData: readonly ItemData[] = [];

    ngOnInit(): void {
        this.listOfData = new Array(200).fill(0).map((_, index) => ({
            id: index,
            name: `Edward King ${index}`,
            age: 32,
        }));
    }
}