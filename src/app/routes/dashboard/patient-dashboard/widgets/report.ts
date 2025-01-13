import { Component } from "@angular/core";
import { SharedModule } from "../../../../shared";

@Component({
    selector: 'report',
    standalone: true,
    imports: [
        SharedModule
    ],
    template: `
        <nz-card nzTitle="Reports/Documents">
            <ul class="p-0">
                <li class="flex items-center mb-3 p-3 border border-dashed border-[#bfc9d4] rounded-[6px]">
                    <div class="flex">
                        <i class="far fa-file-pdf text-20 mx-2.5"></i>
                        <div class="font-medium">Blood Report</div>
                    </div>
                    <div class="mr-2.5 cursor-pointer ml-auto">
                        <td>
                            <i aria-label="Delete" class="far fa-trash-alt pr-2.5"></i>
                            <i aria-label="Download" class="far fa-arrow-alt-circle-down"></i>
                        </td>
                    </div>
                </li>
                <li class="flex items-center mb-3 p-3 border border-dashed border-[#bfc9d4] rounded-[6px]">
                    <div class="flex">
                        <i class="far fa-file-word text-20 mx-2.5"></i>
                        <div class="font-medium">Mediclaim Documents</div>
                    </div>
                    <div class="mr-2.5 cursor-pointer ml-auto">
                        <td>
                            <i aria-label="Delete" class="far fa-trash-alt pr-2.5"></i>
                            <i aria-label="Download" class="far fa-arrow-alt-circle-down"></i>
                        </td>
                    </div>
                </li>
                <li class="flex items-center mb-3 p-3 border border-dashed border-[#bfc9d4] rounded-[6px]">
                    <div class="flex">
                        <i class="far fa-file-alt text-20 mx-2.5"></i>
                        <div class="font-medium">Doctor Prescription</div>
                    </div>
                    <div class="mr-2.5 cursor-pointer ml-auto">
                        <td>
                            <i aria-label="Delete" class="far fa-trash-alt pr-2.5"></i>
                            <i aria-label="Download" class="far fa-arrow-alt-circle-down"></i>
                        </td>
                    </div>
                </li>
                <li class="flex items-center mb-3 p-3 border border-dashed border-[#bfc9d4] rounded-[6px]">
                    <div class="flex">
                        <i class="far fa-file-archive text-20 mx-2.5"></i>
                        <div class="font-medium">X-Ray Files</div>
                    </div>
                    <div class="mr-2.5 cursor-pointer ml-auto">
                        <td>
                            <i aria-label="Delete" class="far fa-trash-alt pr-2.5"></i>
                            <i aria-label="Download" class="far fa-arrow-alt-circle-down"></i>
                        </td>
                    </div>
                </li>
                <li class="flex items-center mb-3 p-3 border border-dashed border-[#bfc9d4] rounded-[6px]">
                    <div class="flex">
                        <i class="far fa-file-pdf text-20 mx-2.5"></i>
                        <div class="font-medium">Urine Report</div>
                    </div>
                    <div class="mr-2.5 cursor-pointer ml-auto">
                        <td>
                            <i aria-label="Delete" class="far fa-trash-alt pr-2.5"></i>
                            <i aria-label="Download" class="far fa-arrow-alt-circle-down"></i>
                        </td>
                    </div>
                </li>
                <li class="flex items-center mb-3 p-3 border border-dashed border-[#bfc9d4] rounded-[6px]">
                    <div class="flex">
                        <i class="far fa-file-image text-20 mx-2.5"></i>
                        <div class="font-medium">Scanned Documents</div>
                    </div>
                    <div class="mr-2.5 cursor-pointer ml-auto">
                        <td>
                            <i aria-label="Delete" class="far fa-trash-alt pr-2.5"></i>
                            <i aria-label="Download" class="far fa-arrow-alt-circle-down"></i>
                        </td>
                    </div>
                </li>
            </ul>
        </nz-card>
    `
})

export class Report { }