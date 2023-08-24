import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CupListComponent } from '@cup/components/cup-list/cup-list.component';

const routes: Routes = [
  {
    path: '',
    component: CupListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CupRoutingModule { }
