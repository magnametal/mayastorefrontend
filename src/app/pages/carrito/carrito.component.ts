import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { ApiService } from 'src/app/services/api.service';
import { ThemeServiceService } from 'src/app/services/theme-service.service';
import { CarritoServiceService } from 'src/app/services/carrito-service.service';
import { Location } from '@angular/common';
import { LoaderService } from 'src/app/services/loader.service';
import { ErrorsService } from 'src/app/services/errors.service';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertContent } from '../../components/alert-dialog-content/alert-dialog-content';
import { SessionService } from 'src/app/services/session.service';
import { Router } from '@angular/router';
import { LocalStorageServiceService } from 'src/app/services/local-storage-service.service';

moment.locale('es');

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CarritoComponent {
  constructor(public api: ApiService, private location: Location, public themeService: ThemeServiceService, public carritoService: CarritoServiceService, public loaderService: LoaderService, private errorsService:ErrorsService, private alertService: AlertServiceService, private dialog: MatDialog, private sesionService: SessionService, private router: Router, private locastorageservice: LocalStorageServiceService) {}

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
  getSubfinalPrice(product:any){
    let price = 0;
    for (const carro of product.car) {
      price = price + (product.price*carro.quantity);
    }
    return price;
  }
  getFinalPrice(){
    let price = 0;
    this.carritoService.carrito.map(item => {
      for (const carro of item.car) {
        price = price + (item.price*carro.quantity);
      }
    })
    return price;
  }
  facturarCarrito(){
    const deleteDialog = this.dialog.open(AlertContent, {
      data: {
        type: 'action',
        header: 'Confirmar acción',
        details: `¿Seguro desea facturar productos por un total de ${this.getFinalPrice().toFixed(2)}$? esta acción no puede deshacerse. El administrador del sistema se contactará contigo mediante tu información y datos de conexión para concretar el pedido.`,
        button: 'Confirmar'
      },
      width: '300px'
    });
    deleteDialog.afterClosed().subscribe((result:any) => {
      if (result) {
        this.facturarCarritoRequest();
      }
    });
  }
  facturarCarritoRequest(){
    if (this.carritoService.carrito.length!=0) {
      if (this.sesionService.userData && this.sesionService.userData.status==1) {
        this.loaderService.setLoading(true);
        this.api.apiPostRequest(`ventas`, {
          user: this.sesionService.userData.id,
          carrito: this.carritoService.carrito
        }).subscribe({
          next: (resp: any) => {
            if (resp.ok) {
              this.locastorageservice.saveData('carrito', JSON.stringify([]));
              this.carritoService.carrito = [];
              this.alertService.alertMessage('Tu compra esta siendo procesada. Serán contactado por el administrador del sistema para concretar tu compra.', 'Compra completada');
              this.router.navigate(['inicio']);
            }else{
              this.errorsService.catchErrorCodes(resp.code)
            }
            this.loaderService.setLoading(false);
          },
          error: (e: any) => {
            this.alertService.alertMessage('Error de servidor', 'Error');
            console.log(e);
            this.loaderService.setLoading(false);
          },
        });
      }else{
        this.alertService.alertMessage('Por favor inicia sesión para facturar tus productos. Si no tienes cuenta te invitamos a registrarte en la sección de registro.', 'Error de acceso');
        this.sesionService.logOut()
        this.router.navigate(['/login'])
      }
    }
  }
}
