import { Component, OnInit } from '@angular/core';
import { AutomovilDto } from 'src/app/modelo/automovil-dto';
import { AutomovilService } from '../../Service/automovil.service';
import { HotelDataServiceService } from '../../Service/hotel-data-service.service';
import { ComunicacionService } from '../../Service/comunicacion.service';

@Component({
  selector: 'app-lista-automoviles',
  templateUrl: './lista-automoviles.component.html',
  styleUrls: ['./lista-automoviles.component.css']
})
export class ListaAutomovilesComponent implements OnInit {

  automoviles: AutomovilDto[];

  constructor(private automovilService :AutomovilService, private hotelDataService : HotelDataServiceService, private comunicacionService : ComunicacionService){
  this.automoviles = [];
  }

  ngOnInit() {

    alert("Holaa");
    this.listarAutomoviles(1);
  }

  public listarAutomoviles (pagina: number){

    this.automovilService.listarAll(pagina).subscribe({
      next: data => {
        this.automoviles = data.result;
      },
      error: error => {
        console.log(error.error);
      }
    });
  }

  public selectCar(id: string){

    this.hotelDataService.setSelectAutomovil(id);
    this.comunicacionService.sendView('reservaAutomovil');
  }

}
