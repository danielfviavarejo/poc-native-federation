import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ContadorCarrinhoService {

  #contadorCarrinho$ = new BehaviorSubject<number>(0);

  private quantidadeCarrinho!: number;

  atualizarContador(quantidade: number): void {
    this.quantidadeCarrinho = quantidade;
    this.#contadorCarrinho$.next(quantidade);
  }

  get contadorCarrinho$(): Observable<number> { return this.#contadorCarrinho$.asObservable(); }
  get contadorCarrinho(): number { return this.quantidadeCarrinho; }

}
