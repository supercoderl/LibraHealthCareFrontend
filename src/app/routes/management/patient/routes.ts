import { Routes } from "@angular/router";
import { ListComponent } from "./list/list.component";
import { MedicalRecordComponent } from "./medicalRecords/medicalRecord.component";

export const routes: Routes = [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: ListComponent },
    { path: 'medicalRecords', component: MedicalRecordComponent }
]