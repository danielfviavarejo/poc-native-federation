export interface CustomEvent {
  readonly channel: string;
}

export class EmitEvent<T> implements CustomEvent {
  constructor(public channel: string, public value?: T) {}
}
