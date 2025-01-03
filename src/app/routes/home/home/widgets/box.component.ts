import { Component } from "@angular/core";
import { SharedModule } from "../../../../shared";
import { Box } from "../../../../types";
import { BOXES } from "../../../../constants";

@Component({
    selector: 'box',
    standalone: true,
    imports: [
        SharedModule
    ],
    template: `
        <section class="md:-mt-5 relative pb-20 block">
            <div class="md:max-w-1160 m-auto">
                <div class="bg-transparent text-white block md:-mx-4">
                    <div class="md:table md:w-full md:mx-4 md:table-fixed">
                        <div 
                            *ngFor="let box of boxes; let i = index"
                            class="md:table-cell"
                            style="background-color: {{box.color}};"
                            data-aos="fade-up"
                            [attr.data-aos-delay]="i * 250"
                        >
                            <div class="px-7.5 relative" [id]="box.id.toString()">
                                <div class="clear-both pt-10"></div>
                                <header class="-mb-0.5 block clear-both">
                                    <div class="mb-3.5 text-18 clear-both">{{box.title}}</div>
                                </header>
                                <div>
                                    <p class="m-0">{{box.description}}</p>
                                </div>
                                <div class="clear-both pt-5"></div>
                                <a 
                                    *ngIf="box.type === 'button'"
                                    href="#" 
                                    class="bg-transparent border-2 border-solid border-white text-white mr-4 inline-block text-12 py-3.25 px-6.5 uppercase cursor-pointer font-bold relative transition-all duration-500"
                                >
                                    <span class="text-white inline-block">{{box.buttonText}}</span>
                                </a>
                                <div 
                                    *ngIf="box.type === 'input'"
                                >
                                    <div class="relative">
                                        <input
                                            class="w-full md:w-auto bg-transparent border-2 border-solid border-white text-white mr-4 inline-block text-12 py-3.25 px-6.5 pr-7.5 uppercase cursor-pointer font-bold relative transition-all duration-500 outline-none placeholder:text-gray-300"
                                            placeholder="Find doctor..."
                                        />
                                        <span nz-icon nzType="search" nzTheme="outline" class="absolute right-8 top-1/2 -translate-y-1/2 text-18"></span>
                                    </div>
                                </div>
                                <div class="clear-both pt-10"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `
})

export class HomeBox 
{ 
    boxes: Box[] = BOXES;
}