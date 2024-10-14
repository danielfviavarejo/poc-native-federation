import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {

  constructor() { }
  getRemoteCatalogMethod(): string {
    console.log('funcionou o log remoto')
    return 'getRemoteCatalogMethod!';
  }
  getRemoteCatalogMethodTwo(): string {
    console.log('funcionou o segundo log remoto')
    return 'getRemoteCatalogMethod!';
  }
}
