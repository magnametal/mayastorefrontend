import { Component, OnInit, Inject } from '@angular/core';
import {
    MAT_DIALOG_DATA,
    MatDialogRef,
  } from '@angular/material/dialog';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { ApiService } from 'src/app/services/api.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ThemeServiceService } from 'src/app/services/theme-service.service';
@Component({
    selector: 'category-dialog-content',
    templateUrl: 'category-dialog-content.html',
    styleUrls: ['./category-dialog-content.scss'],
  })
  export class CategoryDialogContent {
    constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
      public api: ApiService,
      public dialogRef: MatDialogRef<CategoryDialogContent>,
      private alertService: AlertServiceService,
      public loaderService: LoaderService,
      public themeService: ThemeServiceService
    ) {}
    loading:any = false;
    title:any;
    type:any;
    mode:any;
    active:any=true;
    ngAfterContentInit() {
      const { mode, type } = this.data;
      if ( this.data.content) {
        const { content } = this.data;
        this.title = content.title;
        this.active = content.active;
      }
      this.mode = mode;
      this.type = type; 
      // this.getCategories();
    }
    ngOnInit(): void {}
    newCategory(){
      if (this.title!='') {
        this.loading = true;
        this.api.apiPostRequest(`categorias`, { title: this.title }).subscribe({
          next: (resp: any) => {
            if (resp.ok) {
              this.closeDialog()
            }
            this.loading = false;
          },
          error: (e: any) => {
            this.alertService.alertMessage('Error de servidor', 'Error');
            console.log(e);
            this.loading = false;
          },
        });
      }else{
        this.alertService.alertMessage('No puede haber campos vacíos', 'Error en los datos');
      }
    }
    editCategory(){
      if (this.title!='') {
        this.loading = true;
        this.api.apiPutRequest(`categorias/${this.data.content.id}`, { title: this.title, active: this.active }).subscribe({
          next: (resp: any) => {
            if (resp.ok) {
              this.closeDialog()
            }
            this.loading = false;
          },
          error: (e: any) => {
            this.alertService.alertMessage('Error de servidor', 'Error');
            this.loading = false;
            console.log(e);
          },
        });
      }else{
        this.alertService.alertMessage('No puede haber campos vacíos', 'Error en los datos');
      }
    }
    newSubcategory(){
      if (this.title!='') {
        this.loading = true;
        this.api.apiPostRequest(`subcategorias`, { title: this.title, category: this.data.catid }).subscribe({
          next: (resp: any) => {
            if (resp.ok) {
              this.closeDialog()
            }
            this.loading = false;
          },
          error: (e: any) => {
            this.alertService.alertMessage('Error de servidor', 'Error');
            console.log(e);
            this.loading = false;
          },
        });
      }else{
        this.alertService.alertMessage('No puede haber campos vacíos', 'Error en los datos');
      }
    }
    editSubcategory(){
      if (this.title!='') {
        this.loading = true;
        this.api.apiPutRequest(`subcategorias/${this.data.content.id}`, { title: this.title, active: this.active, category: this.data.catid }).subscribe({
          next: (resp: any) => {
            if (resp.ok) {
              this.closeDialog()
            }
            this.loading = false;
          },
          error: (e: any) => {
            this.alertService.alertMessage('Error de servidor', 'Error');
            console.log(e);
            this.loading = false;
          },
        });
      }else{
        this.alertService.alertMessage('No puede haber campos vacíos', 'Error en los datos');
      }
    }
    closeDialog() {
      this.dialogRef.close(true);
    }
    editMode(){
      this.data.mode = 'edit'
    }
  }