import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CupRoutingModule } from '@cup/cup-routing.module';
import { CupComponent } from '@cup/components/cup/cup.component';
import { CupListComponent } from '@cup/components/cup-list/cup-list.component';
import { CupService } from '@cup/services/cup.service';

import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    CupComponent,
    CupListComponent
    ],
  imports: [
    CommonModule,
    CupRoutingModule,
    FormsModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [
    CupService
  ]
})
export class CupModule { }
