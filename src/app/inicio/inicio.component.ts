import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SubcategoriaService } from '../app';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-container *ngIf="!subcategoriaSeleccionada">
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
              </div>
            </div>
          </div>
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
    // Pistas y vehículos
    { nombre: 'Auto Hot Wheels', marca: 'Hot Wheels', precio: 1200, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Autos' },
    { nombre: 'Tren eléctrico', marca: 'Lionel', precio: 3500, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Trenes' },
    { nombre: 'Pista de carreras', marca: 'Hot Wheels', precio: 2800, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Pistas armables' },
    // Pistolas, espadas y lanzadardos
    { nombre: 'Pistola Nerf', marca: 'Nerf', precio: 1600, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Pistolas' },
    { nombre: 'Espada de juguete', marca: 'Hasbro', precio: 900, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Espadas' },
    { nombre: 'Lanzadardos', marca: 'Nerf', precio: 1200, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Lanzadardos' },
    // Rodados
    { nombre: 'Bicicleta infantil', marca: 'Trek', precio: 4500, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', categoria: 'Bicicletas' },
    { nombre: 'Triciclo', marca: 'Radio Flyer', precio: 2800, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categoria: 'Triciclos' },
    { nombre: 'Monopatín', marca: 'Razor', precio: 3200, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categoria: 'Monopatines' },
    // Bazar
    { nombre: 'Vajilla infantil', marca: 'Melissa & Doug', precio: 1800, imagen: 'https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=400&q=80', categoria: 'Vajilla infantil' },
    { nombre: 'Juguetes cocina', marca: 'Little Tikes', precio: 2200, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', categoria: 'Juguetes cocina' }
  ];

  constructor(private subcategoriaService: SubcategoriaService) {}

  ngOnInit() {
    this.subscription = this.subcategoriaService.subcategoria$.subscribe(sub => {
      if (sub) {
        this.mostrarProductosDeSubcategoria(sub);
      }
    });
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
} 