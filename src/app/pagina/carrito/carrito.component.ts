import { Component, OnInit } from '@angular/core';
import { ComunicacionReservaService } from 'src/app/Service/comunicacion-reserva.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  elementos: any[];
  total: number = 0;

  constructor(private comunicacionReserva: ComunicacionReservaService) {
    this.elementos = [];
  }

  ngOnInit(): void {
    let reserva = this.comunicacionReserva.obtenerReserva();
    let reservaAutomovil = this.comunicacionReserva.obtenerReservaAutomovil();
    let automovil = this.comunicacionReserva.obtenerAutomovil();
    let paquete = this.comunicacionReserva.obtenerPaquete();
    let articulos = this.comunicacionReserva.obtenerArticulos();
    let habitacion = this.comunicacionReserva.obtenerHabitacion();

    
    if (reserva.id && habitacion.id) {
      let obj = {
        nombre: "Reserva habitacion",
        precio: reserva.precio,
        imagen: habitacion.imagenes[0].RUTA,
      };
      console.log(habitacion);
      this.total = (this.total + Number(reserva.precio)) ;
      this.elementos.push(obj);
      console.log("Elementos");
    }

    if (reservaAutomovil.id && automovil.id) {
      console.log("automovil", automovil);
      let obj = {
        nombre: automovil.marca,
        precio: reservaAutomovil.precio,
        imagen: automovil.imagenes[0].RUTA,
      };
      this.total =  (this.total + Number(reservaAutomovil.precio));

      this.elementos.push(obj);
    }

    if (paquete.id) {

      let obj = {
        nombre: paquete.nombre,
        precio: paquete.precio,
        imagen: "/",
      };
      this.total = (this.total + Number(paquete.precio));
      this.elementos.push(obj);
    }

    if (articulos) {
      articulos.forEach(objeto => {
        if (objeto.id) {
          let obj = {
            nombre: objeto.nombre,
            precio: objeto.precio,
            imagen: objeto.imagenes[0].RUTA
          }
          this.total =  (this.total + Number(objeto.precio));
          this.elementos.push(obj);
        }
      });

    }



  }
}
