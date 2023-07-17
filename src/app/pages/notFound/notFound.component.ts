import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import * as moment from 'moment';

moment.locale('es');

@Component({
  selector: 'app-notFound',
  templateUrl: './notFound.component.html',
  styleUrls: ['./notFound.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class notFoundComponent {
  constructor(
  ) {}
  ngOnInit() {
  }
  ngAfterContentInit() {

  }
}
