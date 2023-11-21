import { Injectable } from '@angular/core';
import { ReservaDTO } from '../modelo/reserva-dto';
import { AutomovilDto } from '../modelo/automovil-dto';
import { AutomovilReservaDTO } from '../modelo/automovil-reserva-dto';
import { PaqueteTourDTO } from '../modelo/paquete-tour-dto';

@Injectable({
  providedIn: 'root'
})
export class ComunicacionReservaService {

  reserva : ReservaDTO = new ReservaDTO();
  reservaAutomovil: AutomovilReservaDTO = new AutomovilReservaDTO();
  automovil: AutomovilDto = new AutomovilDto();
  paqueteTour: PaqueteTourDTO = new PaqueteTourDTO();

  constructor() { }

  public setReserva(reserva: ReservaDTO){

    this.reserva = reserva;
  }

  public limpiarReserva(){
    this.reserva = new ReservaDTO();
  }

  public setIdResAutomovil (id: string) {

    this.reserva.idAutomovil = id;
  }

  public setIdPaquete(id: string){

    this.reserva.paqueteTour = id;
  }

  public setAutomovil(automovil: AutomovilDto){
    this.automovil = automovil;
  }

  public setReservaAutomovil(reserva: AutomovilReservaDTO){
    this.reservaAutomovil = reserva;
  }

  public limpiarAutomovil(){

    this.automovil = new AutomovilDto();
  }

  public setPaqueteTour(paquete: PaqueteTourDTO){
    this.paqueteTour = paquete;
  }

  public limpiarPaqueteTour(paquete: PaqueteTourDTO){
    this.paqueteTour = new PaqueteTourDTO();
  }
}
