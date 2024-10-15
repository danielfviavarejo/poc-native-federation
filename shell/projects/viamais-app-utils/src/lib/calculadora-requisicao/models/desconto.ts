import { TipoDesconto } from "./tipo-desconto.enum";
import { TipoValor } from "./tipo-valor.enum";

export interface Desconto {
  tipo: TipoDesconto;
  tipoValor: TipoValor;
  valorDesconto: number;
}
