import { Component } from '@angular/core';

@Component({
  selector: 'app-principal-administrador',
  templateUrl: './principal-administrador.component.html',
  styleUrls: ['./principal-administrador.component.css']
})
export class PrincipalAdministradorComponent {
  
  currentView: string = ''; // Para mantener el estado de la vista actual

  showView(view: string) {
    this.currentView = view; // Establece la vista actual basada en el evento emitido desde el menú
  }
}
