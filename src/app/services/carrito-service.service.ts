import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertContent } from '../components/alert-dialog-content/alert-dialog-content';
import { AlertServiceService } from './alert-service.service';
import { LocalStorageServiceService } from './local-storage-service.service';
@Injectable({
  providedIn: 'root'
})
export class CarritoServiceService {
  carrito:any[]=[];
  constructor(public dialog: MatDialog, private alertService: AlertServiceService, private localStorageService: LocalStorageServiceService) { }
  loadCarrito(){
    const Mycarrito = this.localStorageService.getData('carrito');
    if (Mycarrito) {
      this.carrito = JSON.parse(Mycarrito);
    }
  }
  addproductoToCar(product:any){
    this.carrito.unshift(product);
    this.alertService.alertMessage('Elemento agregado exitosamente', 'Acción exitosa');
    this.localStorageService.saveData('carrito', JSON.stringify(this.carrito));
  }
  removeFromCar(index:any){
    const deleteDialog = this.dialog.open(AlertContent, {
      data: {
        type: 'action',
        header: 'Quitar producto del carrito',
        details: `¿Seguro desea quitar este elemento del carrito?.`,
        button: 'Confirmar'
      },
      width: '300px'
    });
    deleteDialog.afterClosed().subscribe((result) => {
      if (result) {
        this.carrito.splice(index, 1);
        this.alertService.alertMessage('Elemento eliminado exitosamente', 'Acción exitosa');
        this.localStorageService.saveData('carrito', JSON.stringify(this.carrito));
      }
    });
  }
}
