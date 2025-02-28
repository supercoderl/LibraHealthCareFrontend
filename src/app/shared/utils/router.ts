import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root', // Singleton
})

export class RouterService {
    private readonly router = inject(Router);

    redirectUser(roles: string[]): void {
        let route = '/dashboard/patient'; // Default Guest

        if (roles.includes('Administrator') || roles.includes('Manager')) {
            route = '/dashboard/admin';
        } else if (roles.includes('Employee')) {
            route = '/dashboard/doctor';
        }

        this.router.navigate([route]); // 👈 Navigate
    }
}