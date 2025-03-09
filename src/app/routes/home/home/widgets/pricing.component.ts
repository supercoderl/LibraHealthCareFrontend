import { Component } from "@angular/core";
import { SharedModule } from "../../../../shared";
import { faHeartPulse } from "@fortawesome/free-solid-svg-icons";
import { Plan } from "../../../../types";
import { PLANS } from "../../../../constants";

@Component({
    selector: 'pricing',
    standalone: true,
    imports: [
        SharedModule
    ],
    template: `
        <section class="relative py-7.5 md:py-15 bg-section">
            <div class="container px-4 max-w-1320 mx-auto">
                <div class="">
                    <!-- section title -->
                    <div class="relative mb-7.5 md:mb-17">
                        <div class="pb-0 text-center">
                            <h3 class="text-[#33d687] uppercase leading-6 font-bold mb-1 inline-block">{{ "app.home.pricing.title" | i18n }}</h3>
                            <h2 class="text-2xl md:text-10.8 leading-12.8 font-semibold tracking-0 mb-3 uppercase">{{ "app.home.pricing.subTitle" | i18n }}</h2>
                        </div>
                    </div><!-- section title end -->
                </div>
                <div class="flex flex-wrap gap-6 md:gap-0 md:-mx-4 justify-center">
                    <div 
                        class="w-full md:w-1/4 flex-auto md:px-3 rounded-sm" 
                        *ngFor="let plan of plans; let i = index"
                        data-aos="fade-up"
                        [attr.data-aos-delay]="i * 200"
                    >
                        <div 
                            [id]="plan.id.toString()"
                            [ngClass]="plan.id === 1 ? 'bg-primary' : 'bg-white'"
                            class="hover:bg-primary transition-all duration-500 group rounded-10 flex-1 relative flex flex-col h-full cursor-pointer"
                        >
                            <div class="m-0 p-7.5 flex-1">
                                <div class="pb-4">
                                    <div class="relative pb-4 flex items-center">
                                        <div class="w-full flex items-center justify-between">
                                            <h4 
                                                [ngClass]="plan.id === 1 ? 'text-white' : null"
                                                class="text-2xl capitalize mb-0 group-hover:text-white"
                                            >
                                                {{plan.title | i18n}}
                                            </h4>
                                            <span 
                                                *ngIf="plan.discount"
                                                class="py-1.5 px-3 leading-4 font-medium rounded-7 inline-block text-center bg-[#FFC001] text-white"
                                            >
                                                {{ 'app.discount' | i18n: { value: plan.discount } }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="">
                                    <div class="pb-5">
                                        <h2 
                                            [ngClass]="plan.id === 1 ? 'text-white' : 'text-primary'"
                                            class="mb-0 font-bold text-7.5 group-hover:text-white"
                                        >
                                            {{'$' + plan.price}}
                                        </h2>
                                        <span 
                                            [ngClass]="plan.id === 1 ? 'text-white' : null"
                                            class="group-hover:text-white"
                                        >
                                            {{ 'app.per-month' | i18n }}
                                        </span>
                                    </div>
                                    <div class="mb-7.5 text-center">
                                        <a 
                                            class="text-primary w-full shadow-[inset_0_0_0_0px_#0E82FD] rounded-35 transition-all duration-500 border-2 border-solid border-primary p-3 bg-white text-16 font-semibold inline-block" 
                                            href="/react/template/pages/pricing-plan"
                                        >
                                            {{ 'app.request-a-demo' | i18n }}
                                        </a>
                                    </div>
                                    <div class="pb-10 border-b border-solid border-[#F1F5F9]">
                                        <ul class="m-0 p-0">
                                            <li 
                                                [ngClass]="plan.id === 1 ? 'text-white' : null"
                                                class="mb-4 relative text-16 text-[#374151] group-hover:text-white"
                                            >
                                                <fa-icon class="text-[1em] mr-1" [icon]="faHeartPulse"></fa-icon>
                                                {{plan.limits.patientProfiles}} {{ "app.home.pricing.patientProfiles" | i18n }}
                                            </li>
                                            <li 
                                                [ngClass]="plan.id === 1 ? 'text-white' : null"
                                                class="mb-4 relative text-16 text-[#374151] group-hover:text-white"
                                            >
                                                <fa-icon class="text-[1em] mr-1" [icon]="faHeartPulse"></fa-icon>
                                                {{plan.limits.medicalConsulations}} {{ "app.home.pricing.medicalConsulations" | i18n }}
                                            </li>
                                            <li 
                                                [ngClass]="plan.id === 1 ? 'text-white' : null"
                                                class="mb-4 relative text-16 text-[#374151] group-hover:text-white"
                                            >
                                                <fa-icon class="text-[1em] mr-1" [icon]="faHeartPulse"></fa-icon>
                                                {{plan.limits.dataStorage}} {{ "app.home.pricing.dataStorage" | i18n }}
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="pt-3.75">
                                        <ul class="m-0 p-0">
                                            <li 
                                                *ngFor="let feature of plan.features"
                                                [ngClass]="plan.id === 1 ? 'text-white before:text-white' : null"
                                                class="mb-4 relative text-16 text-[#374151] pl-[25px] group-hover:text-white group-hover:before:text-white before:content-['+'] before:text-primary before:absolute before:top-1/2 before:-translate-y-1/2 before:left-0 before:text-16 before:font-black"
                                            >
                                                {{feature | i18n}}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `
})

export class HomePricing {
    faHeartPulse = faHeartPulse;
    plans: Plan[] = PLANS;
}