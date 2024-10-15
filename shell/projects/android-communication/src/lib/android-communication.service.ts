import { Injectable, NgZone } from '@angular/core';
import { Erro } from './models/erro';
import { TipoInstrucao } from './models/erro.enum';
import './models/global-window';

interface Posse {
  accepted: string
  branch: string
  configuratoorEnrollment: string
  dataConfig: string
  dateUpdate: string
  enrollment: string
  id: number
  imei: string
  name: string
}

interface Vendedor {
  filial: number;
  empresa: number;
  matricula: number;
  senha: string;
}

interface Cliente {
  nome: string;
  cpf: number;
}

interface PrivateLabel {
  filial: string;
  empresa: string;
  matricula: string;
  accessToken: string;
  refreshToken: string;
  cpf: string;
  flag: string;
}

/**
 * @description Um serviço que permite a comunicação com o aplicativo Android
 */
@Injectable({ providedIn: 'root' })
export class AndroidCommunicationService {

  static singleton: AndroidCommunicationService | null = null;

  private id!: string;

  /**
   * @ignore
   */
  constructor(private ngZone: NgZone) {

    this.id = Math.random().toString(36).substring(2);
    console.log('[@vv/android-communication::debug] AndroidCommunicationService instance id:', this.id);

    if (AndroidCommunicationService.singleton) return AndroidCommunicationService.singleton;

    window.androidResponse = window.androidResponse ?? {};
    AndroidCommunicationService.singleton = this;
  }

  /**
   * @description Consultar informações de posse do aparelho
   */
  consultarPosse(): Posse | undefined {
    return JSON.parse(window.androidInterface.getPosse() ?? null);
  }

  /**
   * @description Gravar dados do vendedor no aparelho
   * @param vendedor
   */
  gravarDadosVendedor(vendedor: Vendedor): void {
    window.androidInterface.setPaymentOperator(JSON.stringify(vendedor));
  }

  /**
   * @description Limpar dados do vendedor no aparelho
   */
  limparDadosVendedor(): void {
    window.androidInterface.clearPaymentOperator();
  }

  /**
   * @description Integração com o app de pagamento
   * @param sacola
   * @param cliente
   */
  irParaAppPagamento(sacola: string, cliente: Cliente): void {
    const result = window.androidInterface.goToPaymentApplication(sacola, JSON.stringify(cliente));
    if (result) {
      const erro = new Erro();
      erro.mensagem = result;
      erro.tipoInstrucao = TipoInstrucao.SERVICE_DESK;
      throw erro;
    }
  }

  /**
   * @description Exceção de retorno de integração com app de pagamento
   */
  irParaAppPagamentoCallbackError(): void {
    window.androidResponse.goToPaymentApplicationError = (message: string) => {
      this.ngZone.run(() => {
        console.warn('goToPaymentApplicationError callback error', message);
      });
    }
  }

  /**
   * @description Abre o módulo de câmera do aplicativo
   */
  irParaCamera(urlRetorno: string): void {
    window.androidInterface.goToCameraFromWebView(urlRetorno);
  }

  /**
   * @description Consulta o SKU do último produto escaneado pelo módulo de câmera, caso houver
   * @returns SKU do último produto escaneado pelo módulo de câmera
   */
  consultarProdutoCamera(): string | null {
    return window.androidInterface.getProductCamera() ?? null;
  }

  /**
   * @description Remove o SKU salvo pelo módulo de câmera. Deve ser chamado quando o código já foi lido com sucesso.
   */
  removerProdutoCamera(): void {
    window.androidInterface.cleanProductCamera();
  }

  /**
   * @description Armazena dados no storage do aparelho
   */
  armazenarDadosStorage(id: string, value: string): void {
    window.androidInterface.setGlobalRepository(id, value);
  }

  /**
   * @description Limpa o cache do modulo webview
   */
  limparCache(): void {
    window.androidInterface.goToClearCache();
  }

  /**
   * @description Integração com o aplicativo do private label
   */
  irParaAppPrivateLabel(dadosPrivateLabel: PrivateLabel): void {
    const result = window.androidInterface.goToPrivateLabelApplication(JSON.stringify(dadosPrivateLabel));
    if (result) {
      const erro = new Erro();
      erro.mensagem = result;
      erro.tipoInstrucao = TipoInstrucao.SERVICE_DESK;
      throw erro;
    }
  }

  /**
   * @description Consultar versão do aplicativo
   */
  consultarVersaoApp(): string | undefined {
    if (window.androidInterface && typeof window.androidInterface.getAppVersion === 'function') {
      return window.androidInterface.getAppVersion();
    }
    return undefined;
  }
}
