import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoServiceService {
  carrito:any[]=[{
    img: "https://i.ibb.co/Rhp72JW/OGS-KLVR-Banner1-2e16d0ba-fill-380x505-c100.jpg",
    title: "Camisa completa (M / Negra)",
    quantity: 2,
    price: 15.50
  },
  {
    img: "https://i.ibb.co/Rhp72JW/OGS-KLVR-Banner1-2e16d0ba-fill-380x505-c100.jpg",
    title: "Camisa completa (M / Negra)",
    quantity: 2,
    price: 15.50
  },
  {
    img: "https://i.ibb.co/Rhp72JW/OGS-KLVR-Banner1-2e16d0ba-fill-380x505-c100.jpg",
    title: "Camisa completa (M / Negra)",
    quantity: 2,
    price: 15.50
  }];
  constructor() { }
}
