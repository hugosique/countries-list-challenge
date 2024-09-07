import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'country/:id',
        loadComponent: () => import('./pages/country-details/country-details.component').then(m => m.CountryDetailsComponent)
    }
];
