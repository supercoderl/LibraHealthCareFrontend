import { Component } from "@angular/core";
import { SharedModule } from "../../../../../shared";

@Component({
    selector: 'footer-about',
    standalone: true,
    imports: [
        SharedModule
    ],
    template: `
    <div class="">
        <h2
            class="pb-4 relative text-white mb-4 text-20 font-bold capitalize before:content-[''] before:absolute before:bottom-0 before:left-0 before:bg-white before:w-7.8 before:h-0.5"
        >
            {{ "app.footer.title" | i18n }}
        </h2>
        <div class="">
            <p class="text-16 font-medium mb-10 text-[#F9FAFB]">
            {{ "app.footer.description" | i18n }}
            </p>
        </div>
        <div class="relative">
            <form action="#">
                <input
                    type="email"
                    class="bg-[rgba(255,_255,_255,_0.1019607843)] rounded-50 outline-none h-11.2 placeholder:text-white font-medium text-white border-0 m-0 py-1.5 pr-28 pl-4 block w-full"
                    [placeholder]="'app.footer.email-address' | i18n"
                />
                <button
                    type="submit"
                    class="text-black font-medium py-1.7 px-6 bg-white right-1.5 rounded-35 absolute top-1/2 -translate-y-1/2 border border-solid border-secondary shadow-inset"
                >
                    {{ "app.footer.subcribe" | i18n }}
                </button>
            </form>
        </div>
    </div>
    `
})

export class AboutClientFooter { }