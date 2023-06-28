import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { ApiService } from 'src/app/services/api.service';
import { ThemeServiceService } from 'src/app/services/theme-service.service';
import { ProductsService } from 'src/app/services/products.service';
moment.locale('es');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent {
  constructor(public api: ApiService, public themeService: ThemeServiceService, public productsService: ProductsService) {}

  ngOnInit() {

  }
  ngAfterViewInit() {

  }
  getPictureRoute(item:any){
    return environment.URL_IMAGEN + item;
  }
}
