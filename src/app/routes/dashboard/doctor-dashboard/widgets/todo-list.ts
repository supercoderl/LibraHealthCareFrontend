import { Component } from "@angular/core";
import { SharedModule } from "../../../../shared";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";

@Component({
    selector: 'todo-list',
    standalone: true,
    imports: [
        SharedModule
    ],
    template: `
        <nz-table 
            [nzData]="listOfData" 
            [nzFrontPagination]="false" 
            [nzShowPagination]="false"
            [nzScroll]="{ y: '450px' }"
        >
            <tbody cdkDropList (cdkDropListDropped)="drop($event)">
                @for (data of listOfData; track data) {
                <tr cdkDrag>
                    <td>{{ data.name }}</td>
                    <td>{{ data.age }}</td>
                    <td>{{ data.address }}</td>
                </tr>
                }
            </tbody>
        </nz-table>
    `,
    styles: [
        `
          ::ng-deep .cdk-drag-preview {
            display: table;
          }
    
          ::ng-deep .cdk-drag-placeholder {
            opacity: 0;
          }
        `
    ]
})

export class TodoList {
    listOfData = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park'
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park'
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park'
        },
        {
            key: '4',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park'
        },
        {
            key: '5',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park'
        },
        {
            key: '6',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park'
        },
        {
            key: '7',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park'
        },
        {
            key: '8',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park'
        }
    ];

    drop(event: CdkDragDrop<string[]>): void {
        moveItemInArray(this.listOfData, event.previousIndex, event.currentIndex);
    }
}