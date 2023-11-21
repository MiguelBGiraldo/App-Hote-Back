import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from '../../Service/comunicacion.service';
import { ComunicacionReservaService } from '../../Service/comunicacion-reserva.service';

@Component({
  selector: 'app-vista-cliente',
  templateUrl: './vista-cliente.component.html',
  styleUrls: ['./vista-cliente.component.css']
})
export class VistaClienteComponent implements OnInit {

  currentView: string = ''; // Para mantener el estado de la vista actual
  botones: boolean = false

  constructor(private communicationService: ComunicacionService, private comunicacionReserva: ComunicacionReservaService){}
  showView(view: string) {
    
    this.currentView = view; // Establece la vista actual basada en el evento emitido desde el menú
  }

  stateBotones(state: boolean){

    this.botones = state
  }

  ngOnInit() {
    this.communicationService.getView().subscribe((view: string) => {
      this.showView(view);
    });
    
    this.communicationService.getButton().subscribe((button: boolean) => {
      this.stateBotones(button);
    });
  }

  public eliminarReserva(){
    this.comunicacionReserva.limpiarReserva();
  }

  public finalizarReserva(){
    
  }

}
