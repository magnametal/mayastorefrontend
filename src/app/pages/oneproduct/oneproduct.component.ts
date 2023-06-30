import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { ApiService } from 'src/app/services/api.service';
import { ThemeServiceService } from 'src/app/services/theme-service.service';
import { CarritoServiceService } from 'src/app/services/carrito-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { Location } from '@angular/common';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { LoaderService } from 'src/app/services/loader.service';


moment.locale('es');

@Component({
  selector: 'app-oneproduct',
  templateUrl: './oneproduct.component.html',
  styleUrls: ['./oneproduct.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OneProductComponent {
  constructor(public api: ApiService, public loaderService: LoaderService, private location: Location, public themeService: ThemeServiceService, public carritoService: CarritoServiceService, private route: ActivatedRoute, private router: Router, public productService: ProductsService, private alertService: AlertServiceService) { }
  quantity:any=1;
  actualIndex:any = 0;
  animateAction:any = true;
  actualAnimation:any = 'animate__zoomIn'
  product:any;
  recommended:any[]=[];
  ngOnInit(): void {
    // SOlicitar a servidor información de producto    
    this.route.params.subscribe(params => {
      this.getProductsOneProduct(params.id);
    });
  }
  ngAfterContentInit() {

  }
  getProductsOneProduct(id:any){
    this.loaderService.setLoading(true);
    this.api.apiGetRequest(`productos/uno/${id}`).subscribe({
      next: (resp: any) => {
        if (resp.ok) {
          this.product = resp.product;
          this.recommended = resp.recommended;
        }
        this.loaderService.setLoading(false);
        document.getElementsByTagName('mat-drawer-content')[0].scrollTo(0, 0)
      },
      error: (e: any) => {
        this.alertService.alertMessage('Error de servidor', 'Error');
        console.log(e);
        this.loaderService.setLoading(false);
      },
    });
  }
  getPictureRoute(item: any) {
    return environment.URL_IMAGEN + item;
  }
  volver(){
    this.animateAction=false;
    setTimeout(() => {
      this.actualIndex = this.actualIndex-1;
      this.actualAnimation = 'animate__zoomIn';
      this.actualAnimation = 'animate__slideInLeft';
      this.animateAction=true;
    }, 50);
  }
  siguiente(){
    this.animateAction=false;
    setTimeout(() => {
      this.actualIndex = this.actualIndex+1;
      this.actualAnimation = 'animate__zoomIn';
      this.actualAnimation = 'animate__slideInRight';
      this.animateAction=true;
    }, 50);
  }
  changeQuantity(e:any){
    if (e.target.value<=0) {
      this.quantity=1;
    }
  }
  addToCar(product:any){
    if (this.quantity>0) {
      this.carritoService.addproductoToCar(product, this.quantity);
    }
    this.quantity = 1;
    this.navigate();
  }
  navigate() {
    this.router.navigate(['/carrito'])
  }
  back(): void {
    this.location.back()
  }
}
