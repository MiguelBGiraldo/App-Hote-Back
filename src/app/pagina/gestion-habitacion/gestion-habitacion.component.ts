import { Component } from '@angular/core';
import { HabitacionService } from 'src/app/Service/habitacion.service';
import { Alerta } from 'src/app/modelo/alerta';
import { HabitacionDTO } from 'src/app/modelo/habitacion-dto';

@Component({
  selector: 'app-gestion-habitacion',
  templateUrl: './gestion-habitacion.component.html',
  styleUrls: ['./gestion-habitacion.component.css']
})
export class GestionHabitacionComponent {

  habitaciones: HabitacionDTO[];
  textoBtnEliminar: string = "";
  seleccionados: HabitacionDTO[];
  alerta!: Alerta;

  constructor(private habitacionService: HabitacionService) {
    this.seleccionados = [];
    this.habitaciones = [];
    this.textoBtnEliminar = "";
  }
  ngOnInit(): void {

    this.listarHabitaciones(1);
  }
  public seleccionar(habitacion: HabitacionDTO, estado: boolean) {
    if (estado) {
      this.seleccionados.push(habitacion);
    } else {
      this.seleccionados = this.seleccionados.filter(i => i != habitacion);
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
  public borrarHabitaciones() {
    this.seleccionados.forEach(e => {

      this.eliminarHabitacion(e.id);
      
      this.habitaciones = this.habitaciones.filter(i => i != e);
    });
    this.seleccionados = [];
    this.actualizarMensaje();
  }

  public listarHabitaciones (pagina: number){

    this.habitacionService.listarAll(pagina).subscribe({
      next: data => {
        this.habitaciones = data.result;
      },
      error: error => {
        console.log(error.error);
      }
    });
  }

  public eliminarHabitacion(codigo: string){

    this.habitacionService.eliminar(codigo).subscribe({
      next: data => {
        this.alerta =  new Alerta(data.result,"succes");
      },
      error: error => {
        this.alerta =  new Alerta(error.error,"danger");
      }
    });
  }
}
