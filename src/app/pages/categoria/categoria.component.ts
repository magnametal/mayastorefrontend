import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { ApiService } from 'src/app/services/api.service';
import { ThemeServiceService } from 'src/app/services/theme-service.service';
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { LoaderService } from 'src/app/services/loader.service';

moment.locale('es');

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CategoriaComponent {
  constructor(public api: ApiService, private location: Location, public themeService: ThemeServiceService, public productsService: ProductsService, private route: ActivatedRoute, private alertService: AlertServiceService, public loaderService: LoaderService) {}
  category: any;
  subcategory: any;
  subcategories: any[]=[];
  onlycats:any = true;
  products:any[]=[];
  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.subcategory=='0') {
        this.getProductsBycategory(params.category)
      }else{
        this.getProductsBySubcategory(params.category, params.subcategory)
      }
    });
  }
  getProductsBycategory(cat:any){
    this.loaderService.setLoading(true);
    this.api.apiGetRequest(`productos/categoria/${cat}`).subscribe({
      next: (resp: any) => {
        if (resp.ok) {
          if (!resp.onlycats) {
            this.subcategories = resp.subcategories;
          }else{
            this.products = resp.products;
          }
          this.category = resp.category;
          this.subcategory = false;
          this.onlycats = resp.onlycats;
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
  getProductsBySubcategory(cat:any, subcat:any){
    this.loaderService.setLoading(true);
    this.api.apiGetRequest(`productos/subcategoria/${cat}/${subcat}`).subscribe({
      next: (resp: any) => {
        if (resp.ok) {
          this.products = resp.products;
          this.subcategory = resp.subcategory;
          this.category = resp.category;
          this.onlycats = true;
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
  back(): void {
    this.location.back()
  }
}
