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
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class VerifyComponent {
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
  @ViewChild('codeel1', { static: true }) inputElement1: ElementRef;
  @ViewChild('codeel2', { static: true }) inputElement2: ElementRef;
  @ViewChild('codeel3', { static: true }) inputElement3: ElementRef;
  @ViewChild('codeel4', { static: true }) inputElement4: ElementRef;
  @ViewChild('codeel5', { static: true }) inputElement5: ElementRef;
  @ViewChild('codeel6', { static: true }) inputElement6: ElementRef;

  code1: any = '';
  code2: any = '';
  code3: any = '';
  code4: any = '';
  code5: any = '';
  code6: any = '';
  minutes: any;
  seconds: any;
  resendAvailable:any = true;
  ngOnInit() {
  }
  ngAfterContentInit() {
    this.inputElement1.nativeElement.focus();
    this.counter();
    if (!this.sesionService.userData) {
      this.router.navigate(['login']);
    }else{
      if (this.sesionService.userData.status!=0) {
        this.router.navigate(['inicio']);
      }
    }
  }

  counter() {
    this.loaderService.setLoading(false);
    this.resendAvailable = false;
    var date = new Date('2020-01-01 00:03');
    var padLeft = (n: any) => "00".substring(0, "00".length - n.length) + n;
    var interval = setInterval(() => {
    this.minutes = padLeft(date.getMinutes() + "");
    this.seconds = padLeft(date.getSeconds() + "");
    date = new Date(date.getTime() - 1000);
    if (this.minutes == '00' && this.seconds == '00') {
      clearInterval(interval);
      this.resendAvailable = true;
    }
    }, 1000);
  }

  change1(e: any) {
    this.inputElement2.nativeElement.focus();
    if (parseInt(this.code1) < 0 || parseInt(this.code1) > 9) {
      this.code1 = 0;
    }
    e.preventDefault()
  }
  change2(e: any) {
    if (e.keyCode == 8 || e.keyCode == 46) {
      this.inputElement1.nativeElement.focus();
    } else {
      this.inputElement3.nativeElement.focus();
    }
    parseInt(this.code2) < 0 ? this.code2 = 0 : parseInt(this.code2); parseInt(this.code2) > 9 ? this.code2 = 0 : parseInt(this.code2);
  }
  change3(e: any) {
    if (e.keyCode == 8) {
      this.inputElement2.nativeElement.focus();
    } else {
      this.inputElement4.nativeElement.focus();
    }
    this.inputElement4.nativeElement.focus();
    parseInt(this.code3) < 0 ? this.code3 = 0 : parseInt(this.code3); parseInt(this.code3) > 9 ? this.code3 = 0 : parseInt(this.code3);
  }
  change4(e: any) {
    if (e.keyCode == 8) {
      this.inputElement3.nativeElement.focus();
    } else {
      this.inputElement5.nativeElement.focus();
    }
    parseInt(this.code4) < 0 ? this.code4 = 0 : parseInt(this.code4); parseInt(this.code4) > 9 ? this.code4 = 0 : parseInt(this.code4);
  }
  change5(e: any) {
    if (e.keyCode == 8) {
      this.inputElement4.nativeElement.focus();
    } else {
      this.inputElement6.nativeElement.focus();
    }
    parseInt(this.code5) < 0 ? this.code5 = 0 : parseInt(this.code5); parseInt(this.code5) > 9 ? this.code5 = 0 : parseInt(this.code5);
  }
  change6(e: any) {
    if (e.keyCode == 8) {
      this.inputElement5.nativeElement.focus();
    }
    parseInt(this.code6) < 0 ? this.code6 = 0 : parseInt(this.code6); parseInt(this.code6) > 9 ? this.code6 = 0 : parseInt(this.code6);
  }
  verify(){
    this.loaderService.setLoading(true);
    const code = this.code1+''+this.code2+''+this.code3+''+this.code4+''+this.code5+''+this.code6;
    this.api.apiPostRequest(`usuarios/verify`, {
      email: this.sesionService.userData.email,
      code: code
    }).subscribe({
      next: (resp: any) => {
        if (resp.ok) {
          this.locastorageservice.saveData('token', resp.token);
          this.locastorageservice.saveData('userData', JSON.stringify(resp.user));
          this.sesionService.checkLoguedInfo();
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
  }
  isInt(value:any) {
    return !isNaN(value) && 
           parseInt(value) == value && 
           !isNaN(parseInt(value, 10));
  }
  clipboard(e:any){
    e.preventDefault()
    let clipboardData = e.clipboardData;
    let digits = clipboardData.getData('text');
    const digitos = digits.split('');
    
    if (this.isInt(digits)) {
      digitos.forEach((dig:any, i:any) => {
        switch (i) {
          case 0:
              this.code1 = dig;
            break;
            case 1:
              this.code2 = dig;
            break;
            case 2:
              this.code3 = dig;
            break;
            case 3:
              this.code4 = dig;
            break;
            case 4:
              this.code5 = dig;
            break;
            case 5:
              this.code6 = dig;
            break;
          default:
            break;
        }
      });    
    }
  }
  resend(email:any){
    this.api.apiPostRequest(`usuarios/otro/verify`, {
      email
    }).subscribe({
      next: (resp: any) => {
        if (resp.ok) {
          this.counter();
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
  emailPrivaticy(email:any){
    return email.substring(0, 2)+'****'+email.substring(14);
  }
}
