import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SubcategoriaService, BusquedaService } from './services';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-danger fixed-top shadow-sm py-2">
      <div class="container-fluid px-2 px-md-4">
        <a class="navbar-brand d-flex align-items-center" routerLink="/inicio">
          <span style="font-size:2rem;line-height:1;">🧸</span>
          <span class="ms-2 fw-bold d-none d-sm-inline" style="font-size:1.5rem;letter-spacing:1px;">Juguetería</span>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" id="categoriasDropdown" role="button" href="#" (click)="$event.preventDefault(); toggleCategorias()" [attr.aria-expanded]="mostrarCategorias">
                Categoría
              </a>
              <ul class="dropdown-menu" [class.show]="mostrarCategorias" aria-labelledby="categoriasDropdown" style="min-width: 260px;">
                <li *ngFor="let cat of categorias" class="position-relative">
                  <a class="dropdown-item" href="#" (click)="$event.preventDefault(); seleccionarCategoria(cat)">
                    {{ cat.nombre }}
                  </a>
                  <!-- Submenú lateral: solo para la categoría seleccionada -->
                  <ul *ngIf="cat.subcategorias && cat === categoriaSeleccionada" class="submenu-lateral list-unstyled">
                    <li *ngFor="let sub of cat.subcategorias">
                      <a class="dropdown-item small" href="#" (click)="$event.preventDefault(); mostrarProductosDeSubcategoria(sub)">{{ sub }}</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>

            <li class="nav-item">
              <a class="nav-link" routerLink="/ofertas">Ofertas</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/marcas">Marcas</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/contacto">Contacto</a>
            </li>
          </ul>
          <form class="d-flex mt-2 mt-lg-0" role="search" style="max-width:300px;" (ngSubmit)="realizarBusqueda()">
            <input 
              class="form-control me-2" 
              type="search" 
              placeholder="Buscar por marca, nombre o tipo..." 
              aria-label="Buscar"
              [(ngModel)]="terminoBusqueda"
              (keyup.enter)="realizarBusqueda()"
              (input)="onBusquedaInput()"
              name="busqueda">
            <button class="btn btn-warning" type="submit"><i class="bi bi-search"></i></button>
          </form>
        </div>
      </div>
    </nav>
    <div style="height:70px;"></div>
    <div class="container-fluid px-2 px-md-4">
      <router-outlet></router-outlet>
    </div>
    <footer class="bg-warning bg-gradient text-dark mt-5 pt-4 pb-2 border-top shadow-sm">
      <div class="container-fluid px-2 px-md-4">
        <div class="text-center mt-3 small">
          &copy; 2024 Juguetería. Todos los derechos reservados.
        </div>
      </div>
    </footer>
    <a href="https://wa.me/5491123456789" target="_blank" class="whatsapp-float" aria-label="Contactar por WhatsApp">
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="28" cy="28" r="28" fill="#25D366"/>
        <path d="M39.5 34.5c-1.1 2.1-3.2 3.5-5.7 3.5-4.2 0-9.3-3.7-12.1-8.2-2.8-4.5-2.7-8.7 0.2-10.8 1.2-0.9 2.7-1.1 4.1-0.6l2.1 0.7c0.5 0.2 0.8 0.7 0.7 1.2l-0.5 2.2c-0.1 0.5-0.5 0.8-1 0.8-0.2 0-0.4 0-0.6-0.1-0.7-0.2-1.4-0.3-2-0.3-0.5 0-1 0.4-1.1 0.9-0.2 0.7 0.2 1.7 1.1 2.8 1.2 1.5 3.1 3.2 4.7 3.8 0.7 0.3 1.3 0.2 1.7-0.3l1.2-1.5c0.3-0.4 0.9-0.5 1.3-0.2l2.1 1.2c0.4 0.2 0.6 0.7 0.4 1.1z" fill="#fff"/>
      </svg>
    </a>
  `,
  styleUrls: ['./app.css'],
  imports: [RouterOutlet, RouterLink, CommonModule, FormsModule],
})
export class AppComponent {
  terminoBusqueda: string = '';

  constructor(private router: Router, private subcategoriaService: SubcategoriaService, private busquedaService: BusquedaService) {
    // Limpiar subcategoría cuando se navega a otras rutas
    this.router.events.subscribe(() => {
      const currentUrl = this.router.url;
      if (currentUrl !== '/inicio') {
        this.subcategoriaService.seleccionarSubcategoria(null);
      }
    });
  }

  realizarBusqueda() {
    if (this.terminoBusqueda.trim()) {
      // Usar el servicio directamente
      this.busquedaService.realizarBusqueda(this.terminoBusqueda.trim());
      this.router.navigate(['/inicio']);
    }
  }

  onBusquedaInput() {
    // Búsqueda en tiempo real (opcional)
    if (this.terminoBusqueda.trim().length >= 2) {
      // Puedes implementar búsqueda en tiempo real aquí si quieres
    }
  }
  mostrarCategorias = false;
  categoriaSeleccionada: any = null;
  categorias = [
    { nombre: 'Aire libre', subcategorias: ['Juegos de patio', 'Piscinas', 'Deportes'] },
    { nombre: 'Artes', subcategorias: ['Pintura', 'Dibujo', 'Manualidades'] },
    { nombre: 'Manualidades y libros', subcategorias: ['Libros', 'Origami', 'Recortables'] },
    { nombre: 'Disfraces y accesorios', subcategorias: ['Disfraces', 'Sombreros', 'Máscaras'] },
    { nombre: 'Electrónica', subcategorias: ['Robótica', 'Juguetes electrónicos'] },
    { nombre: 'Bebés y primera infancia', subcategorias: ['Sonajeros', 'Juguetes blandos'] },
    { nombre: 'Figuras de acción y muñecos', subcategorias: ['Superhéroes', 'Animales', 'Muñecos'] },
    { nombre: 'Juegos de mesa y salón', subcategorias: ['Cartas', 'Tableros', 'Dados'] },
    { nombre: 'Jugando a ser grande', subcategorias: ['Cocinitas', 'Herramientas', 'Oficio'] },
    { nombre: 'Ladrillos y bloques', subcategorias: ['Lego', 'Mega Bloks', 'Bloques madera'] },
    { nombre: 'Muñecas, bebotes y ponys', subcategorias: ['Muñecas', 'Bebotes', 'Ponys'] },
    { nombre: 'Para la escuela', subcategorias: ['Mochilas', 'Cartucheras', 'Útiles'] },
    { nombre: 'Peluches', subcategorias: ['Animales', 'Gigantes', 'Pequeños'] },
    { nombre: 'Pistas y vehículos', subcategorias: ['Autos', 'Trenes', 'Pistas armables'] },
    { nombre: 'Pistolas, espadas y lanzadardos', subcategorias: ['Pistolas', 'Espadas', 'Lanzadardos'] },
    { nombre: 'Rodados', subcategorias: ['Bicicletas', 'Triciclos', 'Monopatines'] },
    { nombre: 'Bazar', subcategorias: ['Vajilla infantil', 'Juguetes cocina'] },
  ];

  toggleCategorias() {
    this.mostrarCategorias = !this.mostrarCategorias;
    // Si cerramos el dropdown, también limpiamos la categoría seleccionada
    if (!this.mostrarCategorias) {
      this.categoriaSeleccionada = null;
    }
    console.log('Dropdown categorías:', this.mostrarCategorias ? 'abierto' : 'cerrado');
  }

  seleccionarCategoria(cat: any) {
    // Si ya está seleccionada, la deseleccionamos
    if (this.categoriaSeleccionada === cat) {
      this.categoriaSeleccionada = null;
    } else {
      // Si es una categoría diferente, la seleccionamos
      this.categoriaSeleccionada = cat;
    }
    console.log('Categoría seleccionada:', this.categoriaSeleccionada?.nombre);
  }

  mostrarProductosDeSubcategoria(sub: string) {
    console.log('Seleccionando subcategoría:', sub);
    // Seleccionar la subcategoría primero
    this.subcategoriaService.seleccionarSubcategoria(sub);
    // Navegar a inicio
    this.router.navigate(['/inicio']);
    // Cerrar el dropdown después de un pequeño delay
    setTimeout(() => {
      this.mostrarCategorias = false;
      this.categoriaSeleccionada = null;
    }, 100);
  }
}
