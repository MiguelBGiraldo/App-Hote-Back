import { Component, OnInit } from '@angular/core';
import { HotelDataServiceService } from 'src/app/Service/hotel-data-service.service';
import { HotelDTO } from 'src/app/modelo/hotel-dto';
import { Router } from '@angular/router';
import { VistaClienteComponent } from '../vista-cliente/vista-cliente.component';
import { ComunicacionService } from '../../Service/comunicacion.service';
import { HotelService } from '../../Service/hotel.service';
import { ComunicacionReservaService } from '../../Service/comunicacion-reserva.service';

@Component({
  selector: 'app-lista-hoteles',
  templateUrl: './lista-hoteles.component.html',
  styleUrls: ['./lista-hoteles.component.css']
})
export class ListaHotelesComponent implements OnInit {

  hotels: HotelDTO[] = [
    // Lista de hoteles (puede venir de una API)
  ];

  constructor(private hotelDataService: HotelDataServiceService,private comunicacionService: ComunicacionService, private hotelService: HotelService,private comunicacionReserva:ComunicacionReservaService) {}

  ngOnInit() {

    this.listarHoteles(1);
  }
  selectHotel(hotelId: string, nombreHotel: string) {

    window.sessionStorage.removeItem("idReserva");
    this.comunicacionReserva.limpiarReserva();


    this.hotelDataService.setSelectedHotelId(hotelId);
    this.comunicacionService.sendView('habitacion');
    this.hotelDataService.setSelectNombreHotel(nombreHotel);
  }

  public listarHoteles (pagina: number){

    this.hotelService.listarAll(pagina).subscribe({
      next: data => {
        this.hotels = data.result;
      },
      error: error => {
        console.log(error.error);
      }
    });
  }
}
