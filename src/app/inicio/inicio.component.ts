import { Component, Input, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { SubcategoriaService, BusquedaService, CarritoService, Producto } from '../services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule],
  template: `
    
    <!-- Contenido principal (solo si no hay búsqueda ni subcategoría) -->
    <ng-container *ngIf="!subcategoriaSeleccionada && !busquedaActiva">
      <!-- Banner principal -->
      <section class="container-fluid p-0 mb-5 banner-animado" aria-label="Bienvenida">
        <div class="bg-warning bg-gradient d-flex flex-column flex-md-row align-items-center justify-content-between rounded-4 shadow p-4 p-md-5" style="min-height: 260px;">
          <div class="text-center text-md-start flex-fill">
            <h1 class="display-4 fw-bold text-danger mb-3">¡Bienvenidos a la diversión!</h1>
            <p class="lead text-dark mb-4">Descubrí los mejores juguetes para todas las edades. ¡Nuevos ingresos y ofertas cada semana!</p>
          </div>
          <div class="d-none d-md-block flex-fill text-end">
            <img src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=500&q=80" alt="Juguetes coloridos sobre una alfombra" class="img-fluid rounded-4 shadow-lg" style="max-height:200px;">
          </div>
        </div>
      </section>
      <!-- Anuncios promocionales - Carrusel -->
      <section class="container-fluid p-0 mb-5" aria-label="Anuncios promocionales">
        <div id="carouselPromociones" class="carousel slide" data-bs-ride="carousel" data-bs-interval="4000">
          <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselPromociones" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselPromociones" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselPromociones" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div class="carousel-inner">
            <!-- Slide 1: Descuentos -->
            <div class="carousel-item active">
              <div class="position-relative">
                <img src="https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=1200&q=80" class="d-block w-100" alt="Descuentos especiales" style="height: 400px; object-fit: cover;">
                <div class="carousel-caption d-none d-md-block" style="background: rgba(0,0,0,0.6); border-radius: 15px; padding: 20px;">
                  <h2 class="display-4 fw-bold text-warning mb-3">¡DESCUENTOS ESPECIALES!</h2>
                  <p class="fs-4 mb-3">Hasta 50% de descuento en juguetes seleccionados</p>
                  <div class="d-flex justify-content-center align-items-center mb-3">
                    <span class="display-1 fw-bold text-danger me-3">50%</span>
                    <span class="fs-2 text-warning">OFF</span>
                  </div>
                  <button class="btn btn-warning btn-lg fw-bold px-4 py-2" (click)="verOfertas()">Ver Ofertas</button>
                </div>
              </div>
            </div>
            
            <!-- Slide 2: Cuotas -->
            <div class="carousel-item">
              <div class="position-relative">
                <img src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80" class="d-block w-100" alt="Cuotas sin interés" style="height: 400px; object-fit: cover;">
                <div class="carousel-caption d-none d-md-block" style="background: rgba(0,0,0,0.6); border-radius: 15px; padding: 20px;">
                  <h2 class="display-4 fw-bold text-info mb-3">¡CUOTAS SIN INTERÉS!</h2>
                  <p class="fs-4 mb-3">Hasta 12 cuotas sin interés en todas las compras</p>
                  <div class="d-flex justify-content-center align-items-center mb-3">
                    <span class="display-1 fw-bold text-info me-3">12</span>
                    <span class="fs-2 text-light">CUOTAS</span>
                  </div>
                  <button class="btn btn-info btn-lg fw-bold px-4 py-2" (click)="comprarAhora()">Comprar Ahora</button>
                </div>
              </div>
            </div>
            
            <!-- Slide 3: Envío gratis -->
            <div class="carousel-item">
              <div class="position-relative">
                <img src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1200&q=80" class="d-block w-100" alt="Envío gratis" style="height: 400px; object-fit: cover;">
                <div class="carousel-caption d-none d-md-block" style="background: rgba(0,0,0,0.6); border-radius: 15px; padding: 20px;">
                  <h2 class="display-4 fw-bold text-success mb-3">¡ENVÍO GRATIS!</h2>
                  <p class="fs-4 mb-3">En compras superiores a $5000</p>
                  <div class="d-flex justify-content-center align-items-center mb-3">
                    <span class="display-1 fw-bold text-success me-3">FREE</span>
                    <span class="fs-2 text-light">SHIPPING</span>
                  </div>
                  <button class="btn btn-success btn-lg fw-bold px-4 py-2" (click)="descubrirPromociones()">Descubrir</button>
                </div>
              </div>
            </div>
          </div>
          
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselPromociones" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Anterior</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselPromociones" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Siguiente</span>
          </button>
        </div>
      </section>
      <!-- Productos destacados -->
      <section class="container mb-5 animate-fade-slide" aria-label="Productos destacados">
        <h2 class="text-center text-danger mb-4">Productos destacados</h2>
        <div class="row g-4 justify-content-center">
          <div class="col-12 col-sm-6 col-lg-3" *ngFor="let producto of destacados">
            <div class="card h-100 shadow border-0" tabindex="0" [attr.aria-label]="'Producto destacado: ' + producto.nombre + ' de la marca ' + producto.marca">
              <img [src]="producto.imagen" class="card-img-top mx-auto d-block" [alt]="'Juguete destacado: ' + producto.nombre + ' de la marca ' + producto.marca" style="object-fit:cover;max-height:180px;max-width:100%;">
              <div class="card-body d-flex flex-column justify-content-between">
                <h3 class="card-title text-info fw-bold fs-5">{{ producto.nombre }}</h3>
                <p class="card-text mb-1"><strong>Marca:</strong> <span class="text-secondary">{{ producto.marca }}</span></p>
                <p class="card-text fs-5 mb-2"><strong>Precio:</strong> <span class="text-success">&#36;{{ producto.precio }}</span></p>
                <button class="btn btn-warning fw-bold mt-auto" (click)="agregarAlCarrito(producto)">
                  <i class="bi bi-cart-plus"></i> Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ng-container>
    <ng-container *ngIf="subcategoriaSeleccionada">
      <section class="container mb-5 animate-fade-slide" aria-label="Productos filtrados">
        <button class="btn btn-secondary mb-4" (click)="volverAlInicio()">Volver al inicio</button>
        <h2 class="text-center text-primary mb-4">Juguetes de {{ subcategoriaSeleccionada }}</h2>
        <div class="row g-4 justify-content-center">
          <div class="col-12 col-sm-6 col-lg-3" *ngFor="let producto of productosFiltrados">
            <div class="card h-100 shadow border-0" tabindex="0" [attr.aria-label]="'Producto: ' + producto.nombre + ' de la marca ' + producto.marca">
              <img [src]="producto.imagen" class="card-img-top mx-auto d-block" [alt]="'Juguete: ' + producto.nombre + ' de la marca ' + producto.marca" style="object-fit:cover;max-height:180px;max-width:100%;">
              <div class="card-body d-flex flex-column justify-content-between">
                <h3 class="card-title text-info fw-bold fs-5">{{ producto.nombre }}</h3>
                <p class="card-text mb-1"><strong>Marca:</strong> <span class="text-secondary">{{ producto.marca }}</span></p>
                <p class="card-text fs-5 mb-2"><strong>Precio:</strong> <span class="text-success">&#36;{{ producto.precio }}</span></p>
                <button class="btn btn-warning fw-bold mt-auto" (click)="agregarAlCarritoFiltrado(producto)">
                  <i class="bi bi-cart-plus"></i> Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ng-container>

    <ng-container *ngIf="busquedaActiva">
      <section class="container mb-5 animate-fade-slide" aria-label="Resultados de búsqueda">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <button class="btn btn-secondary" (click)="volverAlInicio()">Volver al inicio</button>
          <h2 class="text-center text-primary mb-0">Resultados para "{{ terminoBusqueda }}"</h2>
          <span class="badge bg-info fs-6">{{ productosFiltrados.length }} productos</span>
        </div>
        <div class="row g-4 justify-content-center" *ngIf="productosFiltrados.length > 0">
          <div class="col-12 col-sm-6 col-lg-3" *ngFor="let producto of productosFiltrados">
            <div class="card h-100 shadow border-0" tabindex="0" [attr.aria-label]="'Producto: ' + producto.nombre + ' de la marca ' + producto.marca">
              <img [src]="producto.imagen" class="card-img-top mx-auto d-block" [alt]="'Juguete: ' + producto.nombre + ' de la marca ' + producto.marca" style="object-fit:cover;max-height:180px;max-width:100%;">
              <div class="card-body d-flex flex-column justify-content-between">
                <h3 class="card-title text-info fw-bold fs-5">{{ producto.nombre }}</h3>
                <p class="card-text mb-1"><strong>Marca:</strong> <span class="text-secondary">{{ producto.marca }}</span></p>
                <p class="card-text mb-1"><strong>Categoría:</strong> <span class="text-warning">{{ producto.categoria }}</span></p>
                <p class="card-text fs-5 mb-2"><strong>Precio:</strong> <span class="text-success">&#36;{{ producto.precio }}</span></p>
                <button class="btn btn-warning fw-bold mt-auto" (click)="agregarAlCarritoFiltrado(producto)">
                  <i class="bi bi-cart-plus"></i> Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center py-5" *ngIf="productosFiltrados.length === 0">
          <i class="bi bi-search display-1 text-muted"></i>
          <h3 class="text-muted mt-3">No se encontraron productos</h3>
          <p class="text-muted">Intenta con otros términos de búsqueda</p>
          <button class="btn btn-primary" (click)="volverAlInicio()">Volver al inicio</button>
        </div>
      </section>
    </ng-container>
  `,
})
export class InicioComponent implements OnInit, OnDestroy {
  destacados = [
    { nombre: 'Auto de Carrera', marca: 'Hot Wheels', precio: 1500, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80' },
    { nombre: 'Muñeca', marca: 'Barbie', precio: 1200, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
    { nombre: 'Bloques de Construcción', marca: 'Lego', precio: 1800, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80' },
    { nombre: 'Peluche', marca: 'Fisher-Price', precio: 950, imagen: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80' }
  ];
  subcategoriaSeleccionada: string | null = null;
  productosFiltrados: any[] = [];
  busquedaActiva: boolean = false;
  terminoBusqueda: string = '';
  private subscription: Subscription = new Subscription();

  // Productos de ejemplo para cada subcategoría (solo 2 por subcategoría para ejemplo, puedes ampliar a 6)
  productos = [
    // Aire libre
    // Juegos de patio
    { nombre: 'Tobogán Arcoíris', marca: 'Little Tikes', precio: 3500, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Juegos de patio' },
    { nombre: 'Columpio doble', marca: 'Step2', precio: 4200, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Juegos de patio' },
    { nombre: 'Casita de jardín', marca: 'Smoby', precio: 5200, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Juegos de patio' },
    { nombre: 'Resbaladilla compacta', marca: 'Plastimyr', precio: 2100, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Juegos de patio' },
    { nombre: 'Arenero infantil', marca: 'Fisher Price', precio: 1800, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Juegos de patio' },
    { nombre: 'Balancín de caballito', marca: 'Rondi', precio: 1600, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Juegos de patio' },
    // Piscinas
    { nombre: 'Piscina inflable grande', marca: 'Bestway', precio: 3900, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Piscinas' },
    { nombre: 'Piscina con toldo', marca: 'Intex', precio: 4200, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Piscinas' },
    { nombre: 'Piscina redonda', marca: 'Plastimar', precio: 3100, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Piscinas' },
    { nombre: 'Piscina con pelotas', marca: 'Bestway', precio: 3500, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Piscinas' },
    { nombre: 'Piscina rectangular', marca: 'Intex', precio: 3700, imagen: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=80', categoria: 'Piscinas' },
    { nombre: 'Piscina con aspersor', marca: 'Plastimyr', precio: 4100, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Piscinas' },
    // Deportes
    { nombre: 'Pelota de fútbol', marca: 'Penalty', precio: 1200, imagen: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=80', categoria: 'Deportes' },
    { nombre: 'Raqueta de tenis infantil', marca: 'Wilson', precio: 1800, imagen: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80', categoria: 'Deportes' },
    { nombre: 'Set de vóley', marca: 'Mikasa', precio: 2100, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Deportes' },
    { nombre: 'Arco de fútbol', marca: 'Rondi', precio: 2500, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Deportes' },
    { nombre: 'Set de golf', marca: 'Fisher Price', precio: 1700, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Deportes' },
    { nombre: 'Pelota de básquet', marca: 'Molten', precio: 1300, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Deportes' },
    // Artes
    // Pintura
    { nombre: 'Set de acuarelas', marca: 'Crayola', precio: 800, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Pintura' },
    { nombre: 'Pinceles artísticos', marca: 'Faber Castell', precio: 600, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Pintura' },
    { nombre: 'Atril infantil', marca: 'Maped', precio: 1200, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Pintura' },
    { nombre: 'Set de témperas', marca: 'Crayola', precio: 900, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Pintura' },
    { nombre: 'Paleta de pintor', marca: 'Faber Castell', precio: 500, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Pintura' },
    { nombre: 'Lienzo chico', marca: 'Maped', precio: 700, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Pintura' },
    // Dibujo
    { nombre: 'Set de lápices de colores', marca: 'Faber Castell', precio: 650, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Dibujo' },
    { nombre: 'Cuaderno de dibujo', marca: 'Rivadavia', precio: 400, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Dibujo' },
    { nombre: 'Set de marcadores', marca: 'Crayola', precio: 700, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Dibujo' },
    { nombre: 'Regla flexible', marca: 'Maped', precio: 200, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Dibujo' },
    { nombre: 'Compás escolar', marca: 'Faber Castell', precio: 350, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Dibujo' },
    { nombre: 'Set de crayones', marca: 'Crayola', precio: 500, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Dibujo' },
    // Manualidades
    { nombre: 'Kit de origami', marca: 'Djeco', precio: 900, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Manualidades' },
    { nombre: 'Set de cuentas', marca: 'Playbox', precio: 700, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Manualidades' },
    { nombre: 'Kit de pulseras', marca: 'Clementoni', precio: 800, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Manualidades' },
    { nombre: 'Set de plastilina', marca: 'Play-Doh', precio: 600, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Manualidades' },
    { nombre: 'Kit de sellos', marca: 'Djeco', precio: 750, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Manualidades' },
    { nombre: 'Set de tijeras seguras', marca: 'Maped', precio: 300, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Manualidades' },
    // Manualidades y libros
    // Libros
    { nombre: 'Cuentos clásicos', marca: 'Planeta', precio: 1200, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Libros' },
    { nombre: 'Libro de dinosaurios', marca: 'Atlántida', precio: 950, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Libros' },
    { nombre: 'Libro de aventuras', marca: 'Sudamericana', precio: 1100, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Libros' },
    { nombre: 'Libro para colorear', marca: 'Crayola', precio: 700, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Libros' },
    { nombre: 'Libro de animales', marca: 'Atlántida', precio: 900, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Libros' },
    { nombre: 'Libro de princesas', marca: 'Planeta', precio: 1000, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Libros' },
    // Origami
    { nombre: 'Papel de origami', marca: 'Djeco', precio: 400, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Origami' },
    { nombre: 'Kit de figuras', marca: 'Clementoni', precio: 800, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Origami' },
    { nombre: 'Set de animales', marca: 'Djeco', precio: 700, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Origami' },
    { nombre: 'Kit de flores', marca: 'Clementoni', precio: 900, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Origami' },
    { nombre: 'Set de colores', marca: 'Djeco', precio: 600, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Origami' },
    { nombre: 'Kit de origami avanzado', marca: 'Clementoni', precio: 1000, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Origami' },
    // Recortables
    { nombre: 'Set de recortables', marca: 'Maped', precio: 500, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Recortables' },
    { nombre: 'Kit de muñecos recortables', marca: 'Djeco', precio: 800, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Recortables' },
    { nombre: 'Set de ropa recortable', marca: 'Clementoni', precio: 700, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Recortables' },
    { nombre: 'Kit de animales recortables', marca: 'Djeco', precio: 900, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Recortables' },
    { nombre: 'Set de vehículos recortables', marca: 'Maped', precio: 600, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Recortables' },
    { nombre: 'Kit de recortables creativos', marca: 'Clementoni', precio: 1000, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Recortables' },
    // Disfraces y accesorios
    // Disfraces
    { nombre: 'Disfraz de princesa', marca: 'Disney', precio: 2500, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Disfraces' },
    { nombre: 'Disfraz de superhéroe', marca: 'Marvel', precio: 2200, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Disfraces' },
    { nombre: 'Disfraz de animal', marca: 'Fisher Price', precio: 1800, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Disfraces' },
    { nombre: 'Disfraz de doctor', marca: 'Smoby', precio: 1600, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Disfraces' },
    { nombre: 'Disfraz de policía', marca: 'Playmobil', precio: 1900, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Disfraces' },
    { nombre: 'Disfraz de astronauta', marca: 'Hasbro', precio: 2100, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Disfraces' },
    // Sombreros
    { nombre: 'Sombrero de mago', marca: 'Djeco', precio: 800, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Sombreros' },
    { nombre: 'Corona de princesa', marca: 'Disney', precio: 600, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Sombreros' },
    { nombre: 'Gorra de chef', marca: 'Smoby', precio: 500, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Sombreros' },
    { nombre: 'Casco de bombero', marca: 'Playmobil', precio: 700, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Sombreros' },
    { nombre: 'Sombrero de vaquero', marca: 'Hasbro', precio: 900, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Sombreros' },
    { nombre: 'Tiara de hada', marca: 'Djeco', precio: 550, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Sombreros' },
    // Máscaras
    { nombre: 'Máscara de león', marca: 'Fisher Price', precio: 400, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Máscaras' },
    { nombre: 'Máscara de superhéroe', marca: 'Marvel', precio: 350, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Máscaras' },
    { nombre: 'Máscara de animal', marca: 'Djeco', precio: 300, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Máscaras' },
    { nombre: 'Máscara de robot', marca: 'Hasbro', precio: 450, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Máscaras' },
    { nombre: 'Máscara de dinosaurio', marca: 'Fisher Price', precio: 380, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Máscaras' },
    { nombre: 'Máscara de princesa', marca: 'Disney', precio: 420, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Máscaras' },
    // Electrónica
    // Robótica
    { nombre: 'Robot programable', marca: 'Clementoni', precio: 4500, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Robótica' },
    { nombre: 'Kit de robot solar', marca: '4M', precio: 3200, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Robótica' },
    { nombre: 'Robot de control remoto', marca: 'Hasbro', precio: 3800, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Robótica' },
    { nombre: 'Kit de construcción robot', marca: 'Clementoni', precio: 4100, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Robótica' },
    { nombre: 'Robot interactivo', marca: 'Fisher Price', precio: 2900, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Robótica' },
    { nombre: 'Kit de robot educativo', marca: '4M', precio: 3600, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Robótica' },
    // Juguetes electrónicos
    { nombre: 'Tablet educativa', marca: 'LeapFrog', precio: 2800, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Juguetes electrónicos' },
    { nombre: 'Consola portátil', marca: 'Nintendo', precio: 5200, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Juguetes electrónicos' },
    { nombre: 'Piano electrónico', marca: 'Casio', precio: 3400, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Juguetes electrónicos' },
    { nombre: 'Microscopio digital', marca: 'Clementoni', precio: 3900, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Juguetes electrónicos' },
    { nombre: 'Telescopio infantil', marca: '4M', precio: 3100, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Juguetes electrónicos' },
    { nombre: 'Cámara de fotos', marca: 'Fisher Price', precio: 2600, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Juguetes electrónicos' },
    // Bebés y primera infancia
    // Sonajeros
    { nombre: 'Sonajero musical', marca: 'Fisher Price', precio: 800, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Sonajeros' },
    { nombre: 'Sonajero de colores', marca: 'VTech', precio: 600, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Sonajeros' },
    { nombre: 'Sonajero suave', marca: 'Lamaze', precio: 700, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Sonajeros' },
    { nombre: 'Sonajero de animales', marca: 'Fisher Price', precio: 750, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Sonajeros' },
    { nombre: 'Sonajero de estrella', marca: 'VTech', precio: 650, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Sonajeros' },
    { nombre: 'Sonajero de flores', marca: 'Lamaze', precio: 680, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Sonajeros' },
    // Juguetes blandos
    { nombre: 'Peluche suave', marca: 'Fisher Price', precio: 1200, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Juguetes blandos' },
    { nombre: 'Manta de actividades', marca: 'Lamaze', precio: 1500, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Juguetes blandos' },
    { nombre: 'Almohada musical', marca: 'VTech', precio: 1100, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Juguetes blandos' },
    { nombre: 'Cojín interactivo', marca: 'Fisher Price', precio: 1300, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Juguetes blandos' },
    { nombre: 'Manta suave', marca: 'Lamaze', precio: 1400, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Juguetes blandos' },
    { nombre: 'Peluche musical', marca: 'VTech', precio: 1600, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Juguetes blandos' },
    // Figuras de acción y muñecos
    // Superhéroes
    { nombre: 'Figura de Spider-Man', marca: 'Marvel', precio: 1800, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Superhéroes' },
    { nombre: 'Figura de Batman', marca: 'DC', precio: 1700, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Superhéroes' },
    { nombre: 'Figura de Iron Man', marca: 'Marvel', precio: 1900, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Superhéroes' },
    { nombre: 'Figura de Superman', marca: 'DC', precio: 1600, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Superhéroes' },
    { nombre: 'Figura de Wonder Woman', marca: 'DC', precio: 1750, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Superhéroes' },
    { nombre: 'Figura de Hulk', marca: 'Marvel', precio: 1850, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Superhéroes' },
    // Animales
    { nombre: 'Set de animales de granja', marca: 'Schleich', precio: 2200, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Animales' },
    { nombre: 'Set de dinosaurios', marca: 'Safari Ltd', precio: 2400, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Animales' },
    { nombre: 'Set de animales salvajes', marca: 'Schleich', precio: 2600, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Animales' },
    { nombre: 'Set de mascotas', marca: 'Safari Ltd', precio: 2000, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Animales' },
    { nombre: 'Set de animales marinos', marca: 'Schleich', precio: 2300, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Animales' },
    { nombre: 'Set de aves', marca: 'Safari Ltd', precio: 2100, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Animales' },
    // Muñecos
    { nombre: 'Muñeco de acción', marca: 'Hasbro', precio: 1500, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Muñecos' },
    { nombre: 'Figura de soldado', marca: 'Playmobil', precio: 1200, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Muñecos' },
    { nombre: 'Muñeco de policía', marca: 'Playmobil', precio: 1300, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Muñecos' },
    { nombre: 'Figura de bombero', marca: 'Playmobil', precio: 1400, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Muñecos' },
    { nombre: 'Muñeco de doctor', marca: 'Playmobil', precio: 1250, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Muñecos' },
    { nombre: 'Figura de astronauta', marca: 'Playmobil', precio: 1600, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Muñecos' },
    // Juegos de mesa y salón
    // Cartas
    { nombre: 'UNO', marca: 'Mattel', precio: 800, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Cartas' },
    { nombre: 'Juego de cartas', marca: 'Hasbro', precio: 600, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Cartas' },
    { nombre: 'Memory cards', marca: 'Ravensburger', precio: 700, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Cartas' },
    { nombre: 'Go Fish', marca: 'Hasbro', precio: 500, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Cartas' },
    { nombre: 'Snap', marca: 'Mattel', precio: 450, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Cartas' },
    { nombre: 'Old Maid', marca: 'Hasbro', precio: 550, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Cartas' },
    // Tableros
    { nombre: 'Monopoly Junior', marca: 'Hasbro', precio: 1800, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Tableros' },
    { nombre: 'Scrabble Junior', marca: 'Hasbro', precio: 1600, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Tableros' },
    { nombre: 'Candy Land', marca: 'Hasbro', precio: 1200, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Tableros' },
    { nombre: 'Chutes and Ladders', marca: 'Hasbro', precio: 1100, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Tableros' },
    { nombre: 'Connect Four', marca: 'Hasbro', precio: 1400, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Tableros' },
    { nombre: 'Battleship', marca: 'Hasbro', precio: 1500, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Tableros' },
    // Dados
    { nombre: 'Yahtzee Junior', marca: 'Hasbro', precio: 900, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Dados' },
    { nombre: 'Set de dados', marca: 'Hasbro', precio: 400, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Dados' },
    { nombre: 'Dados de colores', marca: 'Mattel', precio: 300, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Dados' },
    { nombre: 'Dados gigantes', marca: 'Hasbro', precio: 600, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Dados' },
    { nombre: 'Dados de animales', marca: 'Mattel', precio: 500, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Dados' },
    { nombre: 'Dados de números', marca: 'Hasbro', precio: 350, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Dados' },
    // Jugando a ser grande
    { nombre: 'Cocina de juguete', marca: 'Little Tikes', precio: 2800, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Cocinitas' },
    { nombre: 'Set de herramientas', marca: 'Black+Decker', precio: 2200, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Herramientas' },
    { nombre: 'Caja registradora', marca: 'Fisher Price', precio: 1500, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Oficio' },
    // Ladrillos y bloques
    { nombre: 'Set LEGO Classic', marca: 'LEGO', precio: 3200, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Lego' },
    { nombre: 'Mega Bloks', marca: 'Mega Bloks', precio: 1800, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Mega Bloks' },
    { nombre: 'Bloques de madera', marca: 'Melissa & Doug', precio: 1400, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Bloques madera' },
    // Muñecas, bebotes y ponys
    { nombre: 'Muñeca Barbie', marca: 'Barbie', precio: 2500, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Muñecas' },
    { nombre: 'Bebote interactivo', marca: 'Baby Alive', precio: 2800, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Bebotes' },
    { nombre: 'Pony de peluche', marca: 'Hasbro', precio: 1600, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Ponys' },
    // Para la escuela
    { nombre: 'Mochila escolar', marca: 'JanSport', precio: 1800, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Mochilas' },
    { nombre: 'Cartuchera', marca: 'Maped', precio: 800, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Cartucheras' },
    { nombre: 'Set de útiles', marca: 'Faber Castell', precio: 1200, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Útiles' },
    // Peluches
    { nombre: 'Peluche gigante', marca: 'Aurora', precio: 2200, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Gigantes' },
    { nombre: 'Peluche pequeño', marca: 'Aurora', precio: 800, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Pequeños' },
    { nombre: 'Peluche de unicornio', marca: 'Aurora', precio: 950, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Pequeños' },
    { nombre: 'Peluche de dinosaurio', marca: 'Aurora', precio: 850, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Pequeños' },
    { nombre: 'Peluche de perrito', marca: 'Aurora', precio: 780, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Pequeños' },
    { nombre: 'Peluche de gatito', marca: 'Aurora', precio: 820, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Pequeños' },
    { nombre: 'Peluche de osito', marca: 'Aurora', precio: 880, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Pequeños' },
    // Pistas y vehículos
    { nombre: 'Auto Hot Wheels', marca: 'Hot Wheels', precio: 1200, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Autos' },
    { nombre: 'Auto de carreras', marca: 'Hot Wheels', precio: 1100, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Autos' },
    { nombre: 'Auto deportivo', marca: 'Hot Wheels', precio: 1300, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Autos' },
    { nombre: 'Auto de policía', marca: 'Hot Wheels', precio: 1150, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Autos' },
    { nombre: 'Auto de bomberos', marca: 'Hot Wheels', precio: 1250, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Autos' },
    { nombre: 'Auto de ambulancia', marca: 'Hot Wheels', precio: 1180, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Autos' },
    { nombre: 'Tren eléctrico', marca: 'Lionel', precio: 3500, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Trenes' },
    { nombre: 'Tren de vapor', marca: 'Lionel', precio: 3800, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Trenes' },
    { nombre: 'Tren de pasajeros', marca: 'Lionel', precio: 3200, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Trenes' },
    { nombre: 'Tren de carga', marca: 'Lionel', precio: 3600, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Trenes' },
    { nombre: 'Tren de alta velocidad', marca: 'Lionel', precio: 4000, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Trenes' },
    { nombre: 'Tren de montaña', marca: 'Lionel', precio: 3700, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Trenes' },
    { nombre: 'Pista de carreras', marca: 'Hot Wheels', precio: 2800, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Pistas armables' },
    { nombre: 'Pista de loops', marca: 'Hot Wheels', precio: 2500, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Pistas armables' },
    { nombre: 'Pista de saltos', marca: 'Hot Wheels', precio: 2600, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Pistas armables' },
    { nombre: 'Pista de obstáculos', marca: 'Hot Wheels', precio: 2700, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Pistas armables' },
    { nombre: 'Pista de rampas', marca: 'Hot Wheels', precio: 2400, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Pistas armables' },
    { nombre: 'Pista de túneles', marca: 'Hot Wheels', precio: 2900, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Pistas armables' },
    // Pistolas, espadas y lanzadardos
    { nombre: 'Pistola Nerf', marca: 'Nerf', precio: 1600, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Pistolas' },
    { nombre: 'Pistola de dardos', marca: 'Nerf', precio: 1400, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Pistolas' },
    { nombre: 'Pistola automática', marca: 'Nerf', precio: 1800, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Pistolas' },
    { nombre: 'Pistola de agua', marca: 'Nerf', precio: 1200, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Pistolas' },
    { nombre: 'Pistola de espuma', marca: 'Nerf', precio: 1500, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Pistolas' },
    { nombre: 'Pistola de precisión', marca: 'Nerf', precio: 1700, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Pistolas' },
    { nombre: 'Espada de juguete', marca: 'Hasbro', precio: 900, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Espadas' },
    { nombre: 'Espada de luz', marca: 'Hasbro', precio: 1100, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Espadas' },
    { nombre: 'Espada de caballero', marca: 'Hasbro', precio: 850, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Espadas' },
    { nombre: 'Espada de pirata', marca: 'Hasbro', precio: 950, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Espadas' },
    { nombre: 'Espada de samurái', marca: 'Hasbro', precio: 1000, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Espadas' },
    { nombre: 'Espada de vikingo', marca: 'Hasbro', precio: 920, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Espadas' },
    { nombre: 'Lanzadardos', marca: 'Nerf', precio: 1200, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Lanzadardos' },
    { nombre: 'Lanzadardos automático', marca: 'Nerf', precio: 1400, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Lanzadardos' },
    { nombre: 'Lanzadardos de precisión', marca: 'Nerf', precio: 1300, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Lanzadardos' },
    { nombre: 'Lanzadardos de repetición', marca: 'Nerf', precio: 1500, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Lanzadardos' },
    { nombre: 'Lanzadardos compacto', marca: 'Nerf', precio: 1100, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Lanzadardos' },
    { nombre: 'Lanzadardos de doble cañón', marca: 'Nerf', precio: 1600, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Lanzadardos' },
    // Rodados
    { nombre: 'Bicicleta infantil', marca: 'Trek', precio: 4500, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Bicicletas' },
    { nombre: 'Bicicleta de montaña', marca: 'Trek', precio: 5200, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Bicicletas' },
    { nombre: 'Bicicleta de carreras', marca: 'Trek', precio: 4800, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Bicicletas' },
    { nombre: 'Bicicleta con rueditas', marca: 'Trek', precio: 4200, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Bicicletas' },
    { nombre: 'Bicicleta de BMX', marca: 'Trek', precio: 4600, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Bicicletas' },
    { nombre: 'Bicicleta plegable', marca: 'Trek', precio: 5000, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Bicicletas' },
    { nombre: 'Triciclo', marca: 'Radio Flyer', precio: 2800, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Triciclos' },
    { nombre: 'Triciclo deportivo', marca: 'Radio Flyer', precio: 3200, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Triciclos' },
    { nombre: 'Triciclo de paseo', marca: 'Radio Flyer', precio: 2600, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Triciclos' },
    { nombre: 'Triciclo con canasto', marca: 'Radio Flyer', precio: 3000, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Triciclos' },
    { nombre: 'Triciclo de carreras', marca: 'Radio Flyer', precio: 3400, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Triciclos' },
    { nombre: 'Triciclo todo terreno', marca: 'Radio Flyer', precio: 3600, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Triciclos' },
    { nombre: 'Monopatín', marca: 'Razor', precio: 3200, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Monopatines' },
    { nombre: 'Monopatín eléctrico', marca: 'Razor', precio: 4500, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Monopatines' },
    { nombre: 'Monopatín de trucos', marca: 'Razor', precio: 3800, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Monopatines' },
    { nombre: 'Monopatín de paseo', marca: 'Razor', precio: 2800, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Monopatines' },
    { nombre: 'Monopatín de carreras', marca: 'Razor', precio: 4200, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Monopatines' },
    { nombre: 'Monopatín de freestyle', marca: 'Razor', precio: 4000, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Monopatines' },
    // Bazar
    { nombre: 'Vajilla infantil', marca: 'Melissa & Doug', precio: 1800, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Vajilla infantil' },
    { nombre: 'Vajilla de plástico', marca: 'Melissa & Doug', precio: 1600, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Vajilla infantil' },
    { nombre: 'Vajilla de cerámica', marca: 'Melissa & Doug', precio: 2000, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Vajilla infantil' },
    { nombre: 'Vajilla de porcelana', marca: 'Melissa & Doug', precio: 2200, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Vajilla infantil' },
    { nombre: 'Vajilla de acero', marca: 'Melissa & Doug', precio: 1900, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Vajilla infantil' },
    { nombre: 'Vajilla de bambú', marca: 'Melissa & Doug', precio: 1700, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Vajilla infantil' },
    { nombre: 'Juguetes cocina', marca: 'Little Tikes', precio: 2200, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Juguetes cocina' },
    { nombre: 'Cocina de juguete', marca: 'Little Tikes', precio: 2800, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Juguetes cocina' },
    { nombre: 'Set de utensilios', marca: 'Little Tikes', precio: 1800, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Juguetes cocina' },
    { nombre: 'Horno de juguete', marca: 'Little Tikes', precio: 2400, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Juguetes cocina' },
    { nombre: 'Heladera de juguete', marca: 'Little Tikes', precio: 2600, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Juguetes cocina' },
    { nombre: 'Microondas de juguete', marca: 'Little Tikes', precio: 2000, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Juguetes cocina' },
    // Agregando más productos para completar 20 por subcategoría
    // Peluches Gigantes (necesita 19 más)
    { nombre: 'Peluche gigante de oso', marca: 'Aurora', precio: 2500, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Gigantes' },
    { nombre: 'Peluche gigante de elefante', marca: 'Aurora', precio: 2800, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Gigantes' },
    { nombre: 'Peluche gigante de jirafa', marca: 'Aurora', precio: 2600, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Gigantes' },
    { nombre: 'Peluche gigante de león', marca: 'Aurora', precio: 2700, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Gigantes' },
    { nombre: 'Peluche gigante de tigre', marca: 'Aurora', precio: 2900, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Gigantes' },
    { nombre: 'Peluche gigante de delfín', marca: 'Aurora', precio: 2400, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Gigantes' },
    { nombre: 'Peluche gigante de pingüino', marca: 'Aurora', precio: 2300, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Gigantes' },
    { nombre: 'Peluche gigante de koala', marca: 'Aurora', precio: 2600, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Gigantes' },
    { nombre: 'Peluche gigante de panda', marca: 'Aurora', precio: 2800, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Gigantes' },
    { nombre: 'Peluche gigante de conejo', marca: 'Aurora', precio: 2200, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Gigantes' },
    { nombre: 'Peluche gigante de gato', marca: 'Aurora', precio: 2400, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Gigantes' },
    { nombre: 'Peluche gigante de perro', marca: 'Aurora', precio: 2500, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Gigantes' },
    { nombre: 'Peluche gigante de caballo', marca: 'Aurora', precio: 2700, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Gigantes' },
    { nombre: 'Peluche gigante de vaca', marca: 'Aurora', precio: 2300, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Gigantes' },
    { nombre: 'Peluche gigante de oveja', marca: 'Aurora', precio: 2100, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Gigantes' },
    { nombre: 'Peluche gigante de cerdo', marca: 'Aurora', precio: 2200, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Gigantes' },
    { nombre: 'Peluche gigante de gallina', marca: 'Aurora', precio: 2000, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Gigantes' },
    { nombre: 'Peluche gigante de pato', marca: 'Aurora', precio: 2100, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Gigantes' },
    { nombre: 'Peluche gigante de rana', marca: 'Aurora', precio: 1900, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Gigantes' },
    { nombre: 'Peluche gigante de tortuga', marca: 'Aurora', precio: 2000, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Gigantes' },
    // Juegos de patio (necesita 14 más)
    { nombre: 'Tobogán de plástico', marca: 'Plastimyr', precio: 1800, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Juegos de patio' },
    { nombre: 'Tobogán de metal', marca: 'Plastimyr', precio: 2200, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Juegos de patio' },
    { nombre: 'Tobogán espiral', marca: 'Plastimyr', precio: 2500, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Juegos de patio' },
    { nombre: 'Tobogán doble', marca: 'Plastimyr', precio: 2800, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Juegos de patio' },
    { nombre: 'Tobogán con escalera', marca: 'Plastimyr', precio: 2400, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Juegos de patio' },
    { nombre: 'Tobogán de agua', marca: 'Plastimyr', precio: 1900, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Juegos de patio' },
    { nombre: 'Tobogán portátil', marca: 'Plastimyr', precio: 1600, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Juegos de patio' },
    { nombre: 'Tobogán de colores', marca: 'Plastimyr', precio: 2000, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Juegos de patio' },
    { nombre: 'Tobogán de animales', marca: 'Plastimyr', precio: 2100, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Juegos de patio' },
    { nombre: 'Tobogán de princesas', marca: 'Plastimyr', precio: 2300, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Juegos de patio' },
    { nombre: 'Tobogán de superhéroes', marca: 'Plastimyr', precio: 2200, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Juegos de patio' },
    { nombre: 'Tobogán de dinosaurios', marca: 'Plastimyr', precio: 2400, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Juegos de patio' },
    { nombre: 'Tobogán de carros', marca: 'Plastimyr', precio: 2100, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Juegos de patio' },
    { nombre: 'Tobogán de trenes', marca: 'Plastimyr', precio: 2300, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Juegos de patio' },
    { nombre: 'Tobogán de aviones', marca: 'Plastimyr', precio: 2200, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Juegos de patio' },
    // Piscinas (necesita 14 más)
    { nombre: 'Piscina inflable chica', marca: 'Bestway', precio: 2800, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Piscinas' },
    { nombre: 'Piscina inflable mediana', marca: 'Bestway', precio: 3200, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Piscinas' },
    { nombre: 'Piscina inflable extra grande', marca: 'Bestway', precio: 4500, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Piscinas' },
    { nombre: 'Piscina con filtro', marca: 'Intex', precio: 4800, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Piscinas' },
    { nombre: 'Piscina con bomba', marca: 'Intex', precio: 5200, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Piscinas' },
    { nombre: 'Piscina con escalera', marca: 'Plastimar', precio: 3800, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Piscinas' },
    { nombre: 'Piscina con asientos', marca: 'Plastimar', precio: 3600, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Piscinas' },
    { nombre: 'Piscina con sombrilla', marca: 'Bestway', precio: 4200, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Piscinas' },
    { nombre: 'Piscina con juguetes', marca: 'Bestway', precio: 3800, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Piscinas' },
    { nombre: 'Piscina con tobogán', marca: 'Intex', precio: 5500, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Piscinas' },
    { nombre: 'Piscina con cascada', marca: 'Intex', precio: 5800, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Piscinas' },
    { nombre: 'Piscina con luces', marca: 'Plastimar', precio: 4400, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Piscinas' },
    { nombre: 'Piscina con música', marca: 'Plastimar', precio: 4600, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Piscinas' },
    { nombre: 'Piscina con burbujas', marca: 'Bestway', precio: 5000, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Piscinas' },
    { nombre: 'Piscina con jacuzzi', marca: 'Intex', precio: 6200, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Piscinas' },
    // Deportes (necesita 14 más)
    { nombre: 'Pelota de vóley', marca: 'Mikasa', precio: 1400, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Deportes' },
    { nombre: 'Pelota de handball', marca: 'Mikasa', precio: 1200, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Deportes' },
    { nombre: 'Pelota de rugby', marca: 'Gilbert', precio: 1600, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Deportes' },
    { nombre: 'Pelota de tenis', marca: 'Wilson', precio: 800, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Deportes' },
    { nombre: 'Pelota de ping pong', marca: 'Butterfly', precio: 600, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Deportes' },
    { nombre: 'Raqueta de ping pong', marca: 'Butterfly', precio: 900, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Deportes' },
    { nombre: 'Mesa de ping pong', marca: 'Butterfly', precio: 3500, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Deportes' },
    { nombre: 'Red de vóley', marca: 'Mikasa', precio: 800, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Deportes' },
    { nombre: 'Red de tenis', marca: 'Wilson', precio: 1200, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Deportes' },
    { nombre: 'Portería de fútbol', marca: 'Penalty', precio: 1800, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Deportes' },
    { nombre: 'Aro de básquet', marca: 'Molten', precio: 1400, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Deportes' },
    { nombre: 'Tabla de básquet', marca: 'Molten', precio: 2000, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Deportes' },
    { nombre: 'Guantes de boxeo', marca: 'Everlast', precio: 1100, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Deportes' },
    { nombre: 'Saco de boxeo', marca: 'Everlast', precio: 2500, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Deportes' },
    { nombre: 'Casco de bici', marca: 'Bell', precio: 1500, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Deportes' },
    // Pintura (necesita 14 más)
    { nombre: 'Set de óleos', marca: 'Faber Castell', precio: 1200, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Pintura' },
    { nombre: 'Set de acrílicos', marca: 'Faber Castell', precio: 1100, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Pintura' },
    { nombre: 'Set de pasteles', marca: 'Faber Castell', precio: 1000, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Pintura' },
    { nombre: 'Set de marcadores', marca: 'Crayola', precio: 850, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Pintura' },
    { nombre: 'Set de rotuladores', marca: 'Crayola', precio: 900, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Pintura' },
    { nombre: 'Set de lápices pastel', marca: 'Faber Castell', precio: 950, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Pintura' },
    { nombre: 'Set de carboncillos', marca: 'Faber Castell', precio: 750, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Pintura' },
    { nombre: 'Set de tizas', marca: 'Crayola', precio: 650, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Pintura' },
    { nombre: 'Set de ceras', marca: 'Crayola', precio: 700, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Pintura' },
    { nombre: 'Set de témperas líquidas', marca: 'Crayola', precio: 950, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Pintura' },
    { nombre: 'Set de pinturas fluorescentes', marca: 'Crayola', precio: 1100, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Pintura' },
    { nombre: 'Set de pinturas metálicas', marca: 'Crayola', precio: 1200, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Pintura' },
    { nombre: 'Set de pinturas neón', marca: 'Crayola', precio: 1150, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Pintura' },
    { nombre: 'Set de pinturas brillantes', marca: 'Crayola', precio: 1050, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Pintura' },
    { nombre: 'Set de pinturas perladas', marca: 'Crayola', precio: 1250, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Pintura' },
    // Dibujo (necesita 14 más)
    { nombre: 'Set de lápices HB', marca: 'Faber Castell', precio: 400, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Dibujo' },
    { nombre: 'Set de lápices 2B', marca: 'Faber Castell', precio: 450, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Dibujo' },
    { nombre: 'Set de lápices 4B', marca: 'Faber Castell', precio: 500, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Dibujo' },
    { nombre: 'Set de lápices 6B', marca: 'Faber Castell', precio: 550, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Dibujo' },
    { nombre: 'Set de lápices 8B', marca: 'Faber Castell', precio: 600, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Dibujo' },
    { nombre: 'Set de lápices de grafito', marca: 'Faber Castell', precio: 650, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Dibujo' },
    { nombre: 'Set de lápices de carbón', marca: 'Faber Castell', precio: 700, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Dibujo' },
    { nombre: 'Set de lápices de cera', marca: 'Crayola', precio: 550, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Dibujo' },
    { nombre: 'Set de lápices de madera', marca: 'Faber Castell', precio: 600, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Dibujo' },
    { nombre: 'Set de lápices acuarelables', marca: 'Faber Castell', precio: 750, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Dibujo' },
    { nombre: 'Set de lápices de tinta', marca: 'Faber Castell', precio: 800, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Dibujo' },
    { nombre: 'Set de lápices de gel', marca: 'Faber Castell', precio: 850, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Dibujo' },
    { nombre: 'Set de lápices de aceite', marca: 'Faber Castell', precio: 900, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Dibujo' },
    { nombre: 'Set de lápices de tiza', marca: 'Faber Castell', precio: 450, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Dibujo' },
    { nombre: 'Set de lápices de yeso', marca: 'Faber Castell', precio: 500, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Dibujo' },
    // Completando 20 productos por subcategoría - Manualidades (necesita 14 más)
    { nombre: 'Kit de macramé', marca: 'Djeco', precio: 850, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Manualidades' },
    { nombre: 'Kit de bordado', marca: 'Djeco', precio: 900, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Manualidades' },
    { nombre: 'Kit de tejido', marca: 'Djeco', precio: 950, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Manualidades' },
    { nombre: 'Kit de punto cruz', marca: 'Djeco', precio: 800, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Manualidades' },
    { nombre: 'Kit de ganchillo', marca: 'Djeco', precio: 850, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Manualidades' },
    { nombre: 'Kit de mosaicos', marca: 'Clementoni', precio: 1000, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Manualidades' },
    { nombre: 'Kit de vitrales', marca: 'Clementoni', precio: 1200, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Manualidades' },
    { nombre: 'Kit de cerámica', marca: 'Clementoni', precio: 1100, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Manualidades' },
    { nombre: 'Kit de escultura', marca: 'Clementoni', precio: 1300, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Manualidades' },
    { nombre: 'Kit de pintura en tela', marca: 'Clementoni', precio: 950, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Manualidades' },
    { nombre: 'Kit de pintura en madera', marca: 'Clementoni', precio: 1000, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Manualidades' },
    { nombre: 'Kit de pintura en vidrio', marca: 'Clementoni', precio: 1050, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Manualidades' },
    { nombre: 'Kit de pintura en piedra', marca: 'Clementoni', precio: 900, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Manualidades' },
    { nombre: 'Kit de pintura en porcelana', marca: 'Clementoni', precio: 1150, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Manualidades' },
    // Libros (necesita 14 más)
    { nombre: 'Libro de cuentos', marca: 'Planeta', precio: 850, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Libros' },
    { nombre: 'Libro de fábulas', marca: 'Atlántida', precio: 800, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Libros' },
    { nombre: 'Libro de rimas', marca: 'Sudamericana', precio: 750, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Libros' },
    { nombre: 'Libro de poesía', marca: 'Planeta', precio: 900, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Libros' },
    { nombre: 'Libro de ciencia', marca: 'Atlántida', precio: 1100, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Libros' },
    { nombre: 'Libro de historia', marca: 'Sudamericana', precio: 1000, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Libros' },
    { nombre: 'Libro de geografía', marca: 'Planeta', precio: 950, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Libros' },
    { nombre: 'Libro de matemáticas', marca: 'Atlántida', precio: 1050, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Libros' },
    { nombre: 'Libro de inglés', marca: 'Sudamericana', precio: 1200, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Libros' },
    { nombre: 'Libro de español', marca: 'Planeta', precio: 1150, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Libros' },
    { nombre: 'Libro de arte', marca: 'Atlántida', precio: 1300, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Libros' },
    { nombre: 'Libro de música', marca: 'Sudamericana', precio: 1250, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Libros' },
    { nombre: 'Libro de cocina', marca: 'Planeta', precio: 1400, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Libros' },
    { nombre: 'Libro de manualidades', marca: 'Atlántida', precio: 1350, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Libros' },
    { nombre: 'Libro de experimentos', marca: 'Sudamericana', precio: 1450, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Libros' },
    // Origami (necesita 14 más)
    { nombre: 'Papel de origami brillante', marca: 'Djeco', precio: 450, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Origami' },
    { nombre: 'Papel de origami metálico', marca: 'Djeco', precio: 500, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Origami' },
    { nombre: 'Papel de origami neón', marca: 'Djeco', precio: 480, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Origami' },
    { nombre: 'Papel de origami perlado', marca: 'Djeco', precio: 520, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Origami' },
    { nombre: 'Papel de origami fluorescente', marca: 'Djeco', precio: 470, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Origami' },
    { nombre: 'Kit de origami básico', marca: 'Clementoni', precio: 750, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Origami' },
    { nombre: 'Kit de origami intermedio', marca: 'Clementoni', precio: 850, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Origami' },
    { nombre: 'Kit de origami experto', marca: 'Clementoni', precio: 1100, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Origami' },
    { nombre: 'Kit de origami modular', marca: 'Clementoni', precio: 1200, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Origami' },
    { nombre: 'Kit de origami 3D', marca: 'Clementoni', precio: 1300, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Origami' },
    { nombre: 'Kit de origami geométrico', marca: 'Clementoni', precio: 950, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Origami' },
    { nombre: 'Kit de origami de fantasía', marca: 'Clementoni', precio: 1050, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Origami' },
    { nombre: 'Kit de origami de acción', marca: 'Clementoni', precio: 1150, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Origami' },
    { nombre: 'Kit de origami de decoración', marca: 'Clementoni', precio: 1250, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Origami' },
    { nombre: 'Kit de origami de regalo', marca: 'Clementoni', precio: 1350, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Origami' },
    // Recortables (necesita 14 más)
    { nombre: 'Set de recortables básico', marca: 'Maped', precio: 600, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Recortables' },
    { nombre: 'Set de recortables avanzado', marca: 'Maped', precio: 800, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Recortables' },
    { nombre: 'Set de recortables experto', marca: 'Maped', precio: 1000, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Recortables' },
    { nombre: 'Set de recortables 3D', marca: 'Maped', precio: 1200, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Recortables' },
    { nombre: 'Set de recortables móviles', marca: 'Maped', precio: 1100, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Recortables' },
    { nombre: 'Set de recortables articulados', marca: 'Maped', precio: 1300, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Recortables' },
    { nombre: 'Set de recortables de cartón', marca: 'Maped', precio: 700, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Recortables' },
    { nombre: 'Set de recortables de papel', marca: 'Maped', precio: 550, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Recortables' },
    { nombre: 'Set de recortables de fieltro', marca: 'Maped', precio: 900, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Recortables' },
    { nombre: 'Set de recortables de tela', marca: 'Maped', precio: 950, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Recortables' },
    { nombre: 'Set de recortables de madera', marca: 'Maped', precio: 1400, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Recortables' },
    { nombre: 'Set de recortables de plástico', marca: 'Maped', precio: 850, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Recortables' },
    { nombre: 'Set de recortables de espuma', marca: 'Maped', precio: 750, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Recortables' },
    { nombre: 'Set de recortables de goma eva', marca: 'Maped', precio: 800, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Recortables' },
    { nombre: 'Set de recortables de corcho', marca: 'Maped', precio: 650, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Recortables' },
    // LEGO (necesita 19 más)
    { nombre: 'Set LEGO City', marca: 'LEGO', precio: 2800, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Lego' },
    { nombre: 'Set LEGO Friends', marca: 'LEGO', precio: 2600, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Lego' },
    { nombre: 'Set LEGO Star Wars', marca: 'LEGO', precio: 3500, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Lego' },
    { nombre: 'Set LEGO Marvel', marca: 'LEGO', precio: 3200, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Lego' },
    { nombre: 'Set LEGO Batman', marca: 'LEGO', precio: 3000, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Lego' },
    { nombre: 'Set LEGO Ninjago', marca: 'LEGO', precio: 2900, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Lego' },
    { nombre: 'Set LEGO Minecraft', marca: 'LEGO', precio: 3100, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Lego' },
    { nombre: 'Set LEGO Harry Potter', marca: 'LEGO', precio: 3400, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Lego' },
    { nombre: 'Set LEGO Jurassic World', marca: 'LEGO', precio: 3300, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Lego' },
    { nombre: 'Set LEGO Disney', marca: 'LEGO', precio: 3600, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Lego' },
    { nombre: 'Set LEGO Technic', marca: 'LEGO', precio: 4000, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Lego' },
    { nombre: 'Set LEGO Architecture', marca: 'LEGO', precio: 3800, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Lego' },
    { nombre: 'Set LEGO Creator', marca: 'LEGO', precio: 2700, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Lego' },
    { nombre: 'Set LEGO Speed Champions', marca: 'LEGO', precio: 2500, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Lego' },
    { nombre: 'Set LEGO Ideas', marca: 'LEGO', precio: 4200, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Lego' },
    { nombre: 'Set LEGO Super Heroes', marca: 'LEGO', precio: 3100, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Lego' },
    { nombre: 'Set LEGO Pirates', marca: 'LEGO', precio: 2800, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Lego' },
    { nombre: 'Set LEGO Space', marca: 'LEGO', precio: 3000, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Lego' },
    { nombre: 'Set LEGO Castle', marca: 'LEGO', precio: 2900, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Lego' },
    { nombre: 'Set LEGO Western', marca: 'LEGO', precio: 2700, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Lego' },
    { nombre: 'Set LEGO Adventure', marca: 'LEGO', precio: 2600, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Lego' },
    // Mega Bloks (necesita 19 más)
    { nombre: 'Set Mega Bloks First Builders', marca: 'Mega Bloks', precio: 1500, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Mega Bloks' },
    { nombre: 'Set Mega Bloks Barbie', marca: 'Mega Bloks', precio: 1600, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Mega Bloks' },
    { nombre: 'Set Mega Bloks Hot Wheels', marca: 'Mega Bloks', precio: 1700, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Mega Bloks' },
    { nombre: 'Set Mega Bloks Halo', marca: 'Mega Bloks', precio: 2000, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Mega Bloks' },
    { nombre: 'Set Mega Bloks Call of Duty', marca: 'Mega Bloks', precio: 2200, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Mega Bloks' },
    { nombre: 'Set Mega Bloks Skylanders', marca: 'Mega Bloks', precio: 1900, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Mega Bloks' },
    { nombre: 'Set Mega Bloks SpongeBob', marca: 'Mega Bloks', precio: 1800, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Mega Bloks' },
    { nombre: 'Set Mega Bloks Teenage Mutant Ninja Turtles', marca: 'Mega Bloks', precio: 2100, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Mega Bloks' },
    { nombre: 'Set Mega Bloks Power Rangers', marca: 'Mega Bloks', precio: 2000, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Mega Bloks' },
    { nombre: 'Set Mega Bloks Hello Kitty', marca: 'Mega Bloks', precio: 1700, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Mega Bloks' },
    { nombre: 'Set Mega Bloks Thomas & Friends', marca: 'Mega Bloks', precio: 1600, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Mega Bloks' },
    { nombre: 'Set Mega Bloks Blok Squad', marca: 'Mega Bloks', precio: 1400, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Mega Bloks' },
    { nombre: 'Set Mega Bloks Pro Builder', marca: 'Mega Bloks', precio: 2300, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Mega Bloks' },
    { nombre: 'Set Mega Bloks Dragons', marca: 'Mega Bloks', precio: 2400, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Mega Bloks' },
    { nombre: 'Set Mega Bloks Pirates', marca: 'Mega Bloks', precio: 1900, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Mega Bloks' },
    { nombre: 'Set Mega Bloks Knights', marca: 'Mega Bloks', precio: 2000, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Mega Bloks' },
    { nombre: 'Set Mega Bloks Space', marca: 'Mega Bloks', precio: 2100, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Mega Bloks' },
    { nombre: 'Set Mega Bloks City', marca: 'Mega Bloks', precio: 1800, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Mega Bloks' },
    { nombre: 'Set Mega Bloks Farm', marca: 'Mega Bloks', precio: 1600, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Mega Bloks' },
    { nombre: 'Set Mega Bloks Zoo', marca: 'Mega Bloks', precio: 1700, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Mega Bloks' },
    { nombre: 'Set Mega Bloks Ocean', marca: 'Mega Bloks', precio: 1800, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Mega Bloks' },
    // Completando 20 productos por subcategoría - Disfraces (necesita 14 más)
    { nombre: 'Disfraz de hada', marca: 'Disney', precio: 2300, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Disfraces' },
    { nombre: 'Disfraz de bruja', marca: 'Disney', precio: 2000, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Disfraces' },
    { nombre: 'Disfraz de mago', marca: 'Disney', precio: 2100, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Disfraces' },
    { nombre: 'Disfraz de vaquero', marca: 'Hasbro', precio: 2200, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Disfraces' },
    { nombre: 'Disfraz de indio', marca: 'Hasbro', precio: 2000, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Disfraces' },
    { nombre: 'Disfraz de pirata', marca: 'Hasbro', precio: 2300, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Disfraces' },
    { nombre: 'Disfraz de caballero', marca: 'Hasbro', precio: 2400, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Disfraces' },
    { nombre: 'Disfraz de reina', marca: 'Disney', precio: 2500, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Disfraces' },
    { nombre: 'Disfraz de rey', marca: 'Disney', precio: 2400, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Disfraces' },
    { nombre: 'Disfraz de soldado', marca: 'Hasbro', precio: 2200, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Disfraces' },
    { nombre: 'Disfraz de marinero', marca: 'Hasbro', precio: 2100, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Disfraces' },
    { nombre: 'Disfraz de bailarina', marca: 'Disney', precio: 2600, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Disfraces' },
    { nombre: 'Disfraz de payaso', marca: 'Hasbro', precio: 1900, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Disfraces' },
    { nombre: 'Disfraz de robot', marca: 'Hasbro', precio: 2700, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Disfraces' },
    { nombre: 'Disfraz de dinosaurio', marca: 'Hasbro', precio: 2500, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Disfraces' },
    { nombre: 'Disfraz de dragón', marca: 'Hasbro', precio: 2800, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Disfraces' },
    { nombre: 'Disfraz de unicornio', marca: 'Disney', precio: 2900, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Disfraces' },
    { nombre: 'Disfraz de sirena', marca: 'Disney', precio: 2600, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Disfraces' },
    { nombre: 'Disfraz de ángel', marca: 'Disney', precio: 2400, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Disfraces' },
    { nombre: 'Disfraz de demonio', marca: 'Hasbro', precio: 2300, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Disfraces' },
    // Sombreros (necesita 14 más)
    { nombre: 'Sombrero de pirata', marca: 'Hasbro', precio: 800, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Sombreros' },
    { nombre: 'Sombrero de vaquero', marca: 'Hasbro', precio: 900, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Sombreros' },
    { nombre: 'Sombrero de policía', marca: 'Playmobil', precio: 700, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Sombreros' },
    { nombre: 'Sombrero de soldado', marca: 'Playmobil', precio: 750, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Sombreros' },
    { nombre: 'Sombrero de marinero', marca: 'Hasbro', precio: 650, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Sombreros' },
    { nombre: 'Sombrero de hada', marca: 'Djeco', precio: 600, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Sombreros' },
    { nombre: 'Sombrero de bruja', marca: 'Djeco', precio: 650, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Sombreros' },
    { nombre: 'Sombrero de mago', marca: 'Djeco', precio: 700, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Sombreros' },
    { nombre: 'Sombrero de reina', marca: 'Disney', precio: 800, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Sombreros' },
    { nombre: 'Sombrero de rey', marca: 'Disney', precio: 750, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Sombreros' },
    { nombre: 'Sombrero de payaso', marca: 'Hasbro', precio: 500, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Sombreros' },
    { nombre: 'Sombrero de robot', marca: 'Hasbro', precio: 850, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Sombreros' },
    { nombre: 'Sombrero de dinosaurio', marca: 'Hasbro', precio: 700, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Sombreros' },
    { nombre: 'Sombrero de dragón', marca: 'Hasbro', precio: 900, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Sombreros' },
    { nombre: 'Sombrero de unicornio', marca: 'Disney', precio: 950, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Sombreros' },
    { nombre: 'Sombrero de sirena', marca: 'Disney', precio: 850, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Sombreros' },
    { nombre: 'Sombrero de ángel', marca: 'Disney', precio: 750, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Sombreros' },
    { nombre: 'Sombrero de demonio', marca: 'Hasbro', precio: 700, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Sombreros' },
    // Máscaras (necesita 14 más)
    { nombre: 'Máscara de hada', marca: 'Disney', precio: 450, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Máscaras' },
    { nombre: 'Máscara de bruja', marca: 'Disney', precio: 400, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Máscaras' },
    { nombre: 'Máscara de mago', marca: 'Disney', precio: 420, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Máscaras' },
    { nombre: 'Máscara de vaquero', marca: 'Hasbro', precio: 380, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Máscaras' },
    { nombre: 'Máscara de indio', marca: 'Hasbro', precio: 350, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Máscaras' },
    { nombre: 'Máscara de pirata', marca: 'Hasbro', precio: 400, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Máscaras' },
    { nombre: 'Máscara de caballero', marca: 'Hasbro', precio: 480, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Máscaras' },
    { nombre: 'Máscara de reina', marca: 'Disney', precio: 500, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Máscaras' },
    { nombre: 'Máscara de rey', marca: 'Disney', precio: 480, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Máscaras' },
    { nombre: 'Máscara de soldado', marca: 'Hasbro', precio: 420, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Máscaras' },
    { nombre: 'Máscara de marinero', marca: 'Hasbro', precio: 380, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Máscaras' },
    { nombre: 'Máscara de bailarina', marca: 'Disney', precio: 520, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Máscaras' },
    { nombre: 'Máscara de payaso', marca: 'Hasbro', precio: 350, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Máscaras' },
    { nombre: 'Máscara de dragón', marca: 'Hasbro', precio: 550, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Máscaras' },
    { nombre: 'Máscara de unicornio', marca: 'Disney', precio: 580, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Máscaras' },
    { nombre: 'Máscara de sirena', marca: 'Disney', precio: 520, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Máscaras' },
    { nombre: 'Máscara de ángel', marca: 'Disney', precio: 480, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Máscaras' },
    { nombre: 'Máscara de demonio', marca: 'Hasbro', precio: 450, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Máscaras' },
    // Robótica (necesita 14 más)
    { nombre: 'Robot de limpieza', marca: 'Clementoni', precio: 3800, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Robótica' },
    { nombre: 'Robot de cocina', marca: 'Clementoni', precio: 4200, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Robótica' },
    { nombre: 'Robot de seguridad', marca: 'Clementoni', precio: 4600, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Robótica' },
    { nombre: 'Robot de exploración', marca: 'Clementoni', precio: 4400, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Robótica' },
    { nombre: 'Robot de rescate', marca: 'Clementoni', precio: 4800, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Robótica' },
    { nombre: 'Robot de construcción', marca: 'Clementoni', precio: 5000, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Robótica' },
    { nombre: 'Robot de transporte', marca: 'Clementoni', precio: 4200, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Robótica' },
    { nombre: 'Robot de comunicación', marca: 'Clementoni', precio: 4000, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Robótica' },
    { nombre: 'Robot de entretenimiento', marca: 'Clementoni', precio: 3600, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Robótica' },
    { nombre: 'Robot de asistencia', marca: 'Clementoni', precio: 4400, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Robótica' },
    { nombre: 'Robot de vigilancia', marca: 'Clementoni', precio: 4600, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Robótica' },
    { nombre: 'Robot de investigación', marca: 'Clementoni', precio: 4800, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Robótica' },
    { nombre: 'Robot de navegación', marca: 'Clementoni', precio: 4200, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Robótica' },
    { nombre: 'Robot de manipulación', marca: 'Clementoni', precio: 5000, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Robótica' },
    { nombre: 'Robot de detección', marca: 'Clementoni', precio: 4400, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Robótica' },
    { nombre: 'Robot de clasificación', marca: 'Clementoni', precio: 4600, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Robótica' },
    { nombre: 'Robot de ensamblaje', marca: 'Clementoni', precio: 5200, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Robótica' },
    { nombre: 'Robot de inspección', marca: 'Clementoni', precio: 4800, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Robótica' },
    { nombre: 'Robot de mantenimiento', marca: 'Clementoni', precio: 5000, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Robótica' },
    { nombre: 'Robot de reparación', marca: 'Clementoni', precio: 5200, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Robótica' },
    // Juguetes electrónicos (necesita 14 más)
    { nombre: 'Drone infantil', marca: 'LeapFrog', precio: 3200, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Juguetes electrónicos' },
    { nombre: 'Cámara de video', marca: 'Fisher Price', precio: 2800, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Juguetes electrónicos' },
    { nombre: 'Grabadora de voz', marca: 'Fisher Price', precio: 2400, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Juguetes electrónicos' },
    { nombre: 'Proyector de películas', marca: 'Fisher Price', precio: 3600, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Juguetes electrónicos' },
    { nombre: 'Karaoke portátil', marca: 'Fisher Price', precio: 3000, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Juguetes electrónicos' },
    { nombre: 'Guitarra eléctrica', marca: 'Casio', precio: 3800, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Juguetes electrónicos' },
    { nombre: 'Batería electrónica', marca: 'Casio', precio: 4200, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Juguetes electrónicos' },
    { nombre: 'Teclado musical', marca: 'Casio', precio: 3200, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Juguetes electrónicos' },
    { nombre: 'Micrófono inalámbrico', marca: 'Casio', precio: 1800, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Juguetes electrónicos' },
    { nombre: 'Altavoz bluetooth', marca: 'Fisher Price', precio: 2200, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Juguetes electrónicos' },
    { nombre: 'Auriculares inalámbricos', marca: 'Fisher Price', precio: 1600, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Juguetes electrónicos' },
    { nombre: 'Reloj inteligente', marca: 'Fisher Price', precio: 2800, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Juguetes electrónicos' },
    { nombre: 'Pulsera de actividad', marca: 'Fisher Price', precio: 2000, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Juguetes electrónicos' },
    { nombre: 'Contador de pasos', marca: 'Fisher Price', precio: 1200, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Juguetes electrónicos' },
    { nombre: 'Calculadora científica', marca: 'Casio', precio: 1400, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Juguetes electrónicos' },
    { nombre: 'Traductor electrónico', marca: 'Fisher Price', precio: 3400, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Juguetes electrónicos' },
    { nombre: 'Diccionario electrónico', marca: 'Fisher Price', precio: 2600, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Juguetes electrónicos' },
    { nombre: 'Organizador personal', marca: 'Fisher Price', precio: 2400, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Juguetes electrónicos' },
    { nombre: 'Agenda electrónica', marca: 'Fisher Price', precio: 2200, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Juguetes electrónicos' },
    // Sonajeros (necesita 14 más)
    { nombre: 'Sonajero de estrella', marca: 'Fisher Price', precio: 350, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Sonajeros' },
    { nombre: 'Sonajero de luna', marca: 'Fisher Price', precio: 320, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Sonajeros' },
    { nombre: 'Sonajero de sol', marca: 'Fisher Price', precio: 330, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Sonajeros' },
    { nombre: 'Sonajero de corazón', marca: 'Fisher Price', precio: 340, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Sonajeros' },
    { nombre: 'Sonajero de flor', marca: 'Fisher Price', precio: 310, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Sonajeros' },
    { nombre: 'Sonajero de mariposa', marca: 'Fisher Price', precio: 360, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Sonajeros' },
    { nombre: 'Sonajero de pez', marca: 'Fisher Price', precio: 325, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Sonajeros' },
    { nombre: 'Sonajero de pájaro', marca: 'Fisher Price', precio: 335, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Sonajeros' },
    { nombre: 'Sonajero de gato', marca: 'Fisher Price', precio: 345, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Sonajeros' },
    { nombre: 'Sonajero de perro', marca: 'Fisher Price', precio: 350, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Sonajeros' },
    { nombre: 'Sonajero de elefante', marca: 'Fisher Price', precio: 355, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Sonajeros' },
    { nombre: 'Sonajero de león', marca: 'Fisher Price', precio: 365, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Sonajeros' },
    { nombre: 'Sonajero de tigre', marca: 'Fisher Price', precio: 370, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Sonajeros' },
    { nombre: 'Sonajero de oso', marca: 'Fisher Price', precio: 375, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Sonajeros' },
    { nombre: 'Sonajero de conejo', marca: 'Fisher Price', precio: 380, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Sonajeros' },
    { nombre: 'Sonajero de zorro', marca: 'Fisher Price', precio: 385, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Sonajeros' },
    { nombre: 'Sonajero de lobo', marca: 'Fisher Price', precio: 390, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Sonajeros' },
    { nombre: 'Sonajero de jirafa', marca: 'Fisher Price', precio: 395, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Sonajeros' },
    { nombre: 'Sonajero de cebra', marca: 'Fisher Price', precio: 400, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Sonajeros' },
    // Juguetes blandos (necesita 14 más)
    { nombre: 'Peluche de estrella', marca: 'Gund', precio: 1200, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Juguetes blandos' },
    { nombre: 'Peluche de luna', marca: 'Gund', precio: 1100, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Juguetes blandos' },
    { nombre: 'Peluche de sol', marca: 'Gund', precio: 1150, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Juguetes blandos' },
    { nombre: 'Peluche de corazón', marca: 'Gund', precio: 1000, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Juguetes blandos' },
    { nombre: 'Peluche de flor', marca: 'Gund', precio: 1050, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Juguetes blandos' },
    { nombre: 'Peluche de mariposa', marca: 'Gund', precio: 1250, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Juguetes blandos' },
    { nombre: 'Peluche de pez', marca: 'Gund', precio: 1080, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Juguetes blandos' },
    { nombre: 'Peluche de pájaro', marca: 'Gund', precio: 1120, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Juguetes blandos' },
    { nombre: 'Peluche de gato', marca: 'Gund', precio: 1180, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Juguetes blandos' },
    { nombre: 'Peluche de perro', marca: 'Gund', precio: 1220, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Juguetes blandos' },
    { nombre: 'Peluche de elefante', marca: 'Gund', precio: 1280, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Juguetes blandos' },
    { nombre: 'Peluche de león', marca: 'Gund', precio: 1350, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Juguetes blandos' },
    { nombre: 'Peluche de tigre', marca: 'Gund', precio: 1380, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Juguetes blandos' },
    { nombre: 'Peluche de oso', marca: 'Gund', precio: 1420, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Juguetes blandos' },
    { nombre: 'Peluche de conejo', marca: 'Gund', precio: 1450, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Juguetes blandos' },
    { nombre: 'Peluche de zorro', marca: 'Gund', precio: 1480, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Juguetes blandos' },
    { nombre: 'Peluche de lobo', marca: 'Gund', precio: 1520, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Juguetes blandos' },
    { nombre: 'Peluche de jirafa', marca: 'Gund', precio: 1580, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Juguetes blandos' },
    { nombre: 'Peluche de cebra', marca: 'Gund', precio: 1620, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Juguetes blandos' },
    // Superhéroes (necesita 14 más)
    { nombre: 'Figura de Spider-Man', marca: 'Hasbro', precio: 1800, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Superhéroes' },
    { nombre: 'Figura de Iron Man', marca: 'Hasbro', precio: 1900, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Superhéroes' },
    { nombre: 'Figura de Captain America', marca: 'Hasbro', precio: 1850, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Superhéroes' },
    { nombre: 'Figura de Thor', marca: 'Hasbro', precio: 1950, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Superhéroes' },
    { nombre: 'Figura de Hulk', marca: 'Hasbro', precio: 2000, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Superhéroes' },
    { nombre: 'Figura de Black Widow', marca: 'Hasbro', precio: 1750, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Superhéroes' },
    { nombre: 'Figura de Black Panther', marca: 'Hasbro', precio: 2100, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Superhéroes' },
    { nombre: 'Figura de Doctor Strange', marca: 'Hasbro', precio: 2050, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Superhéroes' },
    { nombre: 'Figura de Ant-Man', marca: 'Hasbro', precio: 1700, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Superhéroes' },
    { nombre: 'Figura de Wasp', marca: 'Hasbro', precio: 1720, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Superhéroes' },
    { nombre: 'Figura de Captain Marvel', marca: 'Hasbro', precio: 2150, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Superhéroes' },
    { nombre: 'Figura de Scarlet Witch', marca: 'Hasbro', precio: 2080, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Superhéroes' },
    { nombre: 'Figura de Vision', marca: 'Hasbro', precio: 2120, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Superhéroes' },
    { nombre: 'Figura de Falcon', marca: 'Hasbro', precio: 1780, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Superhéroes' },
    { nombre: 'Figura de Winter Soldier', marca: 'Hasbro', precio: 1820, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Superhéroes' },
    { nombre: 'Figura de Hawkeye', marca: 'Hasbro', precio: 1680, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Superhéroes' },
    { nombre: 'Figura de War Machine', marca: 'Hasbro', precio: 2200, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Superhéroes' },
    { nombre: 'Figura de Nebula', marca: 'Hasbro', precio: 2180, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Superhéroes' },
    { nombre: 'Figura de Gamora', marca: 'Hasbro', precio: 2250, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Superhéroes' },
    { nombre: 'Figura de Rocket', marca: 'Hasbro', precio: 1650, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Superhéroes' },
    { nombre: 'Figura de Groot', marca: 'Hasbro', precio: 2300, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Superhéroes' }
  ];

  constructor(
    private subcategoriaService: SubcategoriaService, 
    private busquedaService: BusquedaService,
    private carritoService: CarritoService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Suscripción a subcategorías
    this.subscription.add(
      this.subcategoriaService.subcategoria$.subscribe(sub => {
        if (sub) {
          this.mostrarProductosDeSubcategoria(sub);
        } else {
          this.volverAlInicio();
        }
      })
    );

    // Suscripción a búsquedas
    this.subscription.add(
      this.busquedaService.busqueda$.subscribe(termino => {
        if (termino && termino.trim()) {
          this.realizarBusqueda(termino);
        } else {
          this.limpiarBusqueda();
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // Métodos para los botones del carrusel
  verOfertas() {
    // Navegar a la página de ofertas
    window.location.href = '/ofertas';
  }

  comprarAhora() {
    // Mostrar información sobre cuotas
    alert('¡Aprovecha nuestras 12 cuotas sin interés!\n\nPuedes pagar en hasta 12 cuotas sin intereses con todas las tarjetas de crédito.\n\n¡Consulta con nuestro equipo para más información!');
  }

  descubrirPromociones() {
    // Mostrar información sobre envío gratis
    alert('¡Envío gratis en compras superiores a $5000!\n\n✅ Envío a domicilio gratis\n✅ Envío a sucursal gratis\n✅ Sin costo adicional\n\n¡Aprovecha esta promoción especial!');
  }

  volverAlInicio() {
    this.subcategoriaSeleccionada = null;
    this.productosFiltrados = [];
    this.busquedaActiva = false;
    this.terminoBusqueda = '';
    // Limpiar búsqueda en el servicio
    this.busquedaService.limpiarBusqueda();
  }

  realizarBusqueda(termino: string) {
    // Actualizar estado
    this.terminoBusqueda = termino;
    this.busquedaActiva = true;
    this.subcategoriaSeleccionada = null;
    
    // Buscar productos
    const terminoLower = termino.toLowerCase();
    const resultados = this.productos.filter(producto => {
      return producto.nombre.toLowerCase().includes(terminoLower) ||
             producto.marca.toLowerCase().includes(terminoLower) ||
             producto.categoria.toLowerCase().includes(terminoLower);
    });
    
    // Actualizar productos filtrados
    this.productosFiltrados = resultados.slice(0, 20);
  }

  limpiarBusqueda() {
    this.busquedaActiva = false;
    this.terminoBusqueda = '';
    this.productosFiltrados = [];
  }

  mostrarProductosDeSubcategoria(sub: string) {
    this.subcategoriaSeleccionada = sub;
    const relacionados = this.productos.filter(p => p.categoria === sub);
    // Mezclar aleatoriamente
    const mezclados = relacionados.sort(() => 0.5 - Math.random());
    // Tomar entre 8 y 12 (si hay menos de 8, muestra todos; si hay más de 12, solo 12)
    const cantidad = Math.min(Math.max(8, mezclados.length), 12);
    this.productosFiltrados = mezclados.slice(0, cantidad);
  }

  agregarAlCarrito(producto: any) {
    const productoParaCarrito: Producto = {
      id: this.destacados.indexOf(producto),
      nombre: producto.nombre,
      marca: producto.marca,
      precio: producto.precio,
      imagen: producto.imagen
    };
    this.carritoService.agregarProducto(productoParaCarrito);
    alert('¡Producto agregado al carrito!');
  }

  agregarAlCarritoFiltrado(producto: any) {
    const productoParaCarrito: Producto = {
      id: this.productos.indexOf(producto),
      nombre: producto.nombre,
      marca: producto.marca,
      precio: producto.precio,
      imagen: producto.imagen
    };
    this.carritoService.agregarProducto(productoParaCarrito);
    alert('¡Producto agregado al carrito!');
  }
} 