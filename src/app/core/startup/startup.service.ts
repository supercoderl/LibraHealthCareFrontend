import { HttpClient, HttpContext } from '@angular/common/http';
import { APP_INITIALIZER, inject, Injectable, Provider } from '@angular/core';
import { ACLService } from '@delon/acl';
import { ALAIN_I18N_TOKEN, MenuService, SettingsService, TitleService } from '@delon/theme';
import { I18NService } from '../i18n/i18n.service';
import { catchError, map, Observable, zip } from 'rxjs';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { ALLOW_ANONYMOUS, DA_SERVICE_TOKEN } from '@delon/auth';
import { NotyfService } from '../../services';

export function provideStartup(): Provider[] {
  return [
    StartupService,
    {
      provide: APP_INITIALIZER,
      useFactory: (startupService: StartupService) => () => startupService.load(),
      deps: [StartupService],
      multi: true
    }
  ];
}

@Injectable()
export class StartupService {

  private menuService = inject(MenuService);
  private settingService = inject(SettingsService);
  private aclService = inject(ACLService);
  private titleService = inject(TitleService);
  private httpClient = inject(HttpClient);
  private i18n = inject<I18NService>(ALAIN_I18N_TOKEN);
  private tokenService = inject(DA_SERVICE_TOKEN);
  private notyfService = inject(NotyfService);

  load(): Observable<void> {
    const defaultLang = this.i18n.defaultLang;

    // If http request allows anonymous access, you need to add `ALLOW_ANONYMOUS`:
    // this.httpClient.get('/app', { context: new HttpContext().set(ALLOW_ANONYMOUS, this.tokenService.get()?.token ? false : true) })
    return zip(this.i18n.loadLangData(defaultLang), this.httpClient.get('/api/v1/App', { 
      context: new HttpContext().set(ALLOW_ANONYMOUS, this.tokenService.get()?.token ? false : true) 
    })).pipe(
      // Receive exception messages generated by other interceptors
      catchError(res => {
        return [];
      }),
      map(([langData, appData]: [Record<string, string>, NzSafeAny]) => {
        this.i18n.use(defaultLang, langData);
        this.settingService.setApp(appData.app);
        this.aclService.setFull(true);
        // this.menuService.add(appData.menu);
        this.titleService.default = '';
        this.titleService.suffix = appData.app.name;
      })
    );
  }
}
