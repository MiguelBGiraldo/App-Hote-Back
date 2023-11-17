import { Component } from '@angular/core';
import { HotelService } from 'src/app/Service/hotel.service';
import { Alerta } from 'src/app/modelo/alerta';
import { HotelDTO } from 'src/app/modelo/hotel-dto';

@Component({
  selector: 'app-gestion-hotel',
  templateUrl: './gestion-hotel.component.html',
  styleUrls: ['./gestion-hotel.component.css']
})
export class GestionHotelComponent {

  hoteles: HotelDTO[];
  textoBtnEliminar: string = "";
  seleccionados: HotelDTO[];
  alerta!: Alerta;

  constructor(private hotelService: HotelService) {
    this.seleccionados = [];
    this.hoteles = [];
    this.textoBtnEliminar = "";
  }
  ngOnInit(): void {

    this.listarHoteles(1);
  }
  public seleccionar(hotel: HotelDTO, estado: boolean) {
    if (estado) {
      this.seleccionados.push(hotel);
    } else {
      this.seleccionados = this.seleccionados.filter(i => i != hotel);
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
  public borrarHoteles() {
    this.seleccionados.forEach(e => {

      this.eliminarHotel(e.id);
      
      this.hoteles = this.hoteles.filter(i => i != e);
    });
    this.seleccionados = [];
    this.actualizarMensaje();
  }

  public listarHoteles (pagina: number){

    this.hotelService.listarAll(pagina).subscribe({
      next: data => {
        this.hoteles = data.result;
      },
      error: error => {
        console.log(error.error);
      }
    });
  }

  public eliminarHotel(codigo: string){

    this.hotelService.eliminar(codigo).subscribe({
      next: data => {
        this.alerta =  new Alerta(data.result,"succes");
      },
      error: error => {
        this.alerta =  new Alerta(error.error,"danger");
      }
    });
  }
}
