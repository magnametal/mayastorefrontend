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
import { LocalStorageServiceService } from 'src/app/services/local-storage-service.service';
import { ErrorsService } from 'src/app/services/errors.service';


moment.locale('es');

@Component({
  selector: 'app-oneproduct',
  templateUrl: './oneproduct.component.html',
  styleUrls: ['./oneproduct.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OneProductComponent {
  constructor(public api: ApiService, public loaderService: LoaderService, private location: Location, public themeService: ThemeServiceService, public carritoService: CarritoServiceService, private route: ActivatedRoute, private router: Router, public productService: ProductsService, private alertService: AlertServiceService, private localStorageService: LocalStorageServiceService, private errorsService: ErrorsService) { }
  quantity:any=1;
  actualIndex:any = 0;
  animateAction:any = true;
  actualAnimation:any = 'animate__zoomIn'
  product:any;
  indexcolor:any;
  recommended:any[]=[];
  colors:any[]=[];
  tallas:any[]=[];
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
        }else{
          this.errorsService.catchErrorCodes(resp.code)
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
    let sizeActual:any = false;
      for (const size of product.sizes) {
        if (size.active) {
          sizeActual = size;
        }
      }
    if (!sizeActual && product.sizes.length!=0) {
      this.alertService.alertMessage('Recuerda seleccionar una talla', '¡Alerta!');
    }else{
      if (!this.indexcolor && this.indexcolor!=0 && product.colors.length!=0) {
        this.alertService.alertMessage('Recuerda seleccionar un color', '¡Alerta!');
      }else{
        const index = this.carritoService.carrito.findIndex((item:any) => item.id==product.id);
        if (index!=-1) {
          const index0 = this.carritoService.carrito[index].car.findIndex((item:any) => item.color==product.colors[this.indexcolor] && item.size.id==sizeActual.id);
          if (index0!=-1) {
            this.carritoService.carrito[index].car[index0].quantity = this.carritoService.carrito[index].car[index0].quantity + this.quantity;
          }else{
            let object = { color: this.indexcolor || this.indexcolor==0?product.colors[this.indexcolor]:false, size: sizeActual?sizeActual:false, quantity: this.quantity };
            const indexNoSize = this.carritoService.carrito[index].car.findIndex((item:any) => item.color==product.colors[this.indexcolor] && !item.size);
            const indexNocolor = this.carritoService.carrito[index].car.findIndex((item:any) => !item.color && item.size.id==sizeActual.id);
            if (indexNoSize!=-1) {
              this.carritoService.carrito[index].car[indexNoSize].quantity = this.carritoService.carrito[index].car[indexNoSize].quantity + this.quantity;
            }else{
              if (indexNocolor!=-1) {
                this.carritoService.carrito[index].car[indexNocolor].quantity = this.carritoService.carrito[index].car[indexNocolor].quantity + this.quantity;
              }else{
                this.carritoService.carrito[index].car.unshift(object);
              }
            }
          }
          this.localStorageService.saveData('carrito', JSON.stringify(this.carritoService.carrito));
          this.alertService.alertMessage('Elemento agregado exitosamente', 'Acción exitosa');
        }else{
          this.carritoService.addproductoToCar({ car: [{ color: this.indexcolor || this.indexcolor==0?product.colors[this.indexcolor]:false, size: sizeActual?sizeActual:false, quantity: this.quantity }], ...product });
        }
        this.quantity = 1;
        this.navigate();
      }
    }
  }
  vienePorTallas(){
    let bandera = false;
    if (this.product.sizes.length!=0) {
      bandera = true;
    }
    return bandera;
  }
  navigate() {
    this.router.navigate(['/carrito'])
  }
  back(): void {
    this.location.back()
  }
  setTalla(index:any){
    this.product.sizes.forEach((size:any, i:any) => {
      this.product.sizes[i].active = false;
    });
    this.product.sizes[index].active = true;
  }
  setSelectedColor(index:any){
    this.indexcolor = index;
  }
}
