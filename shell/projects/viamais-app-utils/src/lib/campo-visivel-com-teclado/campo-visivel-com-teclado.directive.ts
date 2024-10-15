import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[vmaUtilsCampoVisivelComTeclado]',
})
export class CampoVisivelComTecladoDirective {
  readonly ALTURA_TECLADO = 350;
  paddingPadrao = '0px';

  @HostListener('focus', ['$event.target'])
  onFocus(): void {
    this.ajustarPosicaoTecladoAberto();
  }

  @HostListener('blur', ['$event.target'])
  onBlur(): void {
    this.ajustarPosicaoTecladoFechado();
  }

  constructor(private elemento: ElementRef) {}

  ajustarPosicaoTecladoFechado(): void {
    document.body.style.paddingBottom = this.paddingPadrao;
  }

  ajustarPosicaoTecladoAberto(): void {
    if (!this.isVisivel(this.elemento.nativeElement)) {
      this.paddingPadrao = document.body.style.paddingBottom ?? '0px';

      document.body.style.paddingBottom = `${this.ALTURA_TECLADO}px`;

      window.scrollBy(0, this.ALTURA_TECLADO);
    }
  }

  isVisivel(elemento: Element): boolean {
    const campoCoordenadas = elemento.getBoundingClientRect();

    return (
      campoCoordenadas.top >= 0 &&
      campoCoordenadas.left >= 0 &&
      campoCoordenadas.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) -
          this.ALTURA_TECLADO &&
      campoCoordenadas.right <=
        (window.innerWidth || document.documentElement.clientWidth)
    );
  }
}
