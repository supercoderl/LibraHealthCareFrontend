import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root', // Singleton
})

export class MenuService {
    private activeMenu: string | null = null;
    private openMenu: boolean = false;

    isMenuActive(menuId: string | null): boolean {
        return this.activeMenu === menuId;
    }

    isMenuOpen(): boolean {
        return this.openMenu === true;
    }

    toggleMenu(menuId: string | null): void {
        this.activeMenu = this.activeMenu === menuId ? null : menuId;
    }

    toogleOpenMenu(): void {
        console.log(this.openMenu);
        this.openMenu = !this.openMenu;
    }
}