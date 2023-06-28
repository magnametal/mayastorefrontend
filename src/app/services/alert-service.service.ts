import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertContent } from '../components/alert-dialog-content/alert-dialog-content';

@Injectable({
  providedIn: 'root'
})
export class AlertServiceService {

  constructor(private dialog: MatDialog) { }
  alertMessage(msg:string, header:string){
    this.dialog.open(AlertContent, {
      data: {
        type: 'no-action',
        header: header,
        details: msg
      },
      width: '250px'
    });
  }
}
