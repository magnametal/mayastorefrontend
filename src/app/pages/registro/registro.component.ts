import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { ApiService } from 'src/app/services/api.service';
import { ThemeServiceService } from 'src/app/services/theme-service.service';
import { SessionService } from 'src/app/services/session.service';
import { Router } from '@angular/router';
import { LocalStorageServiceService } from 'src/app/services/local-storage-service.service';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ErrorsService } from 'src/app/services/errors.service';

moment.locale('es');

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RegistroComponent {
  constructor(
    public api: ApiService, 
    public themeService: ThemeServiceService, 
    private sesionService: SessionService, 
    private router: Router, 
    private locastorageservice: LocalStorageServiceService,
    private alertService: AlertServiceService,
    public loaderService: LoaderService,
    private errorsService: ErrorsService
  ) {}
  countries:any = [];
  country:any = '+58';
  email:any = '';
  password:any = '';
  password2:any = '';
  phone:any = '';
  features:any = false;
  ngOnInit() {

  }
  ngAfterContentInit() {
    if (this.sesionService.userData) {
      this.router.navigate(['inicio']);
    }else{
      const countr = this.locastorageservice.getData('countries');
      if (countr) {
        this.countries = JSON.parse(countr);
      }else{
        this.getCountries();
      }
    }
  }
  getCountries(){
    this.api.apiGetRequest(`country/all`).subscribe({
      next: (resp: any) => {
        if (resp.ok) {
          this.locastorageservice.saveData('countries', JSON.stringify(resp.countries));
          this.countries = resp.countries;
        }else{
          this.errorsService.catchErrorCodes(resp.code)
        }
      },
      error: (e: any) => {
        this.alertService.alertMessage('Error de servidor', 'Error');
        console.log(e);
      },
    });
  }
  register(){
    if (this.email != "" && this.password != "" && this.password2 != "" && this.phone != "") {
      if (this.password == this.password2) {
        const index = this.countries.findIndex((pais:any) => '+'+pais.phonecode==this.country);
        if (index != -1) {
          this.loaderService.setLoading(true);
          this.api.apiPostRequest(`usuarios`, {
            email: this.email,
            password: this.password,
            phone: this.phone,
            features: this.features,
            country: this.countries[index].name,
            code: "+"+this.countries[index].isoCode
          }).subscribe({
            next: (resp: any) => {
              if (resp.ok) {
                this.locastorageservice.saveData('token', resp.token);
                this.locastorageservice.saveData('userData', JSON.stringify(resp.user));
                this.sesionService.checkLoguedInfo();
                this.reset();
                this.router.navigate(['inicio']);
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
        }else{
          this.alertService.alertMessage('País no encontrado', 'Campos no válidos');
        }
      }else{
        this.alertService.alertMessage('Las claves no coinciden', 'Campos no válidos');
      }
    }else{
      this.alertService.alertMessage('No puede haber campos vacíos por favor verifique', 'Campos no válidos');
    }
  }
  getPictureRoute(item:any){
    return environment.URL_IMAGEN + item;
  }
  reset(){
    this.email = '';
    this.password = '';
    this.password2 = '';
    this.phone = '';
    this.country = '+58';
    this.features = false;
  }
}
