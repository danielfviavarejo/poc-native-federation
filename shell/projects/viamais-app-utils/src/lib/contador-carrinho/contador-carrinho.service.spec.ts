import { TestBed } from '@angular/core/testing';
import { ContadorCarrinhoService } from './contador-carrinho.service';

describe(ContadorCarrinhoService.name, () => {

  let service: ContadorCarrinhoService;
  const valorContador = 10;

  beforeEach(() => {
    void TestBed.configureTestingModule({
      providers: [ContadorCarrinhoService],
    }).compileComponents();

    service = TestBed.inject(ContadorCarrinhoService);
  });


  it('O serviço deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it(`Deve atualizar o contador chamando o ${ContadorCarrinhoService.prototype.atualizarContador.name}`, () => {
    service.atualizarContador(valorContador);

    expect((service as any).quantidadeCarrinho).toBe(valorContador);
  });

  it(`Deve receber o valor atualizado do contador através do contadorCarrinho$`, () => {
    service.atualizarContador(valorContador);

    service.contadorCarrinho$.subscribe((quantidadeCarrinho) => {
      expect(quantidadeCarrinho).toBe(valorContador);
    });
  });

  it(`Deve consultar o valor do contador atráves do get contadorCarrinho `, () => {
    service.atualizarContador(valorContador);
    const contador = service.contadorCarrinho;

    expect(contador).toBe(valorContador);
  });

});
