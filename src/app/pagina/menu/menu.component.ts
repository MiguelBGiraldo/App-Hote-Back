import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  @Output() displayView = new EventEmitter<string>();

  showView(view: string) {
    this.displayView.emit(view); // Emite el evento con el nombre de la vista seleccionada
  }
}
