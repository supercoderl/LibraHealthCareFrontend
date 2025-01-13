import { Routes } from '@angular/router';

export const dashboardRoutes: Routes = [
    {
        path: '',
        redirectTo: 'admin',
        pathMatch: 'full'
    },
    {
        path: 'admin',
        loadComponent: () => import('./admin-dashboard/admin-dashboard.component').then(c => c.AdminDashboardComponent),
        data: { title: 'Admin Dashboard' }
    },
    {
        path: 'patient',
        loadComponent: () => import('./patient-dashboard/patient-dashboard.component').then(c => c.PatientDashboardComponent),
        data: { title: 'Patient Dashboard' }
    },
    {
        path: 'doctor',
        loadComponent: () => import('./doctor-dashboard/doctor-dashboard.component').then(c => c.DoctorDashboardComponent),
        data: { title: 'Doctor Dashboard' }
    }
]