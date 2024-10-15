import { App, Autenticacao } from './sessao';
import { SessaoIntegracao } from './sessao.integracao';

export class SessaoApp extends SessaoIntegracao {

  #NAMESPACE = `${this.JORNADA}:app`;

  #autenticacao!: Autenticacao;
  #resiliencia!: boolean;
  #plataformaWebview!: boolean;

  constructor() {
    super();

    this.carregarSessao();
  }

  iniciar(app: App): void {
    this.limpar();

    this.#autenticacao = this.inserirSessao<Autenticacao>(this.#NAMESPACE, { autenticacao: app.autenticacao });
    this.#plataformaWebview = this.inserirSessao<boolean>(this.#NAMESPACE, { plataformaWebview: app.plataformaWebview });
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

  atualizarAutenticacao(token: string, refreshToken: string): void {
    this.inserirSessao(this.#NAMESPACE, { autenticacao: { token, refreshToken } });
    this.#autenticacao = { token, refreshToken };
  }

  adicionarResiliencia(resiliencia: boolean): void {
    this.inserirSessao<boolean>(this.#NAMESPACE, { resiliencia });
    this.#resiliencia = resiliencia;
  }

  private carregarSessao(): void {
    const autenticacao = this.consultarAutenticacao();
    const plataformaWebview = this.consultarPlataformaWebview();
    const resiliencia = this.consultarResiliencia();

    this.#autenticacao = autenticacao;
    this.#plataformaWebview = plataformaWebview;
    this.#resiliencia = resiliencia;
  }

  private consultarPlataformaWebview(): boolean {
    return this.consultarSessao<boolean>(this.#NAMESPACE)['plataformaWebview'];
  }

  private consultarResiliencia(): boolean {
    return this.consultarSessao<boolean>(this.#NAMESPACE)['resiliencia'];
  }

  private consultarAutenticacao(): Autenticacao {
    return this.consultarSessao<Autenticacao>(this.#NAMESPACE)['autenticacao'];
  }

  get autenticacao(): Autenticacao { return this.#autenticacao; }
  get resiliencia(): boolean { return !!this.#resiliencia; }
  get plataformaWebview(): boolean { return !!this.#plataformaWebview; }
}
