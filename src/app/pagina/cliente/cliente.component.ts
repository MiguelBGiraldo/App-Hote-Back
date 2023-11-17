import { Component } from '@angular/core';
import { Alerta } from 'src/app/modelo/alerta';
import { UsuarioDTO } from 'src/app/modelo/usuario-dto';
import { AuthService } from '../../Service/auth.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ClienteService } from '../../Service/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent {

  usuario: UsuarioDTO;
  alerta!: Alerta;
  esEdicion = false;
  codigoCliente: number = 0


  constructor(private authService: AuthService,private route: ActivatedRoute, private clienteService: ClienteService ){
    this.usuario = new UsuarioDTO();

    this.route.params.subscribe(params => {
      this.codigoCliente = <number>params["cod"];
      if(this.codigoCliente > 0)
      this.obtenerCliente(this.codigoCliente);
      // if (this.producto   != null) {
        
      // }
    });
  }

  public sonIguales(): boolean {
    return this.usuario.password == this.usuario.confirmarPassword;

  }

  public registrar() {
    const objeto = this;

    this.authService.registrar(this.usuario).subscribe({
      next: data => {
        objeto.alerta = new Alerta(data.result.Mensaje, "success");
      },
      error: error => {
        objeto.alerta = new Alerta(error.result.error_msg, "danger");
      }
    });
  }

  public obtenerCliente(cod: number){

    this.clienteService.listar(cod).subscribe({
      next: data => {
        this.usuario = data.result;
        this.esEdicion = true;
      },
      error: error  => {
        this.alerta = new Alerta(error.result.error_msg, "danger");
      },
    });
  }

  public editarCliente(){

    this.clienteService.editar(this.usuario).subscribe({
      next: data => {
        this.alerta = new Alerta("Se actualizó correctamente","succes");
      },
      error: error => {
        this.alerta = new Alerta(error.result.error_msg,"danger");
      }
    });
  }

}
