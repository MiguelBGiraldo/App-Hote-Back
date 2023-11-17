import { Component } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  mostrarFormulario : boolean = false;


  /**
   * name
   */
  public mostrarFormularioCrearCliente() {

    this.mostrarFormulario = true;
  }
}
