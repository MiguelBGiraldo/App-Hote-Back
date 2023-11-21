import { Component, OnInit } from '@angular/core';
import { HotelDataServiceService } from 'src/app/Service/hotel-data-service.service';
import { HotelService } from '../../Service/hotel.service';
import { HabitacionDTO } from 'src/app/modelo/habitacion-dto';
import { ComunicacionService } from 'src/app/Service/comunicacion.service';

@Component({
  selector: 'app-lista-habitaciones',
  templateUrl: './lista-habitaciones.component.html',
  styleUrls: ['./lista-habitaciones.component.css']
})
export class ListaHabitacionesComponent implements OnInit {

  habitaciones: HabitacionDTO[] = [];

  ngOnInit (){
    this.listarHabitaciones();
  }
  constructor(private hotelDataService: HotelDataServiceService,private communicationService: ComunicacionService) {

  }

  selectRoom(roomId: string) {

    this.hotelDataService.addSelectedRoom(roomId);
    this.communicationService.sendView('hospedaje');
  }

  listarHabitaciones(){

    this.hotelDataService.listarHabitacionesByHotel(this.hotelDataService.getIdHotel()).subscribe({
      next: data => {
        this.habitaciones = data.result;
      },
      error: error => {
        console.log(error.error);
      }
    });

  }


}
