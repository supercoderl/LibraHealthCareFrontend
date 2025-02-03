import { Component, inject, OnInit } from '@angular/core';
import { SharedModule } from '../../shared';
import { GlobalFooterModule } from '@delon/abc/global-footer';
import { ThemeBtnComponent } from '@delon/theme/theme-btn';
import { DA_SERVICE_TOKEN } from '@delon/auth';
import { RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { HeaderI18nComponent } from '../main/widgets/i18n.component';
import { Observable } from 'rxjs';
import { TypeWriterService } from '../../shared/utils/type.writer';

@Component({
  selector: 'layout-auth',
  standalone: true,
  imports: [SharedModule, GlobalFooterModule, ThemeBtnComponent, RouterOutlet, NzIconModule, HeaderI18nComponent],
  template: `
    <div class="main flex min-h-screen bg-no-repeat bg-center bg-cover flex-col">
      <!-- <header-i18n showLangText="false" class="langs" /> -->
      <div class="container m-auto p-4 md:p-16">
        <div class="md:grid md:grid-cols-2 md:gap-4 items-center">
          <div class="md:ml-1/40">
            <div class="card relative flex flex-col bg-white rounded-[0.125rem]">
              <div class="px-6 py-12 md:p-12 flex-auto">
                <h2 class="mb-6 text-6 font-semibold mt-0 text-center">Welcome to Health Care</h2>
                <router-outlet />
              </div>
            </div>
          </div>

          <div class="ml-2/25 hidden md:block">
            <h2 
              class="tw text-8 mb-4 font-semibold tracking-[0.1em] h-24">
              {{value$ | async}}
              <span class="typewriter ml-2 border-r-[0.15em] border-solid border-secondary"></span>
            </h2>
            <p class="mb-8 font-semibold text-primary">Join the community of over 300 clients who trust and love our care.</p>
            <ul class="pl-0">
              <li class="mb-[1.5rem]">
                <div class="flex items-center">
                  <div class="w-[2.625rem] h-[2.625rem] text-[1.125rem] inline-flex items-center justify-center text-primary mr-[1rem] rounded-full bg-white">
                    <i class="fas fa-user-nurse"></i>
                  </div>

                  <div class="flex-1 mt-0">
                    <p class="text-[0.825rem] font-semibold leading-6">
                      Your health is special, and so is our approach. <br />
                      We provide personalized care that sets us apart from everything else.
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
                      They say, "Health is wealth" – but more importantly, it's a lifestyle we help you embrace.
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
                      If only there was a solution for all your healthcare needs... <br/>
                      <i>Wait a second – there is! It’s right here, with us.</i>
                    </p>
                  </div>
                </div>
              </li>
            </ul>

            <button type="submit" class="min-w-[9.25rem] font-semibold text-[0.875rem] text-center p-[0.675rem] rounded-sm text-white bg-primary border-[1px] border-solid border-primary uppercase transition duration-500 learn-btn hover:bg-secondary hover:border-secondary">Learn more</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit {
  private tokenService = inject(DA_SERVICE_TOKEN);
  value$: Observable<string> | null = null;

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

  

  ngOnInit(): void {
    const sentence = "Achieve your best health and embrace the journey.";
    this.value$ = TypeWriterService.loopEffect(sentence);
  }
}
