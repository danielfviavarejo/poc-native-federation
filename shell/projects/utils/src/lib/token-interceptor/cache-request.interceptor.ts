import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, of } from 'rxjs';
import { finalize, share } from 'rxjs/operators';

// TODO: Este interceptor deve ser excluído assim que ocorrer a unificação do header expandido e header compacto
@Injectable()
export class CacheRequestInterceptor implements HttpInterceptor {
  private requests = new Map<string, { request: HttpRequest<any>, response: any }>();

  intercept<T>(request: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {

    if (this.isRequestCrm(request) && request.method === 'POST') {
      const CHAVE_REQUEST = this.transformarChaveRequest(request);

      if (this.requests.has(CHAVE_REQUEST)) {
        const requestCache = this.requests.get(CHAVE_REQUEST);
        if (requestCache && requestCache.response) {
          return (requestCache.response instanceof ReplaySubject) ?
            requestCache.response.asObservable() : of(requestCache.response.clone());
        }
      }

      const responseSubject = new ReplaySubject<HttpEvent<any>>(1);
      this.requests.set(CHAVE_REQUEST, { request, response: responseSubject });

      const response$ = next.handle(request)
        .pipe(
          finalize(() => this.requests.delete(CHAVE_REQUEST)),
          share()
        );

      response$.subscribe(responseSubject);

      return response$;
    }

    return next.handle(request);
  }

  private isRequestCrm(request: HttpRequest<any>): boolean {
    return request.url.includes('vv-crm');
  }

  private transformarChaveRequest(request: HttpRequest<any>): string {
    const REGEX_CARACTERES_ESPECIAIS = /[{}":,]/g;
    const REGEX_TEXTO_OBSERVE_RESPONSE = /observeresponse/g;

    const BODY = JSON.stringify(request.body)
      .replace(REGEX_CARACTERES_ESPECIAIS, '')
      .replace(REGEX_TEXTO_OBSERVE_RESPONSE, '');

    return `${request.url}|${BODY}`;
  }
}
