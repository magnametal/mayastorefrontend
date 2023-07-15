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
  selector: 'app-recuperacion',
  templateUrl: './recuperacion.component.html',
  styleUrls: ['./recuperacion.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RecuperacionComponent {
  constructor(
    public api: ApiService,
    private router: Router,
    public sesionService: SessionService,
    public loaderService: LoaderService,
    public themeService: ThemeServiceService,
    private errorsService: ErrorsService,
    private alertService: AlertServiceService,
    private locastorageservice: LocalStorageServiceService
  ) { }

  email:any = '';
  ngOnInit() {
    this.loaderService.setLoading(false);
  }
  ngAfterContentInit() {
    if (this.sesionService.userData) {
      this.router.navigate(['inicio']);
    }
  }
  recuperar(){
    if (this.email!='') {
      this.loaderService.setLoading(true);
      this.api.apiPostRequest(`login/recuperacion`, {
        email: this.email
      }).subscribe({
        next: (resp: any) => {
          if (resp.ok) {
            this.router.navigate(['recuperacion/code/'+this.email]);
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
  }
}
