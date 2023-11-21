import { Injectable } from '@angular/core';
import { ReservaDTO } from '../modelo/reserva-dto';
import { AutomovilDto } from '../modelo/automovil-dto';
import { AutomovilReservaDTO } from '../modelo/automovil-reserva-dto';
import { PaqueteTourDTO } from '../modelo/paquete-tour-dto';
import { ArticuloDTO } from '../modelo/articulo-dto';
import { HabitacionDTO } from '../modelo/habitacion-dto';

@Injectable({
  providedIn: 'root'
})
export class ComunicacionReservaService {

  reserva : ReservaDTO = new ReservaDTO();
  habitacion: HabitacionDTO = new HabitacionDTO();
  reservaAutomovil: AutomovilReservaDTO = new AutomovilReservaDTO();
  automovil: AutomovilDto = new AutomovilDto();
  paqueteTour: PaqueteTourDTO = new PaqueteTourDTO();
  articulos: ArticuloDTO[] = [];

  constructor() { }

  public setReserva(reserva: ReservaDTO){

    this.reserva = reserva;
  }

  public setHabitacion(hab: HabitacionDTO){
    this.habitacion = hab;
  }

  public limpiarReserva(){
    this.reserva = new ReservaDTO();
    this.articulos = [];
    this.automovil = new AutomovilDto();
    this.reservaAutomovil = new AutomovilReservaDTO();
    this.paqueteTour = new PaqueteTourDTO();
  }

  public setIdResAutomovil (id: string) {

    this.reserva.idAutomovil = id;
  }

  public setIdPaquete(id: string){

    this.reserva.paqueteTour = id;
  }

  public setPaquete(paquete : PaqueteTourDTO){

    this.paqueteTour = paquete;
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

  public agregarArticulo(articulo : ArticuloDTO){
    this.articulos.push(articulo);
  }

  public limpiarArticulos(){

    this.articulos = [];
  }

  public obtenerHabitacion(){
    return this.habitacion;
  }

  public obtenerArticulos(){
    return this.articulos;
  }

  public obtenerAutomovil(){
    return this.automovil;
  }

  public obtenerPaquete(){
    
    return this.paqueteTour;
  }

  public obtenerReserva(){

    return this.reserva;
  }

  public obtenerReservaAutomovil(){

    return this.reservaAutomovil;
  }
}
