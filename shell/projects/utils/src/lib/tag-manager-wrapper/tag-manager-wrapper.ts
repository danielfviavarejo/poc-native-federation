import { Injectable } from '@angular/core';

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