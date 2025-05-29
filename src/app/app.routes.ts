import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/pages/layout/layout.component';

export const routes: Routes = [
    {
        path:'',
        component: LayoutComponent,
        children:[
            {
                path:'dashboard',
                loadComponent: () => import('./dashboard/pages/dashboard-page/dashboard-page.component')
            },
            {
                path:'tareas',
                loadComponent: () => import('./Tasks/pages/tasks-page/tasks-page.component')
            },
            {
                path:'eventos',
                loadComponent: () => import('./Events/pages/events-page/events-page.component')
            },
            {
                path:'**',
                redirectTo: 'dashboard'
            }
        ]
    },
    {
        path:'**',
        redirectTo:''
    }
];
