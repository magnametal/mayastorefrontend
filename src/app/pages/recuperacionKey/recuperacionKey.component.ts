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
  selector: 'app-recuperacionKey',
  templateUrl: './recuperacionKey.component.html',
  styleUrls: ['./recuperacionKey.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RecuperacionKeyComponent {
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

  key:any = '';
  password:any = '';
  password2:any = '';
  email:any = '';
  hide1:any = true;
  hide2:any = true;

  ngOnInit() {
    this.loaderService.setLoading(false);
    this.route.params.subscribe(params => {
      this.key = params.key;
      this.email = params.email;
    });
  }
  ngAfterContentInit() {
    if (this.sesionService.userData) {
      this.router.navigate(['inicio']);
    }
  }
  cambiarClave(){
    if (this.key!='' && this.password!='' && this.password2!='') {
      if (this.password==this.password2) {
        this.loaderService.setLoading(true);
        this.api.apiPostRequest(`login/recuperacion/key`, {
          password: this.password,
          key: this.key,
          email: this.email,
        }).subscribe({
          next: (resp: any) => {
            if (resp.ok) {
              this.alertService.alertMessage('Haz cambiado tu clave exitosamente, por favor ingresa tus datos para iniciar sesión.', 'Recuperación exitosa');
              this.router.navigate(['login']);
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
        this.alertService.alertMessage('Las claves no coinciden porfavor verifica.', 'Campos incorrectos');
      }
    }
  }
}
