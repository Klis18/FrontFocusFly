import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/pages/layout/layout.component';
import { LoginComponent } from './auth/pages/login/login.component';

export const routes: Routes = [
    {
        path:'auth',
        component: LoginComponent
    },
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
                path:'proyectos',
                loadComponent: () => import('./projects/pages/projects-page/projects-page.component')
            },
            {
                path:'clientes',
                loadComponent: () => import('./customers/pages/customers-page/customers-page.component')
            },
            {
                path:'**',
                redirectTo: 'dashboard'
            }
        ]
    },
    {
        path:'**',
        redirectTo:'auth'
    }
];
