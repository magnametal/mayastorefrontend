import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { AlertServiceService } from './alert-service.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private api: ApiService, private alertService: AlertServiceService) { }
  categories:any[]=[];
  getCategories(){
    this.api.apiGetRequest(`categorias`).subscribe({
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
}
