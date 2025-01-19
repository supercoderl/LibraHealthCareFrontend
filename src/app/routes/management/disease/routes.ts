import { Routes } from "@angular/router";
import { ListComponent } from "./list/list.component";
import { DiagnosesComponent } from "./diagnoses/diagnoses.component";

export const routes: Routes = [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: ListComponent },
    { path: 'diagnoses', component: DiagnosesComponent }
]