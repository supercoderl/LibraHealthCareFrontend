import { Component, Input } from "@angular/core";
import { SharedModule } from "../../../../shared";
import { Disease } from "../../../../types";

@Component({
    selector: 'diagnosis-result',
    standalone: true,
    imports: [
        SharedModule
    ],
    template: `
        <fieldset
            class="symtom-field bg-white border-0 rounded-3 border-t-2.2 border-solid border-primary w-9/20 md:w-4/5 md:ml-1/40 absolute left-1/2 md:left-auto"
        >
            <h2 class="uppercase mb-1.25 text-primary text-24 text-center">
                Your diagnostic result
            </h2>
            <h3 class="font-normal text-15 text-secondary mb-5 text-center">
                It is possible that you are suffering from <strong>{{result?.name}}</strong>, see below          
            </h3>
            <div>
                <div class="md:mb-6 flex flex-row-reverse shadow-[0_2px_6px_0_rgba(51,_61,_72,_0.1)]">
                    <div class="md:p-8 md:rounded-r-md bg-secondary flex items-start justify-center flex-1">
                        <svg class="w-28 h-28 fill-white" viewBox="0 0 100 100" enable-background="new 0 0 100 100" id="Layer_1" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                            <g>
                                <path d="M45.3,33.4c-3.7,0-6.8,3-6.8,6.8s3,6.8,6.8,6.8s6.8-3,6.8-6.8S49,33.4,45.3,33.4z M45.3,42.9c-1.5,0-2.8-1.2-2.8-2.8   s1.2-2.8,2.8-2.8s2.8,1.2,2.8,2.8S46.8,42.9,45.3,42.9z"/>
                                <path d="M54.4,50c0,3.7,3,6.8,6.8,6.8s6.8-3,6.8-6.8s-3-6.8-6.8-6.8S54.4,46.3,54.4,50z M63.9,50c0,1.5-1.2,2.8-2.8,2.8   s-2.8-1.2-2.8-2.8s1.2-2.8,2.8-2.8S63.9,48.5,63.9,50z"/>
                                <path d="M42.4,50.9c-3.7,0-6.8,3-6.8,6.8s3,6.8,6.8,6.8s6.8-3,6.8-6.8S46.1,50.9,42.4,50.9z M42.4,60.4c-1.5,0-2.8-1.2-2.8-2.8   s1.2-2.8,2.8-2.8s2.8,1.2,2.8,2.8S43.9,60.4,42.4,60.4z"/>
                                <path d="M83.8,43.3c-3,0-5.6,2-6.4,4.8h-3.4c-0.4-5.1-2.5-9.8-5.6-13.5l2.4-2.4c1,0.5,2,0.8,3.1,0.8c1.8,0,3.5-0.7,4.8-2   c2.6-2.6,2.6-6.9,0-9.5c-1.3-1.3-3-2-4.8-2c-1.8,0-3.5,0.7-4.8,2c-2.1,2.1-2.5,5.4-1.2,7.9l-2.4,2.4c-3.7-3.1-8.4-5.2-13.5-5.6   v-3.4c2.7-0.9,4.8-3.4,4.8-6.4c0-3.7-3-6.8-6.8-6.8s-6.8,3-6.8,6.8c0,3,2,5.6,4.8,6.4v3.4c-5.1,0.4-9.8,2.5-13.5,5.6l-2.4-2.4   c1.3-2.5,0.9-5.8-1.2-7.9c-1.3-1.3-3-2-4.8-2c-1.8,0-3.5,0.7-4.8,2c-2.6,2.6-2.6,6.9,0,9.5c1.3,1.3,3,2,4.8,2   c1.1,0,2.2-0.3,3.1-0.8l2.4,2.4c-3.1,3.7-5.2,8.4-5.6,13.5h-3.4c-0.9-2.7-3.4-4.8-6.4-4.8c-3.7,0-6.8,3-6.8,6.8s3,6.8,6.8,6.8   c3,0,5.6-2,6.4-4.8h3.4c0.4,5.1,2.5,9.8,5.6,13.5l-2.4,2.4c-1-0.5-2-0.8-3.1-0.8c-1.8,0-3.5,0.7-4.8,2c-2.6,2.6-2.6,6.9,0,9.5   c1.3,1.3,3,2,4.8,2c1.8,0,3.5-0.7,4.8-2c2.1-2.1,2.5-5.4,1.2-7.9l2.4-2.4c3.7,3.1,8.4,5.2,13.5,5.6v3.4c-2.7,0.9-4.8,3.4-4.8,6.4   c0,3.7,3,6.8,6.8,6.8s6.8-3,6.8-6.8c0-3-2-5.6-4.8-6.4v-3.4c5.1-0.4,9.8-2.5,13.5-5.6l2.4,2.4c-1.3,2.5-0.9,5.8,1.2,7.9   c1.3,1.3,3,2,4.8,2c1.8,0,3.5-0.7,4.8-2c2.6-2.6,2.6-6.9,0-9.5c-1.3-1.3-3-2-4.8-2c-1.1,0-2.2,0.3-3.1,0.8l-2.4-2.4   c3.1-3.7,5.2-8.4,5.6-13.5h3.4c0.9,2.7,3.4,4.8,6.4,4.8c3.7,0,6.8-3,6.8-6.8S87.5,43.3,83.8,43.3z M71.9,24.2   c0.5-0.5,1.2-0.8,1.9-0.8c0.7,0,1.4,0.3,1.9,0.8c1.1,1.1,1.1,2.8,0,3.9c-1,1-2.9,1-3.9,0C70.8,27,70.8,25.3,71.9,24.2z M50,13.5   c1.5,0,2.8,1.2,2.8,2.8S51.5,19,50,19s-2.8-1.2-2.8-2.8S48.5,13.5,50,13.5z M24.2,28.1c-1.1-1.1-1.1-2.8,0-3.9   c0.5-0.5,1.2-0.8,1.9-0.8c0.7,0,1.4,0.3,1.9,0.8c1.1,1.1,1.1,2.8,0,3.9C27,29.1,25.2,29.1,24.2,28.1z M16.3,52.8   c-1.5,0-2.8-1.2-2.8-2.8s1.2-2.8,2.8-2.8S19,48.5,19,50S17.8,52.8,16.3,52.8z M28.1,75.8c-1,1-2.9,1-3.9,0c-1.1-1.1-1.1-2.8,0-3.9   c0.5-0.5,1.2-0.8,1.9-0.8c0.7,0,1.4,0.3,1.9,0.8C29.2,73,29.2,74.7,28.1,75.8z M50,86.5c-1.5,0-2.8-1.2-2.8-2.8S48.5,81,50,81   s2.8,1.2,2.8,2.8S51.5,86.5,50,86.5z M75.8,71.9c1.1,1.1,1.1,2.8,0,3.9c-1,1-2.9,1-3.9,0c-1.1-1.1-1.1-2.8,0-3.9   c0.5-0.5,1.2-0.8,1.9-0.8C74.6,71.1,75.3,71.4,75.8,71.9z M50,70c-11,0-20-9-20-20s9-20,20-20s20,9,20,20S61,70,50,70z M83.8,52.8   c-1.5,0-2.8-1.2-2.8-2.8s1.2-2.8,2.8-2.8s2.8,1.2,2.8,2.8S85.3,52.8,83.8,52.8z"/>
                            </g>
                        </svg>
                    </div>
                    <div class="md:px-8 md:pb-8 md:pt-4 flex-[3]">
                        <div class="mt-3">
                            <h2 class="mb-2">
                                Summary of this disease
                            </h2>
                            <ul class="flex flex-col gap-1 p-0 m-0">
                                <li class="flex items-start gap-3 justify-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" role="img" class="w-6 h-6 block">
                                        <path d="M28 24c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4m0 0"></path>
                                    </svg>
                                    <div>
                                        <p class="text-[#1F262C]">
                                            {{result?.description}}
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="md:px-8 md:pb-8 md:pt-4 shadow-[0_2px_6px_0_rgba(51,_61,_72,_0.1)]">
                    <h3 class="text-[#1f262c] m-0">Help us learn and improve</h3>
                    <div>
                        <h3 class="md:my-3 text-[#1f262c] text-xl">
                            What kind of care are you planning to get now?
                        </h3>
                        <button 
                            class="bg-transparent text-primary px-5 py-2 mt-3 mr-3 border border-solid border-[#1471c966] rounded-sm"
                            *ngFor="let treatment of getTreatmentPlans()"
                        >
                            {{treatment}}
                        </button>
                        <button class="bg-transparent text-primary px-5 py-2 mt-3 mr-3 border border-solid border-[#1471c966] rounded-sm">
                            Not sure
                        </button>
                    </div>
                    <button class="text-start whitepsace-normal mt-4 flex items-center gap-1 text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" role="img" class="w-6 h-6 block fill-primary">
                            <path d="M26 14v4h-4v-4zm0 20V22h-4v12zm0 0"></path>
                            <path fill-rule="evenodd" d="M24 44c11.047 0 20-8.953 20-20S35.047 4 24 4 4 12.953 4 24s8.953 20 20 20m0-4c8.836 0 16-7.164 16-16S32.836 8 24 8 8 15.164 8 24s7.164 16 16 16m0 0"></path>
                        </svg> 
                        Why am I being asked this?
                    </button>
                </div>
                <div class="md:p-12">
                    <div>
                        <button class="px-8 py-3 mb-3 w-full relative bg-primary text-white">
                            <div></div>
                            <span class="opacity-1">Download PDF report</span>
                        </button>
                        <button class="px-8 py-3 w-full relative text-primary">
                            <div></div>
                            <span class="opacity-1">Reset the test</span>
                        </button>
                    </div>
                </div>
            </div>
        </fieldset>
    `
})

export class DiagnosisResult {
    @Input()
    result!: Disease | null;

    @Input()
    reset!: () => void;

    getTreatmentPlans(): string[] {
        return this.result ? this.result.treatmentPlans.split(',').map(item => item.trim()) : [];
    }
}