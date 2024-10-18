import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AutenticacaoAPI } from './autenticacao.api';
import {SessaoService} from '../sessao';

@Injectable({ providedIn: 'root' })
export class RefreshTokenInterceptor implements HttpInterceptor {

  private readonly HTTP_UNAUTHORIZED = 401;

  constructor(
    private router: Router,
    private sessaoService: SessaoService,
    private autenticacaoAPI: AutenticacaoAPI
  ) { }

  intercept<T>(request: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
    return next.handle(request)
      .pipe(
        catchError((httpErrorResponse: HttpErrorResponse) => {
          if (httpErrorResponse.status === this.HTTP_UNAUTHORIZED) {
            return this.atualizarTokens(request, next);
          }
          return throwError(httpErrorResponse);
        })
      );
  }

  private atualizarTokens<T>(request: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
    const refreshToken = this.sessaoService.app.autenticacao?.refreshToken;

    return this.autenticacaoAPI.atualizarToken(refreshToken)
      .pipe(
        switchMap(({ accessToken, refreshToken }) => {
          this.sessaoService.app.atualizarAutenticacao(accessToken, refreshToken)
          return this.repetirRequisicaoComNovoToken(request, next, refreshToken)
        }),
        catchError(error => this.tratarErroAtualizarToken(error))
      );
  }

  private repetirRequisicaoComNovoToken<T>(request: HttpRequest<T>, next: HttpHandler, refreshToken: string): Observable<HttpEvent<T>> {
    const clonedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${refreshToken}`
      }
    });
    return next.handle(clonedRequest);
  }

  private tratarErroAtualizarToken(httpErrorResponse: HttpErrorResponse): Observable<never> {
    if (httpErrorResponse.status === this.HTTP_UNAUTHORIZED) {
      this.redirecionarParaLogin();
    }
    return throwError(() => httpErrorResponse);
  }

  private redirecionarParaLogin(): void {
    this.sessaoService.limpar();
    this.router.navigate(['login']);
  }
}
