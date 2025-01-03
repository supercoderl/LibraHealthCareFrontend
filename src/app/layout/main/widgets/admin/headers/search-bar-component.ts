import { Component } from "@angular/core";
import { SharedModule } from "../../../../../shared";
import { MenuService } from "../../../../../shared/utils/menu";

@Component({
    selector: 'search-bar-admin',
    template: `
    <div
    class="{{
      menuSrv.isMenuActive('search')
        ? 'visible opacity-1'
        : 'invisible opacity-0'
    }} absolute top-0 left-0 right-0 z-50 transition-all duration-300"
  >
    <div
      class="h-[55px] bg-white px-4 flex items-center border-b-[1px] border-solid border-[rgba(72,_94,_144,_0.16)]"
    >
      <input
        type="search"
        class="p-0 font-[500] text-[#001737] border-0 bg-transparent block w-full outline-none"
        placeholder="Type and hit enter to search..."
      />
      <a
        id="navbarSearchClose"
        href="javascript:void(0)"
        class="ml-[5px] md:ml-[10px] text-[#8392a5]"
        (click)="menuSrv.toggleMenu(null)"
        ><span nz-icon nzType="close" nzTheme="outline"></span>
      </a>
    </div>
    <!-- navbar-search-header -->
    <div class="px-4 pt-4 pb-[20px] bg-white text-[13px]">
      <label
        class="text-[10px] uppercase font-[500] text-[#8392a5] mb-[10px] flex items-center"
        >Recent Searches</label
      >
      <ul class="flex flex-col mb-0 pl-0">
        <li>
          <a
            href="dashboard-one.html"
            class="py-[5px] px-[10px] block text-[#1b2e4b] rounded-[0.25rem]"
            >modern dashboard</a
          >
        </li>
      </ul>

      <hr class="my-[30px] border-0 border-[rgba(72,_94,_144,_0.16)]" />

      <label
        class="text-[10px] uppercase font-[500] text-[#8392a5] mb-[10px] flex items-center"
        >Search Suggestions</label
      >

      <ul class="flex flex-col mb-0 pl-0">
        <li>
          <a
            href="dashboard-one.html"
            class="py-[5px] px-[10px] block text-[#1b2e4b] rounded-[0.25rem]"
            >cryptocurrency</a
          >
        </li>
        <li>
          <a
            href="app-calendar.html"
            class="py-[5px] px-[10px] block text-[#1b2e4b] rounded-[0.25rem]"
            >button groups</a
          >
        </li>
        <li>
          <a
            href="../../collections/modal.html"
            class="py-[5px] px-[10px] block text-[#1b2e4b] rounded-[0.25rem]"
            >form elements</a
          >
        </li>
        <li>
          <a
            href="../../components/el-avatar.html"
            class="py-[5px] px-[10px] block text-[#1b2e4b] rounded-[0.25rem]"
            >contact app</a
          >
        </li>
      </ul>
    </div>
    <!-- navbar-search-body -->
  </div>
  <!-- navbar-search -->
    `,
    standalone: true,
    imports: [SharedModule]
})

export class SearchBarAdmin {
    constructor(public menuSrv: MenuService) { }
}