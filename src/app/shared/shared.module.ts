import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReversePipe } from '@shared/pipes/reverse.pipe';
import { HighlightDirective } from '@shared/directives/highlight.directive';

@NgModule({
  declarations: [
    ReversePipe,
    HighlightDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ReversePipe,
    HighlightDirective
  ]
})
export class SharedModule { }
