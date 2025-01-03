import { Routes } from "@angular/router";
import { startPageGuard } from "../core";
import { authSimpleCanActivate, authSimpleCanActivateChild } from "@delon/auth";
import { AdminMainLayoutComponent } from "../layout/main/admin-main.component";
import { ClientMainComponent } from "../layout/main/client-main.component";
import { homeRoutes } from "./home/routes";

export const routes: Routes = [
    {
        path: '',
        component: ClientMainComponent,
        children: homeRoutes,
    },
    // {
    //     path: '',
    //     component: AdminMainLayoutComponent,
    //     // canActivate: [startPageGuard, authSimpleCanActivate],
    //     // canActivateChild: [authSimpleCanActivateChild],
    //     data: {},
    //     children: [
    //         { path: '', redirectTo: 'appointmnet', pathMatch: 'full' },
    //         { path: 'scheduling', loadChildren: () => import('./scheduling/routes').then(m => m.routes) },
    //         { path: 'appointmnet', loadChildren: () => import('./appointment/routes').then(m => m.routes) }
    //     ]
    // },
    {
        path: '',
        loadChildren: () => import('./auth/routes').then(m => m.routes),
    },
    {
        path: 'exception',
        loadChildren: () => import('./exception/routes').then(m => m.routes)
    },
    {
        path: '**',
        redirectTo: 'exception/404'
    }
]