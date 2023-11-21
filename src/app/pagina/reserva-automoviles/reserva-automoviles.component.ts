import { Component, OnInit } from '@angular/core';
import { AutomovilService } from '../../Service/automovil.service';
import { HotelDataServiceService } from 'src/app/Service/hotel-data-service.service';
import { ComunicacionService } from '../../Service/comunicacion.service';
import { ComunicacionReservaService } from 'src/app/Service/comunicacion-reserva.service';
import { AutomovilDto } from 'src/app/modelo/automovil-dto';
import { Alerta } from 'src/app/modelo/alerta';
import { AutomovilReservaDTO } from 'src/app/modelo/automovil-reserva-dto';

@Component({
  selector: 'app-reserva-automoviles',
  templateUrl: './reserva-automoviles.component.html',
  styleUrls: ['./reserva-automoviles.component.css']
})
export class ReservaAutomovilesComponent implements OnInit {

  automovil: AutomovilDto;
  autoMovilReserva: AutomovilReservaDTO;
  alerta!: Alerta;
  servicios : any[] = [];
  totalDias: number = 0;

  constructor (private automovilService: AutomovilService,private hotelDataService: HotelDataServiceService, private comunicacionService: ComunicacionService, private comunicacionReserva: ComunicacionReservaService){
    this.automovil = new AutomovilDto();
    this.autoMovilReserva = new AutomovilReservaDTO();

  }

  public  ngOnInit(): void {
    this.obtenerAutomovil();
    this.listarServicios();

  }

  public obtenerAutomovil() {

    this.automovilService.listar(this.hotelDataService.getIdAutomovil()).subscribe({
      next: data => {
        this.automovil = data.result;
        // this.listarImagenesAutmovil(cod);

      },
      error: error => {
        this.alerta = new Alerta(error.error, "danger");
      },
    });
  }

  public listarServicios (){
    
    this.automovilService.listarServicios().subscribe({
      next: data => {
        this.servicios = data.result;
        // this.listarImagenesAutmovil(cod);

      },
      error: error => {
        this.alerta = new Alerta(error.error, "danger");
      },
    });
  }

  public reservar() {

    let id = new Date().getTime() + "";
    this.comunicacionReserva.setIdResAutomovil(id);
    this.comunicacionReserva.setAutomovil(this.automovil);
    this.autoMovilReserva.id = id;
    this.comunicacionReserva.setReservaAutomovil(this.autoMovilReserva);
    this.comunicacionService.sendView('');
    this.comunicacionService.sendButton(true);
  }


  public borrar() {

    // window.sessionStorage.removeItem("idReserva");
    // this.comunicacionReserva.limpiarReserva();
    this.comunicacionService.sendView('');

  }

  public actualizarRes() {

    const fechaInicio = new Date(this.autoMovilReserva.fechaInicio);
    const fechaFin = new Date(this.autoMovilReserva.fechaSalida);

    if (!(this.autoMovilReserva.fechaInicio && this.autoMovilReserva.fechaSalida)) {
      return;
    }

    if (this.autoMovilReserva.fechaInicio && this.autoMovilReserva.fechaSalida && (fechaInicio.getTime() > fechaFin.getTime())) {
      alert("La fecha de entrada no puede ser mayor a la de salida");
      this.autoMovilReserva.fechaInicio = "";
      this.autoMovilReserva.fechaSalida = "";
      return;
    }


    this.totalDias = this.calcularCantidadDias(fechaInicio,fechaFin);
    let total = this.totalDias * this.automovil.precio 
    let servicio = this.autoMovilReserva.idServicio;
    let porcentajeRegimen = servicio > 0 ? 0.1  : 0;

    total = total + (total * porcentajeRegimen);

    this.autoMovilReserva.precio = total;
  }

  public calcularCantidadDias(fechaInicio: Date, fechaFin: Date) {

    const diferenciaEnMs = fechaFin.getTime() - fechaInicio.getTime();

    // Convierte la diferencia a días
    const dias = Math.floor(diferenciaEnMs / (1000 * 60 * 60 * 24));

    return dias;
  }
}
