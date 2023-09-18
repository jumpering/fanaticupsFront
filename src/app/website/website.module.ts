import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteRoutingModule } from './website-routing.module';
import { MaterialModule } from '@material/material.module';
import { HeaderComponent } from './components/header/header.component';
import { BodyComponent } from './components/body/body.component';
import { CupModule } from '@cup/cup.module';
import { LayoutComponent } from './components/layout/layout.component';


@NgModule({
  declarations: [
    HeaderComponent,
    BodyComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    MaterialModule,
    CupModule
  ]
})
export class WebsiteModule { }
