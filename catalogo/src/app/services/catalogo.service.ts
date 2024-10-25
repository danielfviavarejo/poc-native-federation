import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {
  constructor() { }

  getRemoteCatalogMethod(){
    console.log('CatalogoService method called');
  }
  getRemoteCatalogMethodTwo(){
    console.log('CatalogoService method two called');
  }
}
