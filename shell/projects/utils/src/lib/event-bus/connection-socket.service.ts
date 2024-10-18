import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map, switchAll } from 'rxjs/operators';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { Erro } from './model/erro.enum';

@Injectable({
  providedIn: 'root',
})
export class ConnectionSocketService<T> {
  private socket$!: WebSocketSubject<string | T>;
  private socketSubject$ = new Subject<Observable<T>>();
  resultado$ = this.socketSubject$.pipe(
    switchAll(),
    catchError((e) => {
      throw e;
    })
  );

  create(url: string): void {
    if (this.socket$) {
      this.close();
    }

    this.socket$ = webSocket<string | T>(url);
    const resultado = this.formatSocketResult();
    this.socketSubject$.next(resultado);
  }

  close(): void {
    this.socket$.complete();
    this.socket$.unsubscribe();
  }

  sendMsg(msg: string | T): void {
    this.socket$.next(msg);
  }

  private formatSocketResult(): Observable<T> {
    return this.socket$.pipe(
      map((dados) => dados as T),
      catchError((err) => {
        throw throwError(Erro.CONEXAO_SOCKET, err);
      })
    );
  }
}
