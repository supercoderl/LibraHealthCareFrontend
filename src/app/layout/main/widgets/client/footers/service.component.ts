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
            {{ "app.footer.services" | i18n }}
        </h2>
        <ul class="m-0 p-0">
          <li class="mb-4 relative mb-2.5" *ngFor="let service of services">
            <a
                [routerLink]="service.url"
                class="font-medium text-16 text-white transition-all duration-500"
            >
                {{service.title | i18n}}
            </a>
          </li>
        </ul>
    </div>
    `
})

export class ServiceClientFooter {
    services = [
        {
            title: 'app.footer.primary-care',
            url: '#'
        },
        {
            title: 'app.footer.preventive-health-checkups',
            url: '#'
        },
        {
            title: 'app.footer.chronic-disease-management',
            url: '#'
        },
        {
            title: 'app.footer.pediatric-care',
            url: '#'
        },
        {
            title: 'app.footer.mental-health-counseling',
            url: '#'
        }
    ]
}