import { Component } from "@angular/core";
import { SharedModule } from "../../../../shared";
import { AnimationLoader, AnimationOptions, LottieComponent, provideLottieOptions } from "ngx-lottie";


@Component({
    selector: 'appointment',
    standalone: true,
    imports: [
        SharedModule,
        LottieComponent
    ],
    providers: [
        provideLottieOptions({
            player: () => import(/* webpackChunkName: 'lottie-web' */ 'lottie-web')
        }),
        AnimationLoader
    ],
    template: `
        <section class="mb-3/100 px-4 md:px-7.5">
			<div class="flex max-w-1320 mx-auto relative">
				<div class="w-full relative flex">
			        <div class="flex relative flex-wrap content-start w-full">
                        <div class="w-full">
                            <section class="bg-primaryDarker md:py-7.5 md:pr-30 md:pl-10 rounded-5">
                                <div class="min-h-91 md:max-w-1320 items-center flex flex-wrap mx-auto relative">
                                    <div class="w-full md:w-47/200 relative flex" data-aos="fade-right">
                                        <div class="p-6 flex relative w-full flex-wrap content-start">
                                            <div class="w-420 max-w-420 mb-0">
                                                <h2 class="text-center md:text-left text-white text-24 md:text-40 m-0 leading-14">Book your appointment online</h2>		
                                            </div>
                                            <div class="w-420 max-w-420">
                                                <div class="mt-7.5">
                                                    <p class="text-center md:text-left text-white m-0 p-0 text-13 md:text-16">Our simple to use, online appointment process makes it easy for you to book for any one of our services and doctors. </p>		
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="w-full md:w-53/200 flex relative">
                                        <div class="p-6 flex relative w-full flex-wrap content-start">
                                            <div class="-right-3/20 w-[247px] max-w-[247px] -bottom-3/20 mb-0 absolute hidden md:block">	
                                                <ng-lottie
                                                    containerClass="h-auto inline-block w-full"
                                                    [options]="options"
                                                />
                                            </div>
                                            <div class="w-full" data-aos="fade-left">
                                                <div class="md:mt-6">
                                                    <div class="flex flex-wrap">
                                                        <div class="w-full">
                                                            <form id="forminator-module-55" class="m-0 p-0 w-full">
                                                                <div class="mb-3 flex flex-wrap flex-col md:flex-row -mx-2.5">
                                                                    <div id="name-1" class="px-2.5 flex-1">
                                                                        <div class="m-0 p-0">
                                                                            <input type="text" name="name-1" value="" placeholder="Your Name" id="forminator-field-name-1_67753e8c2d364" class="bg-[#02010100] border-[#FFFFFF42] text-white border-b border-solid transition-all duration-300 outline-none w-full block placeholder:text-[rgba(255,_255,_255,_0.5)] py-4 focus:border-white">
                                                                        </div>
                                                                    </div>
                                                                    <div id="date-1" class="px-2.5 flex-1">
                                                                        <div class="forminator-field forminator-is_filled">
                                                                            <input autocomplete="off" type="text" size="1" name="date-1" placeholder="mm/dd/yyyyy" class="bg-[#02010100] border-[#FFFFFF42] text-white border-b border-solid transition-all duration-300 outline-none w-full block placeholder:text-[rgba(255,_255,_255,_0.5)] py-4 focus:border-white">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="mb-3 flex flex-wrap flex-col md:flex-row -mx-2.5">
                                                                    <div id="phone-1" class="px-2.5 flex-1">
                                                                        <div class="m-0 p-0">
                                                                            <input type="text" name="phone-1" value="" placeholder="Phone" class="bg-[#02010100] border-[#FFFFFF42] text-white border-b border-solid transition-all duration-300 outline-none w-full block placeholder:text-[rgba(255,_255,_255,_0.5)] py-4 focus:border-white">
                                                                        </div>
                                                                    </div>
                                                                    <div id="email-1" class="px-2.5 flex-1">
                                                                        <div class="m-0 p-0">
                                                                            <input type="email" name="email-1" value="" placeholder="Your Email" class="bg-[#02010100] border-[#FFFFFF42] text-white border-b border-solid transition-all duration-300 outline-none w-full block placeholder:text-[rgba(255,_255,_255,_0.5)] py-4 focus:border-white">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <input type="hidden" name="referer_url" value="">
                                                                <div class="flex flex-wrap -mx-2.5 justify-center md:justify-start">
                                                                    <div class="px-2.5 w-full md:w-auto">
                                                                        <div class="m-0 p-0">
                                                                            <button class="w-full md:w-auto mt-8 bg-none py-3 px-10 border-2 border-solid border-white relative text-center overflow-hidden inline-block transition-all duration-300 rounded-40 bg-transparent text-white hover:bg-primary hover:border-primary">Make an Appointment</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </form>
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
                </div>
            </div>		
		</section>
    `
})

export class HomeAppointment 
{ 
    options: AnimationOptions = {
        path: "../../../../../assets/images/animation/health-1.json",
    };
}