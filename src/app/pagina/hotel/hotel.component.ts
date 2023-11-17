import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from 'src/app/Service/hotel.service';
import { ImagenService } from 'src/app/Service/imagen.service';
import { Alerta } from 'src/app/modelo/alerta';
import { HotelDTO } from 'src/app/modelo/hotel-dto';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent {

  hotel: HotelDTO;
  archivos!: FileList;
  categorias: string[];
  txtBoton: string = "Crear Hotel";
  esEdicion = false;
  codigoHotel: string = "";
  alerta!: Alerta;


  constructor(private route: ActivatedRoute, private hotelService: HotelService, private imagenService: ImagenService) {
    this.categorias = [];
    this.hotel = new HotelDTO();
    this.route.params.subscribe(params => {
      this.codigoHotel = params["cod"];
      if (this.codigoHotel)
        this.obtenerHotel(this.codigoHotel);

      // if (this.producto   != null) {

      // }
    });
  }

  public crearHotel() {
    const objeto = this;

    // this.producto.codigoVendedor = this.tokenService.getUserId();

    // console.log(this.automovil);

    if (this.hotel.imagenes.length > 0) {
      this.hotelService.crear(this.hotel).subscribe({
        next: data => {
          this.alerta = new Alerta(data.result.Mensaje, "succes");
        },
        error: error => {
          this.alerta = new Alerta(error.error.respuesta, "danger");
        }
      });
    } else {
      this.alerta = new Alerta("Debe seleccionar al menos una imagen y subirla", "danger");

    }
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.archivos = event.target.files;
    }

  }


  // en data.respuesta tiene que ir url al final
  public subirImagenes() {


    // console.log(this.articulo);

    if (this.archivos != null && this.archivos.length > 0) {
      const objeto = this.hotel;
      const formData = new FormData();
      formData.append('file', this.archivos[0]);
      console.log(this.archivos[0]);
      this.imagenService.subir(formData, 'hotel').subscribe({
        next: data => {

          const elementoEncontrado = this.hotel.imagenes.find(obj => obj.id === data.result.ID);
          // console.log(this.articulo.imagenes);
          // console.log(elementoEncontrado);

          // const index = this.automovil.imagenes.indexOf(data.result.url.replace(/\\/g, ''));
          if (elementoEncontrado)
            this.alerta = new Alerta("Esta imagen ya fue cargada", "succes");

          else {
            this.alerta = new Alerta("La imagen se cargo correctamente", "succes");
            objeto.imagenes.push(data.result);
          }
        },
        error: error => {
          this.alerta = new Alerta(error.error, "danger");
        }
      });
    } else {
      this.alerta = new Alerta("Debe seleccionar al menos una imagen y subirla", "danger");
    }
  }

  public obtenerHotel(cod: string) {

    this.hotelService.listar(cod).subscribe({
      next: data => {
        this.hotel = data.result;
        // this.listarImagenesAutmovil(cod);
        this.esEdicion = true;
      },
      error: error => {
        this.alerta = new Alerta(error.error, "danger");
      },
    });
  }

  public editarHotel() {
    if (this.hotel.imagenes.length > 0) {
      this.hotelService.editar(this.hotel).subscribe({
        next: data => {
          this.alerta = new Alerta("Se actualizó correctamente", "succes");
        },
        error: error => {
          this.alerta = new Alerta(error.error, "danger");
        }
      });
    } else {

      this.alerta = new Alerta("Debe seleccionar al menos una imagen y subirla", "danger");
    }

  }

  public listarImagenesHotel(codigoHotel: string) {

    this.hotelService.listarImagenes(codigoHotel).subscribe({
      next: data => {
        this.hotel.imagenes = data.result;
        this.esEdicion = true;
      },
      error: error => {
        this.alerta = new Alerta(error.error, "danger");
      },
    });
  }

  public eliminarImagen(ID: string) {

    // Aquí puedes implementar la lógica para eliminar el elemento
    // Por ejemplo, puedes eliminarlo del arreglo items

    this.hotel.imagenes = this.hotel.imagenes.filter(i => i.ID != ID);

    // const index = this.automovil.imagenes.indexOf(data.result.url.replace(/\\/g, ''));

    // const index = this.automovil.imagenes.indexOf(ruta);
    // if (index !== -1) {
    //   this.automovil.imagenes.splice(index, 1);

  }

}
