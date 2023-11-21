import { Injectable } from '@angular/core';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HotelDataServiceService {

  private habitacionUrl = "http://localhost:80/PROYECTO-BD2/hotel-habitacion.php";

  selectedHotelId: string = "";
  nombreHotel: string = "";
  selectedRooms: string = "";
  selectAutomovilId: string = "";

  constructor(private http: HttpClient){
    this.selectedHotelId = "";
    this.nombreHotel = "";
    this.selectedRooms = "";

  }

  setSelectedHotelId(hotelId: string) {
    this.selectedHotelId = hotelId;
  }

  getIdHotel(){
    return this.selectedHotelId;
  }

  public getIdHab(){
    return this.selectedRooms;
  }

  addSelectedRoom(roomId: string) {
    this.selectedRooms = roomId;
  }

  clearData() {
    this.selectedHotelId = "";
    this.selectedRooms = "";
    this.nombreHotel = "";
  }

  clearHotel(){
    this.selectedHotelId = "";
    this.nombreHotel = "";
  }

  clearHabitacion(){
    this.selectedRooms = "";
  } 

  public listarHabitacionesByHotel(hotel: string){

    return  this.http.get<MensajeDTO>(`${this.habitacionUrl}?peticion=listarHabitaciones&hotel=${hotel}`);
  }

  public setSelectNombreHotel(nombre: string){

    this.nombreHotel = nombre;
  }

  public getNombreHotel(){
    return this.nombreHotel;
  }


  public setSelectAutomovil(codigo : string){

    this.selectAutomovilId = codigo;
  }

  public getIdAutomovil(){
    
    return this.selectAutomovilId;
  }

}
