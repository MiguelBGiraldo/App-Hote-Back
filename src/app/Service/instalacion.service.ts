import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { InstalacionDTO } from '../modelo/instalacion-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstalacionService {

  private instalacionUrl = "http://localhost:80/PROYECTO-BD2/instalacion.php";


  instalaciones: InstalacionDTO[];

  constructor(private http: HttpClient) {
    this.instalaciones = [];
  
  }
  public listar(codigoInstalacion: string) {

    return this.http.get<MensajeDTO>(`${this.instalacionUrl}?peticion=listarInstalacion&codigo=${codigoInstalacion}`);

  }

  public listarAll(pagina: number){

    return  this.http.get<MensajeDTO>(`${this.instalacionUrl}?peticion=listarInstalaciones&page=${pagina}`);
  }

  public crear(automovil: InstalacionDTO): Observable<MensajeDTO> {

    return this.http.post<MensajeDTO>(`${this.instalacionUrl}`, automovil);

  }

  public editar(automovil: InstalacionDTO): Observable<MensajeDTO> {

    return this.http.put<MensajeDTO>(`${this.instalacionUrl}`, automovil);

  }

  public eliminar(codigoInstalacion: string) {

    return this.http.delete<MensajeDTO>(`${this.instalacionUrl}?id=${codigoInstalacion}`);

  }

  public listarImagenes(codigoInstalacion: string){

    return this.http.get<MensajeDTO>(`${this.instalacionUrl}?peticion=listarImgInstalacion&id=${codigoInstalacion}`);
  }

  public listarHoteles(){

    return this.http.get<MensajeDTO>(`${this.instalacionUrl}?peticion=listarHoteles`);
  }
}
