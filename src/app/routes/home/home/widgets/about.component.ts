import { Component } from "@angular/core";
import { SharedModule } from "../../../../shared";
import { Service } from "../../../../types";
import { SERVICES } from "../../../../constants";

@Component({
	selector: 'about',
	standalone: true,
	imports: [
		SharedModule
	],
	template: `
    <section class="bg-center bg-no-repeat bg-cover py-7.5 md:py-15 relative bg-section">
		<div class="max-w-1320 md:flex mx-auto relative" data-aos="fade-right">
			<div class="w-full md:w-w3/10 relative flex">
			    <div class="flex relative w-full flex-wrap content-start">
					<div class="mb-5 w-full">
				        <div class="pb-2.5 px-4 md:pl-2.5">		
                            <div class="text-left mb-5.5">	
                                <span class="text-primary text-16 mb-3 block">{{ "app.home.about.title" | i18n }}</span>
                                <h2 class="font-bold text-2xl">{{ "app.home.about.subTitle" | i18n }}</h2>        
        				        <p class="w-4/5 mb-5 text-gray-500">{{ "app.home.about.description" | i18n }}</p>
		                </div>		        
                    </div>
				</div>
				<section class="pb-5 w-full relative">
					<div 
						class="max-w-1320 md:flex mx-auto relative"
					>
					    <div 
							class="w-full md:w-1/2 flex relative"
							*ngFor="let service of services.slice(0, 2)"
						>
			                <div class="p-2.5 flex flex-wrap w-full content-start">
						        <div class="w-full relative">
				                    <div class="pb-2.5 pl-2.5">			
                                        <div class="flex items-start">
	                                        <div class="relative mt-7.5">
											    <img loading="lazy" decoding="async" width="64" height="64" [src]="service.img" class="attachment-thumbnail size-thumbnail" alt="">						
                                            </div>
	                                        <div class="ml-12 flex-1">
		                                        <h3 class="mb-2.5 font-bold text-22 text-primary">{{service.title | i18n}}</h3>
		                                        <p class="m-0 text-gray-500">{{service.description | i18n}}</p>
	                                        </div>
                                        </div>		                                        
                                    </div>
				                </div>
					        </div>
		                </div>
					</div>
		        </section>
				<section class="pt-5 relative w-full">
					<div class="max-w-1320 md:flex mx-auto relative">
					    <div 
							class="w-full relative"
							*ngFor="let service of services.slice(2, 4)"
						>
			                <div class="p-2.5 flex flex-wrap w-full content-start">
						        <div class="w-full">
				                    <div class="pb-2.5 pl-2.5">
			                            <div class="flex items-start">
	                                        <div class="relative mt-7.5">
											    <img loading="lazy" decoding="async" width="60" height="60" [src]="service.img" class="attachment-thumbnail size-thumbnail" alt="">						
                                            </div>
	                                        <div class="ml-12 flex-1">
		                                        <h3 class="mb-2.5 font-bold text-22 text-primary">{{service.title | i18n}}</h3>
		                                        <p class="m-0 text-gray-500">{{service.description | i18n}}</p>
	                                        </div>
                                        </div>		
                                    </div>
				                </div>
					        </div>
		                </div>
					</div>
		        </section>
			</div>
		</div>
		<div class="w-full md:w-2/5 flex" data-aos="fade-left">
			<div class="content-end items-end flex w-full flex-wrap">
					<div class="w-full text-center">
				        <div>
							<img 
								loading="lazy" 
								decoding="async" 
								width="398" 
								height="658" 
								src="../../../../../assets/images/doctor/doctor-1.png" 
								class="max-w-full inline-block" 
								alt="" 
								sizes="(max-width: 398px) 100vw, 398px"
							/>													
                        </div>
				    </div>
				</div>
		    </div>
		</div>
	</section>
    `
})

export class HomeAbout {
	services: Service[] = SERVICES;
}