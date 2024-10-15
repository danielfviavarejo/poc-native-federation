import { CalculadoraRequisicao } from "./models/calculadora-requisicao";
import { Desconto } from "./models/desconto";
import { FormaPagamento } from "./models/forma-pagamento";
import { Item } from "./models/item";

export class CalculadoraRequisicaoBuilder {

  calculadoraRequisicao: CalculadoraRequisicao;

  constructor(calculadoraRequisicao: CalculadoraRequisicao)
  constructor(itens: Array<Item>, formasPagamento?: Array<FormaPagamento>, descontos?: Array<Desconto>)
  constructor(itens: CalculadoraRequisicao | Array<Item>, formasPagamento?: Array<FormaPagamento>, descontos?: Array<Desconto>) {

    if (this.isCalculadoraRequisicao(itens)) {
      this.calculadoraRequisicao = itens;
      return;
    }
    this.calculadoraRequisicao = new CalculadoraRequisicao(itens);

    if (this.isArray(formasPagamento)) {
      this.atualizarFormasPagamento(formasPagamento);
    }

    if (this.isArray(descontos)) {
      this.atualizarDescontos(descontos);
    }
  }

  adicionarFormaPagamento(formaPagamento: FormaPagamento): this {
    if (!this.calculadoraRequisicao?.formasDePagamento) {
      this.calculadoraRequisicao.formasDePagamento = new Array<FormaPagamento>();
    }
    this.calculadoraRequisicao.formasDePagamento.push(formaPagamento);
    return this;
  }

  adicionarDesconto(desconto: Desconto): this {
    if (!this.calculadoraRequisicao?.descontos) {
      this.calculadoraRequisicao.descontos = new Array<Desconto>();
    }
    this.calculadoraRequisicao.descontos.push(desconto);
    return this;
  }

  removerFormaPagamento(): this;
  removerFormaPagamento(index: number): this;
  removerFormaPagamento(index?: number): this {
    if (this.isArray(this.calculadoraRequisicao.formasDePagamento) && typeof index === 'number') {
      this.calculadoraRequisicao.formasDePagamento.splice(index, 1);
      this.calculadoraRequisicao = { ...this.calculadoraRequisicao };
    } else {
      delete this.calculadoraRequisicao.formasDePagamento;
    }
    return this;
  }

  removerDesconto(): this;
  removerDesconto(index: number): this;
  removerDesconto(index?: number): this {
    if (this.isArray(this.calculadoraRequisicao.descontos) && typeof index === 'number') {
      this.calculadoraRequisicao.descontos.splice(index, 1);
      this.calculadoraRequisicao = { ...this.calculadoraRequisicao };
    } else {
      delete this.calculadoraRequisicao.descontos;
    }
    return this;
  }

  private atualizarFormasPagamento(formasPagamento: Array<FormaPagamento>): this {
    this.calculadoraRequisicao.formasDePagamento = formasPagamento;
    return this;
  }

  private atualizarDescontos(descontos: Array<Desconto>): this {
    this.calculadoraRequisicao.descontos = descontos;
    return this;
  }

  private isCalculadoraRequisicao(requisicaoCalculadora: CalculadoraRequisicao | Item[]): requisicaoCalculadora is CalculadoraRequisicao {
    return !Array.isArray(requisicaoCalculadora);
  }

  private isArray(lista: unknown): lista is Array<FormaPagamento> | Array<Desconto> {
    const QUANTIDADE_MINIMA = 1;
    return Array.isArray(lista) && lista.length >= QUANTIDADE_MINIMA;
  }
}
