import { Component } from '@angular/core';

@Component({
  selector: 'app-contacto',
  template: `
    <div class="container py-5" aria-label="Sección de contacto">
      <h1 class="text-primary fw-bold mb-4 text-center">Contacto</h1>
      <div class="row g-4 mb-5">
        <div class="col-md-4 text-center">
          <div class="bg-warning bg-gradient rounded-4 p-4 shadow mb-3" aria-label="Dirección">
            <i class="bi bi-geo-alt-fill fs-1 text-danger" aria-hidden="true"></i>
            <div class="fw-bold mt-2">Av. Siempreviva 123, CABA</div>
          </div>
          <div class="bg-info bg-gradient rounded-4 p-4 shadow mb-3" aria-label="Correo electrónico">
            <i class="bi bi-envelope-fill fs-1 text-primary" aria-hidden="true"></i>
            <div class="fw-bold mt-2">info&#64;jugueteria.com</div>
          </div>
          <div class="bg-success bg-gradient rounded-4 p-4 shadow" aria-label="Teléfono">
            <i class="bi bi-telephone-fill fs-1 text-white" aria-hidden="true"></i>
            <div class="fw-bold mt-2">(011) 1234-5678</div>
          </div>
        </div>
        <div class="col-md-8">
          <div class="card shadow-lg border-0">
            <div class="card-body">
              <h2 class="mb-3 text-primary fs-4">Envíanos tu consulta</h2>
              <form class="needs-validation" novalidate aria-label="Formulario de contacto">
                <div class="mb-3">
                  <label for="nombre" class="form-label">Nombre</label>
                  <input type="text" class="form-control" id="nombre" placeholder="Tu nombre" required aria-required="true" aria-label="Nombre">
                  <div class="invalid-feedback">Por favor ingresa tu nombre.</div>
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input type="email" class="form-control" id="email" placeholder="tu@email.com" required aria-required="true" aria-label="Correo electrónico">
                  <div class="invalid-feedback">Por favor ingresa un email válido.</div>
                </div>
                <div class="mb-3">
                  <label for="mensaje" class="form-label">Mensaje</label>
                  <textarea class="form-control" id="mensaje" rows="3" required aria-required="true" aria-label="Mensaje"></textarea>
                  <div class="invalid-feedback">Por favor ingresa un mensaje.</div>
                </div>
                <button type="submit" class="btn btn-primary btn-lg" aria-label="Enviar consulta">Enviar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="row g-4">
        <div class="col-md-6">
          <div class="bg-light rounded-4 shadow p-3 h-100" aria-label="Horarios de atención y redes sociales">
            <h2 class="text-info mb-2 fs-5"><i class="bi bi-clock me-2" aria-hidden="true"></i>Horarios de Atención</h2>
            <ul class="list-group mb-3">
              <li class="list-group-item">Lunes a Viernes: 9:00 a 19:00</li>
              <li class="list-group-item">Sábados: 10:00 a 14:00</li>
              <li class="list-group-item">Domingos y feriados: Cerrado</li>
            </ul>
            <h2 class="text-secondary mb-2 fs-5"><i class="bi bi-share me-2" aria-hidden="true"></i>Redes y contacto</h2>
            <a href="https://wa.me/5491123456789" target="_blank" class="btn btn-outline-success mb-2 me-2" aria-label="Contactar por WhatsApp"><i class="bi bi-whatsapp"></i> WhatsApp</a>
            <a href="https://facebook.com" target="_blank" class="btn btn-outline-primary mb-2 me-2" aria-label="Ir a Facebook"><i class="bi bi-facebook"></i> Facebook</a>
            <a href="https://instagram.com" target="_blank" class="btn btn-outline-danger mb-2" aria-label="Ir a Instagram"><i class="bi bi-instagram"></i> Instagram</a>
          </div>
        </div>
        <div class="col-md-6">
          <div class="bg-light rounded-4 shadow p-3 h-100" aria-label="Mapa de ubicación">
            <h2 class="text-info mb-2 fs-5"><i class="bi bi-geo-alt-fill me-2" aria-hidden="true"></i>Ubicación</h2>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.953735315904!3d-37.8162797420217!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f1f1f1f1%3A0x5045675218ce6e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1ses!2sar!4v1680000000000!5m2!1ses!2sar" width="100%" height="250" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Mapa de ubicación de la juguetería" aria-label="Mapa de ubicación de la juguetería"></iframe>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ContactoComponent {} 