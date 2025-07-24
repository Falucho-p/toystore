import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Banner principal -->
    <section class="container-fluid p-0 mb-5">
      <div class="bg-warning bg-gradient d-flex flex-column flex-md-row align-items-center justify-content-between rounded-4 shadow p-4 p-md-5" style="min-height: 260px;">
        <div class="text-center text-md-start flex-fill">
          <h1 class="display-4 fw-bold text-danger mb-3">¡Bienvenidos a la diversión!</h1>
          <p class="lead text-dark mb-4">Descubrí los mejores juguetes para todas las edades. ¡Nuevos ingresos y ofertas cada semana!</p>
          <a routerLink="/productos" class="btn btn-danger btn-lg fw-bold shadow">Ver catálogo</a>
        </div>
        <div class="d-none d-md-block flex-fill text-end">
          <img src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=500&q=80" alt="Juguetes coloridos" class="img-fluid rounded-4 shadow-lg" style="max-height:200px;">
        </div>
      </div>
    </section>
    <!-- Categorías rápidas -->
    <section class="container mb-5">
      <h2 class="text-center text-primary mb-4">Explorá por categorías</h2>
      <div class="row g-4 justify-content-center">
        <div class="col-6 col-md-4 col-lg-2">
          <button class="w-100 btn btn-light border shadow-sm py-4 d-flex flex-column align-items-center">
            <span style="font-size:2.5rem;">🚗</span>
            <span class="fw-bold mt-2">Vehículos</span>
          </button>
        </div>
        <div class="col-6 col-md-4 col-lg-2">
          <button class="w-100 btn btn-light border shadow-sm py-4 d-flex flex-column align-items-center">
            <span style="font-size:2.5rem;">🧚‍♀️</span>
            <span class="fw-bold mt-2">Muñecas</span>
          </button>
        </div>
        <div class="col-6 col-md-4 col-lg-2">
          <button class="w-100 btn btn-light border shadow-sm py-4 d-flex flex-column align-items-center">
            <span style="font-size:2.5rem;">🧩</span>
            <span class="fw-bold mt-2">Didácticos</span>
          </button>
        </div>
        <div class="col-6 col-md-4 col-lg-2">
          <button class="w-100 btn btn-light border shadow-sm py-4 d-flex flex-column align-items-center">
            <span style="font-size:2.5rem;">🎲</span>
            <span class="fw-bold mt-2">Juegos de mesa</span>
          </button>
        </div>
        <div class="col-6 col-md-4 col-lg-2">
          <button class="w-100 btn btn-light border shadow-sm py-4 d-flex flex-column align-items-center">
            <span style="font-size:2.5rem;">🏀</span>
            <span class="fw-bold mt-2">Aire libre</span>
          </button>
        </div>
        <div class="col-6 col-md-4 col-lg-2">
          <button class="w-100 btn btn-light border shadow-sm py-4 d-flex flex-column align-items-center">
            <span style="font-size:2.5rem;">🧸</span>
            <span class="fw-bold mt-2">Peluches</span>
          </button>
        </div>
      </div>
    </section>
    <!-- Productos destacados -->
    <section class="container mb-5" aria-label="Destacados">
      <h2 class="text-center text-danger mb-4">Productos destacados</h2>
      <div class="row g-4 justify-content-center">
        <div class="col-12 col-sm-6 col-lg-3" *ngFor="let producto of destacados">
          <div class="card h-100 shadow border-0">
            <img [src]="producto.imagen" class="card-img-top mx-auto d-block" [alt]="producto.nombre" style="object-fit:cover;max-height:180px;max-width:100%;">
            <div class="card-body d-flex flex-column justify-content-between">
              <h5 class="card-title text-info fw-bold">{{ producto.nombre }}</h5>
              <p class="card-text mb-1"><strong>Marca:</strong> <span class="text-secondary">{{ producto.marca }}</span></p>
              <p class="card-text fs-5 mb-2"><strong>Precio:</strong> <span class="text-success">&#36;{{ producto.precio }}</span></p>
              <button class="btn btn-warning fw-bold mt-auto"><i class="bi bi-cart-plus"></i> Agregar al carrito</button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Banner de campaña especial -->
    <section class="container mb-5">
      <div class="bg-info bg-gradient rounded-4 shadow p-4 d-flex flex-column flex-md-row align-items-center justify-content-between">
        <div class="flex-fill text-center text-md-start">
          <h3 class="fw-bold text-white mb-2">¡Día del Niño!</h3>
          <p class="text-white mb-3">Regalá alegría con juguetes seleccionados y envíos gratis a todo el país.</p>
          <a routerLink="/ofertas" class="btn btn-warning fw-bold">Ver ofertas</a>
        </div>
        <div class="d-none d-md-block flex-fill text-end">
          <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80" alt="Día del Niño" class="img-fluid rounded-4 shadow-lg" style="max-height:120px;">
        </div>
      </div>
    </section>
  `,
})
export class InicioComponent {
  destacados = [
    { nombre: 'Auto de Carrera', marca: 'Hot Wheels', precio: 1500, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80' },
    { nombre: 'Muñeca', marca: 'Barbie', precio: 1200, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
    { nombre: 'Bloques de Construcción', marca: 'Lego', precio: 1800, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80' },
    { nombre: 'Peluche', marca: 'Fisher-Price', precio: 950, imagen: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80' }
  ];
} 