import { Component, OnInit } from '@angular/core';
import { AuthService } from './Service/auth.service';
import { TokenService } from './Service/token.service';
import { Router } from '@angular/router';
import { SesionService } from './Service/sesion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLogged = false;
  title = 'Bases-de-datos';

  constructor(private auth: AuthService, private tokenService: TokenService,private router: Router, private sesionService: SesionService) {
    // console.log(this.isLogged);
  }

  public logout() {
    this.tokenService.logout();
  }

  ngOnInit(): void {
    const objeto = this;
    this.sesionService.currentMessage.subscribe({
      next: data => {
        objeto.actualizarSesion(data);
      }
    });
    this.actualizarSesion(this.tokenService.isLogged());
  }

  private actualizarSesion(estado: boolean) {
    this.isLogged = estado;
  }
}
