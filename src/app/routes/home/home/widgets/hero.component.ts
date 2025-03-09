import { Component } from "@angular/core";
import { SharedModule } from "../../../../shared";

@Component({
    selector: 'hero',
    standalone: true,
    imports: [
        SharedModule
    ],
    template: `
    <section 
        id="hero-4" 
        class="md:pt-35 md:pb-25 mt-12.7 py-20 w-full bg-no-repeat bg-center bg-cover bg-fixed block" 
        style="background-image: url(../../../../assets/images/background/hero.jpg)"
        data-aos="fade-up"
    >
        <div 
            class="relative overflow-hidden md:max-w-1080 w-full px-4 mx-auto"
            data-aos="fade-right"
            [attr.data-aos-delay]="100"
        >	
            <div class="flex flex-wrap md:-mx-4">
                <!-- HERO TEXT -->
                <div class="md:max-w-3/5 md:flex-3/5 relative w-full px-4 bg-border rounded-sm">
                    <div class="">
                        <!-- Title -->
                        <h2 class="visible md:text-56 text-28.8 font-extrabold -leading-px md:mb-5 text-green">
                            {{ "app.home.hero.title" | i18n }}
                        </h2>

                        <!-- Text -->
                        <p class="visible pr-1/20 md:text-20 text-justify md:mb-8.8 text-4 mb-10 text-gray-500" data-animation="fadeInUp" data-animation-delay="400">
                            {{ "app.home.hero.description" | i18n }}
                        </p>
                    </div>
                </div>	<!-- END HERO TEXT --> 
            </div>	  <!-- End row -->
        </div>	   <!-- End container --> 	
    </section>
    `
})

export class HomeHero { }