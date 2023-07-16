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
  selector: 'app-contactanos',
  templateUrl: './contactanos.component.html',
  styleUrls: ['./contactanos.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ContactanosComponent {
  constructor(
    public api: ApiService, 
    private location: Location, 
    public themeService: ThemeServiceService, 
    public carritoService: CarritoServiceService, 
    public loaderService: LoaderService,
    private alertService: AlertServiceService,
    private errorsService: ErrorsService
  ) {}
  message:any='';
  email:any='';
  asunto:any='';
  ngOnInit() {
    this.loaderService.setLoading(false);
  }
  ngAfterContentInit() {

  }
  back(): void {
    this.location.back()
  }
  sendForm(){
    if (this.email != "" && this.asunto != "" && this.message != "") {
      this.loaderService.setLoading(true);
      this.api.apiPostRequest(`formulario`, {
        email: this.email,
        subject: this.asunto,
        message: this.message
      }).subscribe({
        next: (resp: any) => {
          if (resp.ok) {
            this.alertService.alertMessage('Tu mensaje se ha enviado al administrador del sistema. Serás contactado mediante el correo electrónico que proporcionaste.', 'Mensaje enviado');
          }else{
            this.errorsService.catchErrorCodes(resp.code)
          }
          this.loaderService.setLoading(false);
          this.reset();
        },
        error: (e: any) => {
          this.reset();
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
    this.asunto = '';
    this.message = '';
  }
}
