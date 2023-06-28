import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl=`${environment.URL_API}/api/`; 
  constructor(private http:HttpClient) { }
  tempToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NDExYWVhYjE2NGZmMTk3ZmE4M2MyODIiLCJpYXQiOjE2ODYwMTU0OTEsImV4cCI6MTY4NjA1ODY5MX0.QDk7cVNfROjDvu2KlSAq3jrXwmLu034qHIW15eLLqJo';
  apiGetRequest(endpoint:string, desde?:any): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    const finalURL = desde? this.baseUrl + endpoint +'?desde='+desde : this.baseUrl + endpoint;
    return this.http.get<any>(finalURL, httpOptions);
  }
  apiPostRequest(endpoint:string, data:any): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-token': this.tempToken
      })
    };
    return this.http.post<any>(this.baseUrl + endpoint, data, httpOptions);
  }
  apiPutRequest(endpoint:string, data:any): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.put<any>(this.baseUrl + endpoint, data, httpOptions);
  }

  apiDelRequest(endpoint:string): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.delete<any>(this.baseUrl + endpoint, httpOptions);
  }
}
