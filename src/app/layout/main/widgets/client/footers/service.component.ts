import { Component } from "@angular/core";
import { SharedModule } from "../../../../../shared";

@Component({
    selector: 'footer-service',
    standalone: true,
    imports: [
        SharedModule
    ],
    template: `
    <div class="footer-widget footer-menu">
        <h2
          class="pb-4 relative text-white mb-4 text-20 font-bold capitalize before:content-[''] before:absolute before:bottom-0 before:left-0 before:bg-white before:w-7.8 before:h-0.5"
        >
          Services
        </h2>
        <ul class="m-0 p-0">
          <li class="mb-4 relative mb-2.5" *ngFor="let service of services">
            <a
                [routerLink]="service.url"
                class="font-medium text-16 text-white transition-all duration-500"
            >
                {{service.title}}
            </a>
          </li>
        </ul>
    </div>
    `
})

export class ServiceClientFooter {
    services = [
        {
            title: 'Primary Care',
            url: '#'
        },
        {
            title: 'Preventive Health Checkups',
            url: '#'
        },
        {
            title: 'Chronic Disease Management',
            url: '#'
        },
        {
            title: 'Pediatric Care',
            url: '#'
        },
        {
            title: 'Mental Health Counseling',
            url: ''
        }
    ]
}