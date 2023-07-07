import { Component, ViewEncapsulation } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { ApiService } from 'src/app/services/api.service';
import { ThemeServiceService } from 'src/app/services/theme-service.service';
import { CarritoServiceService } from 'src/app/services/carrito-service.service';
import { Location } from '@angular/common';
import { LoaderService } from 'src/app/services/loader.service';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { SessionService } from 'src/app/services/session.service';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryDialogContent } from '../../components/category-dialog-content/category-dialog-content'
import { ProductoDialogContent } from '../../components/producto-dialog-content/producto-dialog-content';
import { AlertContent } from '../../components/alert-dialog-content/alert-dialog-content';

moment.locale('es');

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AdminComponent {
  constructor(public api: ApiService, private location: Location, public themeService: ThemeServiceService, public carritoService: CarritoServiceService, public loaderService: LoaderService, private alertService: AlertServiceService, private sessionService: SessionService, public router: Router, private dialog: MatDialog) { }
  activeRoute: any = 'users';
  users: any[] = [];
  products: any[] = [];
  categories: any[] = [];
  catsOrderActive:any = false;
  ngOnInit() {
    if (this.sessionService.userData.role != 'ADMIN_ROLE') {
      this.router.navigateByUrl('/inicio')
    } else {
      this.loaderService.setLoading(false);
      this.getUsers()
    }
  }
  ngAfterContentInit() {

  }
  getUsers() {
    this.loaderService.setLoading(true);
    this.api.apiGetRequest(`usuarios/all`).subscribe({
      next: (resp: any) => {
        if (resp.ok) {
          this.users = resp.users;
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
  getProducts() {
    this.loaderService.setLoading(true);
    this.api.apiGetRequest(`productos/admin`).subscribe({
      next: (resp: any) => {
        if (resp.ok) {
          this.products = resp.products;
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
  getCategories() {
    this.loaderService.setLoading(true);
    this.api.apiGetRequest(`categorias/todas`).subscribe({
      next: (resp: any) => {
        if (resp.ok) {
          this.categories = resp.categories;
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
  dialogProduct(mode: any, product?: any) {
    const dialogRef = this.dialog.open(ProductoDialogContent, {
      data: {
        product: product,
        mode: mode
      },
      width: '70%',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.alertService.alertMessage('Producto registrado exitosamente!', 'Acción exitosa')
      }
      this.getProducts();
    });
  }
  dialogCategory(mode: any, type:any, data?: any, catid?:any) {
    const dialogRef = this.dialog.open(CategoryDialogContent, {
      data: {
        content: data?data:null,
        catid: catid?catid:null,
        type: type,
        mode: mode
      },
      width: '70%',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.alertService.alertMessage('Categoría registrado exitosamente!', 'Acción exitosa')
        this.getCategories();
      }
    });
  }
  getPictureRoute(item: any) {
    return environment.URL_IMAGEN + item;
  }
  getTotalPrice() {
    let totalPrice = 0;
    this.carritoService.carrito.map(item => {
      totalPrice = totalPrice + (item.price * item.quantity)
    })
    return totalPrice.toFixed(2);
  }
  eliminarDeCarrito(index: any) {
    this.carritoService.removeFromCar(index)
  }
  back(): void {
    this.location.back()
  }
  changeAdminRoute(ruta: any) {
    this.activeRoute = ruta;
    if (ruta == 'products') {
      this.getProducts()
    }
    if (ruta == 'users') {
      this.getUsers()
    }
    if (ruta == 'categories') {
      this.getCategories()
    }
    if (ruta == 'sales') {
      this.getUsers()
    }
  }
  array_move(arr: any, old_index: any, new_index: any) {
    while (old_index < 0) {
      old_index += arr.length;
    }
    while (new_index < 0) {
      new_index += arr.length;
    }
    if (new_index >= arr.length) {
      var k = new_index - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing purposes
  };
  reorderCats(index: any, action: any) {
    if (action == '+') {
      this.array_move(this.categories, index, index+1)
    }
    if (action == '-') {
      this.array_move(this.categories, index, index-1)
    }
  }
  reorderSubcats(index: any, index2:any, action: any) {
    if (action == '+') {
      this.categories[index].subcategories = this.array_move(this.categories[index].subcategories, index2, index2+1)
    }
    if (action == '-') {
      this.categories[index].subcategories = this.array_move(this.categories[index].subcategories, index2, index2-1)
    }
  }
  reorderCategorySwitch(){
    this.catsOrderActive = !this.catsOrderActive;
  }

  saveCatsOrder(){
    let array:any = [];
    this.categories.forEach((cat:any, i:any) => {
      if (cat.title!='Ninguna') {
        array.unshift({ id: cat.id, order: i })
      }
    });
    this.loaderService.setLoading(true);
    this.api.apiPutRequest(`categorias/ordenar`, { categories: array }).subscribe({
      next: (resp: any) => {
        if (resp.ok) {
          this.alertService.alertMessage('Categorías reordenadas exitosamente.', 'Acción exitosa');
          this.getCategories()
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
  saveSubcatsOrder(index:any){
    let array:any = [];
    this.categories[index].subcategories.forEach((subcat:any, i:any) => {
      array.unshift({ id: subcat.id, order: i })
    });
    this.loaderService.setLoading(true);
    this.api.apiPutRequest(`subcategorias/ordenar`, { subcategories: array }).subscribe({
      next: (resp: any) => {
        if (resp.ok) {
          this.alertService.alertMessage('Subcategorías reordenadas exitosamente.', 'Acción exitosa');
          this.getCategories()
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
  deleteCategoria(cat:any){
    const deleteDialog = this.dialog.open(AlertContent, {
      data: {
        type: 'action',
        header: 'Eliminar categoría',
        details: `¿Seguro desea eliminar ${cat.title}? esta acción no puede deshacerse. Si existen elementos asociados a esta categoría quedará fuera del rango de búsqueda bajo la categoría "Ninguna" y por tanto deberá asignarle a su elemento otra categoría/subcategoría que si este visible.`,
        button: 'Eliminar'
      },
      width: '300px'
    });
    deleteDialog.afterClosed().subscribe((result) => {
      if (result) {
        this.requestEliminarCategoria(cat);
      }
    });
  }
  requestEliminarCategoria(categoria:any){
    this.loaderService.setLoading(true);
    this.api.apiDelRequest(`categorias/${categoria.id}`).subscribe({
      next: (resp: any) => {
        if (resp.ok) {
          this.alertService.alertMessage('Categoría eliminada exitosamente!', 'Acción exitosa');
          this.getCategories();
        }
        this.loaderService.setLoading(false);
      },
      error: (e: any) => {
        if (e.status !== 400) {
          console.log(e);
          this.alertService.alertMessage('Error en el servidor.', 'Error');
        } else {
          console.log(e);
        }
        this.loaderService.setLoading(false);
      },
    });
  }
  deleteSubcategoria(subcat:any){
    const deleteDialog = this.dialog.open(AlertContent, {
      data: {
        type: 'action',
        header: 'Eliminar subcategoría',
        details: `¿Seguro desea eliminar ${subcat.title}? esta acción no puede deshacerse. Si existen elementos asociados a esta subcategoría quedará fuera del rango de búsqueda bajo la subcategoría "Ninguna" y por tanto deberá asignarle a su elemento otra categoría/subcategoría que si este visible.`,
        button: 'Eliminar'
      },
      width: '300px'
    });
    deleteDialog.afterClosed().subscribe((result) => {
      if (result) {
        this.requestEliminarSubcategoria(subcat);
      }
    });
  }
  requestEliminarSubcategoria(subcategoria:any){
    this.loaderService.setLoading(true);
    this.api.apiDelRequest(`subcategorias/${subcategoria.id}`).subscribe({
      next: (resp: any) => {
        if (resp.ok) {
          this.alertService.alertMessage('Subcategoría eliminada exitosamente!', 'Acción exitosa');
          this.categories = resp.categories
        }
        this.loaderService.setLoading(false);
      },
      error: (e: any) => {
        if (e.status !== 400) {
          console.log(e);
          this.alertService.alertMessage('Error en el servidor.', 'Error')
        } else {
          console.log(e);
        }
        this.loaderService.setLoading(false);
      },
    });
  }
}