import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  loading: any = true;
  constructor() { }
  setLoading(value:any){
    this.loading = value;
  }
}
