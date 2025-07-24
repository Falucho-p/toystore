import { Component } from '@angular/core';

@Component({
  selector: 'app-acerca',
  template: `
    <div class="row align-items-center g-4">
      <div class="col-md-7">
        <h2 class="text-primary fw-bold mb-3">Nuestra historia</h2>
        <p class="mb-3">Somos una juguetería familiar con más de 20 años de experiencia, dedicada a brindar alegría y diversión a los niños y niñas de todas las edades. Nos apasiona ofrecer juguetes de calidad que estimulen la creatividad y el aprendizaje.</p>
        <div class="mb-3">
          <span class="badge bg-warning text-dark me-2"><i class="bi bi-lightbulb"></i> Misión</span>
          <span class="badge bg-info text-dark me-2"><i class="bi bi-eye"></i> Visión</span>
          <span class="badge bg-success"><i class="bi bi-star"></i> Valores</span>
        </div>
        <ul class="list-group mb-3">
          <li class="list-group-item"><i class="bi bi-lightbulb text-warning me-2"></i><strong>Misión:</strong> Fomentar la imaginación y el desarrollo de los niños a través del juego.</li>
          <li class="list-group-item"><i class="bi bi-eye text-info me-2"></i><strong>Visión:</strong> Ser la juguetería preferida de la comunidad, reconocida por su calidez y variedad.</li>
          <li class="list-group-item"><i class="bi bi-star text-success me-2"></i><strong>Valores:</strong> Honestidad, creatividad, compromiso y alegría.</li>
        </ul>
      </div>
      <div class="col-md-5 text-center">
        <img src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=500&q=80" class="img-fluid rounded shadow-lg border border-3 border-info mb-2" alt="Nuestro equipo">
        <small class="d-block text-muted">Nuestro equipo en la juguetería</small>
      </div>
    </div>
  `
})
export class AcercaComponent {} 