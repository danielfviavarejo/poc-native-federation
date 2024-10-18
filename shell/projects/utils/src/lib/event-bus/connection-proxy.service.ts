import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { ConnectionSocketService } from './connection-socket.service';
import { EventBusService } from './event-bus.service';
import { Erro } from './model/erro.enum';
import { EmitEvent } from './model/event';
import { Notificacao } from './model/notificacao';

@Injectable({
  providedIn: 'root',
})
export class ConnectionProxy<T extends Notificacao> {
  private socket!: ConnectionSocketService<T>;
  private readonly MSG_INIT_CONEXAO = 'iniciando conexão';

  constructor(private eventBus: EventBusService) { }

  createConnection(url: string, channel: string = 'MOBILE'): void {
    this.socket = new ConnectionSocketService<T>();
    this.socket.resultado$.subscribe(
      (dado) => {
        const event = new EmitEvent<T>(dado.info.canalComunicacao, dado);
        this.eventBus.emit<T>(event);
      },
      (error) => {
        throw throwError(Erro.EMIT_EVENTO, error);
      }
    );
    this.socket.create(`${url}/${channel}`);
    this.socket.sendMsg(this.MSG_INIT_CONEXAO);
  }

  closeConnection(): void {
    this.socket.close();
  }
}
