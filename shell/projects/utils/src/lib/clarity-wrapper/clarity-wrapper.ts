declare const clarity: any;

export class ClarityWrapper {
  static sendData(type: string, clarityParam: string, paramValue: any): void {
    try {
      const isClarity = window.clarity || typeof clarity !== 'undefined'
      if (isClarity) {
        clarity(type, clarityParam, paramValue);
      }
    }

    catch (error) {
      console.error(error);
    }
  }
}
