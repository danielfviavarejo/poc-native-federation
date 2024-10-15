
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Navegacao } from './navegacao';

@Injectable({ providedIn: 'root' })
export class BarraNavegacaoService {

  private id!: string;

  private navegacao = new Subject<{ exibir: boolean, dados?: Navegacao }>();
  navegacao$ = this.navegacao.asObservable();

  constructor() {
    this.id = Math.random().toString(36).substring(2);
    console.log('[@vv/app-utils::debug] BarraNavegacaoService instance id:', this.id);
  }

  atualizar(exibir: boolean, dados?: Navegacao): void {
    this.navegacao.next({ exibir, dados });
  }

  get instanceId(): string {
    return this.id;
  }
}
