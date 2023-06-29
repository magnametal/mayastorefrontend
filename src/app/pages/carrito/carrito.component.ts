import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { ApiService } from 'src/app/services/api.service';
import { ThemeServiceService } from 'src/app/services/theme-service.service';
import { CarritoServiceService } from 'src/app/services/carrito-service.service';
import { Location } from '@angular/common';
import { LoaderService } from 'src/app/services/loader.service';
moment.locale('es');

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CarritoComponent {
  constructor(public api: ApiService, private location: Location, public themeService: ThemeServiceService, public carritoService: CarritoServiceService, public loaderService: LoaderService) {}

  ngOnInit() {
    this.loaderService.setLoading(false);
  }
  ngAfterContentInit() {

  }
  getPictureRoute(item:any){
    return environment.URL_IMAGEN + item;
  }
  getTotalPrice(){
    let totalPrice = 0;
    this.carritoService.carrito.map(item => {
      totalPrice = totalPrice + (item.price*item.quantity)
    })
    return totalPrice.toFixed(2);
  }
  eliminarDeCarrito(index:any){
    this.carritoService.removeFromCar(index)
  }
  back(): void {
    this.location.back()
  }
}
