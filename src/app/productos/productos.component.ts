import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-productos',
  template: `
    <h2 class="mb-4 text-primary fw-bold text-center">Productos</h2>
    <div class="mb-4 d-flex flex-wrap gap-2 justify-content-center align-items-center">
      <span class="fw-bold me-2">Filtrar por:</span>
      <button class="btn btn-outline-primary btn-sm">Todos</button>
      <button class="btn btn-outline-warning btn-sm">Vehículos</button>
      <button class="btn btn-outline-pink btn-sm" style="background:#f7a8b8; color:#fff;">Muñecas</button>
      <button class="btn btn-outline-info btn-sm">Didácticos</button>
      <button class="btn btn-outline-success btn-sm">Juegos de mesa</button>
      <button class="btn btn-outline-secondary btn-sm">Peluches</button>
      <button class="btn btn-outline-dark btn-sm">Marcas</button>
    </div>
    <div class="row g-4">
      <div class="col-12 col-sm-6 col-md-4 col-lg-3" *ngFor="let producto of productos; let i = index">
        <a [routerLink]="['/productos', i]" class="text-decoration-none text-reset">
          <div class="card h-100 shadow border-info border-2 product-card position-relative" style="transition: box-shadow 0.2s;">
            <span *ngIf="i === 0" class="badge bg-success position-absolute top-0 start-0 m-2">Nuevo</span>
            <span *ngIf="i === 1" class="badge bg-danger position-absolute top-0 end-0 m-2">Oferta</span>
            <img [src]="producto.imagen" class="card-img-top mx-auto d-block" [alt]="producto.nombre" style="object-fit:cover;max-height:180px;max-width:100%;">
            <div class="card-body d-flex flex-column justify-content-between">
              <h5 class="card-title text-info fw-bold">{{ producto.nombre }}</h5>
              <p class="card-text">{{ producto.descripcion }}</p>
              <p class="card-text"><strong>Marca:</strong> <span class="text-secondary">{{ producto.marca }}</span></p>
              <p class="card-text fs-5"><strong>Precio:</strong> <span class="text-success">&#36;{{ producto.precio }}</span></p>
            </div>
          </div>
        </a>
      </div>
    </div>
  `,
  styles: [`
    .product-card:hover {
      box-shadow: 0 0.5rem 1.5rem rgba(0,123,255,.25) !important;
      border-color: #0dcaf0 !important;
    }
    .btn-outline-pink {
      border-color: #f7a8b8;
      color: #f7a8b8;
    }
    .btn-outline-pink:hover, .btn-outline-pink.active {
      background: #f7a8b8;
      color: #fff;
    }
  `],
  imports: [CommonModule, RouterLink]
})
export class ProductosComponent {
  productos = [
    { nombre: 'Auto de Carrera', descripcion: 'Auto a control remoto.', marca: 'Hot Wheels', precio: 1500, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80' },
    { nombre: 'Muñeca', descripcion: 'Muñeca con accesorios.', marca: 'Barbie', precio: 1200, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
    { nombre: 'Bloques de Construcción', descripcion: 'Set de bloques para armar.', marca: 'Lego', precio: 1800, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80' },
    { nombre: 'Peluche', descripcion: 'Peluche suave y abrazable.', marca: 'Fisher-Price', precio: 950, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80' },
    { nombre: 'Juguete Educativo', descripcion: 'Juego didáctico para aprender jugando.', marca: 'Play-Doh', precio: 2100, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80' },
    { nombre: 'Rompecabezas', descripcion: 'Rompecabezas de 500 piezas.', marca: 'Ravensburger', precio: 1100, imagen: 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=400&q=80' },
    { nombre: 'Set de Dinosaurios', descripcion: 'Figuras de dinosaurios para jugar.', marca: 'Schleich', precio: 1300, imagen: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80' },
    { nombre: 'Camión de Bomberos', descripcion: 'Camión de bomberos con escalera móvil.', marca: 'Bruder', precio: 1600, imagen: 'https://images.unsplash.com/photo-1519121789249-bc1c1f1b1b8a?auto=format&fit=crop&w=400&q=80' },
    { nombre: 'Juego de Té', descripcion: 'Set de té para juegos de rol.', marca: 'Ecoiffier', precio: 900, imagen: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80' },
    { nombre: 'Tren Eléctrico', descripcion: 'Tren eléctrico con vías y accesorios.', marca: 'Playmobil', precio: 2500, imagen: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=80' },
    { nombre: 'Set de Herramientas', descripcion: 'Herramientas de juguete para pequeños constructores.', marca: 'Black+Decker', precio: 1050, imagen: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=400&q=80' },
    { nombre: 'Casa de Muñecas', descripcion: 'Casa de muñecas de madera con muebles.', marca: 'KidKraft', precio: 3200, imagen: 'https://images.unsplash.com/photo-1519121789249-bc1c1f1b1b8a?auto=format&fit=crop&w=400&q=80' },
    { nombre: 'Set de Animales', descripcion: 'Animales de granja y selva.', marca: 'Safari Ltd.', precio: 1150, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80' },
    { nombre: 'Helicóptero de Rescate', descripcion: 'Helicóptero con luces y sonidos.', marca: 'Dickie Toys', precio: 1700, imagen: 'https://images.unsplash.com/photo-1519121789249-bc1c1f1b1b8a?auto=format&fit=crop&w=400&q=80' },
    { nombre: 'Set de Cocina', descripcion: 'Cocina de juguete con accesorios.', marca: 'Little Tikes', precio: 2100, imagen: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80' },
    { nombre: 'Pista de Autos', descripcion: 'Pista de carreras para autos Hot Wheels.', marca: 'Hot Wheels', precio: 1950, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80' },
    { nombre: 'Set de Superhéroes', descripcion: 'Figuras de superhéroes Marvel y DC.', marca: 'Hasbro', precio: 1850, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
    { nombre: 'Bloques Magnéticos', descripcion: 'Bloques magnéticos para construir.', marca: 'Magformers', precio: 1750, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80' },
    { nombre: 'Set de Play-Doh', descripcion: 'Masa para modelar de colores.', marca: 'Play-Doh', precio: 950, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80' },
    { nombre: 'Nerf Lanzador', descripcion: 'Lanzador de dardos de espuma.', marca: 'Nerf', precio: 1600, imagen: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80' },
    { nombre: 'Puzzle 3D Torre Eiffel', descripcion: 'Rompecabezas 3D de la Torre Eiffel para armar.', marca: 'CubicFun', precio: 2200, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80' }
  ];
}