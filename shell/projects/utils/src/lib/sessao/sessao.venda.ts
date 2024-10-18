import { BehaviorSubject, Observable } from 'rxjs';
import { Cliente, TipoPessoa, Venda, Vendedor } from './sessao';
import { SessaoIntegracao } from './sessao.integracao';
import {Bandeira, Filial} from '../models';

export class SessaoVenda extends SessaoIntegracao {

  readonly #NAMESPACE = `${this.JORNADA}:venda`;

  #vendedor!: Vendedor;
  #filial!: Filial;
  #cliente?: Cliente;
  readonly #cliente$ = new BehaviorSubject<Cliente | undefined>(undefined);

  constructor() {
    super();

    this.carregarSessao();
  }

  iniciar(venda: Venda): void {
    this.limpar();

    this.#filial = this.inserirSessao<Filial>(this.#NAMESPACE, { filial: venda.filial });
    this.#vendedor = this.inserirSessao<Vendedor>(this.#NAMESPACE, { vendedor: venda.vendedor });

    if (venda.cliente) this.adicionarCliente(venda.cliente);
  }

  limpar(): void {
    this.limparSessao(this.#NAMESPACE);
  }

  adicionar<T>(contexto: string, dados: T): T {
    return this.inserirSessao(this.#NAMESPACE, { [contexto]: dados });
  }

  consultar<T>(contexto: string): T {
    return this.consultarSessao<T>(this.#NAMESPACE)[contexto];
  }

  adicionarCliente(cliente: Cliente): void {
    this.inserirSessao<Cliente>(this.#NAMESPACE, { cliente });
    this.atualizarCliente(cliente);
  }

  removerCliente(): void {
    this.removerSessao(this.#NAMESPACE, 'cliente');
    this.atualizarCliente(undefined);
  }

  private atualizarCliente(cliente: Cliente | undefined): void {
    cliente = cliente ? this.adicionarHelpers(cliente) : undefined;
    this.#cliente = cliente;
    this.#cliente$.next(cliente);
  }

  private carregarSessao(): void {
    this.#vendedor = this.consultarVendedor();
    this.#filial = this.consultarFilial();

    this.atualizarCliente(this.consultarCliente());
  }

  private consultarVendedor(): Vendedor {
    return this.consultarSessao<Vendedor>(this.#NAMESPACE)['vendedor'];
  }

  private consultarFilial(): Filial {
    return this.consultarSessao<Filial>(this.#NAMESPACE)['filial'];
  }

  private consultarCliente(): Cliente | undefined {
    return this.consultarSessao<Cliente>(this.#NAMESPACE)['cliente'];
  }

  private adicionarHelpers(cliente: Cliente): Cliente {
    return {
      ...cliente,
      identificadoPorDocumento: cliente.codigo !== undefined && cliente.codigo !== 0 && cliente.codigo !== null && typeof cliente.codigo === 'number',
      identificadoPorNome: (cliente.codigo === undefined || cliente.codigo === 0 || cliente.codigo === null) && cliente.nome !== undefined && cliente.nome !== null && typeof cliente.nome === 'string',
      pessoaFisica: cliente.tipo === TipoPessoa.FISICA,
      pessoaJuridica: cliente.tipo === TipoPessoa.JURIDICA,
      perfilCliente: cliente.perfil === 'CLIENTE',
      perfilFuncionario: cliente.perfil === 'FUNCIONARIO',
      perfilClienteVip: cliente.perfil === 'CLIENTE_VIP'
    };
  }

  get filial(): Filial { return this.#filial; }
  get isBandeiraCasasBahia(): boolean { return this.filial.bandeira === Bandeira.CASAS_BAHIA; }
  get isBandeiraPonto(): boolean { return this.filial.bandeira === Bandeira.PONTO; }

  get vendedor(): Vendedor { return this.#vendedor; }

  get cliente(): Cliente | undefined { return this.#cliente; }
  get cliente$(): Observable<Cliente | undefined> { return this.#cliente$; }
  get clienteIdentificado(): boolean { return !!this.cliente?.identificadoPorDocumento || !!this.cliente?.identificadoPorNome; }

}
