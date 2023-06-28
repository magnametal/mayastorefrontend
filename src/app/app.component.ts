import { Component, ViewChild, HostListener } from '@angular/core';
import { environment } from 'src/environments/environment';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ThemeServiceService } from './services/theme-service.service';
import { Router } from '@angular/router';
import { SessionService } from './services/session.service';


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
  constructor(
    public themeService: ThemeServiceService,
    public router: Router,
    public sesionService: SessionService
  ) {}

  ngOnInit() {
    this.sesionService.checkLoguedInfo();
  }
  verifyRoute(actualRoute:any, wishRoute:any){
    if (actualRoute==wishRoute) {
      return this.themeService.darktheme?'menuContainerActiveBlack':'menuContainerActive';
    }else{
      return this.themeService.darktheme?'menuContainerBlack':'menuContainer';
    }
  }
  getPictureRoute(item:any){
    return environment.URL_IMAGEN + item;
  }
  emailPrivaticy(email:any){
    return email.substring(0, 2)+'****'+email.substring(14);
  }
  closesession(){
    this.sesionService.logOut()
  }
}
