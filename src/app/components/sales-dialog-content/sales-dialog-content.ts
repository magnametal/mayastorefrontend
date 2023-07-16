import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { ApiService } from 'src/app/services/api.service';
import { CarritoServiceService } from 'src/app/services/carrito-service.service';
import { ErrorsService } from 'src/app/services/errors.service';
import { LoaderService } from 'src/app/services/loader.service';
import { LocalStorageServiceService } from 'src/app/services/local-storage-service.service';
import { SessionService } from 'src/app/services/session.service';
import { ThemeServiceService } from 'src/app/services/theme-service.service';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
moment.locale('es');

@Component({
  selector: 'sales-dialog-content',
  templateUrl: 'sales-dialog-content.html',
  styleUrls: ['./sales-dialog-content.scss'],
})
export class SalesDialogContent {
  constructor(
  @Inject(MAT_DIALOG_DATA) public data: any,
  public api: ApiService,
  public dialogRef: MatDialogRef<SalesDialogContent>,
  public themeService: ThemeServiceService, 
  public carritoService: CarritoServiceService, 
  public loaderService: LoaderService) {

  }
  carrito:any[]=[];
  user:any='';
  created_at:any='';
  ngAfterContentInit() {
    const { carrito, user, created_at } = this.data.sale;
    this.carrito = carrito;
    this.user = user;
    this.created_at = created_at;
  }
  ngOnInit(): void {}
  closeDialog() {
    this.dialogRef.close(true);
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
  getSubfinalPrice(product:any){
    let price = 0;
    for (const carro of product.car) {
      price = price + (product.price*carro.quantity);
    }
    return price;
  }
  getFinalPrice(){
    let price = 0;
    this.carrito.map(item => {
      for (const carro of item.car) {
        price = price + (item.price*carro.quantity);
      }
    })
    return price;
  }
  getTime(time:any){
    return moment(time).format('hh:mm a DD/MM/YYYY')
  }
}
