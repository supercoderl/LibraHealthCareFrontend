import { Component } from "@angular/core";
import { SharedModule } from "../../../../../shared";

@Component({
  selector: 'footer-copyright',
  standalone: true,
  imports: [
    SharedModule
  ],
  template: `
    <div class="py-4 flex flex-col md:flex-row gap-4 md:gap-0 items-center justify-between">
        <div class="">
          <p class="mb-0 text-16 font-medium text-white">
            {{ "app.footer.copyright" | i18n }}
          </p>
        </div>
        <div class="">
          <ul class="text-right m-0 p-0">
            <li class="inline-block mr-4">
              <a
                href="/react/template/pages/privacy-policy"
                class="text-16 text-white font-medium"
                >{{ "app.footer.copyright" | i18n }}</a
              >
            </li>
            <li class="inline-block mr-4">
              <a
                href="/react/template/pages/terms"
                class="text-16 text-white font-medium"
                >{{ "app.footer.term" | i18n }}</a
              >
            </li>
          </ul>
        </div>
        <div class="text-right relative hidden md:block">
          <ul class="m-0 p-0">
            <li class="inline-block mr-2.5">
              <a
                href="https://www.facebook.com/quangm4"
                class="bg-border flex items-center justify-center border-border text-white w-9 h-9 border border-solid rounded-full text-16 transition-all duration-500"
              >
                <span nz-icon nzType="facebook" nzTheme="outline"></span>
              </a>
            </li>
            <li class="inline-block mr-2.5">
              <a
                href="https://porfolio-1706.vercel.app"
                class="bg-border flex items-center justify-center border-border text-white w-9 h-9 border border-solid rounded-full text-16 transition-all duration-500"
              >
                <span nz-icon nzType="global" nzTheme="outline"></span>
              </a>
            </li>
            <li class="inline-block mr-2.5">
              <a
                href="https://www.youtube.com/@supercoderle"
                class="bg-border flex items-center justify-center border-border text-white w-9 h-9 border border-solid rounded-full text-16 transition-all duration-500"
              >
                <span nz-icon nzType="youtube" nzTheme="outline"></span>
              </a>
            </li>
            <li class="inline-block mr-2.5">
              <a
                href="https://www.linkedin.com/in/supercoderle"
                class="bg-border flex items-center justify-center border-border text-white w-9 h-9 border border-solid rounded-full text-16 transition-all duration-500"
              >
                <span nz-icon nzType="linkedin" nzTheme="outline"></span>
              </a>
            </li>
          </ul>
        </div>
    </div>
    `
})

export class CopyrightClientFooter { }