import { Routes } from "@angular/router";
import { ListComponent } from "./list/list.component";
import { AffiliationComponent } from "./affiliations/affiliation.component";
import { TrainingComponent } from "./trainings/training.component";
import { ExperienceComponent } from "./experiences/experience.component";

export const routes: Routes = [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: ListComponent },
    { path: 'affiliations', component: AffiliationComponent },
    { path: 'trainings', component: TrainingComponent },
    { path: 'experiences', component: ExperienceComponent }
]