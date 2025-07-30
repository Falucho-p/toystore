import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-acerca',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container py-5">
      <div class="row align-items-center g-4 mb-5">
        <div class="col-md-7">
          <h1 class="text-primary fw-bold mb-4">Nuestra historia</h1>
          <p class="lead mb-4">Somos una juguetería familiar con más de 20 años de experiencia, dedicada a brindar alegría y diversión a los niños y niñas de todas las edades. Nos apasiona ofrecer juguetes de calidad que estimulen la creatividad y el aprendizaje.</p>
          <div class="mb-4">
            <span class="badge bg-warning text-dark me-2 fs-6"><i class="bi bi-lightbulb"></i> Misión</span>
            <span class="badge bg-info text-dark me-2 fs-6"><i class="bi bi-eye"></i> Visión</span>
            <span class="badge bg-success fs-6"><i class="bi bi-star"></i> Valores</span>
          </div>
          <ul class="list-group mb-4">
            <li class="list-group-item border-0 bg-transparent"><i class="bi bi-lightbulb text-warning me-2"></i><strong>Misión:</strong> Fomentar la imaginación y el desarrollo de los niños a través del juego.</li>
            <li class="list-group-item border-0 bg-transparent"><i class="bi bi-eye text-info me-2"></i><strong>Visión:</strong> Ser la juguetería preferida de la comunidad, reconocida por su calidez y variedad.</li>
            <li class="list-group-item border-0 bg-transparent"><i class="bi bi-star text-success me-2"></i><strong>Valores:</strong> Honestidad, creatividad, compromiso y alegría.</li>
          </ul>
        </div>
        <div class="col-md-5 text-center">
          <img src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=500&q=80" class="img-fluid rounded shadow-lg border border-3 border-info mb-2" alt="Nuestro equipo">
          <small class="d-block text-muted">Nuestro equipo en la juguetería</small>
        </div>
      </div>

      <!-- Sección de estadísticas -->
      <div class="row g-4 mb-5">
        <div class="col-12">
          <h2 class="text-center text-primary fw-bold mb-4">Nuestros números</h2>
        </div>
        <div class="col-md-3 col-sm-6 text-center">
          <div class="bg-warning bg-gradient rounded-4 p-4 shadow">
            <i class="bi bi-people-fill fs-1 text-danger mb-3"></i>
            <h3 class="fw-bold text-dark">5000+</h3>
            <p class="mb-0 text-dark">Clientes satisfechos</p>
          </div>
        </div>
        <div class="col-md-3 col-sm-6 text-center">
          <div class="bg-info bg-gradient rounded-4 p-4 shadow">
            <i class="bi bi-box-seam-fill fs-1 text-primary mb-3"></i>
            <h3 class="fw-bold text-white">2000+</h3>
            <p class="mb-0 text-white">Productos disponibles</p>
          </div>
        </div>
        <div class="col-md-3 col-sm-6 text-center">
          <div class="bg-success bg-gradient rounded-4 p-4 shadow">
            <i class="bi bi-calendar-check-fill fs-1 text-white mb-3"></i>
            <h3 class="fw-bold text-white">20+</h3>
            <p class="mb-0 text-white">Años de experiencia</p>
          </div>
        </div>
        <div class="col-md-3 col-sm-6 text-center">
          <div class="bg-danger bg-gradient rounded-4 p-4 shadow">
            <i class="bi bi-award-fill fs-1 text-white mb-3"></i>
            <h3 class="fw-bold text-white">15+</h3>
            <p class="mb-0 text-white">Premios ganados</p>
          </div>
        </div>
      </div>

      <!-- Sección de servicios -->
      <div class="row g-4 mb-5">
        <div class="col-12">
          <h2 class="text-center text-primary fw-bold mb-4">Nuestros servicios</h2>
        </div>
        <div class="col-md-4 text-center">
          <div class="card h-100 border-0 shadow">
            <div class="card-body">
              <i class="bi bi-truck fs-1 text-primary mb-3"></i>
              <h4 class="card-title">Envío a domicilio</h4>
              <p class="card-text">Llevamos los juguetes hasta tu puerta con envío rápido y seguro.</p>
            </div>
          </div>
        </div>
        <div class="col-md-4 text-center">
          <div class="card h-100 border-0 shadow">
            <div class="card-body">
              <i class="bi bi-shield-check fs-1 text-success mb-3"></i>
              <h4 class="card-title">Garantía de calidad</h4>
              <p class="card-text">Todos nuestros productos tienen garantía y son de marcas reconocidas.</p>
            </div>
          </div>
        </div>
        <div class="col-md-4 text-center">
          <div class="card h-100 border-0 shadow">
            <div class="card-body">
              <i class="bi bi-headset fs-1 text-info mb-3"></i>
              <h4 class="card-title">Asesoramiento</h4>
              <p class="card-text">Te ayudamos a elegir el juguete perfecto según la edad e intereses.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Sección de equipo -->
      <div class="row g-4">
        <div class="col-12">
          <h2 class="text-center text-primary fw-bold mb-4">Nuestro equipo</h2>
        </div>
        <div class="col-md-4 text-center">
          <div class="card border-0 shadow">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" class="card-img-top" alt="Director" style="height: 200px; object-fit: cover;">
            <div class="card-body">
              <h5 class="card-title">Carlos Rodríguez</h5>
              <p class="card-text text-muted">Director General</p>
              <p class="card-text small">Más de 15 años en el negocio de juguetes, apasionado por la innovación y el servicio al cliente.</p>
            </div>
          </div>
        </div>
        <div class="col-md-4 text-center">
          <div class="card border-0 shadow">
            <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=400&q=80" class="card-img-top" alt="Vendedora" style="height: 200px; object-fit: cover;">
            <div class="card-body">
              <h5 class="card-title">María González</h5>
              <p class="card-text text-muted">Vendedora Senior</p>
              <p class="card-text small">Especialista en juguetes educativos y asesoramiento para padres y educadores.</p>
            </div>
          </div>
        </div>
        <div class="col-md-4 text-center">
          <div class="card border-0 shadow">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80" class="card-img-top" alt="Técnico" style="height: 200px; object-fit: cover;">
            <div class="card-body">
              <h5 class="card-title">Luis Martínez</h5>
              <p class="card-text text-muted">Técnico de Reparación</p>
              <p class="card-text small">Experto en reparación y mantenimiento de juguetes electrónicos y mecánicos.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AcercaComponent {} 