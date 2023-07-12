import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { ApiService } from 'src/app/services/api.service';
import { ThemeServiceService } from 'src/app/services/theme-service.service';
import { ProductsService } from 'src/app/services/products.service';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ErrorsService } from 'src/app/services/errors.service';
moment.locale('es');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent {
  constructor(private errorsService:ErrorsService, public api: ApiService, public themeService: ThemeServiceService, public productsService: ProductsService, private alertService: AlertServiceService, public loaderService: LoaderService) {}
  ngOnInit() {

  }
  mode:any = 'home';
  totalPages:any;
  pageEvent:any;
  page=0;
  loadingSerach:any = false;
  query:any='';
  categories:any[]=[];
  products:any[]=[];
  ngAfterContentInit() {
    this.getProductsInit();
  }
  getProductsInit(){
    this.loaderService.setLoading(true);
    this.api.apiGetRequest(`productos/inicio`).subscribe({
      next: (resp: any) => {
        if (resp.ok) {
          this.categories = resp.categories;
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
  getQuerySearch(page?:any){
    if (this.query!='') {
      this.mode = 'search';
      this.loadingSerach = true;
      this.api.apiGetRequest(`productos/buscar/${this.query}`, page?page:this.page*10).subscribe({
        next: (resp: any) => {
          if (resp.ok) {
            if (resp.products.length==0) {
              this.restoreHome()
              this.alertService.alertMessage('No hay resultados para esta búsqueda.', 'Mensaje del sistema');
            }else{
              this.products = resp.products;
              this.totalPages = resp.total;
            }
          }else{
            this.errorsService.catchErrorCodes(resp.code)
          }
          this.loadingSerach = false;
        },
        error: (e: any) => {
          this.alertService.alertMessage('Error de servidor', 'Error');
          console.log(e);
          this.loadingSerach = false;
        },
      });
    }
  }
  onPaginateChange(e:any){
    this.products = [];
    const index = e.pageIndex*12;
    this.page = e.pageIndex;
    this.getQuerySearch(index);
  }
  restoreHome(){
    this.totalPages = 0;
    this.mode = 'home';
    this.page = 0;
    this.query = '';
    this.products = [];
  }
  getPictureRoute(item:any){
    return environment.URL_IMAGEN + item;
  }
}
