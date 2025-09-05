import { inject, Injectable } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import ngEn from '@angular/common/locales/en';
import ngZh from '@angular/common/locales/zh';
import ngZhTw from '@angular/common/locales/zh-Hant';
import ngFr from '@angular/common/locales/fr';
import ngDe from '@angular/common/locales/de';
import ngEs from '@angular/common/locales/es';
import ngHi from '@angular/common/locales/hi';
import ngJa from '@angular/common/locales/ja';
import ngKo from '@angular/common/locales/ko';
import ngTh from '@angular/common/locales/th';
import ngRu from '@angular/common/locales/ru';
import { 
  en_US as zorroEnUS, 
  zh_CN as zorroZhCN, 
  zh_TW as zorroZhTW,
  fr_FR as zorroFrFr,
  de_DE as zorroDeDe,
  es_ES as zorroEsEs,
  hi_IN as zorroHiIn,
  ja_JP as zorroJaJp,
  ko_KR as zorroKoKr,
  th_TH as zorroThTh,
  ru_RU as zorroRuRu,
  NzI18nService 
} from 'ng-zorro-antd/i18n';
import { 
  enUS as dfEn, 
  zhCN as dfZhCn, 
  zhTW as dfZhTw,
  fr as dfFr,
  de as dfDe,
  es as dfEs,
  hi as dfHi,
  ja as dfJa,
  ko as dfKo,
  th as dfTh,
  ru as dfRu,
  de,
} from 'date-fns/locale';
import {
  _HttpClient,
  AlainI18nBaseService,
  DelonLocaleService,
  SettingsService,
  en_US as delonEnUs,
  zh_CN as delonZhCn,
  zh_TW as delonZhTw,
  fr_FR as delonFrFr,
  es_ES as delonEsEs,
  ja_JP as delonJaJp,
  ko_KR as delonKoKr,
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
  },
  'fr-FR': {
    text: 'French',
    ng: ngFr,
    zorro: zorroFrFr,
    date: dfFr,
    abbr: '🇫🇷',
    delon: delonFrFr
  },
  'de-DE': {
    text: 'German',
    ng: ngDe,
    zorro: zorroDeDe,
    date: dfDe,
    abbr: '🇩🇪',
    delon: delonEnUs
  },
  'es-ES': {
    text: 'Spanish',
    ng: ngEs,
    zorro: zorroEsEs,
    date: dfEs,
    abbr: '🇪🇸',
    delon: delonEsEs
  },
  'hi-IN': {
    text: 'Hindi',
    ng: ngHi,
    zorro: zorroHiIn,
    date: dfHi,
    abbr: '🇮🇳',
    delon: delonEnUs
  },
  'ja-JP': {
    text: 'Japanese',
    ng: ngJa,
    zorro: zorroJaJp,
    date: dfJa,
    abbr: '🇯🇵',
    delon: delonJaJp
  },
  'ko-KR': {
    text: 'Korean',
    ng: ngKo,
    zorro: zorroKoKr,
    date: dfKo,
    abbr: '🇰🇷',
    delon: delonKoKr
  },
  'ru-RU': {
    text: 'Russian',
    ng: ngRu,
    zorro: zorroRuRu,
    date: dfRu,
    abbr: '🇷🇺',
    delon: delonEnUs
  },
  'th-TH': {
    text: 'Thai',
    ng: ngTh,
    zorro: zorroThTh,
    date: dfTh,
    abbr: '🇹🇭',
    delon: delonEnUs
  },
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

  constructor(cogSrv: AlainConfigService) {
    super(cogSrv);

    const defaultLang = this.getDefaultLang();
    this._defaultLang = this._langs.findIndex(w => w.code === defaultLang) === -1 ? DEFAULT : defaultLang;
  }

  private getDefaultLang(): string {
    if (!this.platform.isBrowser) {
      return DEFAULT;
    }

    if (this.settings.layout.lang) {
      return this.settings.layout.lang;
    }

    let res = (navigator.languages ? navigator.languages[0] : null) || navigator.language;
    const arr = res.split('-');
    return arr.length <= 1 ? res : `${arr[0]}-${arr[1].toUpperCase()}`;
  }

  translate(key: string, params?: Record<string, unknown>): string {
    return this.fanyi(key, params);
  }

  loadLangData(lang: string): Observable<NzSafeAny> {
    return this.http.get(`/api/v1/App/${lang}`);
  }

  use(lang: string, data: Record<string, unknown>): void {
    if (this._currentLang === lang) return;

    this._data = this.flatData(data, []);

    const item = LANGS[lang];
    registerLocaleData(item.ng);
    this.nzI18nService.setLocale(item.zorro);
    this.nzI18nService.setDateLocale(item.date);
    this.delonLocaleService.setLocale(item.delon);

    this._currentLang = lang;

    this._change$.next(lang);
  }

  getLangs(): Array<{ code: string, text: string, abbr: string }> {
    return this._langs;
  }
}
