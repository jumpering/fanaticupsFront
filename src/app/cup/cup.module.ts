import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CupRoutingModule } from '@cup/cup-routing.module';
import { CupComponent } from '@cup/components/cup/cup.component';
import { CupListComponent } from '@cup/components/cup-list/cup-list.component';
import { CupDetailComponent } from '@cup/components/cup-detail/cup-detail.component';
import { CupService } from '@cup/services/cup.service';

import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '@material/material.module';
import { CreateComponent } from './components/create/create.component';

@NgModule({
  declarations: [
    CupComponent,
    CupListComponent,
    CupDetailComponent,
    CreateComponent
    ],
  imports: [
    CommonModule,
    CupRoutingModule,
    FormsModule,
    SharedModule,
    MaterialModule
  ],
  exports: [
    CupListComponent
  ],
  providers: [
    CupService
  ]
})
export class CupModule { }
