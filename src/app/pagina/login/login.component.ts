import { Component } from '@angular/core';
import { AuthService } from 'src/app/Service/auth.service';
import { TokenService } from 'src/app/Service/token.service';
import { Alerta } from 'src/app/modelo/alerta';
import { LoginDTO } from 'src/app/modelo/login-dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginUser: LoginDTO;
  alerta!: Alerta;
  
  constructor(private authService: AuthService, private tokenService: TokenService,){

    this.loginUser = new LoginDTO();
  }

  public login(){

    const objeto = this;
    console.log(this.loginUser);

    this.authService.login(this.loginUser).subscribe({
      next: data => {
        if(data.status == 'ok'){
          objeto.tokenService.login(data.result.ID, data.result.rol );
        }
        else{
          objeto.alerta = new Alerta(data.result.error_msg, "danger");
        }
        
      },
      error: error => {
        objeto.alerta = new Alerta(error.error.respuesta, "danger");
      }
    });
  }
}
