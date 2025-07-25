import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', loadComponent: () => import('./inicio/inicio.component').then(m => m.InicioComponent) },
  { path: 'ofertas', loadComponent: () => import('./ofertas.component').then(m => m.OfertasComponent) },
  { path: 'marcas', loadComponent: () => import('./marcas.component').then(m => m.MarcasComponent) },
  { path: 'contacto', loadComponent: () => import('./contacto/contacto.component').then(m => m.ContactoComponent) },
];
