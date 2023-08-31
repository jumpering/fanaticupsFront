import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReversePipe } from '@shared/pipes/reverse.pipe';
import { HighlightDirective } from '@shared/directives/highlight.directive';
import { ThreeDotsForShortDescriptionPipe } from './pipes/three-dots-for-short-description.pipe';

@NgModule({
  declarations: [
    ReversePipe,
    HighlightDirective,
    ThreeDotsForShortDescriptionPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ReversePipe,
    HighlightDirective,
    ThreeDotsForShortDescriptionPipe
  ]
})
export class SharedModule { }
