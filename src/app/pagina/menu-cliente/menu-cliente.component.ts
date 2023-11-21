import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-menu-cliente',
  templateUrl: './menu-cliente.component.html',
  styleUrls: ['./menu-cliente.component.css']
})
export class MenuClienteComponent {

  @Output() displayView = new EventEmitter<string>();

  showView(view: string) {
    this.displayView.emit(view); // Emite el evento con el nombre de la vista seleccionada
  }
}
