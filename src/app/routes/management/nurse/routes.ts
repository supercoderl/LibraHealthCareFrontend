import { Routes } from "@angular/router";
import { ListComponent } from "./list/list.component";
import { OnCallComponent } from "./onCalls/onCall.component";

export const routes: Routes = [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: ListComponent },
    { path: 'onCalls', component: OnCallComponent }
]