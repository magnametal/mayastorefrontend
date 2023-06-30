import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { ApiService } from 'src/app/services/api.service';
import { ThemeServiceService } from 'src/app/services/theme-service.service';
import { CarritoServiceService } from 'src/app/services/carrito-service.service';
import { Location } from '@angular/common';
import { LoaderService } from 'src/app/services/loader.service';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { SessionService } from 'src/app/services/session.service';
import { Router } from '@angular/router';
moment.locale('es');

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AdminComponent {
  constructor(public api: ApiService, private location: Location, public themeService: ThemeServiceService, public carritoService: CarritoServiceService, public loaderService: LoaderService, private alertService: AlertServiceService, private sessionService: SessionService, public router: Router,) {}
  activeRoute:any='users';
  users:any[]=[];
  products:any[]=[];
  categories:any[]=[];
  ngOnInit() {
    if (this.sessionService.userData.role!='ADMIN_ROLE') {
      this.router.navigateByUrl('/inicio')
    }else{
      this.loaderService.setLoading(false);
      this.getUsers()
    }
  }
  ngAfterContentInit() {
    
  }
  getUsers(){
    this.loaderService.setLoading(true);
    this.api.apiGetRequest(`usuarios/all`).subscribe({
      next: (resp: any) => {
        if (resp.ok) {
          this.users = resp.users;
        }
        this.loaderService.setLoading(false);
      },
      error: (e: any) => {
        this.alertService.alertMessage('Error de servidor', 'Error');
        console.log(e);
        this.loaderService.setLoading(false);
      },
    });
  }
  getProducts(){
    this.loaderService.setLoading(true);
    this.api.apiGetRequest(`productos/admin`).subscribe({
      next: (resp: any) => {
        if (resp.ok) {
          this.products = resp.products;
        }
        this.loaderService.setLoading(false);
      },
      error: (e: any) => {
        this.alertService.alertMessage('Error de servidor', 'Error');
        console.log(e);
        this.loaderService.setLoading(false);
      },
    });
  }
  getCategories(){
    this.loaderService.setLoading(true);
    this.api.apiGetRequest(`categorias/todas`).subscribe({
      next: (resp: any) => {
        if (resp.ok) {
          this.categories = resp.categories;
        }
        this.loaderService.setLoading(false);
      },
      error: (e: any) => {
        this.alertService.alertMessage('Error de servidor', 'Error');
        console.log(e);
        this.loaderService.setLoading(false);
      },
    });
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
  changeAdminRoute(ruta:any){
    this.activeRoute = ruta;
    if (ruta=='products') {
      this.getProducts()
    }
    if (ruta=='users') {
      this.getUsers()
    }
    if (ruta=='categories') {
      this.getCategories()
    }
  }
}
