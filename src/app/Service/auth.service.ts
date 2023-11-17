import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioDTO } from '../modelo/usuario-dto';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { LoginDTO } from '../modelo/login-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authURL = 'http://localhost:80/PROYECTO-BD2/auth.php';
  constructor(private http: HttpClient) {}

  public registrar(usuario: UsuarioDTO): Observable<MensajeDTO> {
    console.log(`${this.authURL}/clientes.php`);
    return this.http.post<MensajeDTO>(`${this.authURL}/clientes.php`, usuario);
  }
  
  public login(sesion: LoginDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}`, sesion);
  }



  public getAutenticationByToken() {
    return sessionStorage.getItem('token');
  }

  public limpiarToken() {
    return sessionStorage.setItem('token', '');
  }
}
