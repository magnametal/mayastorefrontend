import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl=`${environment.URL_API}/api/`; 
  constructor(private http:HttpClient, private sessionService: SessionService) { }
  apiGetRequest(endpoint:string, desde?:any): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-token': this.sessionService.token?this.sessionService.token:''
      })
    };
    const finalURL = desde? this.baseUrl + endpoint +'?desde='+desde : this.baseUrl + endpoint;
    return this.http.get<any>(finalURL, httpOptions);
  }
  apiPostRequest(endpoint:string, data:any): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-token': this.sessionService.token?this.sessionService.token:''
      })
    };
    return this.http.post<any>(this.baseUrl + endpoint, data, httpOptions);
  }
  apiPutRequest(endpoint:string, data:any): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-token': this.sessionService.token?this.sessionService.token:''
      })
    };
    return this.http.put<any>(this.baseUrl + endpoint, data, httpOptions);
  }

  apiDelRequest(endpoint:string): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-token': this.sessionService.token?this.sessionService.token:''
      })
    };
    return this.http.delete<any>(this.baseUrl + endpoint, httpOptions);
  }
}
