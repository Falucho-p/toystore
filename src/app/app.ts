import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-danger fixed-top shadow-sm py-2">
      <div class="container-fluid px-2 px-md-4">
        <a class="navbar-brand d-flex align-items-center" routerLink="/inicio">
          <span style="font-size:2rem;line-height:1;">🧸</span>
          <span class="ms-2 fw-bold d-none d-sm-inline" style="font-size:1.5rem;letter-spacing:1px;">Juguetería</span>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" routerLink="/inicio">Inicio</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/productos">Productos</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/ofertas">Ofertas</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/marcas">Marcas</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/contacto">Contacto</a>
            </li>
          </ul>
          <form class="d-flex mt-2 mt-lg-0" role="search" style="max-width:300px;">
            <input class="form-control me-2" type="search" placeholder="Buscar juguetes..." aria-label="Buscar">
            <button class="btn btn-warning" type="submit"><i class="bi bi-search"></i></button>
          </form>
        </div>
      </div>
    </nav>
    <div style="height:70px;"></div>
    <div class="container-fluid px-2 px-md-4">
      <router-outlet></router-outlet>
    </div>
    <footer class="bg-warning bg-gradient text-dark mt-5 pt-4 pb-2 border-top shadow-sm">
      <div class="container-fluid px-2 px-md-4">
        <div class="row text-center text-md-start">
          <div class="col-12 col-md-4 mb-3 mb-md-0">
            <h5 class="fw-bold">Menú rápido</h5>
            <ul class="list-unstyled">
              <li><a routerLink="/inicio" class="text-dark text-decoration-none">Inicio</a></li>
              <li><a routerLink="/productos" class="text-dark text-decoration-none">Productos</a></li>
              <li><a routerLink="/ofertas" class="text-dark text-decoration-none">Ofertas</a></li>
              <li><a routerLink="/marcas" class="text-dark text-decoration-none">Marcas</a></li>
              <li><a routerLink="/contacto" class="text-dark text-decoration-none">Contacto</a></li>
            </ul>
          </div>
          <div class="col-12 col-md-4 mb-3 mb-md-0">
            <h5 class="fw-bold">Redes sociales</h5>
            <a href="https://facebook.com" target="_blank" class="me-2 text-dark"><i class="bi bi-facebook fs-4"></i></a>
            <a href="https://instagram.com" target="_blank" class="me-2 text-dark"><i class="bi bi-instagram fs-4"></i></a>
            <a href="https://wa.me/5491123456789" target="_blank" class="text-dark"><i class="bi bi-whatsapp fs-4"></i></a>
          </div>
          <div class="col-12 col-md-4">
            <h5 class="fw-bold">Contacto</h5>
            <p class="mb-1"><i class="bi bi-geo-alt-fill me-1"></i> Av. Siempreviva 123, CABA</p>
            <p class="mb-1"><i class="bi bi-envelope-fill me-1"></i> info&#64;jugueteria.com</p>
            <p class="mb-0"><i class="bi bi-telephone-fill me-1"></i> (011) 1234-5678</p>
          </div>
        </div>
        <div class="text-center mt-3 small">
          &copy; 2024 Juguetería. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  `,
  styleUrls: ['./app.css'],
  imports: [RouterOutlet, RouterLink],
})
export class AppComponent {}
