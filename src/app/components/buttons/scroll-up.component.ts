import { Component } from "@angular/core";
import { SharedModule } from "../../shared";

@Component({
    selector: 'scroll-up-button',
    standalone: true,
    imports: [
        SharedModule
    ],
    template: `
        <div class="fixed bottom-5 right-5">
            <button (click)="scrollToTop()" class="p-2 bg-primary rounded-full">
                <svg fill="#ffffff" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <g id="meds_Bottle_1" data-name="Prescription Bottle 1">
                        <path d="M17.435,2.06H6.565a2.5,2.5,0,0,0-2.5,2.5v2a1.492,1.492,0,0,0,1.22,1.47V19.44a2.5,2.5,0,0,0,2.5,2.5h8.43a2.5,2.5,0,0,0,2.5-2.5V8.03a1.492,1.492,0,0,0,1.22-1.47v-2A2.5,2.5,0,0,0,17.435,2.06Zm.28,17.38a1.5,1.5,0,0,1-1.5,1.5H7.785a1.5,1.5,0,0,1-1.5-1.5v-.88h3.52a.491.491,0,0,0,.48-.5.485.485,0,0,0-.48-.5H6.285V15h2.57a.5.5,0,0,0,0-1H6.285V11.45h3.52a.491.491,0,0,0,.48-.5.485.485,0,0,0-.48-.5H6.285V8.06h11.43Zm1.22-12.88a.5.5,0,0,1-.5.5H5.565a.5.5,0,0,1-.5-.5v-2a1.5,1.5,0,0,1,1.5-1.5h10.87a1.5,1.5,0,0,1,1.5,1.5Z"/>
                    </g>
                </svg>
            </button>
        </div>
    `
})

export class ScrollUpButton 
{ 
    scrollToTop(): void {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
    }
}