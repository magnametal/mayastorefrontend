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
import { ErrorsService } from 'src/app/services/errors.service';

moment.locale('es');

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CategoriaComponent {
  constructor(public api: ApiService, private location: Location, public themeService: ThemeServiceService, public productsService: ProductsService, private route: ActivatedRoute, private alertService: AlertServiceService, public loaderService: LoaderService, private errorsService: ErrorsService) {}
  category: any;
  subcategory: any;
  subcategories: any[]=[];
  onlycats:any = true;
  products:any[]=[];
  totalPages:any;
  pageEvent:any;
  page=0;
  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.subcategory=='0') {
        this.getProductsBycategory(params.category)
      }else{
        this.getProductsBySubcategory(params.category, params.subcategory)
      }
    });
  }
  getProductsBycategory(cat:any, page?:any){
    this.loaderService.setLoading(true);
    this.api.apiGetRequest(`productos/categoria/${cat}`, page?page:this.page*12).subscribe({
      next: (resp: any) => {
        if (resp.ok) {
          if (!resp.onlycats) {
            this.subcategories = resp.subcategories;
          }else{
            this.products = resp.products;
            this.totalPages = resp.total;
          }
          this.category = resp.category;
          this.subcategory = false;
          this.onlycats = resp.onlycats;
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
  }
  onPaginateChange(e:any){
    this.products = [];
    const index = e.pageIndex*12;
    this.page = e.pageIndex;
    if (this.onlycats) {
      this.getProductsBySubcategory(this.category.id, this.subcategory.id, index);
    }else{
      this.getProductsBycategory(this.category.id, index);
    }
  }
  getProductsBySubcategory(cat:any, subcat:any, page?:any){
    this.loaderService.setLoading(true);
    this.api.apiGetRequest(`productos/subcategoria/${cat}/${subcat}`, page?page:this.page*12).subscribe({
      next: (resp: any) => {
        if (resp.ok) {
          this.products = resp.products;
          this.totalPages = resp.total;
          this.subcategory = resp.subcategory;
          this.category = resp.category;
          this.onlycats = true;
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
  }
  getPictureRoute(item:any){
    return environment.URL_IMAGEN + item;
  }
  back(): void {
    this.location.back()
  }
}
