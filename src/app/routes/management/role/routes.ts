import { Routes } from "@angular/router";
import { ListComponent } from "./list/list.component";
import { PermissionComponent } from "./permission/permission.component";

export const routes: Routes = [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: ListComponent },
    { path: 'permissions', component: PermissionComponent }
]