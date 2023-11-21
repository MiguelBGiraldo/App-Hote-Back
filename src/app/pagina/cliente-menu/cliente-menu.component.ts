import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cliente-menu',
  templateUrl: './cliente-menu.component.html',
  styleUrls: ['./cliente-menu.component.css']
})
export class ClienteMenuComponent {

  @Output() displayView = new EventEmitter<string>();

  showView(view: string) {
    this.displayView.emit(view); // Emite el evento con el nombre de la vista seleccionada
  }
}
