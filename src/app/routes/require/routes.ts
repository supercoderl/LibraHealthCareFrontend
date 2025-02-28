import { Routes } from "@angular/router";
import { VerifyEmailComponent } from "./verify-email/verify-email.component";

export const routes: Routes = [
    { path: '', redirectTo: 'verify-email', pathMatch: 'full' },
    { path: 'verify-email', component: VerifyEmailComponent }
]