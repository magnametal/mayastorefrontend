import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImgbbService {
  constructor(private http: HttpClient) { }
  post(endpoint: string, data: any, params: any): any {
    return this.http.post<any>(endpoint, data, params);
  }
}
