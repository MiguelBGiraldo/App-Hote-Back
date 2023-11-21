import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pagina/login/login.component';
import { RegistroComponent } from './pagina/registro/registro.component';
import { ClienteComponent } from './pagina/cliente/cliente.component';
import { HospedajeComponent } from './pagina/hospedaje/hospedaje.component';
import { PaquetetourComponent } from './pagina/paquetetour/paquetetour.component';
import { PestaniaComponent } from './pagina/pestania/pestania.component';
import { VehiculoComponent } from './pagina/vehiculo/vehiculo.component';
import { TiendaComponent } from './pagina/tienda/tienda.component';
import { GestionClientesComponent } from './pagina/gestion-clientes/gestion-clientes.component';
import { AutomovilComponent } from './pagina/automovil/automovil.component';
import { GestioAutomovilComponent } from './pagina/gestio-automovil/gestio-automovil.component';
import { ArticuloComponent } from './pagina/articulo/articulo.component';
import { GestionArticuloComponent } from './pagina/gestion-articulo/gestion-articulo.component';
import { HotelComponent } from './pagina/hotel/hotel.component';
import { GestionHotelComponent } from './pagina/gestion-hotel/gestion-hotel.component';
import { InstalacionComponent } from './pagina/instalacion/instalacion.component';
import { GestionInstalacionComponent } from './pagina/gestion-instalacion/gestion-instalacion.component';
import { HabitacionComponent } from './pagina/habitacion/habitacion.component';
import { GestionHabitacionComponent } from './pagina/gestion-habitacion/gestion-habitacion.component';
import { PrincipalAdministradorComponent } from './pagina/principal-administrador/principal-administrador.component';
import { VistaClienteComponent } from './pagina/vista-cliente/vista-cliente.component';
import { CarritoComponent } from './pagina/carrito/carrito.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'cliente', component: ClienteComponent},
  {path: 'hospedaje', component: HospedajeComponent},
  {path: 'paquetetour', component:PaquetetourComponent},
  {path: 'pestania', component:PestaniaComponent},
  {path: 'vehiculo', component:VehiculoComponent},
  {path: 'tienda', component:TiendaComponent},
  {path: 'gestionClientes', component: GestionClientesComponent},
  {path: 'editarCliente/:cod', component: ClienteComponent},
  {path: 'automovil', component:AutomovilComponent},
  {path: 'editarAutomovil/:cod', component:AutomovilComponent},
  {path: 'gestionAutomovil', component:GestioAutomovilComponent},
  {path: 'articulo', component:ArticuloComponent},
  {path: 'gestionArticulo', component:GestionArticuloComponent},
  {path: 'editarArticulo/:cod', component:ArticuloComponent},
  {path: 'hotel', component:HotelComponent},
  {path: 'gestionHotel', component:GestionHotelComponent},
  {path: 'editarHotel/:cod', component:HotelComponent},
  {path: 'instalacion', component:InstalacionComponent},
  {path: 'gestionInstalacion', component:GestionInstalacionComponent},
  {path: 'editarInstalacion/:cod', component:InstalacionComponent},
  {path: 'habitacion', component:HabitacionComponent},
  {path: 'gestionHabitacion', component:GestionHabitacionComponent},
  {path: 'editarHabitacion/:cod', component:HabitacionComponent},
  {path: 'principalAdmin', component:PrincipalAdministradorComponent},
  {path: 'principalCliente', component:VistaClienteComponent},
  {path: 'carrito', component:CarritoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
