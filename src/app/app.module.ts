import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pagina/login/login.component';
import { FormsModule } from '@angular/forms';
import { RegistroComponent } from './pagina/registro/registro.component';
import { ClienteComponent } from './pagina/cliente/cliente.component';
import { HospedajeComponent } from './pagina/hospedaje/hospedaje.component';
import { PaquetetourComponent } from './pagina/paquetetour/paquetetour.component';
import { PestaniaComponent } from './pagina/pestania/pestania.component';
import { VehiculoComponent } from './pagina/vehiculo/vehiculo.component';
import { TiendaComponent } from './pagina/tienda/tienda.component';
import { AlertaComponent } from './pagina/alerta/alerta.component';
import { HttpClientModule } from '@angular/common/http';
import { GestionClientesComponent } from './pagina/gestion-clientes/gestion-clientes.component';
import { AutomovilComponent } from './pagina/automovil/automovil.component';
import { GestioAutomovilComponent } from './pagina/gestio-automovil/gestio-automovil.component';
import { ArticuloComponent } from './pagina/articulo/articulo.component';
import { GestionArticuloComponent } from './pagina/gestion-articulo/gestion-articulo.component';
import { GestionHotelComponent } from './pagina/gestion-hotel/gestion-hotel.component';
import { HotelComponent } from './pagina/hotel/hotel.component';
import { GestionInstalacionComponent } from './pagina/gestion-instalacion/gestion-instalacion.component';
import { InstalacionComponent } from './pagina/instalacion/instalacion.component';
import { HabitacionComponent } from './pagina/habitacion/habitacion.component';
import { GestionHabitacionComponent } from './pagina/gestion-habitacion/gestion-habitacion.component';
import { MenuComponent } from './pagina/menu/menu.component';
import { PrincipalAdministradorComponent } from './pagina/principal-administrador/principal-administrador.component';
import { VistaClienteComponent } from './pagina/vista-cliente/vista-cliente.component';
import { ClienteMenuComponent } from './pagina/cliente-menu/cliente-menu.component';
import { ListaHotelesComponent } from './pagina/lista-hoteles/lista-hoteles.component';
import { ListaHabitacionesComponent } from './pagina/lista-habitaciones/lista-habitaciones.component';
import { ListaAutomovilesComponent } from './pagina/lista-automoviles/lista-automoviles.component';
import { ReservaAutomovilesComponent } from './pagina/reserva-automoviles/reserva-automoviles.component';
import { ListaTourComponent } from './pagina/lista-tour/lista-tour.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    ClienteComponent,
    HospedajeComponent,
    PaquetetourComponent,
    PestaniaComponent,
    VehiculoComponent,
    TiendaComponent,
    AlertaComponent,
    GestionClientesComponent,
    AutomovilComponent,
    GestioAutomovilComponent,
    ArticuloComponent,
    GestionArticuloComponent,
    GestionHotelComponent,
    HotelComponent,
    GestionInstalacionComponent,
    InstalacionComponent,
    HabitacionComponent,
    GestionHabitacionComponent,
    MenuComponent,
    PrincipalAdministradorComponent,
    VistaClienteComponent,
    ClienteMenuComponent,
    ListaHotelesComponent,
    ListaHabitacionesComponent,
    ListaAutomovilesComponent,
    ReservaAutomovilesComponent,
    ListaTourComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
