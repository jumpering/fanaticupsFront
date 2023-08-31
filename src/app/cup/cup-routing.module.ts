import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CupListComponent } from '@cup/components/cup-list/cup-list.component';
import { CupDetailComponent } from './components/cup-detail/cup-detail.component';

const routes: Routes = [
  {
    path: '',
    component: CupListComponent
  },
  {
    path: ':id',
    component: CupDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CupRoutingModule { }
