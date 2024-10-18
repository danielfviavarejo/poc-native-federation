import { Injectable } from '@angular/core';
import { ReplaySubject, Subscription } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';
import { Erro } from './model/erro.enum';
import { CustomEvent, EmitEvent } from './model/event';

@Injectable({
  providedIn: 'root',
})
export class EventBusService {

  private id!: string;
  private subject = new ReplaySubject<any>(1);

  constructor() {
    this.id = Math.random().toString(36).substring(2);
    console.log('[@vv/event-bus::debug] EventBusService instance id:', this.id);
  }

  on<T>(event: CustomEvent, action: (value: T) => void): Subscription {
    return this.subject
      .pipe(
        filter((e: EmitEvent<T>) => e.channel === event.channel),
        map((e: EmitEvent<T>) => e),
        catchError((error) => {
          throw new Error(`${Erro.EVENT_BUS} ${error.message}`);
        })
      )
      .subscribe((e: EmitEvent<T>) => (e.value ? action(e.value) : null));
  }

  emit<T>(event: EmitEvent<T>): void {
    this.subject.next(event);
  }

  get instanceId(): string {
    return this.id;
  }
}
