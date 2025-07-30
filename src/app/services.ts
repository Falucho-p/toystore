import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Producto {
  id: number;
  nombre: string;
  marca: string;
  precio: number;
  imagen: string;
  categoria?: string;
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