import { Component } from "@angular/core";
import { SharedModule } from "../../../../shared";

@Component({
    selector: 'patient-group',
    standalone: true,
    imports: [
        SharedModule
    ],
    template: `
        <ul class="p-0 max-h-[440px] overflow-y-auto">
            <li class="flex items-center p-3 rounded-[6px]">
                <div class="flex">
                    <div class="p-2.5 mx-[5px] rounded-full relative inline-block w-[38px] h-[38px] font-semibold text-white bg-[#fd7e14]">
                        <span class="text-white flex items-center justify-center w-full h-full">C</span>
                    </div>
                    <div class="leading-[38px] pl-2.5 font-medium">Cholesterol</div>
                </div>
                <div class="ml-auto">
                    <div class="text-[#96a2b4] text-12 mb-0">5 Patients</div>
                </div>
            </li>
            <li class="flex items-center p-3 rounded-[6px]">
                <div class="flex">
                    <div class="p-2.5 mx-[5px] rounded-full relative inline-block w-[38px] h-[38px] font-semibold text-white bg-[#6f42c1]">
                        <span class="text-white flex items-center justify-center w-full h-full">D</span>
                    </div>
                    <div class="leading-[38px] pl-2.5 font-medium">Diabetic</div>
                </div>
                <div class="ml-auto">
                    <div class="text-[#96a2b4] text-12 mb-0">14 Patients</div>
                </div>
            </li>
            <li class="flex items-center p-3 rounded-[6px]">
                <div class="flex">
                    <div class="p-2.5 mx-[5px] rounded-full relative inline-block w-[38px] h-[38px] font-semibold text-white bg-[#6f42c1]">
                        <span class="text-white flex items-center justify-center w-full h-full">L</span>
                    </div>
                    <div class="leading-[38px] pl-2.5 font-medium">Low Blood Pressure</div>
                </div>
                <div class="ml-auto">
                    <div class="text-[#96a2b4] text-12 mb-0">10 Patients</div>
                </div>
            </li>
            <li class="flex items-center p-3 rounded-[6px]">
                <div class="flex">
                    <div class="p-2.5 mx-[5px] rounded-full relative inline-block w-[38px] h-[38px] font-semibold text-white bg-[#6f42c1]">
                        <span class="text-white flex items-center justify-center w-full h-full">H</span>
                    </div>
                    <div class="leading-[38px] pl-2.5 font-medium">Hypertension</div>
                </div>
                <div class="ml-auto">
                    <div class="text-[#96a2b4] text-12 mb-0">21 Patients</div>
                </div>
            </li>
            <li class="flex items-center p-3 rounded-[6px]">
                <div class="flex">
                    <div class="p-2.5 mx-[5px] rounded-full relative inline-block w-[38px] h-[38px] font-semibold text-white bg-[#6f42c1]">
                        <span class="text-white flex items-center justify-center w-full h-full">M</span>
                    </div>
                    <div class="leading-[38px] pl-2.5 font-medium">Malaria</div>
                </div>
                <div class="ml-auto">
                    <div class="text-[#96a2b4] text-12 mb-0">11 Patients</div>
                </div>
            </li>
            <li class="flex items-center p-3 rounded-[6px]">
                <div class="flex">
                    <div class="p-2.5 mx-[5px] rounded-full relative inline-block w-[38px] h-[38px] font-semibold text-white bg-[#6f42c1]">
                        <span class="text-white flex items-center justify-center w-full h-full">D</span>
                    </div>
                    <div class="leading-[38px] pl-2.5 font-medium">Dental Problem</div>
                </div>
                <div class="ml-auto">
                    <div class="text-[#96a2b4] text-12 mb-0">17 Patients</div>
                </div>
            </li>
            <li class="flex items-center p-3 rounded-[6px]">
                <div class="flex">
                    <div class="p-2.5 mx-[5px] rounded-full relative inline-block w-[38px] h-[38px] font-semibold text-white bg-[#6f42c1]">
                        <span class="text-white flex items-center justify-center w-full h-full">A</span>
                    </div>
                    <div class="leading-[38px] pl-2.5 font-medium">Asthma</div>
                </div>
                <div class="ml-auto">
                    <div class="text-[#96a2b4] text-12 mb-0">8 Patients</div>
                </div>
            </li>
            <li class="flex items-center p-3 rounded-[6px]">
                <div class="flex">
                    <div class="p-2.5 mx-[5px] rounded-full relative inline-block w-[38px] h-[38px] font-semibold text-white bg-[#6f42c1]">
                        <span class="text-white flex items-center justify-center w-full h-full">R</span>
                    </div>
                    <div class="leading-[38px] pl-2.5 font-medium">Rheumatoid Arthritis</div>
                </div>
                <div class="ml-auto">
                    <div class="text-[#96a2b4] text-12 mb-0">9 Patients</div>
                </div>
            </li>
            <li class="flex items-center p-3 rounded-[6px]">
                <div class="flex">
                    <div class="p-2.5 mx-[5px] rounded-full relative inline-block w-[38px] h-[38px] font-semibold text-white bg-[#6f42c1]">
                        <span class="text-white flex items-center justify-center w-full h-full">S</span>
                    </div>
                    <div class="leading-[38px] pl-2.5 font-medium">Stroke</div>
                </div>
                <div class="ml-auto">
                    <div class="text-[#96a2b4] text-12 mb-0">6 Patients</div>
                </div>
            </li>
        </ul>
    `
})

export class PatientGroup { }