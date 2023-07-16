import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { ApiService } from 'src/app/services/api.service';
import { ThemeServiceService } from 'src/app/services/theme-service.service';
import { SessionService } from 'src/app/services/session.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageServiceService } from 'src/app/services/local-storage-service.service';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ErrorsService } from 'src/app/services/errors.service';

moment.locale('es');

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PerfilComponent {
  constructor(
    public api: ApiService,
    private router: Router,
    public sesionService: SessionService,
    public loaderService: LoaderService,
    public themeService: ThemeServiceService,
    private errorsService: ErrorsService,
    private alertService: AlertServiceService,
    private locastorageservice: LocalStorageServiceService,
    private route: ActivatedRoute,
  ) { }

  key: any = '';
  password: any = '';
  password2: any = '';
  email: any = '';
  country: any = '';
  phone: any = '';
  hide0: any = true;
  hide1: any = true;
  hide2: any = true;
  code: any = '';
  oldpassword: any = '';
  countries: any[] = [];
  ngOnInit() {
    this.loaderService.setLoading(false);
  }
  ngAfterContentInit() {
    if (!this.sesionService.userData) {
      this.router.navigate(['inicio']);
    } else {
      this.getCountries();
      this.phone = this.sesionService.userData.phone;
      this.country = this.sesionService.userData.country;
      console.log(this.sesionService.userData.code);

      this.code = this.sesionService.userData.code;
    }
  }
  getCountries() {
    this.api.apiGetRequest(`country/all`).subscribe({
      next: (resp: any) => {
        if (resp.ok) {
          this.locastorageservice.saveData('countries', JSON.stringify(resp.countries));
          console.log(resp.countries);

          this.countries = resp.countries;
        } else {
          this.errorsService.catchErrorCodes(resp.code)
        }
      },
      error: (e: any) => {
        this.alertService.alertMessage('Error de servidor', 'Error');
        console.log(e);
      },
    });
  }
  cambiarClave() {
    if (this.oldpassword != '' && this.password != '') {
      if (this.password == this.password2) {
        this.loaderService.setLoading(true);
        this.api.apiPutRequest(`usuarios/perfil/password/${this.sesionService.userData.id}`, {
          oldpassword: this.oldpassword,
          password: this.password
        }).subscribe({
          next: async (resp: any) => {
            if (resp.ok) {
              this.alertService.alertMessage('Campos actualizados.', 'Acción exitosa');
              this.locastorageservice.saveData('token', resp.token);
              this.locastorageservice.saveData('userData', JSON.stringify(resp.userData));
              this.sesionService.checkLoguedInfo();
              this.password = '';
              this.password2 = '';
              this.oldpassword = '';
            } else {
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
        this.alertService.alertMessage('Claves no coinciden.', 'Campos no válidos');
      }
    } else {
      this.alertService.alertMessage('No pueden haber campos vacíos.', 'Campos incorrectos');
    }
  }
  cambiarTelefono() {
    if (this.country != '' && this.phone != '') {
      const index = this.countries.findIndex((pais:any) => '+'+pais.phonecode==this.code);
      if (index != -1) {
        this.loaderService.setLoading(true);
        this.api.apiPutRequest(`usuarios/perfil/phone/${this.sesionService.userData.id}`, {
          phone: this.phone,
          country: this.countries[index].name,
          code: "+"+this.countries[index].phonecode
        }).subscribe({
          next: async (resp: any) => {
            if (resp.ok) {
              this.alertService.alertMessage('Campos actualizados.', 'Acción exitosa');
              await this.locastorageservice.saveData('userData', JSON.stringify(resp.userData));
              this.sesionService.checkLoguedInfo();
            } else {
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
    } else {
      this.alertService.alertMessage('No pueden haber campos vacíos.', 'Campos incorrectos');
    }
  }
}
