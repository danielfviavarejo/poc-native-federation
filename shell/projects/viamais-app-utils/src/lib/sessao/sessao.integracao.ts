export class SessaoIntegracao {

  protected JORNADA = 'VendeMais';

  protected limparSessao(namespace: string): void {

    try {
      sessionStorage.removeItem(namespace);
    } catch (error) {
      console.error(`Houve uma falha ao limpar a sessão. ${namespace} : ${error}`);
    }
  }

  protected inserirSessao<T>(namespace: string, dados: { [chave: string]: T }): T {
    const sessao = this.consultarSessao<T>(namespace);

    try {
      sessionStorage.setItem(namespace, JSON.stringify({ ...sessao, ...dados }));
    } catch (error) {
      console.error(`Houve uma falha ao salvar dados na sessão. ${namespace}: ${error}`);
    }

    const unicaPosicao = 0;
    return dados[Object.keys(dados)[unicaPosicao]];
  }

  protected removerSessao(namespace: string, chave: string): void {
    const sessao = this.consultarSessao(namespace);
    delete sessao[chave];

    try {
      sessionStorage.setItem(namespace, JSON.stringify(sessao));
    } catch (error) {
      console.error(`Houve uma falha ao remover dados da sessão. ${namespace}: ${error}`);
    }
  }

  protected consultarSessao<T>(namespace: string): { [chave: string]: T } {
    try {
      return JSON.parse(sessionStorage.getItem(namespace) ?? '{}');
    } catch (error) {
      console.error(`Houve uma falha ao converter objeto de sessão. ${namespace} ${error}`);
      return {};
    }
  }

}
