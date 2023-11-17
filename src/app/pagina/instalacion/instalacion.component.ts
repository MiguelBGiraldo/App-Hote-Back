import { publishFacade } from '@angular/compiler';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImagenService } from 'src/app/Service/imagen.service';
import { InstalacionService } from 'src/app/Service/instalacion.service';
import { Alerta } from 'src/app/modelo/alerta';
import { InstalacionDTO } from 'src/app/modelo/instalacion-dto';

@Component({
  selector: 'app-instalacion',
  templateUrl: './instalacion.component.html',
  styleUrls: ['./instalacion.component.css']
})
export class InstalacionComponent {

  instalacion: InstalacionDTO;
  archivos!: FileList;
  hoteles: any[];
  txtBoton: string = "Crear Instalacion";
  esEdicion = false;
  codigoInstalacion: string = "";
  alerta!: Alerta;


  constructor(private route: ActivatedRoute, private instalacionService: InstalacionService, private imagenService: ImagenService) {
    this.hoteles = [];
    this.hoteles.push({id : '0', 'nombre': "Selecionar Hotel"});

    this.obtenerHoteles();

    this.instalacion = new InstalacionDTO();
    this.route.params.subscribe(params => {
      this.codigoInstalacion = params["cod"];
      if (this.codigoInstalacion)
        this.obtenerInstalacion(this.codigoInstalacion);
    });
  }

  public crearInstalacion() {
    const objeto = this;

    // this.producto.codigoVendedor = this.tokenService.getUserId();


    if (this.instalacion.imagenes.length > 0) {
      this.instalacionService.crear(this.instalacion).subscribe({
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


    console.log(this.instalacion);

    if (this.archivos != null && this.archivos.length > 0) {
      const objeto = this.instalacion;
      const formData = new FormData();
      formData.append('file', this.archivos[0]);
      console.log(this.archivos[0]);
      this.imagenService.subir(formData, 'instalacion').subscribe({
        next: data => {

          const elementoEncontrado = this.instalacion.imagenes.find(obj => obj.id === data.result.ID);
          console.log(this.instalacion.imagenes);
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

  public obtenerInstalacion(cod: string) {

    this.instalacionService.listar(cod).subscribe({
      next: data => {
        this.instalacion = data.result;
        // this.listarImagenesAutmovil(cod);
        this.esEdicion = true;
      },
      error: error => {
        this.alerta = new Alerta(error.error, "danger");
      },
    });
  }

  public editarInstalacion() {
    if (this.instalacion.imagenes.length > 0) {
      this.instalacionService.editar(this.instalacion).subscribe({
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

  public listarImagenesInstalacion(codigoInstalacion: string) {

    this.instalacionService.listarImagenes(codigoInstalacion).subscribe({
      next: data => {
        this.instalacion.imagenes = data.result;
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

    this.instalacion.imagenes = this.instalacion.imagenes.filter(i => i.ID != ID);

  }

  public obtenerHoteles(){

    this.instalacionService.listarHoteles().subscribe({
      next: data => {
        this.hoteles = data.result;
      },
      error: error => {
        this.alerta = new Alerta(error.error, "danger");
      },
    })
  }
}
