import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared';

interface ItemData {
    name: string;
    age: number;
    address: string;
}

@Component({
    selector: 'past-appointment-table',
    standalone: true,
    imports: [
        SharedModule
    ],
    template: `
        <nz-table 
            #headerTable 
            [nzData]="listOfData" 
            [nzShowPagination]="false"
        >
        <thead>
            <tr>
            <th>Name</th>
            <th nzWidth="100px">Age</th>
            <th>Address</th>
            </tr>
        </thead>
        <tbody>
            @for (data of headerTable.data; track data) {
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
export class PastAppointmentTable implements OnInit {
    listOfData: ItemData[] = [];

    ngOnInit(): void {
        const data: ItemData[] = [];
        for (let i = 0; i < 6; i++) {
            data.push({
                name: `Edward King ${i}`,
                age: 32,
                address: `London, Park Lane no. ${i}`
            });
        }
        this.listOfData = data;
    }
}
