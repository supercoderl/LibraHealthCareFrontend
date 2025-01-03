import { Component } from "@angular/core";
import { SharedModule } from "../../../../../shared";
import { MenuService } from "../../../../../shared/utils/menu";
import { Dimension } from "../../../../../shared/utils/dimension";
import { MenuItem } from "../../../../../types";
import { HEADER_MENU_CLIENT } from "../../../../../constants";

@Component({
  selector: 'header-menu',
  standalone: true,
  imports: [
    SharedModule
  ],
  template: `
    <nav
        [ngClass]="
          menuSrv.isMenuOpen()
            ? 'translate-x-0 top-17.5'
            : '-translate-x-500 top-0'
        "
        class="float-left text-white text-15 md:mt-3.75 p-0 block md:h-auto h-896 md:!translate-x-0 visible top-0 md:relative fixed left-0 transition-all duration-300 shadow-menu md:shadow-none"
      >
        <div class="opacity-0 invisible"></div>

        <ul
          class="text-left md:mt-2 md:mx-auto md:w-full block p-0 transition-all duration-300 ml-0 h-auto min-h-full w-75 bg-white"
        >
          <li
            id="menu-item-1505"
            class="md:text-center block p-0 m-0 md:float-left md:w-auto w-full relative"
            *ngFor="let menu of headerMenus"
          >
            <span class="hidden"><i class="wsmenu-arrow"></i></span
            >
            <a
              [routerLink]="menu.path"
              [id]="menu.id"
              (click)="menuSrv.toggleMenu(menu.id.toString())"
              class="py-3 md:py-2.5 pr-7.5 pl-2.5 text-normalGray relative md:leading-12.5 leading-10.5 md:inline block md:w-auto w-full md:border-0 border-b border-solid border-borderMenu text-16 md:text-14"
            >
              {{menu.title}}
            </a>

            <ul
              *ngIf="menu.children && menu.children.length > 0"
              [ngClass]="{
                'block': dimension.isMobile() && menuSrv.isMenuActive(menu.id.toString()), 
                'hidden': dimension.isMobile() && !menuSrv.isMenuActive(menu.id.toString()),
                'md:visible md:opacity-1 md:translate-y-0': !dimension.isMobile() && menuSrv.isMenuActive(menu.id.toString()),
                'md:invisible md:opacity-0 md:translate-y-5': !dimension.isMobile() && !menuSrv.isMenuActive(menu.id.toString())  
              }"
              class="md:absolute relative md:top-17.5 z-20 m-0 p-0 min-w-190 bg-white border border-solid border-lightGray origin-center transition-all duration-500"
            >
              <li class="relative block" *ngFor="let menuChild of menu.children">
                <a
                  [routerLink]="menuChild.path"
                  [id]="menuChild.id"
                  class="relative text-normalLightGray text-left block leading-5.5 py-2 px-4 text-15 spacing-normal transition-all duration-500"
                >
                  {{menuChild.title}}
                </a
                >
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    `
})

export class MenuClientHeader {
  headerMenus: MenuItem[] = HEADER_MENU_CLIENT;
  constructor(public menuSrv: MenuService, public dimension: Dimension) { }
}