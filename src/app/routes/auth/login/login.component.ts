import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy } from '@angular/core';
import { SharedModule } from '../../../shared';
import { RouterLink } from '@angular/router';
import { _HttpClient, I18nPipe, SettingsService } from '@delon/theme';
import { ALLOW_ANONYMOUS, DA_SERVICE_TOKEN, SocialOpenType, SocialService } from '@delon/auth';
import { ReuseTabService } from '@delon/abc/reuse-tab';
import { StartupService } from '../../../core';
import { FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpContext } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { ProfileState } from '../../../reducers';
import { ProfileActions } from '../../../core/action';
import { RouterService } from '../../../shared/utils/router';

@Component({
  selector: 'auth-login',
  standalone: true,
  imports: [
    RouterLink,
    SharedModule,
    I18nPipe,
  ],
  providers: [SocialService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy {
  private readonly socialService = inject(SocialService);
  private readonly reuseTabService = inject(ReuseTabService, { optional: true });
  private readonly tokenService = inject(DA_SERVICE_TOKEN);
  private readonly startupSrv = inject(StartupService);
  private readonly http = inject(_HttpClient);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly routerService = inject(RouterService);

  form = inject(FormBuilder).nonNullable.group({
    userName: ['', [Validators.required]],
    password: ['', [Validators.required]],
    remember: [true]
  });

  error = '';
  loading = false;

  count = 0;
  interval$: any;

  submit(): void {
    this.error = '';
    const { userName, password } = this.form.controls;
    userName.markAsDirty();
    userName.updateValueAndValidity();
    password.markAsDirty();
    password.updateValueAndValidity();
    if (userName.invalid || password.invalid) return;

    // In the default configuration, [verification](https://ng-alain.com/auth/getting-started) is mandatory for all HTTP requests User Token
    // However, generally speaking, login requests do not require verification, so adding `ALLOW_ANONYMOUS` means that user Token verification will not be triggered.
    this.loading = true;
    this.cdr.detectChanges();
    this.http.post('/api/v1/User/login', { 
      userName: this.form.value.userName, 
      password: this.form.value.password
    }, null, {
      context: new HttpContext().set(ALLOW_ANONYMOUS, true)
    }).pipe(finalize(() => {
      this.loading = false;
      this.cdr.detectChanges();
    })).subscribe({
      next: res => {
        //Clear routing reuse information
        this.reuseTabService?.clear();

        //Set user Token information
        this.tokenService.set({
          token: res?.data?.accessToken,
          refresh: res?.data?.refreshToken,
          expired: res?.data?.expiredTime,
          userId: res?.data?.userId
        });

        this.store.dispatch(ProfileActions.loadProfile());

        this.startupSrv.load().subscribe(() => {
          this.routerService.redirectUser(res?.data?.roles ?? []);
        })
      },
      error: err => {
        this.error = err?.error?.errors[0] ?? '';
        this.cdr.detectChanges();
      }
    });
  }

  open(type: string, openType: SocialOpenType = 'href'): void {
    let url = '';
    let callback = '';
    if (environment.production) {
      callback = '';
    }
    else {
      callback = '';
    }
    switch (type) {
      case 'auth0':
        url = '';
        break;
    };

    if (openType === 'window') {
      this.socialService.login(url, '/', { type: 'window' }).subscribe(res => console.log(res));
    }
    else {
      this.socialService.login(url, '/', { type: 'href' });
    }
  }

  constructor(private store: Store<{ profile: ProfileState }>) { }

  ngOnDestroy(): void {
    if (this.interval$) {
      clearInterval(this.interval$);
    }
  }
}
