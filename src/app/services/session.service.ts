import { Injectable } from '@angular/core';
import { LocalStorageServiceService } from './local-storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  userData:any;
  token:any;
  constructor(private localstorageService: LocalStorageServiceService) { }
  async checkLoguedInfo (){
    const mytoken = await this.localstorageService.getData('token');    
    if (mytoken) {
      this.token = mytoken;
      const myUserData = await this.localstorageService.getData('userData');
      this.userData = JSON.parse(myUserData)
    }
  }
  setToken(token:any){
    this.token = token;
  }
  setUserData(data:any){
    this.userData = data;
  }
  async logOut(){
    this.token=null;
    this.userData=null;
    await this.localstorageService.removeData('token');    
    await this.localstorageService.removeData('userData');  
  }
}
