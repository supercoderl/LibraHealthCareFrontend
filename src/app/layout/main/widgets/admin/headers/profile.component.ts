import { Component, OnInit } from "@angular/core";
import { SharedModule } from "../../../../../shared";
import { MenuService } from "../../../../../shared/utils/menu";
import { Store } from "@ngrx/store";
import { ProfileState } from "../../../../../reducers";
import { ProfileActions } from "../../../../../core/action";
import { map, startWith } from "rxjs";
import { Router } from "@angular/router";

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
            [src]="(profile$ | async)?.avatar"
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
            [src]="(profile$ | async)?.avatar"
            class="w-full h-full rounded-full object-cover"
            alt=""
          />
        </div>
        <h6 class="mb-[5px] font-semibold">{{(profile$ | async)?.userName}}</h6>
        <p class="mb-[25px] text-[12px] text-[#8392a5]">{{ (profile$ | async)?.email }}</p>

        <a
          routerLink="/dashboard/profile"
          class="p-0 flex items-center text-[#1b2e4b] rounded-[0.25rem] transition-all duration-300 w-full whitespace-nowrap bg-transparent border-0"
        >
          <span nz-icon nzType="edit" nzTheme="outline" class="mr-3"></span>
          {{ "app.profile.edit" | i18n }}
        </a>
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
          {{ "app.profile.help-center" | i18n }}
        </a>
        <a
          href=""
          class="p-0 mt-[10px] flex items-center text-[#1b2e4b] rounded-[0.25rem] transition-all duration-300 w-full whitespace-nowrap bg-transparent border-0"
          ><span nz-icon nzType="setting" nzTheme="outline" class="mr-3"></span>
          {{ "app.profile.setting" | i18n }}
        </a>
        <a
          (click)="handleLogout()"
          class="p-0 mt-[10px] flex items-center text-[#1b2e4b] rounded-[0.25rem] transition-all duration-300 w-full whitespace-nowrap bg-transparent border-0"
          ><span nz-icon nzType="logout" nzTheme="outline" class="mr-3"></span>
          {{ "app.profile.sign-out" | i18n }}
        </a>
      </div>
      <!-- dropdown-menu -->
    </div>
    `,
  standalone: true,
  imports: [SharedModule]
})

export class NavbarProfile implements OnInit {
  profile$ = this.store.select((state) => state.profile.profile).pipe(
    map(profile => profile ?? { userName: 'Guest', email: 'guest@example.com', avatar: 'https://static-resource.np.community.playstation.net/avatar_m/WWS_J/J0001_m.png' }),
    startWith({ userName: 'Guest', email: 'guest@example.com', avatar: 'https://static-resource.np.community.playstation.net/avatar_m/WWS_J/J0001_m.png' }) // Initial value
  );

  handleLogout(): void {
    this.store.dispatch(ProfileActions.clearProfile());
    this.router.navigateByUrl('/auth/login');
  }

  constructor(public menuSrv: MenuService, private store: Store<{ profile: ProfileState }>, private router: Router) { }

  ngOnInit(): void {
    const storedProfile = localStorage.getItem('profile');
    if (storedProfile) {
      this.store.dispatch(ProfileActions.loadProfileSuccess({ profile: JSON.parse(storedProfile) }));
    } else {
      this.store.dispatch(ProfileActions.loadProfile());
    }
  }
}