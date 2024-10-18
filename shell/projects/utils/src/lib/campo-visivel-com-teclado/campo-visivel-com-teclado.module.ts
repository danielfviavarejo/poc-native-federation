import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CampoVisivelComTecladoDirective } from './campo-visivel-com-teclado.directive';

@NgModule({
  declarations: [CampoVisivelComTecladoDirective],
  imports: [CommonModule],
  exports: [CampoVisivelComTecladoDirective],
})
export class CampoVisivelComTecladoModule {}
