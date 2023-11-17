import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticuloService } from 'src/app/Service/articulo.service';
import { ImagenService } from 'src/app/Service/imagen.service';
import { Alerta } from 'src/app/modelo/alerta';
import { ArticuloDTO } from 'src/app/modelo/articulo-dto';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.css']
})
export class ArticuloComponent {

  articulo: ArticuloDTO;
  archivos!: FileList;
  categorias: string[];
  txtBoton: string = "Crear Articulo";
  esEdicion = false;
  codigoArticulo: string = "";
  alerta!: Alerta;


  constructor(private route: ActivatedRoute, private articuloService: ArticuloService, private imagenService: ImagenService) {
    this.categorias = [];
    this.articulo = new ArticuloDTO();
    this.route.params.subscribe(params => {
      this.codigoArticulo = params["cod"];
      if (this.codigoArticulo)
        this.obtenerArticulo(this.codigoArticulo);

      // if (this.producto   != null) {

      // }
    });
  }

  public crearArticulo() {
    const objeto = this;

    // this.producto.codigoVendedor = this.tokenService.getUserId();

    // console.log(this.automovil);

    if (this.articulo.imagenes.length > 0) {
      this.articuloService.crear(this.articulo).subscribe({
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
      const objeto = this.articulo;
      const formData = new FormData();
      formData.append('file', this.archivos[0]);
      console.log(this.archivos[0]);
      this.imagenService.subir(formData, 'articulo').subscribe({
        next: data => {

          const elementoEncontrado = this.articulo.imagenes.find(obj => obj.id === data.result.ID);
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

  public obtenerArticulo(cod: string) {

    this.articuloService.listar(cod).subscribe({
      next: data => {
        this.articulo = data.result;
        // this.listarImagenesAutmovil(cod);
        this.esEdicion = true;
      },
      error: error => {
        this.alerta = new Alerta(error.error, "danger");
      },
    });
  }

  public editarArticulo() {
    if (this.articulo.imagenes.length > 0) {
      this.articuloService.editar(this.articulo).subscribe({
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

  public listarImagenesArticulo(codigoArticulo: string) {

    this.articuloService.listarImagenes(codigoArticulo).subscribe({
      next: data => {
        this.articulo.imagenes = data.result;
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

    this.articulo.imagenes = this.articulo.imagenes.filter(i => i.ID != ID);

    // const index = this.automovil.imagenes.indexOf(data.result.url.replace(/\\/g, ''));

    // const index = this.automovil.imagenes.indexOf(ruta);
    // if (index !== -1) {
    //   this.automovil.imagenes.splice(index, 1);

  }
}
