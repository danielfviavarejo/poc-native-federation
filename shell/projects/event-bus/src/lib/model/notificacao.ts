export interface InfoNotification {
  canalComunicacao: string;
}

export abstract class Notificacao {
  statusNotificacao?: string;
  id?: string;
  info: InfoNotification = { canalComunicacao: 'MOBILE' };
}
