import { Component } from '@angular/core';
import { InstalacionService } from 'src/app/Service/instalacion.service';
import { Alerta } from 'src/app/modelo/alerta';
import { InstalacionDTO } from 'src/app/modelo/instalacion-dto';

@Component({
  selector: 'app-gestion-instalacion',
  templateUrl: './gestion-instalacion.component.html',
  styleUrls: ['./gestion-instalacion.component.css']
})
export class GestionInstalacionComponent {

  instalaciones: InstalacionDTO[];
  textoBtnEliminar: string = "";
  seleccionados: InstalacionDTO[];
  alerta!: Alerta;

  constructor(private instalacionService: InstalacionService) {
    this.seleccionados = [];
    this.instalaciones = [];
    this.textoBtnEliminar = "";
  }
  ngOnInit(): void {

    this.listarInstalaciones(1);
  }
  public seleccionar(instalacion: InstalacionDTO, estado: boolean) {
    if (estado) {
      this.seleccionados.push(instalacion);
    } else {
      this.seleccionados = this.seleccionados.filter(i => i != instalacion);
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
  public borrarInstalaciones() {
    this.seleccionados.forEach(e => {

      this.eliminarInstalacion(e.id);
      
      this.instalaciones = this.instalaciones.filter(i => i != e);
    });
    this.seleccionados = [];
    this.actualizarMensaje();
  }

  public listarInstalaciones (pagina: number){

    this.instalacionService.listarAll(pagina).subscribe({
      next: data => {
        this.instalaciones = data.result;
      },
      error: error => {
        console.log(error.error);
      }
    });
  }

  public eliminarInstalacion(codigo: string){

    this.instalacionService.eliminar(codigo).subscribe({
      next: data => {
        this.alerta =  new Alerta(data.result,"succes");
      },
      error: error => {
        this.alerta =  new Alerta(error.error,"danger");
      }
    });
  }
}
