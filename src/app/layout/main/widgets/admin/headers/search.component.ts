import { Component } from "@angular/core";
import { SharedModule } from "../../../../../shared";
import { MenuService } from "../../../../../shared/utils/menu";

@Component({
    selector: 'navbar-search',
    template: `
    <a id="navbarSearch" href="javascript:void(0)" class="text-[#001737]" (click)="menuSrv.toggleMenu('search')">
      <span
        nz-icon
        nzType="search"
        nzTheme="outline"
        class="md:text-[18px]"
      ></span>
    </a>
    `,
    standalone: true,
    imports: [SharedModule]
})

export class NavbarSearch {
  constructor(public menuSrv: MenuService) {}
}