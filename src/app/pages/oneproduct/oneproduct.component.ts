import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { ApiService } from 'src/app/services/api.service';
import { ThemeServiceService } from 'src/app/services/theme-service.service';
import { CarritoServiceService } from 'src/app/services/carrito-service.service';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';


moment.locale('es');

@Component({
  selector: 'app-oneproduct',
  templateUrl: './oneproduct.component.html',
  styleUrls: ['./oneproduct.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OneProductComponent {
  constructor(public api: ApiService, public themeService: ThemeServiceService, public carritoService: CarritoServiceService, private route: ActivatedRoute, public productService: ProductsService) { }
  id: any;
  quantity:any=1;
  actualIndex:any = 0;
  animateAction:any = true;
  actualAnimation:any = 'animate__zoomIn'
  product: any = {
    id: 1,
    imgs: ["https://i.ibb.co/Rhp72JW/OGS-KLVR-Banner1-2e16d0ba-fill-380x505-c100.jpg", "https://i.ibb.co/Rhp72JW/OGS-KLVR-Banner1-2e16d0ba-fill-380x505-c100.jpg", "https://i.ibb.co/Rhp72JW/OGS-KLVR-Banner1-2e16d0ba-fill-380x505-c100.jpg"],
    title: "Camisa completa (M / Negra)",
    price: 15.50
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    // SOlicitar a servidor información de producto    
  }
  ngAfterViewInit() {

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
  addToCar(){

  }
}
