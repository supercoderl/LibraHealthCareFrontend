import { Component } from "@angular/core";
import { SharedModule } from "../../../../shared";

@Component({
    selector: 'contact-information',
    standalone: true,
    imports: [
        SharedModule
    ],
    template: `
        <div class="bg-[rgba(0,_0,_0,_0)_none_repeat_scroll_0_0] md:mt-17.8 mb-7.5 md:px-6.2 md:pb-27.5">
          <h2 class="text-[rgb(7,_16,_65)] text-28 md:text-36 font-semibold mb-8.8 text-left">{{ "app.contact.information.title" | i18n }}</h2>
          <div class="p-0">
            <h2 class="text-20 m-0 font-semibold text-[#555]">{{ "app.contact.information.name" | i18n }}</h2>
            <ul class="m-0 p-0">
                <li class="my-4 text-16">
                    <span nz-icon nzType="environment" nzTheme="outline"></span>
                    <span class="mx-5">
                      Bahnhofstrasse 10, 8001 Zürich, Switzerland                      
                    </span>
                </li>
                <li class="my-4 text-16">
                    <span nz-icon nzType="phone" nzTheme="outline"></span>
                    <span class="mx-5">+1 928 777 065</span>
                </li>
                <li class="my-4 text-16">
                    <span nz-icon nzType="mail" nzTheme="outline"></span>
                    <span class="mx-5">healthcare&#64;libra.com</span>
                </li>
            </ul>
          </div>
        </div>
    `
})

export class ContactInformation { }