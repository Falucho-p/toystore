import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CarritoService, ItemCarrito } from './services';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './carrito.component.html'
})
export class CarritoComponent implements OnInit {
  carrito$;

  constructor(private carritoService: CarritoService) {
    this.carrito$ = this.carritoService.carrito$;
  }

  ngOnInit() {}

  actualizarCantidad(id: number, cantidad: number) {
    this.carritoService.actualizarCantidad(id, cantidad);
  }

  removerProducto(id: number) {
    this.carritoService.removerProducto(id);
  }

  obtenerSubtotal(): number {
    return this.carritoService.obtenerTotal();
  }

  obtenerEnvio(): number {
    const subtotal = this.obtenerSubtotal();
    return subtotal > 5000 ? 0 : 500; // Envío gratis sobre $5000
  }

  obtenerTotal(): number {
    return this.obtenerSubtotal() + this.obtenerEnvio();
  }

  finalizarCompra() {
    alert('¡Gracias por tu compra! Tu pedido ha sido procesado.');
    this.carritoService.limpiarCarrito();
  }
} 