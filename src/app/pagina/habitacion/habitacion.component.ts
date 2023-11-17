import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HabitacionService } from 'src/app/Service/habitacion.service';
import { ImagenService } from 'src/app/Service/imagen.service';
import { Alerta } from 'src/app/modelo/alerta';
import { HabitacionDTO } from 'src/app/modelo/habitacion-dto';

@Component({
  selector: 'app-habitacion',
  templateUrl: './habitacion.component.html',
  styleUrls: ['./habitacion.component.css']
})
export class HabitacionComponent {

  habitacion: HabitacionDTO;
  archivos!: FileList;
  hoteles: any[];
  txtBoton: string = "Crear Habitacion";
  esEdicion = false;
  codigoHabitacion: string = "";
  alerta!: Alerta;


  constructor(private route: ActivatedRoute, private habitacionService: HabitacionService, private imagenService: ImagenService) {
    this.hoteles = [];
    this.hoteles.push({id : '0', 'nombre': "Selecionar Hotel"});

    this.obtenerHoteles();

    this.habitacion = new HabitacionDTO();
    this.route.params.subscribe(params => {
      this.codigoHabitacion = params["cod"];
      if (this.codigoHabitacion)
        this.obtenerHabitacion(this.codigoHabitacion);
    });
  }

  public crearHabitacion() {
    const objeto = this;

    // this.producto.codigoVendedor = this.tokenService.getUserId();


    if (this.habitacion.imagenes.length > 0) {
      this.habitacionService.crear(this.habitacion).subscribe({
        next: data => {
          this.alerta = new Alerta(data.result, "succes");
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


    console.log(this.habitacion);

    if (this.archivos != null && this.archivos.length > 0) {
      const objeto = this.habitacion;
      const formData = new FormData();
      formData.append('file', this.archivos[0]);
      console.log(this.archivos[0]);
      this.imagenService.subir(formData, 'instalacion').subscribe({
        next: data => {

          const elementoEncontrado = this.habitacion.imagenes.find(obj => obj.id === data.result.ID);
          console.log(this.habitacion.imagenes);
          console.log(elementoEncontrado);

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

  public obtenerHabitacion(cod: string) {

    this.habitacionService.listar(cod).subscribe({
      next: data => {
        this.habitacion = data.result;
        // this.listarImagenesAutmovil(cod);
        this.esEdicion = true;
      },
      error: error => {
        this.alerta = new Alerta(error.error, "danger");
      },
    });
  }

  public editarHabitacion() {
    if (this.habitacion.imagenes.length > 0) {
      this.habitacionService.editar(this.habitacion).subscribe({
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

  public listarImagenesHabitacion(codigoHabitacion: string) {

    this.habitacionService.listarImagenes(codigoHabitacion).subscribe({
      next: data => {
        this.habitacion.imagenes = data.result;
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

    this.habitacion.imagenes = this.habitacion.imagenes.filter(i => i.ID != ID);

  }

  public obtenerHoteles(){

    this.habitacionService.listarHoteles().subscribe({
      next: data => {
        this.hoteles = data.result;
      },
      error: error => {
        this.alerta = new Alerta(error.error, "danger");
      },
    })
  }
}
