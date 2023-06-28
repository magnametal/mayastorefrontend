import { Injectable } from '@angular/core';
import  *  as CryptoJS from  'crypto-js';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageServiceService {
  constructor() { }

  public saveData(key: string, value: string) {
    localStorage.setItem(key, this.encrypt(value));
  }

  public getData(key: string) {
    let data = localStorage.getItem(key)|| "";
    return this.decrypt(data);
  }
  
  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }

  private encrypt(txt: string): string {
    return CryptoJS.AES.encrypt(txt, environment.CRYPTO_KEY).toString();
  }

  private decrypt(txtToDecrypt: string) {
    return CryptoJS.AES.decrypt(txtToDecrypt, environment.CRYPTO_KEY).toString(CryptoJS.enc.Utf8);
  }
}