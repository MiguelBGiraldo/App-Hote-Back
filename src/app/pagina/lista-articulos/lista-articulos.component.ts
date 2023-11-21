import { Component } from '@angular/core';
import { ArticuloService } from 'src/app/Service/articulo.service';
import { ComunicacionReservaService } from 'src/app/Service/comunicacion-reserva.service';
import { ComunicacionService } from 'src/app/Service/comunicacion.service';
import { HotelDataServiceService } from 'src/app/Service/hotel-data-service.service';
import { ArticuloDTO } from 'src/app/modelo/articulo-dto';

@Component({
  selector: 'app-lista-articulos',
  templateUrl: './lista-articulos.component.html',
  styleUrls: ['./lista-articulos.component.css']
})
export class ListaArticulosComponent {

  articulos: ArticuloDTO[];

  constructor(private articuloService: ArticuloService, private hotelDataService: HotelDataServiceService, private comunicacionService: ComunicacionService, private comunicacionReserva: ComunicacionReservaService) {

    this.articulos = [];
  }

  ngOnInit() {

    this.listarArticulos(1);
  }

  public listarArticulos(pagina: number) {

    this.articuloService.listarAll(pagina).subscribe({
      next: data => {

        let articulosSeleccionados = this.comunicacionReserva.obtenerArticulos();

         this.articulos = data.result;
         this.articulos = this.articulos.filter(obj1 => !articulosSeleccionados.some(obj2 => obj2.id === obj1.id));
      },
      error: error => {
        console.log(error.error);
      }
    });
  }

  public selectArticulo(id: string) {

    this.articuloService.listar(id).subscribe({
      next: data => {
        let articulo = data.result;

        this.comunicacionReserva.agregarArticulo(articulo);
        this.comunicacionService.sendView('');
        this.comunicacionService.sendButton(true);
      },
      error: error => {
        console.log(error.error);
      }
    });

  }

}
