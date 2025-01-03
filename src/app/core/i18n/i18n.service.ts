import { inject, Injectable } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import ngEn from '@angular/common/locales/en';
import ngZh from '@angular/common/locales/zh';
import ngZhTw from '@angular/common/locales/zh-Hant';
import { en_US as zorroEnUS, zh_CN as zorroZhCN, zh_TW as zorroZhTW, NzI18nService } from 'ng-zorro-antd/i18n';
import { enUS as dfEn, zhCN as dfZhCn, zhTW as dfZhTw } from 'date-fns/locale';
import { 
  _HttpClient, 
  AlainI18nBaseService, 
  DelonLocaleService, 
  SettingsService,
  en_US as delonEnUs,
  zh_CN as delonZhCn,
  zh_TW as delonZhTw
} from '@delon/theme';
import { Platform } from '@angular/cdk/platform';
import { AlainConfigService } from '@delon/util/config';
import { Observable } from 'rxjs';
import { registerLocaleData } from '@angular/common';

interface LangConfigData {
  abbr: string;
  text: string;
  ng: NzSafeAny;
  zorro: NzSafeAny;
  date: NzSafeAny;
  delon: NzSafeAny;
}

const DEFAULT = 'en-US';
const LANGS: { [key: string]: LangConfigData } = {
  'zh-CN': {
    text: '简体中文',
    ng: ngZh,
    zorro: zorroZhCN,
    date: dfZhCn,
    abbr: '🇨🇳',
    delon: delonZhCn
  },
  'zh-TW': {
    text: '繁体中文',
    ng: ngZhTw,
    zorro: zorroZhTW,
    date: dfZhTw,
    abbr: '🇭🇰',
    delon: delonZhTw
  },
  'en-US': {
    text: 'English',
    ng: ngEn,
    zorro: zorroEnUS,
    date: dfEn,
    abbr: '🇬🇧',
    delon: delonEnUs
  }
};

@Injectable({
  providedIn: 'root'
})
export class I18NService extends AlainI18nBaseService {
  private readonly http = inject(_HttpClient);
  private readonly settings = inject(SettingsService);
  private readonly nzI18nService = inject(NzI18nService);
  private readonly delonLocaleService = inject(DelonLocaleService);
  private readonly platform = inject(Platform);

  protected override _defaultLang: string = DEFAULT;
  private _langs = Object.keys(LANGS).map(code => {
    const item = LANGS[code];
    return { code, text: item.text, abbr: item.abbr };
  }) 

  constructor(cogSrv: AlainConfigService) 
  {
    super(cogSrv);
    
    const defaultLang = this.getDefaultLang();
    this._defaultLang = this._langs.findIndex(w => w.code === defaultLang) === -1 ? DEFAULT : defaultLang;
  } 

  private getDefaultLang(): string {
    if(!this.platform.isBrowser) {
      return DEFAULT;
    }

    if(this.settings.layout.lang)
    {
      return this.settings.layout.lang;
    }

    let res = (navigator.languages ? navigator.languages[0] : null) || navigator.language;
    const arr = res.split('-');
    return arr.length <= 1 ? res : `${arr[0]}-${arr[1].toUpperCase()}`;
  }

  loadLangData(lang: string): Observable<NzSafeAny> {
    return this.http.get(`/api/v1/App/${lang}`);
  }

  use(lang: string, data: Record<string, unknown>): void {
    if(this._currentLang === lang) return;

    this._data = this.flatData(data, []);

    const item = LANGS[lang];
    registerLocaleData(item.ng);
    this.nzI18nService.setLocale(item.zorro);
    this.nzI18nService.setDateLocale(item.date);
    this.delonLocaleService.setLocale(item.delon);
    this._currentLang = lang;

    this._change$.next(lang);
  }

  getLangs(): Array<{ code: string, text: string, abbr: string}> {
    return this._langs;
  }
}
