import { Injectable } from '@angular/core';
import '../models/global-window';

declare const dataLayer: any;

@Injectable({ providedIn: 'root' })
export class TagManagerWrapper {
  sendData(eventName: string, eventValue: unknown): void {
    try {
      const tagManagerEnabled = window.dataLayer || typeof dataLayer !== 'undefined'
      if (tagManagerEnabled) {
        dataLayer.push(eventName, eventValue);
      }
    }

    catch (error) {
      console.error(error);
    }
  }
}
