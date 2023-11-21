import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SesionService } from './sesion.service';

const TOKEN_KEY = "AuthToken";
const ROLE = "ROLE";

@Injectable({
  providedIn: 'root'
})

export class TokenService {

  
  constructor(private router: Router, private sesionService: SesionService) { }

  public setToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }
  public isLogged(): boolean {
    if (this.getToken()) {
      return true;
    }
    return false;
  }
  public login(token: string, rol: string) {
    this.setToken(token);
    // this.sesionService.updateSession(true);
    this.setRole(rol);
    this.sesionService.updateSession(true);
    if (rol == '1')
      this.router.navigate(["/principalAdmin"]);
    else
      this.router.navigate(["/principalCliente"]);
  }
  public logout() {
    window.sessionStorage.clear();
    this.sesionService.updateSession(false);

    // this.sesionService.updateSession(false);
    this.router.navigate(["/login"]);
  }

  // private decodePayload(token: string): any {
  //   const payload = token!.split(".")[1];
  //   const payloadDecoded = Buffer.from(payload, 'base64').toString('ascii');
  //   const values = JSON.parse(payloadDecoded);
  //   return values;
  // }

  // public getEmail(): string {
  //   const token = this.getToken();
  //   if (token) {
  //     const values = this.decodePayload(token);
  //     return values.sub;
  //   }
  //   return "";
  // }

  // public getUserId(): number {
  //   const token = this.getToken();
  //   if (token) {
  //     // const values = this.decodePayload(token);
  //     return values.sub_code;
  //   }
  //   return 0;
  // }

  // public getRole(): string[] {
  //   const token = this.getToken();
  //   if (token) {
  //     const values = this.decodePayload(token);
  //     return values.roles;
  //   }
  //   return [];
  // }

  public setRole(role: string) {
    window.sessionStorage.removeItem(ROLE);
    window.sessionStorage.setItem(ROLE, role);
  }

  public getRole(): string | null {
    return sessionStorage.getItem(ROLE);
  }
}
