import { TestBed } from '@angular/core/testing';
import { Bandeira } from '@vv/viamais-app-android-communication';
import { App, Cliente, TipoPessoa, Venda } from './sessao';
import { SessaoApp } from './sessao.app';
import { SessaoService } from './sessao.service';

describe(SessaoService.name, () => {

  let service: SessaoService;

  const namespaceVenda: Venda = {
    filial: {
      bandeira: Bandeira.CASAS_BAHIA,
      codigo: 1000,
      empresa: 21,
      nome: 'Filial numero 1000'
    },
    vendedor: {
      nome: 'Jack Skeleton',
      empresa: 21,
      matricula: 123456
    }
  };

  const namespaceApp: App = {
    autenticacao: {
      token: '123456',
      refreshToken: '456789',
    },
    resiliencia: true,
    plataformaWebview: false
  };

  beforeEach(() => {
    void TestBed.configureTestingModule({
      providers: [SessaoService],
    }).compileComponents();

    service = TestBed.inject(SessaoService);
  });

  it('O serviço deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it(`Deve ser exibido um console.error informando que a sessão não é suportada ao iniciar o serviço`, () => {

    // ! Apenas para não exibir o erro na stack do teste
    console.error = jest.fn();

    const originalStorage: Storage | undefined = window.Storage as unknown as Storage;

    jest.spyOn(console, 'error');

    // Simular que o objeto Storage não existe
    Object.defineProperty(window, 'Storage', { value: undefined, writable: true });

    new SessaoService();
    expect(console.error).toHaveBeenCalledWith('Armazenamento de sessão não suportado');

    // Restaurar objeto Storage original
    Object.defineProperty(window, 'Storage', { value: originalStorage, writable: true });
  });

  it(`Deve iniciar uma sessão | método '${SessaoService.prototype.iniciar.name}'`, () => {

    service.iniciar(namespaceVenda, namespaceApp);
    service.app.adicionarResiliencia(true);

    expect(service.venda.filial).toEqual(namespaceVenda.filial);
    expect(service.venda.vendedor).toEqual(namespaceVenda.vendedor);
    expect(service.app.autenticacao).toEqual(namespaceApp.autenticacao);
    expect(service.app.resiliencia).toEqual(namespaceApp.resiliencia);
  });

  it(`Deve incluir um cliente na sessão de venda | método: 'adicionarCliente'`, () => {

    service.iniciar(namespaceVenda, namespaceApp);

    const cliente: Cliente = {
      tipo: TipoPessoa.FISICA,
      perfil: 'CLIENTE',
      nome: 'Oogie Boogie',
      codigo: 41258963,
      documento: '12345678900'
    };

    service.venda.adicionarCliente(cliente);

    const clienteSessao = {
      tipo: service.venda.cliente?.tipo,
      perfil: service.venda.cliente?.perfil,
      nome: service.venda.cliente?.nome,
      codigo: service.venda.cliente?.codigo,
      documento: service.venda.cliente?.documento
    };

    expect(clienteSessao).toEqual(cliente);
  });

  it(`Deve remover o cliente na sessão de venda | método: 'removerCliente'`, () => {

    namespaceVenda.cliente = {
      tipo: TipoPessoa.FISICA,
      perfil: 'CLIENTE',
      nome: 'Oogie Boogie',
      codigo: 41258963,
      documento: '12345678900'
    }
    service.iniciar(namespaceVenda, namespaceApp);

    service.venda.removerCliente();

    expect(service.venda.cliente).toEqual(undefined);
  });

  it(`O parametro de resiliencia deve ser verdadeiro | método: ${SessaoService.prototype.iniciar.name}`, () => {
    service.iniciar(namespaceVenda, namespaceApp);
    service.app.adicionarResiliencia(true);
    expect(service.app.resiliencia).toBeTruthy();
  });

  it(`Deve adicionar novo objeto na sessão de venda | método: SessaoService.venda.adicionar`, () => {

    service.iniciar(namespaceVenda, namespaceApp);

    type Produto = { nome: string, sku: number, preco: number };

    const contexto = 'carrinho';
    const produtos: Produto[] = [{ nome: 'Geladeira', sku: 123456, preco: 2000 }];
    const produtosSessao = service.venda.adicionar(contexto, produtos);

    expect(produtosSessao).toEqual(produtos);
  });

  it(`Deve adicionar novo objeto na sessão de app | método: SessaoService.app.adicionar`, () => {

    service.iniciar(namespaceVenda, namespaceApp);

    const contexto = 'pontoImplantacao';
    const pontoImplantacao = { isBlackFriday: true };
    const pontoImplantacaoSessao = service.app.adicionar(contexto, pontoImplantacao);

    expect(pontoImplantacaoSessao).toEqual(pontoImplantacao);
  });

  it(`Deve atualizar token na sessão | método: ${SessaoApp.prototype.atualizarAutenticacao.name}`, () => {

    service.iniciar(namespaceVenda, namespaceApp);

    const token = '74s1w2dew933';
    const refreshToken = '145sd1df4dg';
    service.app.atualizarAutenticacao(token, refreshToken);

    expect(service.app.autenticacao).toEqual({ token, refreshToken });
  });

});
