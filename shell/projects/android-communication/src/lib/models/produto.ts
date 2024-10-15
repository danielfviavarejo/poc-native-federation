import { TipoEntrega } from "./tipo-entrega.enum";
import { TipoEstoque } from "./tipo-estoque.enum";
import { TipoProduto } from "./tipo-produto.enum";

export interface Produto {
    sku: number;
    codigoSetor: number;
    quantidade: number;
    tipo: TipoProduto;
    tipoEstoque: TipoEstoque;
    entrega: {
        tipoEntrega: TipoEntrega;
        dataRetirada?: string;
        codigoFilial?: number;
        cepEntrega?: string;
        codigoDeposito?: number;
    };
    conjuntoPrincipal?: number;
    itens?: Array<{
        sku: number;
        tipo: TipoProduto;
        quantidade: number;
        brinde: boolean;
        operadora?: string;
    }>;
    idProduto: string
}