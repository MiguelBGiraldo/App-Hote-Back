import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioDTO } from '../modelo/usuario-dto';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private clientesUrl= "http://localhost:80/PROYECTO-BD2";


  clientes: UsuarioDTO[];

  constructor(private http: HttpClient) {
    this.clientes = [];

   }

   public listar(codigoCliente: number) {

    return this.http.get<MensajeDTO>(`${this.clientesUrl}/clientes.php?id=${codigoCliente}`);

  }

  public listarAll(pagina: number){

    return  this.http.get<MensajeDTO>(`${this.clientesUrl}/clientes.php?page=${pagina}`);
  }


  public editar(usuario: UsuarioDTO): Observable<MensajeDTO> {

    return this.http.put<MensajeDTO>(`${this.clientesUrl}/clientes.php`, usuario);

  }

  public eliminar(codigoCliente: number) {

    return this.http.delete<MensajeDTO>(`${this.clientesUrl}/clientes.php?id=${codigoCliente}`);

  }
}
