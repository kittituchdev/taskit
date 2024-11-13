import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { PageLayoutComponent } from './core/layouts/page-layout/page-layout.component';

export const routes: Routes = [
    {
        path: 'auth',
        component: AuthLayoutComponent,
        children: [
            // Define your auth routes here
            { path: 'login', loadComponent: () => import('./features/login/login.component').then(c => c.LoginComponent) },
            { path: 'register', loadComponent: () => import('./features/register/register.component').then(c => c.RegisterComponent) },
            // Add other auth-related routes
        ]
    },
    {
        path: '',
        component: PageLayoutComponent,
        children: [
            // Define main application routes here
            { path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard.component').then(c => c.DashboardComponent) },
            { path: 'project', loadComponent: () => import('./features/project/project.component').then(c => c.ProjectComponent) },
            // Add other non-auth-related routes
        ]
    },
    { path: '**', redirectTo: '' } // Redirect any unknown route to the home/dashboard or a 404 page
];
