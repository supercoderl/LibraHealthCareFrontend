import { Routes } from "@angular/router";

export const homeRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./home/home.component').then(c => c.HomeComponent),
        data: { title: 'Home' }
    },
    { 
        path: 'contact', 
        loadComponent: () => import('./contact/contact.component').then(c => c.ContactComponent),
        data: { title: 'Contact' }
    },
    { 
        path: 'career', 
        loadComponent: () => import('./career/career.component').then(c => c.CareerComponent),
        data: { title: 'Career' }
    },
    { 
        path: 'diagnosis', 
        loadComponent: () => import('./diagnosis/diagnosis.component').then(c => c.DiagnosisComponent),
        data: { title: 'Diagnosis' }
    },
    { 
        path: 'care-health', 
        loadComponent: () => import('./care-health/care-health.component').then(c => c.CareHealthComponent),
        data: { title: 'Care & Health' } 
    },
    // { path: 'appointment', loadComponent: () => import('./appointment/appointment.component').then(c => c.AppointmentComponent) }
]