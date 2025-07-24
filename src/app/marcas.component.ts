import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-marcas',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container py-5">
      <h1 class="text-primary fw-bold mb-4 text-center">Nuestras marcas</h1>
      <div class="row g-4 justify-content-center">
        <div class="col-6 col-md-4 col-lg-3" *ngFor="let marca of marcas">
          <div class="card h-100 shadow border-0 text-center p-3">
            <img [src]="marca.logo" [alt]="marca.nombre" class="mx-auto mb-3" style="max-height:60px;max-width:100%;object-fit:contain;">
            <h5 class="fw-bold mb-2">{{ marca.nombre }}</h5>
            <p class="small text-muted mb-0">{{ marca.descripcion }}</p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class MarcasComponent {
  marcas = [
    { nombre: 'Hot Wheels', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Hot_Wheels_Logo.png', descripcion: 'Autos y pistas de carreras para los fanáticos de la velocidad.' },
    { nombre: 'LEGO', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/10/LEGO_logo.png', descripcion: 'Bloques de construcción para crear y aprender.' },
    { nombre: 'Barbie', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Barbie_Logo.png', descripcion: 'Muñecas y accesorios para imaginar historias.' },
    { nombre: 'Playmobil', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Playmobil_logo.png', descripcion: 'Figuras y sets para aventuras sin fin.' },
    { nombre: 'Fisher-Price', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Fisher-Price_logo.png', descripcion: 'Juguetes para los más pequeños, seguros y educativos.' },
    { nombre: 'Rasti', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Rasti_logo.png', descripcion: 'Bloques de encastre y construcción.' },
    { nombre: 'Hasbro', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Hasbro_logo.png', descripcion: 'Juguetes, juegos de mesa y figuras de acción.' },
    { nombre: 'Mattel', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Mattel_Logo.png', descripcion: 'Una de las marcas más grandes de juguetes del mundo.' },
    { nombre: 'Play-Doh', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Play-Doh_logo.png', descripcion: 'Masa para modelar y crear.' },
    { nombre: 'Nerf', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Nerf_logo.png', descripcion: 'Lanzadores y dardos de espuma para jugar seguro.' }
  ];
} 