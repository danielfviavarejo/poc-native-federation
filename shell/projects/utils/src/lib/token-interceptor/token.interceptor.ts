import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ERROR_TOKEN_UNAVAILABLE } from './error-messages.const';
import {SessaoService} from '../sessao';

@Injectable({ providedIn: 'root' })
export class TokenInterceptor implements HttpInterceptor {

  constructor(private sessaoService: SessaoService) { }

  intercept<T>(request: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {

    const token = this.sessaoService.app.autenticacao?.token;

    if (!token) throw new Error(ERROR_TOKEN_UNAVAILABLE);

    return next.handle(this.setHeader(request, token));
  }

  private setHeader<T>(request: HttpRequest<T>, token: string): HttpRequest<T> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Cache-control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache'
      }
    });
  }

}
