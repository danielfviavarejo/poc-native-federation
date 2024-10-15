import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ResourceIdDirective } from './resource-id.directive';
import { ResourceIdService } from './resource-id.service';

@NgModule({
  imports: [CommonModule],
  exports: [ResourceIdDirective],
  declarations: [ResourceIdDirective],
  providers: [ResourceIdService],
})
export class ResourceIdModule { }
