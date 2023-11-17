import { Injectable } from '@angular/core';
import { HabitacionDTO } from '../modelo/habitacion-dto';
import { HttpClient } from '@angular/common/http';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HabitacionService {

  private habitacionUrl = "http://localhost:80/PROYECTO-BD2/habitacion.php";


  habitaciones: HabitacionDTO[];

  constructor(private http: HttpClient) {
    this.habitaciones = [];
  
  }
  public listar(codigoHabitacion: string) {

    return this.http.get<MensajeDTO>(`${this.habitacionUrl}?peticion=listarHabitacion&codigo=${codigoHabitacion}`);

  }

  public listarAll(pagina: number){

    return  this.http.get<MensajeDTO>(`${this.habitacionUrl}?peticion=listarHabitaciones&page=${pagina}`);
  }

  public crear(habitacion: HabitacionDTO): Observable<MensajeDTO> {

    return this.http.post<MensajeDTO>(`${this.habitacionUrl}`, habitacion);

  }

  public editar(habitacion: HabitacionDTO): Observable<MensajeDTO> {

    return this.http.put<MensajeDTO>(`${this.habitacionUrl}`, habitacion);

  }

  public eliminar(codigoHabitacion: string) {

    return this.http.delete<MensajeDTO>(`${this.habitacionUrl}?id=${codigoHabitacion}`);

  }

  public listarImagenes(codigoHabitacion: string){

    return this.http.get<MensajeDTO>(`${this.habitacionUrl}?peticion=listarImgInstalacion&id=${codigoHabitacion}`);
  }

  public listarHoteles(){

    return this.http.get<MensajeDTO>(`${this.habitacionUrl}?peticion=listarHoteles`);
  }
}
