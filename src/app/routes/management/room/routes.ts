import { Routes } from "@angular/router";
import { ListComponent } from "./list/list.component";
import { StayComponent } from "./stays/stay.component";

export const routes: Routes = [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: ListComponent },
    { path: 'stays', component: StayComponent }
]