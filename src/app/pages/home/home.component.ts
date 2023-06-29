import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { ApiService } from 'src/app/services/api.service';
import { ThemeServiceService } from 'src/app/services/theme-service.service';
import { ProductsService } from 'src/app/services/products.service';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { LoaderService } from 'src/app/services/loader.service';
moment.locale('es');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent {
  constructor(public api: ApiService, public themeService: ThemeServiceService, public productsService: ProductsService, private alertService: AlertServiceService, public loaderService: LoaderService) {}

  ngOnInit() {

  }
  categories:any[]=[];
  ngAfterContentInit() {
    this.getProductsInit();
  }
  getProductsInit(){
    this.loaderService.setLoading(true);
    this.api.apiGetRequest(`productos/inicio`).subscribe({
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
}
