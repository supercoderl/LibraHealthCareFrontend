import { Component, Input } from "@angular/core";
import { SharedModule } from "../../shared";
import { enumToList } from "../../shared/utils";
import { ActionStatus } from "../../enums";

@Component({
    selector: 'filter-component',
    standalone: true,
    imports: [
        SharedModule
    ],
    template: `
    <div class="w-420 shadow p-5 rounded-lg bg-white">
        <div class="relative">
            <div class="flex items-center justify-between mt-4">
                <p class="font-medium">
                    {{ 'operation.filter' | i18n }} 
                </p>

                <button class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md">
                {{ 'operation.reset-filter' | i18n }} 
                </button>
            </div>

            <div class="mb-4 mt-6 h-px w-full bg-[#d9d9d9]"></div>

            <div class="flex flex-col gap-x-6 gap-y-3">
              <p class="font-semibold m-0">{{ 'app.status' | i18n }} </p>
              <div class="flex flex-wrap items-center gap-2">
                <a 
                    href="javascript:void(0);" 
                    class="flex gap-3 rounded-md py-3 px-5 font-semibold"
                    *ngFor="let status of actionStatus"
                    [ngClass]="selectedStatus === status.value ? 'bg-primary text-white' : 'bg-[#f2f2f7]'"
                >
                  <p class="m-0">{{ status.label }}</p>
                </a>
              </div>
            </div>
        </div>
    </div>
    `
})

export class FilterComponent {
    @Input() selectedStatus!: number;

    actionStatus = enumToList(ActionStatus);
}