import { Desconto } from './desconto';
import { FormaPagamento } from './forma-pagamento';
import { Item } from './item';

export class CalculadoraRequisicao {

  itens: Item[];
  formasDePagamento?: FormaPagamento[];
  descontos?: Desconto[];

  constructor(itens: Item[]) {
    this.itens = itens;
  }
}
