import { TipoCalculavel } from "./tipo-calculavel.enum";

export interface Item {
  tipo: TipoCalculavel;
  quantidade: number;
  valorUnitario: number;
}
