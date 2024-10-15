import { TipoVenda } from './tipo-venda.enum';

export interface FormaPagamento {
  codigo: string;
  tipo: string;
  valorPreenchido: number;
  tipoVenda?: TipoVenda;
  quantidadeParcelas?: number;
  valorParcela?: number;
  taxaJuros?: number;
  valorEntrada?: number;
}
