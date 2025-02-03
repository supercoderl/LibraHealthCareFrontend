import { Routes } from "@angular/router";
import { ListComponent } from "./list/list.component";
import { PrescriptionComponent } from "./prescriptions/prescription.component";

export const routes: Routes = [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: ListComponent },
    { path: 'prescriptions', component: PrescriptionComponent }
]