import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { ResourceIdService } from './resource-id.service';

@Directive({
  selector: '[vmaUtilsIdQa]',
})
export class ResourceIdDirective implements OnInit {

  @Input('vmaUtilsIdQa')
  elemento!: string;

  @Input()
  atributo = 'id';

  @Input()
  acao?: string;

  @Input()
  valorDinamico?: string | number;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private servico: ResourceIdService
  ) { }

  ngOnInit(): void {
    this.renderer.setAttribute(this.el.nativeElement, this.atributo, this.servico.validar(this.elemento, this.acao, this.valorDinamico));
  }
}
