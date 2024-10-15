/**
 * @description Atualiza a barra de navegação
 * Se passar valor booleano na opção exibirMenuHamburger, funcionará conforme o valor passado, exibindo ou não o menu hamburger
 * Se não passar valor booleano na opção exibirMenuHamburger, a opção do botão Voltar será exibida
 */
export interface Navegacao {
  titulo: string;
  pagina?: string;
  exibirMenuHamburger?: boolean;
  exibirCarrinho?: boolean;
  exibirIdentificacaoCliente?: boolean;
  exibirBuscar?: boolean;
}
