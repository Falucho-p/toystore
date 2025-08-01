import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', loadComponent: () => import('./inicio/inicio.component').then(m => m.InicioComponent) },
  { path: 'ofertas', loadComponent: () => import('./ofertas.component').then(m => m.OfertasComponent) },
  { path: 'marcas', loadComponent: () => import('./marcas.component').then(m => m.MarcasComponent) },
  { path: 'contacto', loadComponent: () => import('./contacto/contacto.component').then(m => m.ContactoComponent) },
  { path: 'acerca', loadComponent: () => import('./acerca/acerca.component').then(m => m.AcercaComponent) },
  { path: 'carrito', loadComponent: () => import('./carrito.component').then(m => m.CarritoComponent) },
  { path: 'wishlist', loadComponent: () => import('./wishlist.component').then(m => m.WishlistComponent) },
  { path: 'productos/:id', loadComponent: () => import('./productos/detalle-producto.component').then(m => m.DetalleProductoComponent) },
];
