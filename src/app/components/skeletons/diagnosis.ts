import { Component } from "@angular/core";
import { SharedModule } from "../../shared";

@Component({
    selector: 'diagnosis-skeleton',
    standalone: true,
    imports: [
        SharedModule
    ],
    template: `
        <fieldset class="symtom-field bg-white border-0 rounded-3 shadow-diagnosis py-5 px-4 md:px-7.5 border-t-2.2 border-solid border-primary w-9/20 md:w-4/5 md:ml-1/40 absolute left-1/2 md:left-auto">
            <span class="text-xl text-gray-400">{{ 'app.please-wait' | i18n }}</span>
            <div role="status" class="w-full animate-pulse">
                <div class="flex items-baseline mt-4">
                    <div class="w-full bg-gray-200 rounded-t-lg h-72 dark:bg-gray-700"></div>
                    <div class="w-full h-56 ms-6 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
                    <div class="w-full bg-gray-200 rounded-t-lg h-72 ms-6 dark:bg-gray-700"></div>
                    <div class="w-full h-64 ms-6 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
                    <div class="w-full bg-gray-200 rounded-t-lg h-80 ms-6 dark:bg-gray-700"></div>
                    <div class="w-full bg-gray-200 rounded-t-lg h-72 ms-6 dark:bg-gray-700"></div>
                    <div class="w-full bg-gray-200 rounded-t-lg h-80 ms-6 dark:bg-gray-700"></div>
                    <div class="w-full bg-gray-200 rounded-t-lg h-48 ms-6 dark:bg-gray-700"></div>
                    <div class="w-full bg-gray-200 rounded-t-lg h-32 ms-6 dark:bg-gray-700"></div>
                    <div class="w-full bg-gray-200 rounded-t-lg h-96 ms-6 dark:bg-gray-700"></div>
                    <div class="w-full bg-gray-200 rounded-t-lg h-64 ms-6 dark:bg-gray-700"></div>
                </div>
            </div>
        </fieldset>
    `
})

export class DiagnosisSkeleton { }