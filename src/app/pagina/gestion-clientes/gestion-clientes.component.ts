import { Component } from '@angular/core';
import { ClienteService } from 'src/app/Service/cliente.service';
import { Alerta } from 'src/app/modelo/alerta';
import { UsuarioDTO } from 'src/app/modelo/usuario-dto';
import { MensajeDTO } from '../../modelo/mensaje-dto';

@Component({
  selector: 'app-gestion-clientes',
  templateUrl: './gestion-clientes.component.html',
  styleUrls: ['./gestion-clientes.component.css']
})
export class GestionClientesComponent {

  clientes: UsuarioDTO[];
  textoBtnEliminar: string = "";
  seleccionados: UsuarioDTO[];
  alerta!: Alerta;
  cliente : UsuarioDTO;

  constructor(private clienteServicio: ClienteService) {
    this.clientes = [];
    this.seleccionados = [];
    this.textoBtnEliminar = "";
    this.cliente = new UsuarioDTO();
  }
  ngOnInit(): void {

    this.listarClientes();
  }
  public seleccionar(cliente: UsuarioDTO, estado: boolean) {
    if (estado) {
      this.seleccionados.push(cliente);
    } else {
      this.seleccionados = this.seleccionados.filter(i => i != cliente);
    }
    this.actualizarMensaje();

  }
  private actualizarMensaje() {
    const tam = this.seleccionados.length;
    if (tam != 0) {
      if (tam == 1) {
        this.textoBtnEliminar = "1 elemento";
      } else {
        this.textoBtnEliminar = tam + " elementos";
      }
    } else {
      this.textoBtnEliminar = "";
    }
  }
  public borrarProductos() {
    this.seleccionados.forEach(e => {

      this.eliminarProducto(e.cedula);
      
      this.clientes = this.clientes.filter(i => i != e);
    });
    this.seleccionados = [];
    this.actualizarMensaje();
  }

  public listarClientes (){


    this.clienteServicio.listarAll(1).subscribe({
      next: data => {
        this.clientes = data.result;
      },
      error: error => {
        console.log(error.result.error_msg, "danger");
      }
    });
  }

  public eliminarProducto(codigo: number){
    
    this.clienteServicio.eliminar(codigo).subscribe({
      next: data => {
        this.alerta =  new Alerta("Se elimino correctamente","succes");
      },
      error: error => {
        console.log(error);
        this.alerta =  new Alerta(error.result.error_msg,"danger");
      }
    });
  }

}
