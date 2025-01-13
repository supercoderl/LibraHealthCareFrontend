import { Component } from "@angular/core";
import { SharedModule } from "../../../../shared";

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
                Call an ambulance
            </h2>
            <h3 class="font-normal text-15 text-secondary mb-5 text-center">
                Your symptoms are very serious, and you may require emergency care. Do not delay. Call an ambulance right now.
            </h3>
            <div>
                <div class="md:mb-6 flex flex-row-reverse shadow-[0_2px_6px_0_rgba(51,_61,_72,_0.1)]">
                    <div class="md:p-8 md:rounded-r-md bg-[#fa514f] flex items-start justify-center flex-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" role="img" class="w-28 h-28 fill-white">
                            <path fill-rule="evenodd" d="M23.25 10.5V.75h1.5v9.75zM9.625 4.082l4.5 6.75-1.25.836-4.5-6.75zm30 .836-4.5 6.75-1.25-.836 4.5-6.75zM17.352 15a5.25 5.25 0 0 0-5.215 4.652L9.84 39.75h13.41v-6.797A6 6 0 0 1 18 27c0-3.313 2.688-6 6-6 3.313 0 6 2.688 6 6a6 6 0 0 1-5.25 5.953v6.797h13.41l-2.297-20.098A5.25 5.25 0 0 0 30.648 15zm22.316 24.75-2.316-20.266a6.746 6.746 0 0 0-6.704-5.984H17.352a6.746 6.746 0 0 0-6.704 5.984L8.332 39.75H7.5c-2.07 0-3.75 1.68-3.75 3.75V48h40.5v-4.5c0-2.07-1.68-3.75-3.75-3.75zM7.5 41.25a2.25 2.25 0 0 0-2.25 2.25v3h37.5v-3a2.25 2.25 0 0 0-2.25-2.25zM24 22.5a4.501 4.501 0 0 0 0 9 4.501 4.501 0 0 0 0-9m0 0"></path>
                        </svg>
                    </div>
                    <div class="md:px-12 md:pb-12 md:pt-8 flex-[3]">
                        <div class="mt-3">
                            <h2 class="mb-2">
                                Alarming symptoms
                            </h2>
                            <ul class="flex flex-col gap-1 p-0 m-0">
                                <li class="flex items-start gap-3 justify-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" role="img" class="w-6 h-6 block">
                                        <path d="M28 24c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4m0 0"></path>
                                    </svg>
                                    <div>
                                        <p class="text-[#1F262C]">
                                            Recent surgery 
                                        </p>
                                    </div>
                                </li>
                                <li class="flex items-start gap-3 justify-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" role="img" class="w-6 h-6 block">
                                        <path d="M28 24c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4m0 0"></path>
                                    </svg>
                                    <div>
                                        <p class="text-[#1F262C]">
                                            Severe chest pain
                                        </p>
                                    </div>
                                </li>
                                <li class="flex items-start gap-3 justify-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" role="img" class="w-6 h-6 block">
                                        <path d="M28 24c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4m0 0"></path>
                                    </svg>
                                    <div>
                                        <p class="text-[#1F262C]">
                                            Discharge from ear
                                        </p>
                                    </div>
                                </li>
                                <li class="flex items-start gap-3 justify-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" role="img" class="w-6 h-6 block">
                                        <path d="M28 24c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4m0 0"></path>
                                    </svg>
                                    <div>
                                        <p class="text-[#1F262C]">
                                            Loss of consciousness after an injury
                                        </p>
                                    </div>
                                </li>
                                <li class="flex items-start gap-3 justify-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" role="img" class="w-6 h-6 block">
                                        <path d="M28 24c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4m0 0"></path>
                                    </svg>
                                    <div>
                                        <p class="text-[#1F262C]">
                                            Head area or neck injury
                                        </p>
                                    </div>
                                </li>
                                <li class="flex items-start gap-3 justify-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" role="img" class="w-6 h-6 block">
                                        <path d="M28 24c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4m0 0"></path>
                                    </svg>
                                    <div>
                                        <p class="text-[#1F262C]">Severe pain in lower limb</p>
                                    </div>
                                </li>
                                <li class="flex items-start gap-3 justify-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" role="img" class="w-6 h-6 block">
                                        <path d="M28 24c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4m0 0"></path>
                                    </svg>
                                    <div>
                                        <p class="text-[#1F262C]">Sudden and sharp chest pain after an injury</p>
                                    </div>
                                </li>
                                <li class="flex items-start gap-3 justify-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" role="img" class="w-6 h-6 block">
                                        <path d="M28 24c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4m0 0"></path>
                                    </svg>
                                    <div>
                                        <p class="text-[#1F262C]">Ear injury</p>
                                    </div>
                                </li>
                                <li class="flex items-start gap-3 justify-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" role="img" class="w-6 h-6 block">
                                        <path d="M28 24c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4m0 0"></path>
                                    </svg>
                                    <div>
                                        <p class="text-[#1F262C]">Loss of consciousness</p>
                                    </div>
                                </li>
                                <li class="flex items-start gap-3 justify-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" role="img" class="w-6 h-6 block">
                                        <path d="M28 24c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4m0 0"></path>
                                    </svg>
                                    <div>
                                        <p class="text-[#1F262C]">Injury in a motorcycle crash</p>
                                    </div>
                                </li>
                                <li class="flex items-start gap-3 justify-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" role="img" class="w-6 h-6 block">
                                        <path d="M28 24c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4m0 0"></path>
                                    </svg>
                                    <div>
                                        <p class="text-[#1F262C]">Chest pain</p>
                                    </div>
                                </li>
                                <li class="flex items-start gap-3 justify-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" role="img" class="w-6 h-6 block">
                                        <path d="M28 24c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4m0 0"></path>
                                    </svg>
                                    <div>
                                        <p class="text-[#1F262C]">Neck injury</p>
                                    </div>
                                </li>
                                <li class="flex items-start gap-3 justify-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" role="img" class="w-6 h-6 block">
                                        <path d="M28 24c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4m0 0"></path>
                                    </svg>
                                    <div>
                                        <p class="text-[#1F262C]">Hand injury</p>
                                    </div>
                                </li>
                                <li class="flex items-start gap-3 justify-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" role="img" class="w-6 h-6 block">
                                        <path d="M28 24c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4m0 0"></path>
                                    </svg>
                                    <div>
                                        <p class="text-[#1F262C]">Injury caused by a major force</p>
                                    </div>
                                </li>
                                <li class="flex items-start gap-3 justify-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" role="img" class="w-6 h-6 block">
                                        <path d="M28 24c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4m0 0"></path>
                                    </svg>
                                    <div>
                                        <p class="text-[#1F262C]">Limited blood flow past the injured limb</p>
                                    </div>
                                </li>
                                <li class="flex items-start gap-3 justify-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" role="img" class="w-6 h-6 block">
                                        <path d="M28 24c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4m0 0"></path>
                                    </svg>
                                    <div>
                                        <p class="text-[#1F262C]">Vision problems after an injury</p>
                                    </div>
                                </li>
                                <li class="flex items-start gap-3 justify-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" role="img" class="w-6 h-6 block">
                                        <path d="M28 24c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4m0 0"></path>
                                    </svg>
                                    <div>
                                        <p class="text-[#1F262C]">Breathing problems after an injury</p>
                                    </div>
                                </li>
                                <li class="flex items-start gap-3 justify-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" role="img" class="w-6 h-6 block">
                                        <path d="M28 24c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4m0 0"></path>
                                    </svg>
                                    <div>
                                        <p class="text-[#1F262C]">Injured joint in an unnatural position or deformed</p>
                                    </div>
                                </li>
                                <li class="flex items-start gap-3 justify-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" role="img" class="w-6 h-6 block">
                                        <path d="M28 24c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4m0 0"></path>
                                    </svg>
                                    <div>
                                        <p class="text-[#1F262C]">New neurological changes after an injury</p>
                                    </div>
                                </li>
                                <li class="flex items-start gap-3 justify-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" role="img" class="w-6 h-6 block">
                                        <path d="M28 24c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4m0 0"></path>
                                    </svg>
                                    <div>
                                        <p class="text-[#1F262C]">Chest injury</p>
                                    </div>
                                </li>
                                <li class="flex items-start gap-3 justify-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" role="img" class="w-6 h-6 block">
                                        <path d="M28 24c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4m0 0"></path>
                                    </svg>
                                    <div>
                                        <p class="text-[#1F262C]">Shoulder injury <!----></p>
                                    </div>
                                </li>
                                <li class="flex items-start gap-3 justify-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" role="img" class="w-6 h-6 block">
                                        <path d="M28 24c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4m0 0"></path>
                                    </svg>
                                    <div>
                                        <p class="text-[#1F262C]">Recent head injury <!----></p>
                                    </div>
                                </li>
                                <li class="flex items-start gap-3 justify-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" role="img" class="w-6 h-6 block">
                                        <path d="M28 24c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4m0 0"></path>
                                    </svg>
                                    <div>
                                        <p class="text-[#1F262C]">Loss of consciousness, more than 1 minute <!----></p>
                                    </div>
                                </li>
                                <li class="flex items-start gap-3 justify-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" role="img" class="w-6 h-6 block">
                                        <path d="M28 24c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4m0 0"></path>
                                    </svg>
                                    <div>
                                        <p class="text-[#1F262C]">Elbow injury <!----></p>
                                    </div>
                                </li>
                                <li class="flex items-start gap-3 justify-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" role="img" class="w-6 h-6 block">
                                        <path d="M28 24c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4m0 0"></path>
                                    </svg>
                                    <div>
                                        <p class="text-[#1F262C]">Finger injury <!----></p>
                                    </div>
                                </li>
                                <li class="flex items-start gap-3 justify-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" role="img" class="w-6 h-6 block">
                                        <path d="M28 24c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4m0 0"></path>
                                    </svg>
                                    <div>
                                        <p class="text-[#1F262C]">Severe pain after an injury <!----></p>
                                    </div>
                                </li>
                                <li class="flex items-start gap-3 justify-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" role="img" class="w-6 h-6 block">
                                        <path d="M28 24c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4m0 0"></path>
                                    </svg>
                                    <div>
                                        <p class="text-[#1F262C]">Whiplash injury <!----></p>
                                    </div>
                                </li>
                                <li class="flex items-start gap-3 justify-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" role="img" class="w-6 h-6 block">
                                        <path d="M28 24c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4m0 0"></path>
                                    </svg>
                                    <div>
                                        <p class="text-[#1F262C]">Lip injury <!----></p>
                                    </div>
                                </li>
                                <li class="flex items-start gap-3 justify-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" role="img" class="w-6 h-6 block">
                                        <path d="M28 24c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4m0 0"></path>
                                    </svg>
                                    <div>
                                        <p class="text-[#1F262C]">Chest pain spreading to the neck <!----></p>
                                    </div>
                                </li>
                                <li class="flex items-start gap-3 justify-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" role="img" class="w-6 h-6 block">
                                        <path d="M28 24c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4m0 0"></path>
                                    </svg>
                                    <div>
                                        <p class="text-[#1F262C]">Pain in lower limb</p>
                                    </div>
                                </li>
                                <li class="flex items-start gap-3 justify-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" role="img" class="w-6 h-6 block">
                                        <path d="M28 24c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4m0 0"></path>
                                    </svg>
                                    <div>
                                        <p class="text-[#1F262C]">Abnormal wound drainage</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="md:px-12 md:pb-12 md:pt-8 md:mb-6 shadow-[0_2px_6px_0_rgba(51,_61,_72,_0.1)]">
                    <div>
                        <h2 class="mb-3 border-b border-solid border-border">Possible conditions</h2>
                        <ul class="flex flex-col mb-3 p-0">
                            <li class="flex items-center relative border-b border-solid border-border">
                                <button class="px-3 py-4 w-full">
                                    <div class="mb-2 flex items-center">
                                        <div class="mr-2 w-8 h-2 bg-[#D0DDD0] rounded-xl">
                                            <div class="h-full relative bg-secondary w-2/6 rounded-xl"></div>
                                        </div>
                                        <p class="text-[#5f7285] m-0">Strong evidence</p>
                                    </div>
                                    <div class="mb-2">
                                        <h3 class="text-start text-xl">Broken skull</h3>
                                        <p class="text-[#5f7285] m-0 text-start">Braincase fracture</p>
                                    </div>
                                    <div class="ml-3 flex items-center justify-end">
                                        <div class="text-start whitespace-normal inline-flex items-center text-primary">
                                            Show details
                                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 fill-primary" viewBox="0 0 48 48" role="img">
                                                <path fill-rule="evenodd" d="m20 12-2.828 2.828L26.344 24l-9.172 9.172L20 36l12-12zm0 0"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </button>
                            </li>
                            <li class="flex items-center relative border-b border-solid border-border">
                                <button class="px-3 py-4 w-full">
                                    <div class="mb-2 flex items-center">
                                        <div class="mr-2 w-8 h-2 bg-[#D0DDD0] rounded-xl">
                                            <div class="h-full relative bg-secondary w-2/6 rounded-xl"></div>
                                        </div>
                                        <p class="text-[#5f7285] m-0">Moderate evidence</p>
                                    </div>
                                    <div class="mb-2">
                                        <h3 class="text-start text-xl">Broken rib</h3>
                                        <p class="text-[#5f7285] m-0 text-start">Rib fracture</p>
                                    </div>
                                    <div class="ml-3 flex items-center justify-end">
                                        <div class="text-start whitespace-normal inline-flex items-center text-primary">
                                            Show details
                                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 fill-primary" viewBox="0 0 48 48" role="img">
                                                <path fill-rule="evenodd" d="m20 12-2.828 2.828L26.344 24l-9.172 9.172L20 36l12-12zm0 0"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </button>
                            </li>
                            <li class="flex items-center relative border-b border-solid border-border">
                                <button class="px-3 py-4 w-full">
                                    <div class="mb-2 flex items-center">
                                        <div class="mr-2 w-8 h-2 bg-[#D0DDD0] rounded-xl">
                                            <div class="h-full relative bg-secondary w-2/6 rounded-xl"></div>
                                        </div>
                                        <p class="text-[#5f7285] m-0">Moderate evidence</p>
                                    </div>
                                    <div class="mb-2">
                                        <h3 class="text-start text-xl">Pulmonary embolism</h3>
                                    </div>
                                    <div class="ml-3 flex items-center justify-end">
                                        <div class="text-start whitespace-normal inline-flex items-center text-primary">
                                            Show details
                                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 fill-primary" viewBox="0 0 48 48" role="img">
                                                <path fill-rule="evenodd" d="m20 12-2.828 2.828L26.344 24l-9.172 9.172L20 36l12-12zm0 0"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </button>
                            </li>
                            <li class="flex items-center relative border-b border-solid border-border">
                                <button class="px-3 py-4 w-full">
                                    <div class="mb-2 flex items-center">
                                        <div class="mr-2 w-8 h-2 bg-[#D0DDD0] rounded-xl">
                                            <div class="h-full relative bg-secondary w-2/6 rounded-xl"></div>
                                        </div>
                                        <p class="text-[#5f7285] m-0">Moderate evidence</p>
                                    </div>
                                    <div class="mb-2">
                                        <h3 class="text-start text-xl">Costochondritis</h3>
                                    </div>
                                    <div class="ml-3 flex items-center justify-end">
                                        <div class="text-start whitespace-normal inline-flex items-center text-primary">
                                            Show details
                                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 fill-primary" viewBox="0 0 48 48" role="img">
                                                <path fill-rule="evenodd" d="m20 12-2.828 2.828L26.344 24l-9.172 9.172L20 36l12-12zm0 0"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </button>
                            </li>
                        </ul>
                    </div>
                    <p class="text-[#5f7285] m-0">We identified these conditions that could be associated with your symptoms. This list is not exhaustive. It is not a medical diagnosis and does not replace one. There may be other conditions with similar symptoms.</p>
                </div>
                <div class="md:px-12 md:pb-12 md:pt-8 shadow-[0_2px_6px_0_rgba(51,_61,_72,_0.1)]">
                    <h3 class="text-[#1f262c] m-0">Help us learn and improve</h3>
                    <div>
                        <h3 class="md:my-3 text-[#1f262c] text-xl">
                            What kind of care are you planning to get now?
                        </h3>
                        <button class="bg-transparent text-primary px-5 py-2 mt-3 mr-3 border border-solid border-[#1471c966] rounded-sm">
                            Recovering at home
                        </button>
                        <button class="bg-transparent text-primary px-5 py-2 mt-3 mr-3 border border-solid border-[#1471c966] rounded-sm">
                            'Allied health care
                        </button>
                        <button class="bg-transparent text-primary px-5 py-2 mt-3 mr-3 border border-solid border-[#1471c966] rounded-sm">
                            Primary care
                        </button>
                        <button class="bg-transparent text-primary px-5 py-2 mt-3 mr-3 border border-solid border-[#1471c966] rounded-sm">
                            Specialist care
                        </button>
                        <button class="bg-transparent text-primary px-5 py-2 mt-3 mr-3 border border-solid border-[#1471c966] rounded-sm">
                            Urgent care
                        </button>
                        <button class="bg-transparent text-primary px-5 py-2 mt-3 mr-3 border border-solid border-[#1471c966] rounded-sm">
                            Emergency, no ambulance
                        </button>
                        <button class="bg-transparent text-primary px-5 py-2 mt-3 mr-3 border border-solid border-[#1471c966] rounded-sm">
                            Emergency, with ambulance
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

}