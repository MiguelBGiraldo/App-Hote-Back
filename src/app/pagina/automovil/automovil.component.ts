import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AutomovilDto } from 'src/app/modelo/automovil-dto';
import { AutomovilService } from '../../Service/automovil.service';
import { ImagenService } from 'src/app/Service/imagen.service';
import { Alerta } from 'src/app/modelo/alerta';

@Component({
  selector: 'app-automovil',
  templateUrl: './automovil.component.html',
  styleUrls: ['./automovil.component.css']
})
export class AutomovilComponent {

  automovil: AutomovilDto;
  archivos!: FileList;
  categorias: string[];
  txtBoton: string = "Crear Automovil";
  esEdicion = false;
  codigoAutomovil: string = "";
  alerta!: Alerta;


  constructor(private route: ActivatedRoute, private automovilService: AutomovilService, private imagenService: ImagenService) {
    this.categorias = [];
    this.automovil = new AutomovilDto();
    this.route.params.subscribe(params => {
      this.codigoAutomovil = params["cod"];
      if (this.codigoAutomovil)
        this.obtenerAutmovil(this.codigoAutomovil);

      // if (this.producto   != null) {

      // }
    });
  }

  public crearAutomovil() {
    const objeto = this;

    // this.producto.codigoVendedor = this.tokenService.getUserId();

    console.log(this.automovil);

    if (this.automovil.imagenes.length > 0) {
      this.automovilService.crear(this.automovil).subscribe({
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


    console.log(this.automovil);

    if (this.archivos != null && this.archivos.length > 0) {
      const objeto = this.automovil;
      const formData = new FormData();
      formData.append('file', this.archivos[0]);
      console.log(this.archivos[0]);
      this.imagenService.subir(formData, 'automovil').subscribe({
        next: data => {

          const elementoEncontrado = this.automovil.imagenes.find(obj => obj.id === data.result.ID);
          console.log(this.automovil.imagenes);
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

  public obtenerAutmovil(cod: string) {

    this.automovilService.listar(cod).subscribe({
      next: data => {
        this.automovil = data.result;
        // this.listarImagenesAutmovil(cod);
        this.esEdicion = true;
      },
      error: error => {
        this.alerta = new Alerta(error.error, "danger");
      },
    });
  }

  public editarAutomovil() {
    if (this.automovil.imagenes.length > 0) {
      this.automovilService.editar(this.automovil).subscribe({
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

  public listarImagenesAutmovil(codigoVehiculo: string) {

    this.automovilService.listarImagenes(codigoVehiculo).subscribe({
      next: data => {
        this.automovil.imagenes = data.result;
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

    this.automovil.imagenes = this.automovil.imagenes.filter(i => i.ID != ID);

    // const index = this.automovil.imagenes.indexOf(data.result.url.replace(/\\/g, ''));

    // const index = this.automovil.imagenes.indexOf(ruta);
    // if (index !== -1) {
    //   this.automovil.imagenes.splice(index, 1);

  }

}
