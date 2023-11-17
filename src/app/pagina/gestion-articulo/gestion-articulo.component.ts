import { Component } from '@angular/core';
import { ArticuloService } from 'src/app/Service/articulo.service';
import { Alerta } from 'src/app/modelo/alerta';
import { ArticuloDTO } from 'src/app/modelo/articulo-dto';

@Component({
  selector: 'app-gestion-articulo',
  templateUrl: './gestion-articulo.component.html',
  styleUrls: ['./gestion-articulo.component.css']
})
export class GestionArticuloComponent {

  articulos: ArticuloDTO[];
  textoBtnEliminar: string = "";
  seleccionados: ArticuloDTO[];
  alerta!: Alerta;

  constructor(private articuloService: ArticuloService) {
    this.seleccionados = [];
    this.articulos = [];
    this.textoBtnEliminar = "";
  }
  ngOnInit(): void {

    this.listarArticulos(1);
  }
  public seleccionar(articulo: ArticuloDTO, estado: boolean) {
    if (estado) {
      this.seleccionados.push(articulo);
    } else {
      this.seleccionados = this.seleccionados.filter(i => i != articulo);
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
  public borrarArticulos() {
    this.seleccionados.forEach(e => {

      this.eliminarArticulo(e.id);
      
      this.articulos = this.articulos.filter(i => i != e);
    });
    this.seleccionados = [];
    this.actualizarMensaje();
  }

  public listarArticulos (pagina: number){

    this.articuloService.listarAll(pagina).subscribe({
      next: data => {
        this.articulos = data.result;
      },
      error: error => {
        console.log(error.error);
      }
    });
  }

  public eliminarArticulo(codigo: string){

    this.articuloService.eliminar(codigo).subscribe({
      next: data => {
        this.alerta =  new Alerta(data.result,"succes");
      },
      error: error => {
        this.alerta =  new Alerta(error.error,"danger");
      }
    });
  }
}
