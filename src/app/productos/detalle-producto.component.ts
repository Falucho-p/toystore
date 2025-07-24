import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

const PRODUCTOS = [
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

@Component({
  selector: 'app-detalle-producto',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-12 col-md-8 col-lg-6">
          <div class="card shadow-lg border-0 mb-4">
            <img [src]="producto.imagen" class="card-img-top" [alt]="producto.nombre" style="object-fit:cover;max-height:320px;">
            <div class="card-body">
              <h2 class="card-title text-primary fw-bold mb-2">{{ producto.nombre }}</h2>
              <h5 class="mb-2 text-secondary">Marca: {{ producto.marca }}</h5>
              <p class="fs-4 text-success mb-3">Precio: &#36;{{ producto.precio }}</p>
              <p class="mb-4">{{ producto.descripcion }}</p>
              <button class="btn btn-warning btn-lg fw-bold w-100"><i class="bi bi-cart-plus"></i> Agregar al carrito</button>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-5">
        <h3 class="text-center text-primary mb-4">Productos relacionados</h3>
        <div class="row g-4 justify-content-center">
          <div class="col-12 col-sm-6 col-lg-3" *ngFor="let rel of relacionados">
            <a [routerLink]="['/productos', rel.index]" class="text-decoration-none text-reset">
              <div class="card h-100 shadow border-0">
                <img [src]="rel.imagen" class="card-img-top mx-auto d-block" [alt]="rel.nombre" style="object-fit:cover;max-height:140px;max-width:100%;">
                <div class="card-body">
                  <h5 class="card-title text-info fw-bold">{{ rel.nombre }}</h5>
                  <p class="card-text mb-1"><strong>Marca:</strong> <span class="text-secondary">{{ rel.marca }}</span></p>
                  <p class="card-text fs-6"><strong>Precio:</strong> <span class="text-success">&#36;{{ rel.precio }}</span></p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DetalleProductoComponent {
  producto = PRODUCTOS[0];
  relacionados: any[] = [];
  constructor(private route: ActivatedRoute) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(id) && PRODUCTOS[id]) {
      this.producto = PRODUCTOS[id];
      // Elegir 3 productos distintos al actual
      this.relacionados = PRODUCTOS.map((p, idx) => ({ ...p, index: idx }))
        .filter((_, idx) => idx !== id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
    }
  }
} 