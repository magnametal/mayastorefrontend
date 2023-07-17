import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import * as moment from 'moment';
import { SessionService } from 'src/app/services/session.service';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';

moment.locale('es');

@Component({
  selector: 'app-editorHTML',
  templateUrl: './editorHTML.component.html',
  styleUrls: ['./editorHTML.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class editorHTMLComponent {
  constructor(
    private sessionService: SessionService,
    private router: Router,
    private loaderService: LoaderService
  ) {}
  htmlstring:any = '';
  ngOnInit() {
  }
  ngAfterContentInit() {
    if (this.sessionService.userData) {
      if (this.sessionService.userData.role != 'ADMIN_ROLE') {
        this.router.navigateByUrl('/inicio')
      }
    }else{
      this.router.navigateByUrl('/inicio')
    }
  }
}
