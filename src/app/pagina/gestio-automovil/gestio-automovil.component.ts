import { Component } from '@angular/core';
import { AutomovilService } from 'src/app/Service/automovil.service';
import { Alerta } from 'src/app/modelo/alerta';
import { AutomovilDto } from 'src/app/modelo/automovil-dto';

@Component({
  selector: 'app-gestio-automovil',
  templateUrl: './gestio-automovil.component.html',
  styleUrls: ['./gestio-automovil.component.css']
})
export class GestioAutomovilComponent {

  automoviles: AutomovilDto[];
  textoBtnEliminar: string = "";
  seleccionados: AutomovilDto[];
  alerta!: Alerta;

  constructor(private automovilService: AutomovilService) {
    this.automoviles = [];
    this.seleccionados = [];
    this.textoBtnEliminar = "";
  }
  ngOnInit(): void {

    this.listarAutomoviles(1);
  }
  public seleccionar(producto: AutomovilDto, estado: boolean) {
    if (estado) {
      this.seleccionados.push(producto);
    } else {
      this.seleccionados = this.seleccionados.filter(i => i != producto);
    }
    this.actualizarMensaje();

  }
  private actualizarMensaje() {
    const tam = this.seleccionados.length;
    if (tam != 0) {
      if (tam == 1) {
        this.textoBtnEliminar = "1 elemento";
      } else {
        this.textoBtnEliminar = tam + " elementos";
      }
    } else {
      this.textoBtnEliminar = "";
    }
  }
  public borrarAutomoviles() {
    this.seleccionados.forEach(e => {

      this.eliminarAutomovil(e.id);
      
      this.automoviles = this.automoviles.filter(i => i != e);
    });
    this.seleccionados = [];
    this.actualizarMensaje();
  }

  public listarAutomoviles (pagina: number){

    this.automovilService.listarAll(pagina).subscribe({
      next: data => {
        this.automoviles = data.result;
      },
      error: error => {
        console.log(error.error);
      }
    });
  }

  public eliminarAutomovil(codigo: string){

    this.automovilService.eliminar(codigo).subscribe({
      next: data => {
        this.alerta =  new Alerta(data.result,"succes");
      },
      error: error => {
        this.alerta =  new Alerta(error.error,"danger");
      }
    });
  }

}
