import { AlainProvideLang, en_US as delonLang, provideAlain } from "@delon/theme"
import { default as ngLang } from '@angular/common/locales/en';
import { en_US as zorroLang } from "ng-zorro-antd/i18n";
import { enUS as dateLang } from 'date-fns/locale';
import { AlainConfig } from "@delon/util";
import { NzConfig, provideNzConfig } from "ng-zorro-antd/core/config";
import { provideRouter, RouterFeatures, withComponentInputBinding, withHashLocation, withInMemoryScrolling, withViewTransitions } from "@angular/router";
import { environment } from "../environments/environment";
import { ApplicationConfig, EnvironmentProviders, Provider } from "@angular/core";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { authSimpleInterceptor, provideAuth } from "@delon/auth";
import { defaultInterceptor, I18NService, provideBindAuthRefresh, provideStartup } from "./core";
import { provideAnimations } from "@angular/platform-browser/animations";
import { ICONS_AUTO } from "../style-icons-auto";
import { ICONS } from "../style-icons";
import { provideCellWidgets } from '@delon/abc/cell';
import { CELL_WIDGETS, SF_WIDGETS, ST_WIDGETS } from "./shared";
import { provideSTWidgets } from "@delon/abc/st";
import { provideSFConfig } from "@delon/form";
import { routes } from "./routes/routes";
import { provideToastr } from "ngx-toastr";

const defaultLang: AlainProvideLang = {
  abbr: 'en-US',
  ng: ngLang,
  zorro: zorroLang,
  date: dateLang,
  delon: delonLang
};

const alainConfig: AlainConfig = {
  st: { modal: { size: 'md' }},
  pageHeader: { homeI18n: 'home' },
  lodop: {
    license: 'A59B099A586B3851E0F0D7FDBF37B603',
    licenseA: 'C94CEE276DB2187AE6B65D56B3FC2848'
  },
  auth: { 
    ignores: [
      /^\/api\/v1\/App/
    ],
    login_url: '/auth/login' 
  }
};

const ngZorroConfig: NzConfig = {};
const routerFeatures: RouterFeatures[] = [
  withComponentInputBinding(),
  withViewTransitions(),
  withInMemoryScrolling({ scrollPositionRestoration: 'top' })
];

if(environment.useHash) routerFeatures.push(withHashLocation());

const providers: Array<Provider | EnvironmentProviders> = [
  provideHttpClient(withInterceptors([authSimpleInterceptor, defaultInterceptor])),
  provideAnimations(),
  provideRouter(routes, ...routerFeatures),
  provideAlain({ config: alainConfig, defaultLang, i18nClass: I18NService, icons: [...ICONS_AUTO, ...ICONS]}),
  provideNzConfig(ngZorroConfig),
  provideAuth(),
  provideCellWidgets(...CELL_WIDGETS),
  provideSTWidgets(...ST_WIDGETS),
  provideSFConfig({ widgets: SF_WIDGETS }),
  provideStartup(),
  provideToastr()
];


if(environment.api?.refreshTokenEnabled && environment.api.refreshTokenType === 'auth-refresh') {
  providers.push(provideBindAuthRefresh());
}

export const appConfig: ApplicationConfig = {
  providers: providers
};