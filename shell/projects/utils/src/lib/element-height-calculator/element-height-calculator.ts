import { ElementRef } from "@angular/core";

export class ElementHeightCalculator {
  static calculateHeight(element: ElementRef): number {
    const styles = window.getComputedStyle(element.nativeElement);
    const margins = parseFloat(styles['marginTop']) + parseFloat(styles['marginBottom']);
    return Math.ceil(element.nativeElement.scrollHeight + margins);
  }
}
