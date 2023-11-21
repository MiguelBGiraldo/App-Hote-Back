import { Component } from '@angular/core';
import { HotelDataServiceService } from '../../Service/hotel-data-service.service';
import { HabitacionDTO } from 'src/app/modelo/habitacion-dto';
import { HabitacionService } from '../../Service/habitacion.service';
import { Alerta } from '../../modelo/alerta';
import { ReservaDTO } from 'src/app/modelo/reserva-dto';
import { ComunicacionService } from '../../Service/comunicacion.service';
import { ComunicacionReservaService } from '../../Service/comunicacion-reserva.service';

@Component({
  selector: 'app-hospedaje',
  templateUrl: './hospedaje.component.html',
  styleUrls: ['./hospedaje.component.css']
})
export class HospedajeComponent {

  nombreHotel: string
  habitacion: HabitacionDTO;
  alerta!: Alerta;
  reserva: ReservaDTO;
  cantidadNinios: number = 0;
  cantidadAdultos: number = 0;
  totalDias: number = 0


  constructor(private hotelDataService: HotelDataServiceService, private habitacionService: HabitacionService, private comunicacionService: ComunicacionService, private comunicacionReserva: ComunicacionReservaService) {

    this.habitacion = new HabitacionDTO();
    this.reserva = new ReservaDTO();
    this.nombreHotel = this.hotelDataService.getNombreHotel();
    this.obtenerHabitacion();
  }

  public obtenerHabitacion() {

    this.habitacionService.listar(this.hotelDataService.getIdHab()).subscribe({
      next: data => {
        this.habitacion = data.result;
        // this.listarImagenesAutmovil(cod);

      },
      error: error => {
        this.alerta = new Alerta(error.error, "danger");
      },
    });
  }

  public reservar() {

    window.sessionStorage.removeItem("idReserva");
    window.sessionStorage.setItem("idReserva",  new Date().getTime() + "");
    this.comunicacionService.sendButton(true);
    this.comunicacionReserva.setReserva(this.reserva);
    alert("Ahora puedes ver el carrito");
    this.comunicacionService.sendView("");
  }

  public borrar() {

    window.sessionStorage.removeItem("idReserva");
    this.comunicacionReserva.limpiarReserva();
    this.comunicacionService.sendView('hotel');

  }

  public actualizarRes() {

    const fechaInicio = new Date(this.reserva.fechaInicio);
    const fechaFin = new Date(this.reserva.fechaSalida);

    if (!(this.reserva.fechaInicio && this.reserva.fechaSalida)) {
      
      return;
    }

    if (this.reserva.fechaInicio && this.reserva.fechaSalida && (fechaInicio.getTime() > fechaFin.getTime())) {
      alert("La fecha de entrada no puede ser mayor a la de salida");
      this.reserva.fechaInicio = "";
      this.reserva.fechaSalida = "";
      return;
    }

    if ((this.cantidadAdultos + this.cantidadNinios) > this.habitacion.cantidad) {
      alert(`Solo se pueden alojar ${this.habitacion.cantidad} personas`);
      this.cantidadAdultos = 0;
      this.cantidadNinios = 0;
      return;
    }

    this.totalDias = this.calcularCantidadDias(fechaInicio,fechaFin);
    let total = this.totalDias * this.habitacion.precio * (this.cantidadAdultos + this.cantidadNinios);
    let regimen = this.reserva.regimen;
    let porcentajeRegimen = regimen == 1 ? 0.05 : (regimen == 2 ? 0.1 : (regimen == 3 ? 0.2 : 0));

    total = total + (total * porcentajeRegimen);

    this.reserva.precio = total;
  }

  public calcularCantidadDias(fechaInicio: Date, fechaFin: Date) {

    const diferenciaEnMs = fechaFin.getTime() - fechaInicio.getTime();

    // Convierte la diferencia a días
    const dias = Math.floor(diferenciaEnMs / (1000 * 60 * 60 * 24));

    return dias;
  }
}
