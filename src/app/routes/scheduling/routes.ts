import { Routes } from "@angular/router";
import { CalendarComponent } from "./calendar/calendar.component";

export const routes: Routes = [
    { path: '', redirectTo: 'calendar', pathMatch: 'full' },
    { path: 'calendar', component: CalendarComponent }
]