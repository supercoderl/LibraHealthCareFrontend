import { Component, Input } from "@angular/core";
import { SharedModule } from "../../shared";

@Component({
    selector: 'default-loading',
    standalone: true,
    imports: [
        SharedModule
    ],
    template: `
        <div>
            <span nz-icon nzType="loading" nzTheme="outline" [ngClass]="iconClass"></span>
        </div>
    `
})

export class DefaultLoadingComponent 
{ 
    @Input() iconClass: string = '';
}