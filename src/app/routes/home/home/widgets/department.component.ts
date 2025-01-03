import { Component } from "@angular/core";
import { SharedModule } from "../../../../shared";
import { faChessRook, faCompass, faHospital, faSun } from "@fortawesome/free-regular-svg-icons";
import { Department } from "../../../../types";
import { DEPARTMENTS } from "../../../../constants";

@Component({
    selector: 'department',
    standalone: true,
    imports: [
        SharedModule
    ],
    template: `
        <section class="relative">
			<div class="max-w-1320 flex mx-auto">
				<div class="w-full flex relative">
			        <div class="px-4 flex flex-wrap content-start w-full">
					    <div class="h-15 md:h-30 w-full"></div>
				    <div class="w-full">
                        <!-- section title -->
                        <div class="relative mb-5.7 -mt-1.7">
                            <div class="pb-0 text-center">
                                <h3 class="text-[#33d687] uppercase leading-6 font-bold mb-1 inline-block">OUR SPECIALIZE</h3>
                                <h2 class="text-2xl md:text-10.8 leading-12.8 font-semibold tracking-0 mb-3 uppercase">Medical departments</h2>
                            </div>
                        </div><!-- section title end -->
				    </div>
			        <div class="h-6.2 md:h-11.2 w-full"></div>
				    <div class="w-full">
                        <div class="flex flex-wrap -mx-4">
                            <div class="pl-4 pr-4 md:pr-0 grid grid-cols-2 place-items-center gap-4 mb-0 w-full md:w-4/12 h-fit mb-6 md:mb-0">
                                <a 
                                    class="group shadow-[rgba(0,_0,_0,_0.16)_0px_1px_4px] leading-normal w-full h-full text-center rounded-5 py-4.5 px-3.5 block hover:bg-primary transition-all duration-300" 
                                    href="#medicine"
                                    *ngFor="let department of departments; let i = index"
                                    data-aos="fade-right"
                                    [attr.data-aos-delay]="i * 50"
                                >
                                    <fa-icon class="text-42 mb-2.5 group-hover:!text-white" [icon]="department.icon"></fa-icon>
                                    <p class="text-primary text-15 font-semibold uppercase m-0 group-hover:text-white">{{department.title}}</p>
                                </a>
                            </div>
                            <div class="w-full md:w-8/12 relative px-4 rounded-5">
                                <div class="pt-4.5 px-6.2 pb-5.5 shadow-[rgba(0,_0,_0,_0.16)_0px_1px_4px] block transition-opacity duration-300">
                                    <div class="flex flex-wrap -mx-4" data-aos="fade-left">
                                        <div class="w-full relative px-4">
                                            <h4 class="text-[#222222] text-24 font-semibold mb-3">Generel Medicine</h4>
                                        </div>
                                        <div class="w-full md:w-7/12 relative px-4">
                                            <p class="text-16 leading-8 mb-6">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur quod labore animi ratione a. Facilis voluptatibus nesciunt voluptate, totam tempore quia culpa, reprehenderit harum reiciendis optio consequuntur odit possimus perferendis!
                                            <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, vitae facilis. Deserunt consequatur possimus ratione voluptate perspiciatis. Tempora excepturi illo reprehenderit delectus.</span>
                                            </p>
                                            <ul class="pl-0">
                                                <li class="text-15 text-secondary mb-3">
                                                    <span nz-icon nzType="check" nzTheme="outline"></span>
                                                    Facilis voluptatibus nesciunt.
                                                </li>
                                                <li class="text-15 text-secondary mb-3">
                                                    <span nz-icon nzType="check" nzTheme="outline"></span>
                                                    Consectetur adipisicing elit.
                                                </li>
                                                <li class="text-15 text-secondary mb-3">
                                                    <span nz-icon nzType="check" nzTheme="outline"></span>
                                                    Deserunt consequatur.
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="w-full md:w-5/12 relative px-4">
                                            <img 
                                                src="https://www.thetahmid.com/themes/mediseba-v1.2/images/tab-1.jpg" 
                                                alt="" 
                                                class="mt-2.5 mb-6 max-w-full h-auto hidden md:block"
                                            >
                                            <a href="" class="text-16 text-primary font-semibold py-2 px-7.5 border border-solid border-primary rounded-25 md:float-right">Read More</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
				    <div class="h-15 md:h-30 w-full transition-background duration-300"></div>
			    </div>
		    </div>
	    </div>
	</section>
    `
})

export class HomeDepartment { 
    faHospital = faHospital;
    faChessRook = faChessRook;
    faSun = faSun;
    faCompass = faCompass;

    departments: Department[] = DEPARTMENTS;
}