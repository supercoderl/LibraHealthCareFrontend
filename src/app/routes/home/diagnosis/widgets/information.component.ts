import { Component, Input } from "@angular/core";
import { SharedModule } from "../../../../shared";

@Component({
    selector: 'diagnosis-information',
    standalone: true,
    imports: [
        SharedModule
    ],
    template: `
        <fieldset
            class="bg-white border-0 rounded-3 shadow-diagnosis py-5 px-4 md:px-7.5 border-t-2.2 border-solid border-primary w-9/20 md:w-4/5 md:ml-1/40 absolute transition duration-500 left-1/2 md:left-auto -translate-x-1/2 md:translate-x-0"
            [ngClass]="stage == 1 ? 'opacity-100' : 'opacity-0'"
        >
            <h2 class="uppercase mb-1.25 text-primary text-18 text-center">
                Basic Information
            </h2>
            <h3 class="font-normal text-13 text-secondary mb-5 text-center">
                We need to fill in all fields to start your test
            </h3>

            <div class="flex flex-wrap items-center md:gap-4">
                <!-- Begin Your Name Field -->
                <div class="field w-full md:flex-1">
                    <label
                        for="name"
                        class="text-[#333333] text-left text-15 font-extralight pb-1.7 pt-3 inline-block"
                    >
                        Your Name *
                    </label>

                    <input
                        id="name"
                        class="outline-none block w-full mb-5 py-2.5 px-4 border border-solid border-[#d9d9d9] rounded-3 text-[#837E7E] transition-all duration-300"
                        name="name"
                        required="required"
                        type="text"
                        value=""
                        placeholder=""
                        data-rule-required="true"
                        data-msg-required="Please include your name"
                    />
                    <span
                        class="rounded-3 absolute left-525 -mt-14.5 px-2.5 h-9.8 block text-white bg-[#e62163] border-0 leading-9.8 whitespace-nowrap"
                        style="display: none"
                    >
                    </span>
                </div>
                <!-- End Your Name Field -->

                <!-- Begin Your Email Field -->
                <div class="field w-full md:flex-1">
                    <label
                        for="email"
                        class="text-[#333333] text-left text-15 font-extralight pb-1.7 pt-3 inline-block"
                    >
                        Your E-mail Address *
                    </label>

                    <input
                        id="email"
                        class="outline-none block w-full mb-5 py-2.5 px-4 border border-solid border-[#d9d9d9] rounded-3 text-[#837E7E] transition-all duration-300"
                        name="email"
                        required="required"
                        type="email"
                        value=""
                        placeholder=""
                        data-rule-required="true"
                        data-msg-required="Please enter a valid email address."
                    />
                    <span
                    class="rounded-3 absolute left-525 -mt-14.5 px-2.5 h-9.8 block text-white bg-[#e62163] border-0 leading-9.8 whitespace-nowrap"
                    style="display: none"
                    >
                    </span>
                </div>
                <!-- End Your Email Field -->
            </div>

            <!-- Begin Your Age Field -->
            <div class="field">
                <label
                    for="age"
                    class="text-[#333333] text-left text-15 font-extralight pb-1.7 pt-3 inline-block"
                >
                    Your Age *
                </label>

                <div class="relative">
                    <select
                        id="age"
                        class="outline-none block w-full mb-5 py-2.5 px-4 border border-solid border-[#d9d9d9] rounded-3 text-[#837E7E] transition-all duration-300 appearance-none"
                        name="age"
                        required="required"
                        value=""
                        placeholder=""
                        data-rule-required="true"
                        data-msg-required="Please enter a valid age address."
                    ></select>
                    <span
                        class="absolute inset-y-0 right-2 flex items-center pointer-events-none"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-4 h-4 text-gray-500"
                        >
                            <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 9l6 6 6-6"
                            />
                        </svg>
                    </span>
                </div>

                <span
                    class="rounded-3 absolute left-525 -mt-14.5 px-2.5 h-9.8 block text-white bg-[#e62163] border-0 leading-9.8 whitespace-nowrap"
                    style="display: none"
                >
                </span>
            </div>
            <!-- End Your Age Field -->

            <!-- Begin Gender Field -->
            <div class="field">
                <label
                    class="text-[#333333] text-left text-15 font-extralight pb-1.7 pt-3 inline-block"
                    for="edit-submitted-constituent-base-total-constituents total_number_of_constituents_in_your_database-99a6d115-5e68-4355-a7d0-529207feb0b3_6344"
                    >Your gender *</label
                >

                <div class="flex gap-6" role="radiogroup">
                    <button
                        class="group flex-1 inline-flex flex-col justify-center items-center border border-solid border-[#d9d9d9] rounded-sm px-4 py-6 relative text-center gap-2 hover:bg-primary transition-all duration-300"
                        id="female"
                        role="radio"
                        aria-checked="false"
                        name="sex"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 48 48"
                            role="img"
                            class="text-primary h-10 w-10 fill-primary group-hover:fill-white"
                        >
                            <path
                            fill-rule="evenodd"
                            d="M36.75 15.75c0 6.79-5.309 12.34-12 12.727v6.773h9.75v1.5h-9.75V45h-1.5v-8.25H13.5v-1.5h9.75v-6.773c-6.691-.387-12-5.938-12-12.727C11.25 8.707 16.957 3 24 3s12.75 5.707 12.75 12.75M24 27c6.215 0 11.25-5.035 11.25-11.25S30.215 4.5 24 4.5 12.75 9.535 12.75 15.75 17.785 27 24 27m0 0"
                            ></path>
                        </svg>
                        <span class="text-[#1F262C] group-hover:text-white">Female</span>
                    </button>
                    <button
                        class="group flex-1 inline-flex flex-col justify-center items-center border border-solid border-[#d9d9d9] rounded-sm px-4 py-6 relative text-center gap-2 hover:bg-primary transition-all duration-300"
                        id="male"
                        role="radio"
                        aria-checked="false"
                        name="sex"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 48 48"
                            role="img"
                            class="text-primary h-10 w-10 fill-primary group-hover:fill-white"
                        >
                            <path
                            fill-rule="evenodd"
                            d="M24 7.5V9h15.46L27.23 21.23A12.7 12.7 0 0 0 18.75 18C11.707 18 6 23.707 6 33S11.707 43.5 18.75 43.5 31.5 37.793 31.5 33a12.68 12.68 0 0 0-3.21-8.457L40.5 10.082V25.5H42v-18zm6 23.25C30 36.965 24.965 42 18.75 42S7.5 36.965 7.5 33 12.535 19.5 18.75 19.5 30 24.535 30 33m0 0"
                            ></path>
                        </svg>
                        <span class="text-[#1F262C] group-hover:text-white">Male</span>
                    </button>
                </div>
                <span
                    class="rounded-3 absolute left-525 -mt-14.5 px-2.5 h-9.8 block text-white bg-[#e62163] border-0 leading-9.8 whitespace-nowrap"
                    style="display: none"
                >
                </span>
            </div>

            <!-- End Gender Field -->

            <input
                type="button"
                name="next"
                class="next float-right w-25 bg-primary font-bold text-white border-none rounded-px cursor-pointer py-2.5 px-1.25 mb-2.5 mt-6 mx-auto transition-all duration-300 block"
                value="Next"
                (click)="onNextClick()"
            />
        </fieldset>
    `
})

export class DiagnosisInformation 
{
    @Input()
    stage!: number;

    @Input()
    onNextClick!: () => void;
}