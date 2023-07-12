import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { ApiService } from 'src/app/services/api.service';
import { ThemeServiceService } from 'src/app/services/theme-service.service';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { LocalStorageServiceService } from 'src/app/services/local-storage-service.service';
import { SessionService } from 'src/app/services/session.service';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import { ErrorsService } from 'src/app/services/errors.service';

moment.locale('es');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {
  constructor(
    public api: ApiService, 
    public themeService: ThemeServiceService,
    private alertService: AlertServiceService,
    private locastorageservice: LocalStorageServiceService,
    private sesionService: SessionService,
    private router: Router,
    public loaderService: LoaderService,
    private errorsService: ErrorsService
  ) {}
  email:any="";
  password:any="";
  ngOnInit() {

  }
  ngAfterContentInit() {
    if (this.sesionService.userData) {
      this.router.navigate(['inicio']);
    }
  }
  logIn(){
    if (this.email != "" && this.password != "") {
      this.loaderService.setLoading(true);
      this.api.apiPostRequest(`login`, {
        email: this.email,
        password: this.password
      }).subscribe({
        next: (resp: any) => {
          if (resp.ok) {
            this.locastorageservice.saveData('token', resp.token);
            this.locastorageservice.saveData('userData', JSON.stringify(resp.userData));
            this.sesionService.checkLoguedInfo();
            this.reset();
            this.router.navigate(['inicio']);
          }else{
            this.errorsService.catchErrorCodes(resp.code)
          }
          this.loaderService.setLoading(false);
        },
        error: (e: any) => {
          this.alertService.alertMessage('Datos no válidos', 'Error de verificación');
          console.log(e);
          this.loaderService.setLoading(false);
        },
      });
    }else{
      this.alertService.alertMessage('No puede haber campos vacíos por favor verifique', 'Campos no válidos');
    }
  }
  reset(){
    this.email = '';
    this.password = '';
  }
  getPictureRoute(item:any){
    return environment.URL_IMAGEN + item;
  }
}
