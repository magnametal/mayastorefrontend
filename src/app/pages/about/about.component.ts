import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { ApiService } from 'src/app/services/api.service';
import { ThemeServiceService } from 'src/app/services/theme-service.service';
import { CarritoServiceService } from 'src/app/services/carrito-service.service';
import { Location } from '@angular/common';
import { LoaderService } from 'src/app/services/loader.service';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { ErrorsService } from 'src/app/services/errors.service';
moment.locale('es');

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AboutComponent {
  constructor(
    public api: ApiService, 
    public themeService: ThemeServiceService, 
    public carritoService: CarritoServiceService, 
    public loaderService: LoaderService,
  ) {}
  message:any = 'Mensaje de información sobre Creaciones maya...';
  ngOnInit() {
    this.loaderService.setLoading(false);
  }
  ngAfterContentInit() {

  }
  
}
