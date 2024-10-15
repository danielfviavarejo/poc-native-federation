/* eslint-disable max-classes-per-file */

import { Filial } from '@vv/viamais-app-android-communication';

export enum TipoPessoa {
  FISICA = 'FISICA',
  JURIDICA = 'JURIDICA'
}

export class Vendedor {
  nome!: string;
  empresa!: number;
  matricula!: number;
}

export class NivelCbVip {
  codigoVip!: string;
  id!: number;
  nome!: string;
}

export class ClienteHelpers {
  identificadoPorDocumento?: boolean;
  identificadoPorNome?: boolean;
  pessoaFisica?: boolean;
  pessoaJuridica?: boolean;
  perfilCliente?: boolean;
  perfilFuncionario?: boolean;
  perfilClienteVip?: boolean;
}

export class Cliente extends ClienteHelpers {
  tipo!: TipoPessoa;
  perfil!: string;
  codigo!: number;
  nome!: string;
  documento!: string;
  nivelCbVip?: NivelCbVip;
}

export class Venda {
  filial!: Filial;
  vendedor!: Vendedor;
  cliente?: Cliente;
}

export class Autenticacao {
  token!: string;
  refreshToken!: string;
}

export class App {
  autenticacao!: Autenticacao;
  plataformaWebview!: boolean;
  resiliencia?: boolean;
}
