import { Injectable } from '@angular/core';
import { HotelDTO } from '../modelo/hotel-dto';
import { HttpClient } from '@angular/common/http';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  private hotellUrl = "http://localhost:80/PROYECTO-BD2/hotel.php";


  hoteles: HotelDTO[];

  constructor(private http: HttpClient) {
    this.hoteles = [];
  
  }
  public listar(codigoHotel: string) {

    return this.http.get<MensajeDTO>(`${this.hotellUrl}?peticion=listarHotel&codigo=${codigoHotel}`);

  }

  public listarAll(pagina: number){

    return  this.http.get<MensajeDTO>(`${this.hotellUrl}?peticion=listarHoteles&page=${pagina}`);
  }

  // public obtener(cod: number){
    
  //   return this.http.get<MensajeDTO>(`${this.hotellUrl}?${cod}`);
  // }

  public crear(hotel: HotelDTO): Observable<MensajeDTO> {

    return this.http.post<MensajeDTO>(`${this.hotellUrl}`, hotel);

  }

  public editar(automovil: HotelDTO): Observable<MensajeDTO> {

    return this.http.put<MensajeDTO>(`${this.hotellUrl}`, automovil);

  }

  public eliminar(codigoHotel: string) {

    return this.http.delete<MensajeDTO>(`${this.hotellUrl}?id=${codigoHotel}`);

  }

  public listarImagenes(codigoHotel: string){

    return this.http.get<MensajeDTO>(`${this.hotellUrl}?peticion=listarImgHotel&id=${codigoHotel}`)
  }
}
