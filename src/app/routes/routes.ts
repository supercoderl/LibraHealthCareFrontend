import { Routes } from "@angular/router";
import { startPageGuard } from "../core";
import { authSimpleCanActivate, authSimpleCanActivateChild } from "@delon/auth";
import { AdminMainLayoutComponent } from "../layout/main/admin-main.component";
import { ClientMainComponent } from "../layout/main/client-main.component";
import { homeRoutes } from "./home/routes";
import { managementRoutes } from "./management/routes";
import { dashboardRoutes } from "./dashboard/routes";

export const routes: Routes = [
    {
        path: '',
        component: ClientMainComponent,
        children: homeRoutes,
    },
    {
        path: 'management',
        component: AdminMainLayoutComponent,
        canActivate: [startPageGuard, authSimpleCanActivate],
        canActivateChild: [authSimpleCanActivateChild],
        data: {},
        children: managementRoutes
    },
    {
        path: 'dashboard',
        component: AdminMainLayoutComponent,
        canActivate: [startPageGuard, authSimpleCanActivate],
        canActivateChild: [authSimpleCanActivateChild],
        data: {},
        children: dashboardRoutes
    },
    {
        path: '',
        loadChildren: () => import('./auth/routes').then(m => m.routes),
    },
    {
        path: 'exception',
        loadChildren: () => import('./exception/routes').then(m => m.routes)
    },
    {
        path: 'require',
        loadChildren: () => import('./require/routes').then(m => m.routes)
    },
    {
        path: '**',
        redirectTo: 'exception/404'
    }
]