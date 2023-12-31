import { Component, OnInit, Inject } from '@angular/core';
import {
    MAT_DIALOG_DATA,
    MatDialogRef,
  } from '@angular/material/dialog';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { ApiService } from 'src/app/services/api.service';
import { ImgbbService } from 'src/app/services/imgbb.service';
import { environment } from 'src/environments/environment';
import { ThemePalette } from '@angular/material/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
    selector: 'producto-dialog-content',
    templateUrl: 'producto-dialog-content.html',
    styleUrls: ['./producto-dialog-content.scss'],
  })
  export class ProductoDialogContent {
    constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
      public api: ApiService,
      public dialogRef: MatDialogRef<ProductoDialogContent>,
      private alertService: AlertServiceService,
      private imgbbService: ImgbbService
    ) {}
    public color: ThemePalette = 'primary';
    public touchUi = false;
    colorCtr: AbstractControl = new FormControl(null);
    colors:any[]=[];
    tallas:any[]=[];
    title:any;
    price:any;
    selectedColor:any='#000000';
    catIndex:any;
    images:any[]=[];
    categories:any[]=[];
    active:any;
    base64:any;
    category:any;
    loadingimgBB:any;
    subcategory:any;
    pickerFlag:any=false;
    loading:any=false;
    selectedCategory:any;
    selectedSubcategory:any;
    description:any
    ngAfterContentInit() {
      if (this.data.mode=='edit' || this.data.mode=='view') {
        const { title, images, price, active, category, colors, subcategory, description } = this.data.product;
        this.title = title;
        this.images = images;
        this.active = active;
        this.price = price;
        this.category = category;
        this.colors = colors;
        if (subcategory) {
          this.subcategory = subcategory;
          this.selectedSubcategory = subcategory.id;
        }
        this.description = description;
        this.selectedCategory = category.id;
      }
      this.getCategories();
      this.getSizes();
    }
    ngOnInit(): void {}
    getCategories(){
      this.api.apiGetRequest(`categorias/todas`).subscribe({
        next: (resp: any) => {
          if (resp.ok) {
            this.categories = resp.categories;
          }
        },
        error: (e: any) => {
          this.alertService.alertMessage('Error de servidor', 'Error');
          console.log(e);
        },
      });
    }
    getSizes(){
      this.api.apiGetRequest(`tallas/todas`).subscribe({
        next: (resp: any) => {
          if (resp.ok) {
            let finalTallas = resp.sizes;
            finalTallas.forEach((size:any, i:any) => {
              if (this.data.product) {
                for (const actualSize of this.data.product.sizes) {
                  if (actualSize.id==size.id) {
                    finalTallas[i].active = true;
                  }
                } 
              }
            });
            this.tallas = finalTallas;
          }
        },
        error: (e: any) => {
          this.alertService.alertMessage('Error de servidor', 'Error');
          console.log(e);
        },
      });
    }
    editMode(){
      this.data.mode = 'edit'
    }
    getsubcats(selctcat:any){
      const index = this.categories.findIndex((cat:any) => cat.id == selctcat );
      if (index!=-1) {
        if (this.categories[index].subcategories.length!=0) {
          this.catIndex = index;
          return true;
        } else {
          return false;
        }
      }else{
        return false;
      }
    }
    registrarProducto(){
      if (this.title!='' && this.price!='' && this.selectedCategory!='' && this.description!='' && this.images.length!=0) {
        const index = this.categories.findIndex((cat:any)=>cat.id==this.selectedCategory);
        let bandera = true;
        if (this.categories[index].subcategories.length!=0) {
          const index1 = this.categories[index].subcategories.findIndex((subcat:any)=>subcat.id==this.selectedSubcategory);
          if (index1==-1) {
            this.alertService.alertMessage('Subcategoría no corresponde a la categoría señalada o no has seleccionado la subcategoría', 'Error en los datos');
            bandera = false;
          }
        }else{
          this.selectedSubcategory = undefined;
        }
        if (bandera) {
          let exitsize = [];
          for (const talla of this.tallas) {
            if (talla.active) {
              exitsize.unshift(talla.id);
            }
          }
          this.loading = true;
          const data = { 
            title: this.title, 
            active: this.active,
            images : this.images,
            price : this.price,
            sizes: exitsize,
            colors: this.colors,
            category : this.selectedCategory,
            subcategory : this.selectedSubcategory,
            description: this.description
          };
          this.api.apiPostRequest(`productos`, data).subscribe({
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
        }
      }else{
        this.alertService.alertMessage('No puede haber campos vacíos', 'Error en los datos');
      }
    }
    actualizarproducto(){
      if (this.title!='' && this.price!='' && this.selectedCategory!='' && this.description!='' && this.images.length!=0) {
        const index = this.categories.findIndex((cat:any)=>cat.id==this.selectedCategory);
        let bandera = true;
        if (this.categories[index].subcategories.length!=0) {
          const index1 = this.categories[index].subcategories.findIndex((subcat:any)=>subcat.id==this.selectedSubcategory);
          if (index1==-1) {
            this.alertService.alertMessage('Subcategoría no corresponde a la categoría señalada o no has seleccionado la subcategoría', 'Error en los datos');
            bandera = false;
          }
        }else{
          this.selectedSubcategory = undefined;
        }
        if (bandera) {
          let exitsize = [];
          for (const talla of this.tallas) {
            if (talla.active) {
              exitsize.unshift(talla.id);
            }
          }
          this.loading = true;
          const data = { 
            title: this.title, 
            active: this.active,
            images : this.images,
            price : this.price,
            sizes: exitsize,
            colors: this.colors,
            category : this.selectedCategory,
            subcategory : this.selectedSubcategory,
            description: this.description
          };
          this.api.apiPutRequest(`productos/${this.data.product.id}`, data).subscribe({
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
        }
      }else{
        this.alertService.alertMessage('No puede haber campos vacíos', 'Error en los datos');
      }
    }
    validateSize(e: any) {
      const fileSize = e.target.files[0].size / 1024 / 1024; // in MiB
      if (fileSize > 2) {
        this.alertService.alertMessage('El archivo no puede superar los 2 MBs', 'Error de archivo');
      } else {
        this.loadingimgBB=true;
        this.onFileInput(e);
      }
    }
    onFileInput(event: any) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base:any = reader.result;
        const formData = new FormData();
        formData.append('image', base.split(',')[1]);
        this.imgbbService.post(environment.URL_IMGBB, formData, { params: { key: environment.IMGBB_KEY } }).subscribe({
          next: (resp: any) => {
            this.images.unshift(resp.data.image.url)
            this.loadingimgBB=false;
          },
          error: (e: any) => {
            console.log(e);
            this.loadingimgBB=false;
          },
        });
      }
    }
    deleteimage(index:any){
      this.images.splice(index, 1);
    }
    closeDialog() {
      this.dialogRef.close(true);
    }
    changeComplete(e:any){
      this.selectedColor = e.color.hex;
    }
    switchColor(){
      this.pickerFlag = !this.pickerFlag;
    }
    setColor(){
      this.colors.unshift(this.selectedColor);
      this.selectedColor = '#000000'
      this.switchColor();
    }
    vienePorTallas(){
      let bandera = false;
      for (const talla of this.tallas) {
        if (talla.active) {
          bandera = true;
        }
      }
      return bandera;
    }
    removeColor(index:any){
      this.colors.splice(index, 1);
    }
  }