import { Component } from "@angular/core";
import { SharedModule } from "../../../../shared";
import { CountUpDirective } from "../../../../shared/utils/counter.directive";

@Component({
    selector: 'statistic',
    standalone: true,
    imports: [
        SharedModule,
        CountUpDirective
    ],
    template: `
    <section 
        id="statistic-1" 
        class="pt-20 pb-10 bg-fixed w-full bg-no-repeat bg-center bg-cover"
        style="background-image: url(../../../../../assets/images/background/statistic.jpg);"
    >
        <div class="bg-fixed w-full bg-no-repeat bg-center bg-cover">
            <div class="container md:pr-4 mx-auto">
                <div class="flex flex-wrap items-center md:justify-around justify-center md:-mx-4" data-aos="fade-up">
                    <div class="relative px-4 md:min-w-1/4 flex-1/2 md:flex-none" *ngFor="let value of values">
                        <div class="visible mb-10 text-center"> 
                            <div class="">
                                <span nz-icon [nzType]="value.icon" nzTheme="outline" class="!text-64 !text-white"></span>
                            </div>          
                            <h5 
                                class="text-45.6 font-bold leading-1 mt-5 mb-1.25 text-white" 
                                [countUp]="value.value" 
                                [duration]="duration"
                            >
                            </h5>                
                            <p class="text-white m-0 text-16.8">{{value.title}}</p>                              
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    `
})

export class HomeStatistic 
{
    values = [
        { title: 'Happy Patients', value: 9632, icon: 'heart' },
        { title: 'Qualified Doctors', value: 178, icon: 'user' },
        { title: 'Clinic Rooms', value: 864, icon: 'usb' },
        { title: 'Local Partners', value: 473, icon: 'transaction' }
    ];

    duration: number = 8000;
}