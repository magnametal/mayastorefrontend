import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'alert-dialog-content',
  templateUrl: 'alert-dialog-content.html',
  styleUrls: ['./alert-dialog-content.scss'],
})
export class AlertContent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<AlertContent> ) {}
  ngAfterViewInit() {
  }
  ngOnInit(): void {}
  closeDialog() {
    this.dialogRef.close(true);
  }
}
