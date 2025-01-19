import { Component, ElementRef, inject, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, NavigationError, RouteConfigLoadStart, Router, RouterOutlet } from '@angular/router';
import { stepPreloader, TitleService } from '@delon/theme';
import { NzModalService } from 'ng-zorro-antd/modal';
import { VERSION as VERSION_ZORRO } from 'ng-zorro-antd/version'; 
import { environment } from '../environments/environment';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'notyf/notyf.min.css';

@Component({
  selector: 'app-root',
  template: '<router-outlet />',
  standalone: true,
  imports: [RouterOutlet],
})

export class AppComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly titleSrv = inject(TitleService);
  private readonly modalSrv = inject(NzModalService);

  private donePreloader = stepPreloader();

  constructor(el: ElementRef, renderer: Renderer2) {
    renderer.setAttribute(el.nativeElement, 'ng-zorro-version', VERSION_ZORRO.full)
  }

  ngOnInit(): void {
    let configLoad = false;

    this.router.events.subscribe(ev => {
      if(ev instanceof RouteConfigLoadStart) {
        configLoad = true;
      }

      if(configLoad && ev instanceof NavigationError) {
        this.modalSrv.confirm({
          nzTitle: 'Remind',
          nzContent: environment.production ? 'The app may have released a new version, please click refresh to take effect.' : `Unable to load route: ${ev.url}`,
          nzCancelDisabled: false,
          nzOkText: 'Refresh',
          nzCancelText: 'Ignore',
          nzOnOk: () => location.reload()
        });
      }

      if(ev instanceof NavigationEnd) {
        this.donePreloader();
        this.titleSrv.setTitle();
        this.modalSrv.closeAll();
      }
    });

    AOS.init({
      disable: 'mobile',
      duration: 700,
      easing: 'ease-in-out-quart',
      once: true,
    });
    AOS.refresh();
  }
}
