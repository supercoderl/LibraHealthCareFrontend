import { Component } from "@angular/core";
import { SharedModule } from "../../../../shared";
import { Stage } from "../../../../types";
import { STAGES } from "../../../../constants";

@Component({
    selector: 'step',
    standalone: true,
    imports: [
        SharedModule
    ],
    template: `
        <section class="bg-section">
            <div class="container max-w-1200 mx-auto md:px-4">
                <div class="md:-mx-4 flex flex-wrap">
                    <div class="md:px-4 w-full flex-auto">
                        <div class="py-7.5 md:py-15 relative">
                            <div class="absolute h-full w-full top-0 left-0"></div>
                            <div class="relative">
                                <div class="md:-mx-4 flex flex-wrap">
                                    <div class="px-4 m-auto flex-auto w-1/2">
                                        <!-- section title -->
                                        <div class="relative mb-7.5 md:mb-17">
                                            <div class="pb-0 text-center">
                                                <h3 class="text-[#33d687] uppercase leading-6 font-bold mb-1 inline-block">{{ "app.home.step.title" | i18n }}</h3>
                                                <h2 class="text-2xl md:text-10.8 leading-12.8 font-semibold tracking-0 mb-3 uppercase">{{ "app.home.step.subTitle" | i18n }}</h2>
                                            </div>
                                        </div><!-- section title end -->
                                    </div>
                                </div>
                                <div class="md:-mx-4 flex flex-wrap">
                                    <div class="px-4 w-full flex-auto">
                                        <div class="flex relative">
                                            <div class="-px-4 flex flex-wrap">
                                                <div 
                                                    class="md:px-4 flex-auto w-full md:w-1/4"
                                                    *ngFor="let stage of stages; let i = index"
                                                    data-aos="fade-up"
                                                    [attr.data-aos-delay]="i * 200"
                                                >
                                                    <div 
                                                        [id]="stage.id.toString()"
                                                        class="my-4 relative text-center px-7.5 pt-7.5 pb-8.25 shadow-[1px_1px_13px_0px_rgb(0_10_41_/_4%)] bg-white rounded-5"
                                                    >
                                                        <div class="featured-content">
                                                            <div class="featured-title">
                                                                <h3 class="mb-0 text-22 leading-8 font-semibold text-[#2a334e]">{{stage.title}}</h3>
                                                                <p class="m-0 overflow-hidden text-ellipsis text-[#8d8d8d]">{{stage.subtitle}}</p>
                                                            </div>
                                                        </div>
                                                        <div class="relative w-15 h-15 my-6.2 mx-auto">
                                                            <div class="ttm-process-icon">
                                                                <div class="mb-0 h-15 w-15 leading-15 flex items-center justify-center text-center transition-all duration-500 relative bg-[#f5f5f5]">
                                                                    <fa-icon class="text-28" [icon]="stage.icon"></fa-icon>
                                                                </div>
                                                                <span 
                                                                    class="text-15 font-semibold bg-[#2a334e] text-white w-7.5 h-7.5 leading-7 rounded-full block text-center absolute -right-5 top-3.75 transition duration-300 ease-cubic number after:content-[var(--content)]"
                                                                >0{{stage.id}}</span>
                                                            </div>
                                                        </div>
                                                        <div class="featured-content">
                                                            <div class="featured-desc">
                                                                <p class="mb-0 overflow-hidden text-ellipsis text-[#8d8d8d]">{{stage.description}}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `,
})

export class HomeStep 
{ 
    stages: Stage[] = STAGES;
}