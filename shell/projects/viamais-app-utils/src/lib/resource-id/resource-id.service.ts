import { Inject, Injectable } from '@angular/core';
import { TipoAcao } from './tipo-acao';

@Injectable()
export class ResourceIdService {

  prefixoDoProjeto!: string;
  private readonly MENSAGEM_NOME_ELEMENTO = 'Por favor, digite um nome para representar o elemento.';
  private readonly MENSAGEM_TIPO_ACAO = 'Por favor, digite um tipo de ação válida.';

  constructor(@Inject('prefixoDoProjeto') _prefixoDoProjeto: string) {
    this.prefixoDoProjeto = _prefixoDoProjeto;
  }

  validar(elemento: string, action?: string, valorDinamico?: string | number): string {
    try {
      if (!elemento || elemento === '') {
        throw new Error(this.MENSAGEM_NOME_ELEMENTO);
      }

      const idFinal = `qa-${this.prefixoDoProjeto}-${elemento}-${this.validarTipoAcao(action)}`;
      return valorDinamico || typeof valorDinamico === `number` ? `${idFinal}-${valorDinamico}` : idFinal;

    } catch (error) {
      console.error(error);
    }
    return "";
  }

  private validarTipoAcao(acao?: string): string {
    try {

      if (acao && Object.values(TipoAcao).includes(acao as TipoAcao)) {
        return acao;
      }

      if (!acao) {
        return TipoAcao.CLICK;
      }
      throw new Error(this.MENSAGEM_TIPO_ACAO);

    } catch (error) {
      this.loggerTipoAcao(error);
      return TipoAcao.CLICK;
    }
  }

  private loggerTipoAcao(error: unknown): void {
    console.group('VALIDAÇÃO DO TIPO DE AÇÃO');
    console.error(error);
    console.log('Ações válidas: \n');
    Object.values(TipoAcao).forEach((value, index) => console.log(` ${index + 1}°. ${value}`));
    console.groupEnd();
  }
}
