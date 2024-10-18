import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SEM_INTERNET } from './error-messages.const';

@Injectable({ providedIn: 'root' })
export class InternetInterceptor implements HttpInterceptor {
  intercept<T>(request: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
    if (!navigator.onLine) {
      throw new Error(SEM_INTERNET);
    }

    return next.handle(request);
  }
}
