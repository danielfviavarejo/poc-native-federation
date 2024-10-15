import { ElementRef } from '@angular/core';
import { CampoVisivelComTecladoDirective } from './campo-visivel-com-teclado.directive';

describe(`${CampoVisivelComTecladoDirective.name}`, () => {

  let directive: CampoVisivelComTecladoDirective;
  let elementRefMock: ElementRef;

  beforeEach(() => {
    elementRefMock = {
      nativeElement: document.createElement('input')
    };

    directive = new CampoVisivelComTecladoDirective(elementRefMock);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should determine if an element is visible', () => {

    const element = document.createElement('div');
    const isVisible = directive.isVisivel(element);
    expect(isVisible).toBe(true);
  });
});
