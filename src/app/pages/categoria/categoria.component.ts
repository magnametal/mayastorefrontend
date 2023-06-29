import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { ApiService } from 'src/app/services/api.service';
import { ThemeServiceService } from 'src/app/services/theme-service.service';
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'

moment.locale('es');

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CategoriaComponent {
  constructor(public api: ApiService, private location: Location, public themeService: ThemeServiceService, public productsService: ProductsService, private route: ActivatedRoute) {}
  category: any;
  ngOnInit() {
    this.category = this.route.snapshot.paramMap.get('category')
  }
  ngAfterViewInit() {

  }
  getPictureRoute(item:any){
    return environment.URL_IMAGEN + item;
  }
  back(): void {
    this.location.back()
  }
}
