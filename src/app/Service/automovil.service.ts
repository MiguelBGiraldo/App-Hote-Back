import { Injectable } from '@angular/core';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { AutomovilDto } from '../modelo/automovil-dto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GestioAutomovilComponent } from '../pagina/gestio-automovil/gestio-automovil.component';

@Injectable({
  providedIn: 'root'
})
export class AutomovilService {

  private automovilUrl = "http://localhost:80/PROYECTO-BD2/automovil.php";


  automoviles: AutomovilDto[];

  constructor(private http: HttpClient) {
    this.automoviles = [];
  
  }
  public listar(codigoVehiculo: string) {

    return this.http.get<MensajeDTO>(`${this.automovilUrl}?peticion=listarVehiculo&codigo=${codigoVehiculo}`);

  }

  public listarAll(pagina: number){

    return  this.http.get<MensajeDTO>(`${this.automovilUrl}?peticion=listarVehiculos&page=${pagina}`);
  }

  // public obtener(cod: number){
    
  //   return this.http.get<MensajeDTO>(`${this.automovilUrl}?${cod}`);
  // }

  public crear(automovil: AutomovilDto): Observable<MensajeDTO> {

    return this.http.post<MensajeDTO>(`${this.automovilUrl}`, automovil);

  }

  public editar(automovil: AutomovilDto): Observable<MensajeDTO> {

    return this.http.put<MensajeDTO>(`${this.automovilUrl}`, automovil);

  }

  public eliminar(codigoAutomovil: string) {

    return this.http.delete<MensajeDTO>(`${this.automovilUrl}?id=${codigoAutomovil}`);

  }

  public listarImagenes(codigoAutomovil: string){

    return this.http.get<MensajeDTO>(`${this.automovilUrl}?peticion=listarImgProductos&id=${codigoAutomovil}`)
  }

  public listarServicios(){

    return this.http.get<MensajeDTO>(`${this.automovilUrl}?peticion=listarServicios`);
  }

}
