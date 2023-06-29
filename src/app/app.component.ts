import { Component, ViewChild, HostListener } from '@angular/core';
import { environment } from 'src/environments/environment';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ThemeServiceService } from './services/theme-service.service';
import { Router } from '@angular/router';
import { SessionService } from './services/session.service';
import { ApiService } from './services/api.service';
import { AlertServiceService } from './services/alert-service.service';
import { LocalStorageServiceService } from './services/local-storage-service.service';
import { CarritoServiceService } from './services/carrito-service.service';


@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @HostListener('window:resize', ['$event'])
  resize(event: any) {
    this.windowWidth = window.innerWidth;
  }
  windowWidth: any = window.innerWidth;
  showFiller:any;
  categories:any[]=[];
  constructor(
    public themeService: ThemeServiceService,
    public router: Router,
    public sesionService: SessionService,
    private alertService: AlertServiceService,
    private api: ApiService,
    private locastorageservice: LocalStorageServiceService,
    private carritoService: CarritoServiceService
  ) {}

  async ngOnInit() {
    this.sesionService.checkLoguedInfo();
    this.getCategories()
    this.carritoService.loadCarrito();
    const theme = await this.locastorageservice.getData('theme');
    if (theme) {
      if (theme=='0') {
        this.themeService.darktheme=false;
      }
      if (theme=='1') {
        this.themeService.darktheme=true;
      }
    }
  }
  getCategories(){
    this.api.apiGetRequest(`categorias`).subscribe({
      next: (resp: any) => {
        if (resp.ok) {
          this.categories = resp.categories;
        }
      },
      error: (e: any) => {
        this.alertService.alertMessage('Error de servidor', 'Error');
        console.log(e);
      },
    });
  }
  verifyRoute(actualRoute:any, wishRoute:any){
    if (actualRoute==wishRoute) {
      return this.themeService.darktheme?'menuContainerActiveBlack':'menuContainerActive';
    }else{
      return this.themeService.darktheme?'menuContainerBlack':'menuContainer';
    }
  }
  emailPrivaticy(email:any){
    return email.substring(0, 2)+'****'+email.substring(14);
  }
  closesession(){
    this.sesionService.logOut()
  }
  toggle(e:any){
    e.checked
    this.locastorageservice.saveData('theme', e.checked?'1':'0');
  }
}
