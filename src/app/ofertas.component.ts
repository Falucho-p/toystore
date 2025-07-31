import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService, WishlistService, Producto } from './services';

@Component({
  selector: 'app-ofertas',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container py-5">
      <h1 class="text-danger fw-bold mb-4 text-center">Ofertas especiales</h1>
      <div class="row g-4 justify-content-center">
        <div class="col-12 col-sm-6 col-lg-3" *ngFor="let producto of ofertas">
          <div class="card h-100 shadow border-0 position-relative">
            <span class="badge bg-danger position-absolute top-0 end-0 m-2">Oferta</span>
            <img [src]="producto.imagen" class="card-img-top mx-auto d-block" [alt]="producto.nombre" style="object-fit:cover;max-height:180px;max-width:100%;">
            <div class="card-body d-flex flex-column justify-content-between">
              <h5 class="card-title text-info fw-bold">{{ producto.nombre }}</h5>
              <p class="card-text mb-1"><strong>Marca:</strong> <span class="text-secondary">{{ producto.marca }}</span></p>
              <p class="card-text mb-2">
                <span class="text-muted text-decoration-line-through">&#36;{{ producto.precioOriginal }}</span>
                <span class="fs-5 text-success ms-2">&#36;{{ producto.precioOferta }}</span>
              </p>
              <div class="d-flex gap-2 mt-auto">
                <button class="btn btn-warning fw-bold flex-fill" (click)="agregarAlCarrito(producto)">
                  <i class="bi bi-cart-plus"></i> Agregar al carrito
                </button>
                <button class="btn btn-outline-danger" (click)="toggleWishlist(producto)" [class.btn-danger]="estaEnWishlist(producto.id)">
                  <i class="bi" [class.bi-heart]="!estaEnWishlist(producto.id)" [class.bi-heart-fill]="estaEnWishlist(producto.id)"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class OfertasComponent {
  constructor(private carritoService: CarritoService, private wishlistService: WishlistService) {}
  
  ofertas = [
    { id: 1, nombre: 'Auto de Carrera', marca: 'Hot Wheels', precioOriginal: 1500, precioOferta: 1200, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80' },
    { id: 2, nombre: 'Muñeca', marca: 'Barbie', precioOriginal: 1200, precioOferta: 950, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
    { id: 3, nombre: 'Bloques de Construcción', marca: 'Lego', precioOriginal: 1800, precioOferta: 1450, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80' },
    { id: 4, nombre: 'Peluche', marca: 'Fisher-Price', precioOriginal: 950, precioOferta: 700, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80' },
    { id: 5, nombre: 'Puzzle 1000 Piezas', marca: 'Ravensburger', precioOriginal: 2500, precioOferta: 1800, imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80' },
    { id: 6, nombre: 'Robot Programable', marca: 'TechToys', precioOriginal: 3200, precioOferta: 2400, imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
    { id: 7, nombre: 'Set de Pinturas', marca: 'Crayola', precioOriginal: 800, precioOferta: 550, imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80' },
    { id: 8, nombre: 'Juego de Mesa', marca: 'Hasbro', precioOriginal: 1800, precioOferta: 1300, imagen: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80' }
  ];

  agregarAlCarrito(producto: any) {
    const productoParaCarrito: Producto = {
      id: producto.id,
      nombre: producto.nombre,
      marca: producto.marca,
      precio: producto.precioOferta,
      imagen: producto.imagen
    };
    this.carritoService.agregarProducto(productoParaCarrito);
    alert('¡Producto agregado al carrito!');
  }

  toggleWishlist(producto: any) {
    const productoParaWishlist: Producto = {
      id: producto.id,
      nombre: producto.nombre,
      marca: producto.marca,
      precio: producto.precioOferta,
      imagen: producto.imagen
    };
    
    if (this.estaEnWishlist(productoParaWishlist.id)) {
      this.wishlistService.removerDeWishlist(productoParaWishlist.id);
    } else {
      this.wishlistService.agregarAWishlist(productoParaWishlist);
    }
  }

  estaEnWishlist(id: number): boolean {
    return this.wishlistService.estaEnWishlist(id);
  }
} 