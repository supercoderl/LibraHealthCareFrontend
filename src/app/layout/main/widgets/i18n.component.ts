import { booleanAttribute, ChangeDetectionStrategy, Component, inject, Input } from "@angular/core";
import { ALAIN_I18N_TOKEN, I18nPipe, SettingsService } from "@delon/theme";
import { SharedModule } from "../../../shared";
import { I18NService } from "../../../core";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: 'header-i18n',
  template: `
        @if (showLangText) {
      <div nz-dropdown [nzDropdownMenu]="langMenu" nzPlacement="bottomRight">
        <i nz-icon nzType="global"></i>
        {{ 'menu.lang' | i18n }}
        <i nz-icon nzType="down"></i>
      </div>
    } @else {
      <i nz-dropdown [nzDropdownMenu]="langMenu" nzPlacement="bottomRight" nz-icon nzType="global" class="dropdown dropdown-notification md:text-[18px] ml-3 md:ml-4"></i>
    }
    <nz-dropdown-menu #langMenu="nzDropdownMenu">
      <ul nz-menu>
        @for (item of langs; track $index) {
          <li nz-menu-item [nzSelected]="item.code === currentLangCode" (click)="change(item.code)">
            <span role="img" [attr.aria-label]="item.text" class="pr-xs">{{ item.abbr }}</span>
            {{ item.text }}
          </li>
        }
      </ul>
    </nz-dropdown-menu>
    `,
  host: {
    '[class.flex-1]': 'true'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [I18nPipe, SharedModule]
})

export class HeaderI18nComponent {
  private readonly settings = inject(SettingsService);
  private readonly i18n = inject<I18NService>(ALAIN_I18N_TOKEN);
  private readonly doc = inject(DOCUMENT);

  @Input({ transform: booleanAttribute }) showLangText = true;

  get langs(): Array<{ code: string, text: string, abbr: string }> {
    return this.i18n.getLangs();
  }

  get currentLangCode(): string {
    return this.settings.layout.lang;
  }

  change(lang: string): void {
    const spinEl = this.doc.createElement('div');
    spinEl.setAttribute('class', 'page-loading ant-spin ant-spin-lg ant-spin-spinning');
    spinEl.innerHTML = `<span class="ant-spin-dot ant-spin-dot-spin"><i></i><i></i><i></i><i></i></span>`;
    this.doc.body.appendChild(spinEl);

    this.i18n.loadLangData(lang).subscribe(res => {
      this.i18n.use(lang, res);
      this.settings.setLayout('lang', lang);
      setTimeout(() => this.doc.location.reload());
    })
  }
}