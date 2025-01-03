import { Component } from "@angular/core";
import { SharedModule } from "../../../../../shared";
import { MenuService } from "../../../../../shared/utils/menu";

@Component({
    selector: 'navbar-profile',
    template: `
    <div class="dropdown dropdown-profile ml-4">
      <a
        href="javascript:void(0)"
        class="dropdown-button flex items-center cursor-pointer"
        data-bs-toggle="dropdown"
        data-display="static"
        (click)="menuSrv.toggleMenu('profile')"
      >
        <div class="w-[28px] h-[28px] relative">
          <img
            src="https://themepixels.me/demo/dashforge2/assets/img/img1.png"
            class="w-full h-full object-cover rounded-full"
            alt=""
          />
        </div> </a
      ><!-- dropdown-link -->
      <div
        *ngIf="menuSrv.isMenuActive('profile')"
        class="dropdown-container mt-[13px] mr-[5px] z-40 w-[230px] p-[25px] absolute text-[#001737] bg-white border-[1px] border-solid border-[rgba(131,_146,_165,_0.27)] right-0 before:right-[15px] before:left-auto before:content-[''] before:absolute before:top-[-10px] before:border-b-[10px] before:border-x-[10px] before:border-solid before:border-b-[rgba(72,_94,_144,_0.16)] before:border-x-transparent after:right-[16px] after:left-auto after:content-[''] after:absolute after:top-[-8.5px] after:border-b-[9px] after:border-x-[9px] after:border-solid after:border-b-white after:border-x-transparent"
      >
        <div class="mb-[15px] w-[64px] h-[64px] relative">
          <img
            src="https://themepixels.me/demo/dashforge2/assets/img/img1.png"
            class="w-full h-full rounded-full object-cover"
            alt=""
          />
        </div>
        <h6 class="mb-[5px] font-semibold">Katherine Pechon</h6>
        <p class="mb-[25px] text-[12px] text-[#8392a5]">Administrator</p>

        <a
          href=""
          class="p-0 flex items-center text-[#1b2e4b] rounded-[0.25rem] transition-all duration-300 w-full whitespace-nowrap bg-transparent border-0"
        >
          <span nz-icon nzType="edit" nzTheme="outline" class="mr-3"></span>
          Edit Profile</a
        >
        <a
          href="page-profile-view.html"
          class="p-0 mt-[10px] flex items-center text-[#1b2e4b] rounded-[0.25rem] transition-all duration-300 w-full whitespace-nowrap bg-transparent border-0"
          ><span nz-icon nzType="user" nzTheme="outline" class="mr-3"></span>
          View Profile</a
        >
        <div
          class="my-[15px] h-0 overflow-hidden opacity-1 border-t-[1px] border-solid border-[rgba(0,_0,_0,_0.175)]"
        ></div>
        <a
          href="page-help-center.html"
          class="p-0 flex items-center text-[#1b2e4b] rounded-[0.25rem] transition-all duration-300 w-full whitespace-nowrap bg-transparent border-0"
          ><span
            nz-icon
            nzType="question-circle"
            nzTheme="outline"
            class="mr-3"
          ></span>
          Help Center</a
        >
        <a
          href=""
          class="p-0 mt-[10px] flex items-center text-[#1b2e4b] rounded-[0.25rem] transition-all duration-300 w-full whitespace-nowrap bg-transparent border-0"
          ><span nz-icon nzType="setting" nzTheme="outline" class="mr-3"></span>
          Account Settings
        </a>
        <a
          href="page-signin.html"
          class="p-0 mt-[10px] flex items-center text-[#1b2e4b] rounded-[0.25rem] transition-all duration-300 w-full whitespace-nowrap bg-transparent border-0"
          ><span nz-icon nzType="logout" nzTheme="outline" class="mr-3"></span>
          Sign Out
        </a>
      </div>
      <!-- dropdown-menu -->
    </div>
    `,
    standalone: true,
    imports: [SharedModule]
})

export class NavbarProfile {
    constructor(public menuSrv: MenuService) {}
}