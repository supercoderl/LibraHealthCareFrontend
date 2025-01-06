import { Routes } from '@angular/router';

export const managementRoutes: Routes = [
    {
        path: '',
        redirectTo: 'supplier',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/routes').then(m => m.routes),
        data: { title: 'Dashboard' }
    },
    {
        path: 'appointment',
        loadChildren: () => import('./appointment/routes').then(m => m.routes),
        data: { title: 'Appointment' }
    },
    {
        path: 'schedule',
        loadChildren: () => import('./scheduling/routes').then(m => m.routes),
        data: { title: 'Schedule' }
    },
    {
        path: 'symtom',
        loadChildren: () => import('./symtom/routes').then(m => m.routes),
        data: { title: 'Symtom' }
    },
    {
        path: 'medication',
        loadChildren: () => import('./medication/routes').then(m => m.routes),
        data: { title: 'Medication' }
    },
    {
        path: 'supplier',
        loadChildren: () => import('./supplier/routes').then(m => m.routes),
        data: { title: 'Supplier' }
    },
    {
        path: 'block',
        loadChildren: () => import('./block/routes').then(m => m.routes),
        data: { title: 'Block' }
    },
    {
        path: 'department',
        loadChildren: () => import('./department/routes').then(m => m.routes),
        data: { title: 'Department' }
    },
    {
        path: 'nurse',
        loadChildren: () => import('./nurse/routes').then(m => m.routes),
        data: { title: 'Nurse' }
    },
    {
        path: 'patient',
        loadChildren: () => import('./patient/routes').then(m => m.routes),
        data: { title: 'Patient' }
    },
    {
        path: 'procedure',
        loadChildren: () => import('./procedure/routes').then(m => m.routes),
        data: { title: 'Procedure' }
    },
    {
        path: 'role',
        loadChildren: () => import('./role/routes').then(m => m.routes),
        data: { title: 'Role' }
    },
    {
        path: 'treatment',
        loadChildren: () => import('./treatment/routes').then(m => m.routes),
        data: { title: 'Treatment' }
    }
]