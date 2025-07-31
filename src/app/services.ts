import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Producto {
  id: number;
  nombre: string;
  marca: string;
  precio: number;
  imagen: string;
  categoria?: string;
  edadRecomendada?: string;
  stock?: number;
  descripcion?: string;
}

export interface ItemCarrito {
  producto: Producto;
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class SubcategoriaService {
  private subcategoriaSeleccionada = new BehaviorSubject<string | null>(null);
  subcategoria$ = this.subcategoriaSeleccionada.asObservable();

  seleccionarSubcategoria(sub: string | null) {
    this.subcategoriaSeleccionada.next(sub);
  }
}

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {
  private busquedaActual = new BehaviorSubject<string>('');
  busqueda$ = this.busquedaActual.asObservable();

  realizarBusqueda(termino: string) {
    this.busquedaActual.next(termino);
  }

  limpiarBusqueda() {
    this.busquedaActual.next('');
  }
}

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carrito = new BehaviorSubject<ItemCarrito[]>([]);
  carrito$ = this.carrito.asObservable();

  agregarProducto(producto: Producto) {
    const carritoActual = this.carrito.value;
    const itemExistente = carritoActual.find(item => item.producto.id === producto.id);
    
    if (itemExistente) {
      itemExistente.cantidad += 1;
      this.carrito.next([...carritoActual]);
    } else {
      this.carrito.next([...carritoActual, { producto, cantidad: 1 }]);
    }
  }

  removerProducto(id: number) {
    const carritoActual = this.carrito.value;
    this.carrito.next(carritoActual.filter(item => item.producto.id !== id));
  }

  actualizarCantidad(id: number, cantidad: number) {
    const carritoActual = this.carrito.value;
    const item = carritoActual.find(item => item.producto.id === id);
    
    if (item) {
      if (cantidad <= 0) {
        this.removerProducto(id);
      } else {
        item.cantidad = cantidad;
        this.carrito.next([...carritoActual]);
      }
    }
  }

  obtenerTotal(): number {
    return this.carrito.value.reduce((total, item) => {
      return total + (item.producto.precio * item.cantidad);
    }, 0);
  }

  obtenerCantidadTotal(): number {
    return this.carrito.value.reduce((total, item) => {
      return total + item.cantidad;
    }, 0);
  }

  limpiarCarrito() {
    this.carrito.next([]);
  }
} 

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlist = new BehaviorSubject<Producto[]>([]);
  wishlist$ = this.wishlist.asObservable();

  agregarAWishlist(producto: Producto) {
    const wishlistActual = this.wishlist.value;
    if (!wishlistActual.find(item => item.id === producto.id)) {
      this.wishlist.next([...wishlistActual, producto]);
    }
  }

  removerDeWishlist(id: number) {
    const wishlistActual = this.wishlist.value;
    this.wishlist.next(wishlistActual.filter(item => item.id !== id));
  }

  estaEnWishlist(id: number): boolean {
    return this.wishlist.value.some(item => item.id === id);
  }

  obtenerCantidad(): number {
    return this.wishlist.value.length;
  }
}

@Injectable({
  providedIn: 'root'
})
export class FiltrosService {
  private filtroEdad = new BehaviorSubject<string>('');
  private filtroPrecio = new BehaviorSubject<{min: number, max: number}>({min: 0, max: 999999});
  private filtroMarca = new BehaviorSubject<string>('');

  filtroEdad$ = this.filtroEdad.asObservable();
  filtroPrecio$ = this.filtroPrecio.asObservable();
  filtroMarca$ = this.filtroMarca.asObservable();

  setFiltroEdad(edad: string) {
    this.filtroEdad.next(edad);
  }

  setFiltroPrecio(min: number, max: number) {
    this.filtroPrecio.next({min, max});
  }

  setFiltroMarca(marca: string) {
    this.filtroMarca.next(marca);
  }

  limpiarFiltros() {
    this.filtroEdad.next('');
    this.filtroPrecio.next({min: 0, max: 999999});
    this.filtroMarca.next('');
  }
} 