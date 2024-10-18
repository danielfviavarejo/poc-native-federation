
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { CustomTimeoutError } from './models/custom-timeout-error';

@Injectable()
export class TimeoutInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const timeoutValue = req.headers.get('timeout') ?? 30000;

    return next.handle(req).pipe(timeout(Number(timeoutValue)), catchError((error) => {
      if (error instanceof TimeoutError) {
        const customTimeoutError: CustomTimeoutError = error;
        customTimeoutError.url = req.url;
        throw customTimeoutError;
      }
      throw error;
    }));
  }
}
