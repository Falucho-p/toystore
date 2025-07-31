import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WishlistService, CarritoService, Producto } from './services';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './wishlist.component.html'
})
export class WishlistComponent implements OnInit {
  wishlist$;

  constructor(
    private wishlistService: WishlistService,
    private carritoService: CarritoService
  ) {
    this.wishlist$ = this.wishlistService.wishlist$;
  }

  ngOnInit() {}

  removerDeWishlist(id: number) {
    this.wishlistService.removerDeWishlist(id);
  }

  agregarAlCarrito(producto: Producto) {
    this.carritoService.agregarProducto(producto);
  }
} 