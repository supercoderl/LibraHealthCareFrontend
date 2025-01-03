import { Component } from "@angular/core";
import { SharedModule } from "../../../../shared";
import { OwlOptions } from "ngx-owl-carousel-o";

@Component({
    selector: 'brand',
    standalone: true,
    imports: [
        SharedModule
    ],
    template: `
        <section class="py-12.5">
            <div class="w-full max-w-1320 mx-auto">
                <owl-carousel-o [options]="options">
                    <ng-container *ngFor="let src of images; index as i">
                        <ng-template carouselSlide [id]="i.toString()">
                            <div class="w-4/5 md:w-56 md:mr-5">
                                <img 
                                    loading="lazy" 
                                    decoding="async" 
                                    width="285" 
                                    height="61" 
                                    [src]="src" 
                                    class="block w-inherit mx-auto max-w-full" 
                                    alt=""
                                />
                            </div>
                        </ng-template>
                    </ng-container>
                </owl-carousel-o>
            </div>
        </section>
    `
})

export class HomeBrand {
    images: string[] = [
        "https://radiustheme.com/demo/wordpress/themes/medilink/wp-content/uploads/2018/11/brand5.png",
        "https://radiustheme.com/demo/wordpress/themes/medilink/wp-content/uploads/2018/11/brand10.png",
        "https://radiustheme.com/demo/wordpress/themes/medilink/wp-content/uploads/2018/11/brand4.png",
        "https://radiustheme.com/demo/wordpress/themes/medilink/wp-content/uploads/2018/11/brand6.png"
    ];

    options: OwlOptions = {
        loop: true,
        autoplay: true,
        mouseDrag: true,
        touchDrag: false,
        pullDrag: false,
        dots: false,
        navSpeed: 300,
        autoplaySpeed: 300,
        responsive: {
            0: {
                items: 1
            },
            400: {
                items: 1
            },
            740: {
                items: 2
            },
            940: {
                items: 3
            }
        },
        nav: false
    }
}