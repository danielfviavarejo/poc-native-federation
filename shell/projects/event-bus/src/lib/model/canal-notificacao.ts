import { InfoNotification, Notificacao } from './notificacao';

export class CanalNotificacao extends Notificacao {
  override info: InfoNotification = { canalComunicacao: 'canalComunicacao' };
}
