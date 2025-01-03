import { Component } from "@angular/core";
import { MenuService } from "../../../../../shared/utils/menu";
import { SharedModule } from "../../../../../shared";

@Component({
    selector: 'navbar-menu',
    template: `
    <ul
      class="h-full flex flex-wrap flex-col py-[25px] md:items-center md:justify-center md:flex-row md:p-0 md:w-full md:max-w-[780px] md:mb-0 md:mt-[-1px]"
    >
      <li class="relative active show">
        <a
          href="javascript:void(0)"
          class="dropdown-button flex items-center justify-start relative px-[20px] text-tertiary before:content-[''] before:absolute before:top-[calc(50%-1px)] before:left-0 before:w-[10px] before:h-[2px] before:bg-tertiary md:before:hidden after:content-[''] after:w-[6px] after:h-[6px] after:border-r-[1.5px] after:border-solid after:border-tertiary after:border-b-[1.5px] after:inline-block after:rotate-45 after:ml-auto after:mb-[3px] after:transition-all after:duration-300 md:after:ml-[6px]"
          (click)="menuSrv.toggleMenu('dashboard')"
        >
          <span
            nz-icon
            nzType="dashboard"
            nzTheme="outline"
            class="mr-3 md:!hidden"
          ></span>
          Dashboard
        </a>
        <ul
          *ngIf="menuSrv.isMenuActive('dashboard')"
          class="dropdown-container relative md:absolute md:top-[40px] md:left-0 md:bg-white min-w-[200px] pr-[15px] pb-[3px] pl-[24px] md:py-[20px] md:px-[25px] border-l-[1px] md:border-[1px] border-solid border-[rgba(72,_94,_144,_0.16)] md:border-[rgba(192,_204,_218,_0.53)] mt-[10px] md:mt-0 ml-[28px] md:ml-0 md:rounded-sm z-[1000] md:before:block md:before:content-[''] md:before:absolute md:before:top-[-10px] md:before:left-[25px] md:before:border-b-[10px] md:before:border-x-[10px] md:before:border-solid md:before:border-x-transparent md:before:border-b-[rgba(192,_204,_218,_0.53)] md:after:content-[''] md:after:absolute md:after:top-[-8.5px] md:after:left-[26px] md:after:border-x-[9px] md:after:border-b-[9px] md:after:border-b-white md:after:border-x-transparent"
        >
          <li class="nav-sub-item">
            <a
              href="dashboard-one.html"
              class="text-[#1b2e4b] whitespace-nowrap text-[13px] flex items-center transition-all duration-300"
            >
              <span
                nz-icon
                nzType="bar-chart"
                nzTheme="outline"
                class="!hidden md:!block md:ml-[-4px] md:mr-3"
              ></span>
              Sales Monitoring
            </a>
          </li>
        </ul>
      </li>
      <li class="relative mt-[10px] md:mt-0">
        <a href="" class="flex items-center justify-start px-[20px]">
          <span
            nz-icon
            nzType="inbox"
            nzTheme="outline"
            class="mr-3 md:!hidden"
          ></span>
          Apps
        </a>
      </li>
      <li class="relative mt-[10px] md:mt-0">
        <a
          href="javascript:void(0)"
          class="dropdown-button flex items-center justify-start px-[20px] after:content-[''] after:w-[6px] after:h-[6px] after:border-r-[1.5px] after:border-solid after:border-[#8392a5] after:border-b-[1.5px] after:inline-block after:rotate-45 after:ml-auto after:mb-[3px] after:transition-all after:duration-300 md:after:ml-[6px]"
          (click)="menuSrv.toggleMenu('pages')"
        >
          <span
            nz-icon
            nzType="project"
            nzTheme="outline"
            class="mr-3 md:!hidden"
          ></span>
          Pages
        </a>
        <div
          *ngIf="menuSrv.isMenuActive('pages')"
          class="dropdown-container relative md:absolute md:top-[40px] md:left-0 md:bg-white min-w-[200px] pr-[15px] pb-[3px] pl-[24px] md:py-[20px] md:px-[25px] border-l-[1px] md:border-[1px] border-solid border-[rgba(72,_94,_144,_0.16)] md:border-[rgba(192,_204,_218,_0.53)] mt-[10px] md:mt-0 ml-[28px] md:ml-0 md:rounded-sm z-[1000] md:before:block md:before:content-[''] md:before:absolute md:before:top-[-10px] md:before:left-[25px] md:before:border-b-[10px] md:before:border-x-[10px] md:before:border-solid md:before:border-x-transparent md:before:border-b-[rgba(192,_204,_218,_0.53)] md:after:content-[''] md:after:absolute md:after:top-[-8.5px] md:after:left-[26px] md:after:border-x-[9px] md:after:border-b-[9px] md:after:border-b-white md:after:border-x-transparent"
        >
          <div class="md:flex">
            <ul class="min-w-[150px] p-0 m-0 relative">
              <li
                class="text-[10px] font-[600] tracking-wider text-[#8392a5] uppercase block mb-[10px]"
              >
                Authentication
              </li>
              <li class="nav-sub-item">
                <a
                  href="page-signin.html"
                  class="text-[#1b2e4b] whitespace-nowrap text-[13px] flex items-center transition-all duration-300"
                >
                  <span
                    nz-icon
                    nzType="ant-design"
                    nzTheme="outline"
                    class="!hidden md:!block md:mr-3"
                  ></span>
                  Sign In
                </a>
              </li>
              <li
                class="text-[10px] font-[600] tracking-wider text-[#8392a5] uppercase block mb-[10px] mt-[15px]"
              >
                User Pages
              </li>
              <li class="nav-sub-item">
                <a
                  href="page-profile-view.html"
                  class="text-[#1b2e4b] whitespace-nowrap text-[13px] flex items-center transition-all duration-300"
                >
                  <span
                    nz-icon
                    nzType="ant-design"
                    nzTheme="outline"
                    class="!hidden md:!block md:mr-3"
                  ></span>
                  View Profile</a
                >
              </li>
            </ul>
            <ul
              class="md:mt-0 md:ml-[25px] md:pl-[25px] md:border-l-[1px] md:border-solid md:border-[rgba(72,_94,_144,_0.16)]"
            >
              <li
                class="text-[10px] font-[600] tracking-wider text-[#8392a5] uppercase block mb-[10px] mt-[15px] md:mt-0"
              >
                Error Pages
              </li>
              <li class="nav-sub-item">
                <a
                  href="page-404.html"
                  class="text-[#1b2e4b] whitespace-nowrap text-[13px] flex items-center transition-all duration-300"
                  ><span
                    nz-icon
                    nzType="ant-design"
                    nzTheme="outline"
                    class="!hidden md:!block md:mr-3"
                  ></span>
                  404 Page Not Found</a
                >
              </li>
              <li
                class="text-[10px] font-[600] tracking-wider text-[#8392a5] uppercase block mb-[10px] mt-[15px]"
              >
                Other Pages
              </li>
              <li class="nav-sub-item">
                <a
                  href="page-timeline.html"
                  class="text-[#1b2e4b] whitespace-nowrap text-[13px] flex items-center transition-all duration-300"
                  ><span
                    nz-icon
                    nzType="ant-design"
                    nzTheme="outline"
                    class="!hidden md:!block md:mr-3"
                  ></span>
                  Timeline</a
                >
              </li>
            </ul>
          </div>
        </div>
        <!-- nav-sub -->
      </li>
      <li class="nav-item mt-[10px] md:mt-0">
        <a
          href="../../components/"
          class="flex items-center justify-start px-[20px]"
        >
          <span
            nz-icon
            nzType="property-safety"
            nzTheme="outline"
            class="mr-3 md:!hidden"
          ></span>
          Components
        </a>
      </li>
    </ul>
    `,
    standalone: true,
    imports: [SharedModule],
})

export class NavbarMenu {
    constructor(public menuSrv: MenuService) {}
}