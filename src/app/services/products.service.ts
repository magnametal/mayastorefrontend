import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products:any[]=[{
    category: 1,
    title: 'Franelas',
    products: [{
      id: 1,
      img: "https://i.ibb.co/Rhp72JW/OGS-KLVR-Banner1-2e16d0ba-fill-380x505-c100.jpg",
      title: "Camisa completa (M / Negra)",
      price: 15.50
    },
    {
      id: 2,
      img: "https://i.ibb.co/72SMX13/OGS-Originals-Basics20-Camise-2e16d0ba-fill-800x933-c100-67-Pi-H4d.jpg",
      title: "Camisa completa negra Og's (M / Negra)",
      price: 10.50
    },{
      id: 3,
      img: "https://i.ibb.co/nrQb7hH/KLVRWhite-Tee-Back-2e16d0ba-fill-580x677-c100.png",
      title: "Camisa completa blanca Og's (M / Blanca)",
      price: 10.50
    }]
  },
  {
    category: 2,
    title: 'Sweaters',
    products: [
      {
        id: 4,
        img: "https://i.ibb.co/thhz8V6/OGS-Originals-Basics20-Hoodie-2e16d0ba-fill-800x933-c100-Wlp-WBf7.jpg",
        title: "Basics20-Hoodie (M / Rojo)",
        price: 42.99
      },
      {
        id: 5,
        img: "https://i.ibb.co/fNs6vHq/Classy-UBeige-Front-2e16d0ba-fill-580x677-c100.jpg",
        title: "Classy sweater (M / Beige)",
        price: 14.99
      },
      {
        id: 6,
        img: "https://i.ibb.co/0Q8rFpn/OGS-Originals-Crewneck-Burgun-2e16d0ba-fill-800x933-c100-d-Mdi-Fz-A.jpg",
        title: "OGS-Originals-Crewneck-Burgun (M / NEgro)",
        price: 34.99
      }
    ]
  },
  {
    category: 3,
    title: 'Accesorios',
    products: [
    {
      id: 7,
      img: "https://i.ibb.co/Qcv6FZX/OGS-Beanie-1-2e16d0ba-fill-580x677-c100.jpg",
      title: "Gorro de tela (Única / Negro)",
      price: 25.50
    },
    {
      id: 8,
      img: "https://i.ibb.co/ZgZfxtm/367128994-accesorios-bisuteria-480x480-dd3533d0-a570-417e-844c-bfbc3748e558-480x480.webp",
      title: "Bisutería Collar princesa",
      price: 9.99
    },
    {
      id: 9,
      img: "https://i.ibb.co/wpzM2kW/descarga-7.jpg",
      title: "Pulsera multicolor",
      price: 7.50
    }]
  }];
  constructor() { }
}

