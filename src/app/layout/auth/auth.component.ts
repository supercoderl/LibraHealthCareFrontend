import { Component, inject } from '@angular/core';
import { SharedModule } from '../../shared';
import { GlobalFooterModule } from '@delon/abc/global-footer';
import { ThemeBtnComponent } from '@delon/theme/theme-btn';
import { DA_SERVICE_TOKEN } from '@delon/auth';
import { RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { HeaderI18nComponent } from '../main/widgets/i18n.component';
import { TypeWriterPipe } from '../../shared/utils/type.writer';

@Component({
  selector: 'layout-auth',
  standalone: true,
  imports: [SharedModule, GlobalFooterModule, ThemeBtnComponent, RouterOutlet, NzIconModule, HeaderI18nComponent, TypeWriterPipe],
  template: `
    <div class="main flex min-h-screen bg-no-repeat bg-center bg-cover flex-col">
      <!-- <header-i18n showLangText="false" class="langs" /> -->
      <div class="container m-auto p-4 md:p-16">
        <div class="md:grid md:grid-cols-2 md:gap-4 items-center">
          <div class="md:ml-1/40">
            <div class="card relative flex flex-col bg-white rounded-[0.125rem]">
              <div class="px-6 py-12 md:p-12 flex-auto">
                <h2 class="mb-6 text-6 font-semibold mt-0 text-center">{{ "app.login.welcome" | i18n }}</h2>
                <router-outlet />
              </div>
            </div>
          </div>

          <div class="ml-2/25 hidden md:block">
            <h2 
              class="tw text-2xl mb-4 font-semibold tracking-[0.1em] h-24">
              {{'app.sentence' | i18n | typeWriter | async}}
              <span class="typewriter ml-2 border-r-[0.15em] border-solid border-secondary"></span>
            </h2>
            <p class="mb-8 font-semibold text-primary">{{ "app.login.sub-text" | i18n }}</p>
            <ul class="pl-0">
              <li class="mb-[1.5rem]">
                <div class="flex items-center">
                  <div class="w-[2.625rem] h-[2.625rem] text-[1.125rem] inline-flex items-center justify-center text-primary mr-[1rem] rounded-full bg-white">
                    <i class="fas fa-user-nurse"></i>
                  </div>

                  <div class="flex-1 mt-0">
                    <p class="text-[0.825rem] font-semibold leading-6">
                      {{ "app.login.text-1" | i18n }}
                    </p>
                  </div>
                </div>
              </li>
              
              <li class="mb-[1.5rem]">
                <div class="flex items-center">
                  <div class="w-[2.625rem] h-[2.625rem] text-[1.125rem] inline-flex items-center justify-center text-primary mr-[1rem] rounded-full bg-white">
                    <i class="fas fa-stethoscope"></i>
                  </div>

                  <div class="flex-1 mt-0">
                    <p class="text-[0.825rem] font-semibold leading-6">
                      {{ "app.login.text-2" | i18n }}
                    </p>
                  </div>
                </div>
              </li>

              <li class="mb-[1.5rem]">
                <div class="flex items-center">
                  <div class="w-[2.625rem] h-[2.625rem] text-[1.125rem] inline-flex items-center justify-center text-primary mr-[1rem] rounded-full bg-white">
                    <i class="fas fa-heartbeat"></i>
                  </div>

                  <div class="flex-1 mt-0">
                    <p class="text-[0.825rem] font-semibold leading-6">
                      {{ "app.login.text-3" | i18n }}
                    </p>
                  </div>
                </div>
              </li>
            </ul>

            <button 
              type="submit" 
              class="min-w-[9.25rem] font-semibold text-[0.875rem] text-center p-[0.675rem] rounded-sm text-white bg-primary border-[1px] border-solid border-primary uppercase transition duration-500 learn-btn hover:bg-secondary hover:border-secondary"
            >
              {{ "app.learn-more" | i18n }}
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  private tokenService = inject(DA_SERVICE_TOKEN);

  links = [
    {
      title: 'Help',
      href: ''
    }, {
      title: 'Privacy',
      href: ''
    },
    {
      title: 'Terms',
      href: ''
    }
  ];
}
