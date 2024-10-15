import { Injectable } from '@angular/core';
import { App, Venda } from './sessao';
import { SessaoApp } from './sessao.app';
import { SessaoVenda } from './sessao.venda';

@Injectable({ providedIn: 'root' })
export class SessaoService {

  private id!: string;

  #venda = new SessaoVenda();
  #app = new SessaoApp();

  constructor() {
    if (typeof Storage === "undefined") console.error('Armazenamento de sessão não suportado');

    this.id = Math.random().toString(36).substring(2);
    console.log('[@vv/app-utils::debug] SessaoService instance id:', this.id);
  }

  iniciar(venda: Venda, app: App): void {
    this.#venda.iniciar(venda);
    this.#app.iniciar(app);
  }

  limpar(): void {
    this.#venda.limpar();
    this.#venda = new SessaoVenda();
    this.#app.limpar();
    this.#app = new SessaoApp();
  }

  get venda(): SessaoVenda { return this.#venda; }
  get app(): SessaoApp { return this.#app; }
  get instanceId(): string { return this.id; }
}
