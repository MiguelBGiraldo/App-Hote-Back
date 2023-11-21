import { Injectable } from '@angular/core';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { HttpClient } from '@angular/common/http';
import { PaqueteTourDTO } from '../modelo/paquete-tour-dto';

@Injectable({
  providedIn: 'root'
})
export class PaqueteTourService {

  private paquetelUrl = "http://localhost:80/PROYECTO-BD2/paquetetour.php";


  automoviles: PaqueteTourDTO[];

  constructor(private http: HttpClient) {
    this.automoviles = [];
  
  }
  public listar(codigoPaquete: string) {

    return this.http.get<MensajeDTO>(`${this.paquetelUrl}?peticion=listarPaquete&codigo=${codigoPaquete}`);

  }

  public listarAll(pagina: number){

    return  this.http.get<MensajeDTO>(`${this.paquetelUrl}?peticion=listarPaquetes&page=${pagina}`);
  }
}
