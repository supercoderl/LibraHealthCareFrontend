import { Component, OnInit } from "@angular/core";
import { SharedModule } from "../../../../shared";

interface ItemData {
    id: number;
    name: string;
    age: number;
    address: string;
}

@Component({
    selector: 'doctor-status',
    standalone: true,
    imports: [
        SharedModule
    ],
    template: `
        <nz-table
            #rowSelectionTable
            [nzData]="listOfData"
            [nzShowPagination]="false"
            [nzScroll]="{ y: '385px' }"
        >
            <thead>
                <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Address</th>
                </tr>
            </thead>
            <tbody>
                @for (data of rowSelectionTable.data; track data) {
                <tr>
                    <td>{{ data.name }}</td>
                    <td>{{ data.age }}</td>
                    <td>{{ data.address }}</td>
                </tr>
                }
            </tbody>
        </nz-table>
    `
})

export class DoctorStatus implements OnInit {
    listOfCurrentPageData: readonly ItemData[] = [];
    listOfData: readonly ItemData[] = [];

    ngOnInit(): void {
        this.listOfData = new Array(200).fill(0).map((_, index) => ({
            id: index,
            name: `Edward King ${index}`,
            age: 32,
            address: `London, Park Lane no. ${index}`
        }));
    }
}