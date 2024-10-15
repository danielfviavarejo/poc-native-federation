declare global {

  interface Window {

    clarity: any;

    dataLayer: any;

    androidResponse: {
      goToPaymentApplicationError: (message: string) => void;
    };

    AnalyticsWebInterface: {
      logEvent: (name: string, params: string) => void;
    };

    androidInterface: {
      /**
       * @description Set data to storage of android
       */
      setGlobalRepository(id: string, value: string): void;

      /**
       * @description Retorna o último código de produto (SKU) escaneado pelo módulo de câmera
       * @returns {string} SKU do produto
       */
      getProductCamera(): string | undefined;

      /**
       * @description Remove o código de produto (SKU) salvo pelo módulo de câmera. Deve ser chamado para indicar que a leitura do código foi feita com sucesso pelo front-end.
       */
      cleanProductCamera(): void;

      /**
       * @description Clean cache e restart application.
       */
      goToClearCache(): void;

      /**
       * @description Retorna informações de posse do aparelho
       */
      getPosse(): string;

      /**
       * @description Abre camera passando url de retorno
       * da pesquisa
       */
      goToCameraFromWebView(urlRetorno: string): void

      /**
       * @description Grava dados do vendedor na sessão do aplicativo android
       * @param vendedor
       */
      setPaymentOperator(vendedor: string): void;

      /**
       * @description Limpa os dados do vendedor salvo na sessão do aplicativo android
       */
      clearPaymentOperator(): void;

      /**
       * @description Integra com o aplicativo de pagamento
       * @param sacola
       * @param cliente
       */
      goToPaymentApplication(sacola: string, cliente: string): string;

      /**
       * @description Integra com o aplicativo do private label
       * @param dadosPrivateLabel
       */
      goToPrivateLabelApplication(dadosPrivateLabel: string): string;

      /**
       * @description Retorna a versão do aplicativo
       */
      getAppVersion(): string;
    };
  }
}

export { };

