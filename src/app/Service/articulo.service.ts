import { Injectable } from '@angular/core';
import { ArticuloDTO } from '../modelo/articulo-dto';
import { HttpClient } from '@angular/common/http';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

  private articuloUrl = "http://localhost:80/PROYECTO-BD2/articulo.php";


  automoviles: ArticuloDTO[];

  constructor(private http: HttpClient) {
    this.automoviles = [];

  }
  public listar(codigoArticulo: string) {

    return this.http.get<MensajeDTO>(`${this.articuloUrl}?peticion=listarArticulo&codigo=${codigoArticulo}`);

  }

  public listarAll(pagina: number) {

    return this.http.get<MensajeDTO>(`${this.articuloUrl}?peticion=listarArticulos&page=${pagina}`);
  }

  // public obtener(cod: number){

  //   return this.http.get<MensajeDTO>(`${this.automovilUrl}?${cod}`);
  // }

  public crear(articulo: ArticuloDTO): Observable<MensajeDTO> {

    return this.http.post<MensajeDTO>(`${this.articuloUrl}`, articulo);

  }

  public editar(articulo: ArticuloDTO): Observable<MensajeDTO> {

    return this.http.put<MensajeDTO>(`${this.articuloUrl}`, articulo);

  }

  public eliminar(codigoArticulo: string) {

    return this.http.delete<MensajeDTO>(`${this.articuloUrl}?id=${codigoArticulo}`);

  }

  public listarImagenes(codigoArticulo: string) {

    return this.http.get<MensajeDTO>(`${this.articuloUrl}?peticion=listarImgHoteles&id=${codigoArticulo}`);
  }
}