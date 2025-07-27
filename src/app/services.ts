import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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