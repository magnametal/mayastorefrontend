import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImgbbService {

  constructor(private ApiService: ApiService) { }
  async getData(base64:any) {
    try {
        const params = new URLSearchParams();
        params.append('image', base64);
        let res = await this.ApiService.apiPostRequest(environment.URL_IMGBB+"?key=80af66ab3233dc8b2801c2faac63e3bc", params);
        return res
    }
    catch (err) {
        console.error(err);
  }
  // cargar imagenes
  // return new Promise((resolve, _) => {
  //   let resp = getData(pic.base64.split(',')[1]);
  //   console.log(resp);
  //   resolve(resp);
  // }).then((data) => {
  //     let obj = {
  //         main: pic.main,
  //         upload : {
  //             imgURL: data.data.data.image.url,
  //             thumb: data.data.data.thumb.url,
  //             delete: data.data.data.delete_url
  //         }
  //     };
  //     console.log(obj);
  //     exit.push(obj);
  // })
}
}
