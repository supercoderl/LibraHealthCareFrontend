import { Routes } from "@angular/router";
import { GeneralComponent } from "./general/general.component";

export const routes: Routes = [
    { path: '', redirectTo: 'general', pathMatch: 'full' },
    { path: 'general', component: GeneralComponent }
]